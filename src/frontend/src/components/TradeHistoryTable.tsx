import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Clock, TrendingDown, TrendingUp } from "lucide-react";
import { Direction } from "../backend.d";
import type { TradeView } from "../types/trading";
import { getSymbolShort } from "../types/trading";

interface Props {
  trades: TradeView[];
  isLoading: boolean;
}

function formatTradePrice(paise: bigint): string {
  const amount = Number(paise) / 100;
  const [intPart, decPart] = amount.toFixed(2).split(".");
  const last3 = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const formatted = rest
    ? [...(rest.match(/.{1,2}/g) ?? []), last3].join(",")
    : last3;
  return `₹${formatted}.${decPart}`;
}

function formatTotalValue(quantity: bigint, pricePaise: bigint): string {
  const total = (Number(quantity) * Number(pricePaise)) / 100;
  if (total >= 1_00_00_000) return `₹${(total / 1_00_00_000).toFixed(2)}Cr`;
  if (total >= 1_00_000) return `₹${(total / 1_00_000).toFixed(2)}L`;
  return `₹${total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function formatTradeTime(ns: bigint): { date: string; time: string } {
  const ms = Number(ns) / 1_000_000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return { date: "—", time: "—" };
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
}

export function TradeHistoryTable({ trades, isLoading }: Props) {
  const sorted = [...trades].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );

  if (isLoading) {
    return (
      <div
        className="space-y-2 p-4"
        data-ocid="portfolio.history_loading_state"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
        data-ocid="portfolio.history_empty_state"
      >
        <Clock size={40} className="text-muted-foreground/25" />
        <div>
          <p className="text-sm font-medium text-foreground">
            No trade history yet
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your completed trades will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="portfolio.history_list" className="overflow-x-auto">
      {/* Header */}
      <div className="min-w-[580px] grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 border-b border-border px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Asset / Time</span>
        <span>Direction</span>
        <span className="text-right">Quantity</span>
        <span className="text-right">Price</span>
        <span className="text-right">Total Value</span>
      </div>

      <ScrollArea className="max-h-[calc(100vh-26rem)]">
        <div className="min-w-[580px]">
          {sorted.map((trade, i) => {
            const short = getSymbolShort(trade.symbol);
            const isBuy = trade.direction === Direction.buy;
            const { date, time } = formatTradeTime(trade.timestamp);

            return (
              <div
                key={Number(trade.id)}
                data-ocid={`portfolio.trade_item.${i + 1}`}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-2 border-b border-border/40 px-4 py-3 last:border-0 hover:bg-secondary/20 transition-smooth"
              >
                {/* Asset + time */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={cn(
                      "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm font-mono text-[10px] font-bold",
                      isBuy
                        ? "bg-chart-1/10 text-chart-1"
                        : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {short.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-mono text-xs font-semibold text-foreground">
                      {short}
                    </div>
                    <div className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {date} {time}
                    </div>
                  </div>
                </div>

                {/* Direction badge */}
                <div>
                  <Badge
                    data-ocid={`portfolio.trade_direction_badge.${i + 1}`}
                    className={cn(
                      "px-1.5 py-0.5 text-[10px] font-semibold uppercase gap-0.5",
                      isBuy
                        ? "bg-chart-1/15 text-chart-1 hover:bg-chart-1/20"
                        : "bg-destructive/15 text-destructive hover:bg-destructive/20",
                    )}
                  >
                    {isBuy ? (
                      <TrendingUp size={9} />
                    ) : (
                      <TrendingDown size={9} />
                    )}
                    {isBuy ? "Buy" : "Sell"}
                  </Badge>
                </div>

                {/* Quantity */}
                <div className="text-right font-mono text-xs text-foreground">
                  {Number(trade.quantity).toLocaleString("en-IN")}
                </div>

                {/* Price */}
                <div className="text-right font-mono text-xs text-muted-foreground">
                  {formatTradePrice(trade.price)}
                </div>

                {/* Total value */}
                <div className="text-right font-mono text-xs text-foreground font-medium">
                  {formatTotalValue(trade.quantity, trade.price)}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
