import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  HoldingView,
  PortfolioSummary,
  TradeResult,
  TradeView,
} from "../types/trading";

// ─── Watchlist ───────────────────────────────────────────────────────────────

export function useWatchlist() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["watchlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWatchlist();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useAddToWatchlist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sym: string) => {
      if (!actor) throw new Error("No actor");
      return actor.addToWatchlist(sym);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });
}

export function useRemoveFromWatchlist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sym: string) => {
      if (!actor) throw new Error("No actor");
      return actor.removeFromWatchlist(sym);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });
}

// ─── Holdings ────────────────────────────────────────────────────────────────

export function useHoldings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HoldingView[]>({
    queryKey: ["holdings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHoldings();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

// ─── Portfolio Summary ────────────────────────────────────────────────────────

export function usePortfolioSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PortfolioSummary | null>({
    queryKey: ["portfolioSummary"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPortfolioSummary();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15_000,
  });
}

// ─── Trade History ────────────────────────────────────────────────────────────

export function useTradeHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TradeView[]>({
    queryKey: ["tradeHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTradeHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Trade Actions ────────────────────────────────────────────────────────────

export function useBuy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    TradeResult,
    Error,
    { symbol: string; quantity: bigint; pricePaise: bigint }
  >({
    mutationFn: async ({ symbol, quantity, pricePaise }) => {
      if (!actor) throw new Error("No actor");
      return actor.buy(symbol, quantity, pricePaise);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["holdings"] });
      qc.invalidateQueries({ queryKey: ["portfolioSummary"] });
      qc.invalidateQueries({ queryKey: ["tradeHistory"] });
    },
  });
}

export function useSell() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    TradeResult,
    Error,
    { symbol: string; quantity: bigint; pricePaise: bigint }
  >({
    mutationFn: async ({ symbol, quantity, pricePaise }) => {
      if (!actor) throw new Error("No actor");
      return actor.sell(symbol, quantity, pricePaise);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["holdings"] });
      qc.invalidateQueries({ queryKey: ["portfolioSummary"] });
      qc.invalidateQueries({ queryKey: ["tradeHistory"] });
    },
  });
}

// ─── Register ────────────────────────────────────────────────────────────────

export function useRegister() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.register();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolioSummary"] });
      qc.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}

// ─── Balance Formatter ────────────────────────────────────────────────────────

/**
 * Formats a paise (bigint) value as Indian Rupee string.
 * e.g. 100000000000n -> "₹1,00,00,00,000"
 */
export function useBalanceFormatter() {
  return (paise: bigint | undefined | null): string => {
    if (paise == null) return "₹—";
    return formatINR(Number(paise) / 100);
  };
}

export function formatINR(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const [intPart, decPart] = abs.toFixed(2).split(".");
  const formatted = toIndianFormat(intPart);
  const result = `₹${formatted}.${decPart}`;
  return isNegative ? `-${result}` : result;
}

function toIndianFormat(numStr: string): string {
  if (numStr.length <= 3) return numStr;
  const last3 = numStr.slice(-3);
  const rest = numStr.slice(0, -3);
  const groups = rest.match(/.{1,2}/g) ?? [];
  return [...groups, last3].join(",");
}

export function formatPaise(paise: bigint): string {
  return formatINR(Number(paise) / 100);
}

export function formatPnl(paise: bigint): string {
  const val = Number(paise) / 100;
  const sign = val >= 0 ? "+" : "";
  return `${sign}${formatINR(val)}`;
}

// ─── Simulated Prices (5s polling) ───────────────────────────────────────────
// Since the backend doesn't expose price data (TradingView widget handles display),
// this hook provides deterministic simulated current prices based on avg buy prices
// with a small time-varying delta to animate P&L changes.

function simulatePrice(avgPaise: number, symbol: string, seed: number): number {
  // Deterministic drift using symbol hash + time bucket (5s resolution)
  const timeBucket = Math.floor(Date.now() / 5000);
  const symbolHash = symbol
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const drift = Math.sin((timeBucket + symbolHash) * 0.37 + seed) * 0.04; // ±4%
  return Math.round(avgPaise * (1 + drift));
}

export function usePrices(symbols: string[]): { data: Record<string, number> } {
  const { actor, isFetching } = useActor(createActor);
  const { data: holdings = [] } = useQuery<
    import("../types/trading").HoldingView[]
  >({
    queryKey: ["holdings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHoldings();
    },
    enabled: !!actor && !isFetching,
  });

  const pricesQuery = useQuery<Record<string, number>>({
    queryKey: ["prices", symbols],
    queryFn: () => {
      const map: Record<string, number> = {};
      for (const sym of symbols) {
        const holding = holdings.find((h) => h.symbol === sym);
        const avg = holding ? Number(holding.avgPrice) : 100_00; // fallback 100 INR
        const seed = sym.charCodeAt(0) * 0.13;
        map[sym] = simulatePrice(avg, sym, seed);
      }
      return map;
    },
    refetchInterval: 5000,
    enabled: symbols.length > 0,
  });

  return { data: pricesQuery.data ?? {} };
}
