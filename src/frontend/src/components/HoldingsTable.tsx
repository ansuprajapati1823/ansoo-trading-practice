import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BarChart2 } from "lucide-react";
import { usePrices } from "../hooks/useBackend";
import type { HoldingView } from "../types/trading";
import { getSymbolName, getSymbolShort } from "../types/trading";

interface Props {
  holdings: HoldingView[];
  isLoading: boolean;
}

function formatPrice(paise: number): string {
  const amount = paise / 100;
  const [intPart, decPart] = amount.toFixed(2).split(".");
  const last3 = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const formatted = rest
    ? [...(rest.match(/.{1,2}/g) ?? []), last3].join(",")
    : last3;
  return `₹${formatted}.${decPart}`;
}

function PnlCell({ value, pct }: { value: number; pct: number }) {
  const isUp = value >= 0;
  return (
    <div className="text-right">
      <div
        className={cn(
          "font-mono text-xs font-semibold",
          isUp ? "text-chart-1" : "text-destructive",
        )}
      >
        {isUp ? "+" : ""}
        {pct.toFixed(2)}%
      </div>
      <div
        className={cn(
          "font-mono text-[10px]",
          isUp ? "text-chart-1/70" : "text-destructive/70",
        )}
      >
        {isUp ? "+" : ""}
        {Math.abs(value) >= 1_00_00_000
          ? `₹${(value / 1_00_00_000).toFixed(2)}Cr`
          : Math.abs(value) >= 1_00_000
            ? `₹${(value / 1_00_000).toFixed(2)}L`
            : `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
      </div>
    </div>
  );
}

export function HoldingsTable({ holdings, isLoading }: Props) {
  const symbols = holdings.map((h) => h.symbol);
  const { data: prices = {} } = usePrices(symbols);

  if (isLoading) {
    return (
      <div
        className="space-y-2 p-4"
        data-ocid="portfolio.holdings_loading_state"
      >
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (holdings.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
        data-ocid="portfolio.holdings_empty_state"
      >
        <BarChart2 size={40} className="text-muted-foreground/25" />
        <div>
          <p className="text-sm font-medium text-foreground">
            No open positions
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Place a buy order from the Trading page to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="portfolio.holdings_list" className="overflow-x-auto">
      {/* Header */}
      <div className="min-w-[640px] grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 border-b border-border px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Symbol</span>
        <span className="text-right">Qty</span>
        <span className="text-right">Avg Price</span>
        <span className="text-right">Curr. Price</span>
        <span className="text-right">P&L/Share</span>
        <span className="text-right">Total P&L</span>
      </div>

      <ScrollArea className="max-h-[calc(100vh-26rem)]">
        <div className="min-w-[640px]">
          {holdings.map((h, i) => {
            const short = getSymbolShort(h.symbol);
            const name = getSymbolName(h.symbol);
            const avgPaise = Number(h.avgPrice);
            const avgRupees = avgPaise / 100;
            const currentPaise = prices[h.symbol] ?? avgPaise;
            const currentRupees = currentPaise / 100;
            const qty = Number(h.quantity);
            const pnlPerShare = currentRupees - avgRupees;
            const totalPnl = pnlPerShare * qty;
            const pnlPct = avgRupees > 0 ? (pnlPerShare / avgRupees) * 100 : 0;
            const isUp = pnlPerShare >= 0;

            return (
              <div
                key={h.symbol}
                data-ocid={`portfolio.holding_item.${i + 1}`}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 border-b border-border/40 px-4 py-3 last:border-0 hover:bg-secondary/20 transition-smooth"
              >
                {/* Symbol */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-[11px] font-bold text-foreground">
                    {short.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-mono text-sm font-semibold text-foreground">
                      {short}
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {name}
                    </div>
                  </div>
                </div>

                {/* Qty */}
                <div className="text-right font-mono text-sm text-foreground">
                  {qty.toLocaleString("en-IN")}
                </div>

                {/* Avg Price */}
                <div className="text-right font-mono text-sm text-muted-foreground">
                  {formatPrice(avgPaise)}
                </div>

                {/* Current Price */}
                <div
                  className={cn(
                    "text-right font-mono text-sm font-medium",
                    isUp ? "text-chart-1" : "text-destructive",
                  )}
                >
                  {formatPrice(currentPaise)}
                </div>

                {/* P&L per share */}
                <div className="text-right">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold",
                      isUp ? "text-chart-1" : "text-destructive",
                    )}
                  >
                    {isUp ? "+" : ""}
                    {formatPrice(pnlPerShare * 100)}
                  </span>
                </div>

                {/* Total P&L */}
                <PnlCell value={totalPnl} pct={pnlPct} />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
