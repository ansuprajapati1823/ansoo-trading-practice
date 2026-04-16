import type { backendInterface, HoldingView, PortfolioSummary, TradeView, TradeResult } from "../backend";
import { Direction } from "../backend";

const sampleHoldings: HoldingView[] = [
  { symbol: "AAPL", quantity: BigInt(10), avgPrice: BigInt(11100) },
  { symbol: "GOOGL", quantity: BigInt(5), avgPrice: BigInt(4700) },
  { symbol: "MSFT", quantity: BigInt(8), avgPrice: BigInt(13700) },
  { symbol: "INDIABULL", quantity: BigInt(15), avgPrice: BigInt(1500) },
];

const sampleTrades: TradeView[] = [
  {
    id: BigInt(1),
    symbol: "AAPL",
    direction: Direction.buy,
    quantity: BigInt(10),
    price: BigInt(11100),
    timestamp: BigInt(Date.now() * 1_000_000 - 86400_000_000_000),
  },
  {
    id: BigInt(2),
    symbol: "GOOGL",
    direction: Direction.buy,
    quantity: BigInt(5),
    price: BigInt(4700),
    timestamp: BigInt(Date.now() * 1_000_000 - 3600_000_000_000),
  },
];

const portfolioSummary: PortfolioSummary = {
  balance: BigInt(999_000_000_00), // 999 crore paise = 99.9 Cr
  totalInvested: BigInt(300_000_00),
  totalPnl: BigInt(110_000_000_00),
  returnPct: BigInt(3),
};

export const mockBackend: backendInterface = {
  register: async () => undefined,
  addToWatchlist: async (_symbol: string) => undefined,
  removeFromWatchlist: async (_symbol: string) => undefined,
  getWatchlist: async () => ["AAPL", "GOOGL", "MSFT", "INDIABULL"],
  getHoldings: async () => sampleHoldings,
  getPortfolioSummary: async () => portfolioSummary,
  getTradeHistory: async () => sampleTrades,
  buy: async (symbol: string, quantity: bigint, pricePaise: bigint): Promise<TradeResult> => ({
    __kind__: "ok",
    ok: {
      id: BigInt(99),
      symbol,
      direction: Direction.buy,
      quantity,
      price: pricePaise,
      timestamp: BigInt(Date.now() * 1_000_000),
    },
  }),
  sell: async (symbol: string, quantity: bigint, pricePaise: bigint): Promise<TradeResult> => ({
    __kind__: "ok",
    ok: {
      id: BigInt(100),
      symbol,
      direction: Direction.sell,
      quantity,
      price: pricePaise,
      timestamp: BigInt(Date.now() * 1_000_000),
    },
  }),
};
