import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TradingPanel } from "../components/TradingPanel";
import { TradingViewChart } from "../components/TradingViewChart";
import {
  formatPaise,
  formatPnl,
  useHoldings,
  usePortfolioSummary,
} from "../hooks/useBackend";
import { useSelectedSymbol } from "../hooks/useSelectedSymbol";
import {
  MARKET_SYMBOLS,
  getSymbolName,
  getSymbolShort,
} from "../types/trading";

// ─── Symbol Switcher Dropdown ─────────────────────────────────────────────────

function SymbolSwitcher({
  symbol,
  onSelect,
}: {
  symbol: string;
  onSelect: (s: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  const filtered = MARKET_SYMBOLS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  // Group by exchange
  const groups = filtered.reduce<Record<string, typeof MARKET_SYMBOLS>>(
    (acc, s) => {
      acc[s.exchange] = [...(acc[s.exchange] ?? []), s];
      return acc;
    },
    {},
  );

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const short = getSymbolShort(symbol);
  const name = getSymbolName(symbol);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        data-ocid="trading.symbol_switcher_button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 rounded-sm border border-border bg-secondary/40 px-3 py-1.5 text-sm transition-colors hover:bg-secondary/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span className="font-mono font-bold text-foreground">{short}</span>
        <span className="hidden max-w-[140px] truncate text-xs text-muted-foreground sm:block">
          {name}
        </span>
        <ChevronDown
          size={14}
          className={cn(
            "flex-shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          data-ocid="trading.symbol_switcher_dropdown"
          className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-md border border-border bg-card shadow-lg"
        >
          {/* Search */}
          <div className="border-b border-border p-2">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search symbols…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="trading.symbol_search_input"
              className="w-full rounded-sm bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <ScrollArea className="max-h-64">
            {Object.entries(groups).map(([exchange, symbols]) => (
              <div key={exchange}>
                <div className="sticky top-0 bg-card/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {exchange}
                </div>
                {symbols.map((s) => (
                  <button
                    key={s.symbol}
                    type="button"
                    data-ocid={`trading.symbol_option.${s.symbol.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`}
                    onClick={() => {
                      onSelect(s.symbol);
                      setOpen(false);
                      setSearch("");
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-secondary/40"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono font-semibold text-foreground">
                        {getSymbolShort(s.symbol)}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {s.name}
                      </span>
                    </div>
                    {s.symbol === symbol && (
                      <Check size={12} className="text-chart-1" />
                    )}
                  </button>
                ))}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No symbols found
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

// ─── Holdings Mini Panel ──────────────────────────────────────────────────────

function HoldingsMiniPanel() {
  const { data: holdings = [], isLoading } = useHoldings();
  const { data: summary } = usePortfolioSummary();

  return (
    <div className="trading-panel flex flex-col" data-ocid="holdings.panel">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
          Portfolio
        </span>
      </div>

      <div className="border-b border-border px-4 pb-1 pt-2">
        <div className="mb-1 grid grid-cols-4 gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>Asset</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Avg</span>
          <span className="text-right">P&L</span>
        </div>

        {isLoading ? (
          <div className="space-y-1.5 py-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-7 w-full" />
            ))}
          </div>
        ) : holdings.length === 0 ? (
          <div
            className="py-4 text-center text-xs text-muted-foreground"
            data-ocid="holdings.empty_state"
          >
            No open positions
          </div>
        ) : (
          <ScrollArea className="max-h-44">
            <div>
              {holdings.map((h, i) => {
                const short = getSymbolShort(h.symbol);
                const avgPrice = Number(h.avgPrice) / 100;
                const mockCurrent =
                  avgPrice *
                  (1 + (((h.symbol.charCodeAt(5) ?? 3) % 20) - 10) * 0.02);
                const pnl = (mockCurrent - avgPrice) * Number(h.quantity);
                const isUp = pnl >= 0;

                return (
                  <div
                    key={h.symbol}
                    data-ocid={`holdings.item.${i + 1}`}
                    className="grid grid-cols-4 gap-1 border-b border-border/40 py-1.5 text-xs last:border-0"
                  >
                    <span className="truncate font-mono font-semibold text-foreground">
                      {short}
                    </span>
                    <span className="text-right font-mono text-muted-foreground">
                      {Number(h.quantity)}
                    </span>
                    <span className="text-right font-mono text-muted-foreground">
                      {avgPrice.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                    <span
                      className={cn(
                        "text-right font-mono font-semibold",
                        isUp ? "text-chart-1" : "text-destructive",
                      )}
                    >
                      {isUp ? "+" : ""}
                      {((pnl / avgPrice / Number(h.quantity)) * 100).toFixed(1)}
                      %
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>

      <div className="px-4 py-2.5">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Performance Summary
        </div>
        {summary ? (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Portfolio P&L</span>
              <span
                data-ocid="holdings.portfolio_pnl"
                className={cn(
                  "font-mono font-semibold",
                  Number(summary.totalPnl) >= 0
                    ? "text-chart-1"
                    : "text-destructive",
                )}
              >
                {formatPnl(summary.totalPnl)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Total Invested</span>
              <span className="font-mono text-foreground">
                {formatPaise(summary.totalInvested)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Return %</span>
              <span
                className={cn(
                  "font-mono font-semibold",
                  Number(summary.returnPct) >= 0
                    ? "text-chart-1"
                    : "text-destructive",
                )}
              >
                {(Number(summary.returnPct) / 100).toFixed(2)}%
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main TradingPage ─────────────────────────────────────────────────────────

export function TradingPage() {
  const [selectedSymbol, setSelectedSymbol] = useSelectedSymbol();

  return (
    <div
      className="flex h-full flex-col overflow-hidden md:flex-row"
      data-ocid="trading.page"
    >
      {/* Chart + Trading panel column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Symbol switcher header bar */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-3 py-2">
          <SymbolSwitcher
            symbol={selectedSymbol}
            onSelect={setSelectedSymbol}
          />
        </div>

        {/* TradingView Chart — fills remaining height */}
        <div className="min-h-0 flex-1" data-ocid="trading.chart_canvas_target">
          <TradingViewChart symbol={selectedSymbol} />
        </div>

        {/* Trading panel — below chart on mobile */}
        <div className="border-t border-border md:hidden">
          <TradingPanel symbol={selectedSymbol} />
        </div>
      </div>

      {/* Right panel: Trading + Holdings (desktop only) */}
      <div className="hidden w-72 flex-shrink-0 flex-col gap-0 overflow-y-auto border-l border-border md:flex xl:w-80">
        <TradingPanel symbol={selectedSymbol} />
        <div className="border-t border-border" />
        <HoldingsMiniPanel />
      </div>
    </div>
  );
}
