import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { formatPaise } from "../hooks/useBackend";
import type { TradeView } from "../types/trading";

export interface OrderResult {
  success: true;
  trade: TradeView;
  direction: "buy" | "sell";
}

export interface OrderError {
  success: false;
  error: string;
  direction: "buy" | "sell";
}

export type OrderOutcome = OrderResult | OrderError;

interface OrderConfirmationProps {
  outcome: OrderOutcome | null;
  onClose: () => void;
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const d = new Date(ms);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Floating order confirmation overlay — shown bottom-center.
 * Auto-closes after 3 seconds. Can be dismissed manually.
 * Not a modal — doesn't block interaction with the page.
 */
export function OrderConfirmation({
  outcome,
  onClose,
}: OrderConfirmationProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!outcome) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onClose, 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [outcome, onClose]);

  if (!outcome) return null;

  const isBuy = outcome.direction === "buy";
  const isSuccess = outcome.success;

  return (
    <div
      data-ocid="order_confirmation.dialog"
      className="pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={cn(
          "pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-sm border shadow-2xl",
          isSuccess && isBuy && "border-chart-1/40 bg-card",
          isSuccess && !isBuy && "border-destructive/40 bg-card",
          !isSuccess && "border-destructive/40 bg-card",
        )}
      >
        {/* 3-second progress bar */}
        <div className="h-0.5 bg-border overflow-hidden">
          <div
            className={cn(
              "h-full w-full origin-left",
              "animate-[progress-shrink_3s_linear_forwards]",
              isSuccess && isBuy && "bg-chart-1",
              isSuccess && !isBuy && "bg-destructive",
              !isSuccess && "bg-destructive",
            )}
          />
        </div>

        <div className="p-4">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-2">
              {isSuccess ? (
                <CheckCircle2
                  size={16}
                  className={cn(
                    isBuy ? "text-chart-1" : "text-destructive",
                    "flex-shrink-0",
                  )}
                />
              ) : (
                <XCircle size={16} className="flex-shrink-0 text-destructive" />
              )}
              <span className="text-sm font-semibold text-foreground">
                {isSuccess ? "Order Filled" : "Order Failed"}
              </span>
            </div>

            <button
              type="button"
              data-ocid="order_confirmation.close_button"
              onClick={onClose}
              aria-label="Dismiss"
              className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <X size={14} />
            </button>
          </div>

          {isSuccess && outcome.success ? (
            <SuccessDetails
              trade={outcome.trade}
              direction={outcome.direction}
            />
          ) : (
            !outcome.success && <ErrorDetails message={outcome.error} />
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessDetails({
  trade,
  direction,
}: {
  trade: TradeView;
  direction: "buy" | "sell";
}) {
  const isBuy = direction === "buy";
  const filledPrice = formatPaise(trade.price);
  const quantity = Number(trade.quantity);
  const total = formatPaise(trade.price * trade.quantity);
  const time = formatTimestamp(trade.timestamp);
  const symbolShort = trade.symbol.includes(":")
    ? trade.symbol.split(":")[1]
    : trade.symbol;

  return (
    <div className="space-y-2.5">
      {/* Direction badge + symbol */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider",
            isBuy
              ? "bg-chart-1/15 text-chart-1"
              : "bg-destructive/15 text-destructive",
          )}
        >
          {isBuy ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isBuy ? "BUY" : "SELL"}
        </span>
        <span className="font-mono text-xs font-semibold text-foreground">
          {symbolShort}
        </span>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <DetailRow label="Quantity" value={`${quantity} shares`} />
        <DetailRow label="Filled At" value={filledPrice} mono />
        <DetailRow
          label={isBuy ? "Total Cost" : "Proceeds"}
          value={total}
          mono
          highlight={isBuy ? "buy" : "sell"}
        />
        <DetailRow label="Time" value={time} mono />
      </div>

      <p className="text-[10px] text-muted-foreground">
        Order ID #{Number(trade.id).toString().padStart(6, "0")} ·{" "}
        {isBuy ? "BOUGHT" : "SOLD"} at market
      </p>
    </div>
  );
}

function ErrorDetails({ message }: { message: string }) {
  return (
    <div className="rounded-sm border border-destructive/20 bg-destructive/5 px-3 py-2">
      <p className="text-xs text-destructive">{message}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: "buy" | "sell";
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span
        className={cn(
          "text-xs font-semibold",
          mono && "font-mono",
          highlight === "buy" && "text-chart-1",
          highlight === "sell" && "text-destructive",
          !highlight && "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}
