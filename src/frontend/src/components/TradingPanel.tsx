import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AlertCircle, Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  formatINR,
  formatPaise,
  useBuy,
  useHoldings,
  usePortfolioSummary,
  useSell,
} from "../hooks/useBackend";
import { formatPrice, usePrices } from "../hooks/usePrices";
import { getSymbolShort } from "../types/trading";
import { OrderConfirmation } from "./OrderConfirmation";
import type { OrderOutcome } from "./OrderConfirmation";

interface TradingPanelProps {
  symbol: string;
}

function PriceHeader({ symbol }: { symbol: string }) {
  const { data: prices, isFetching } = usePrices([symbol]);
  const priceData = prices?.[symbol];
  const isUp = priceData ? priceData.change >= 0 : true;

  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {getSymbolShort(symbol)}
        </span>
        {priceData ? (
          <span
            className={cn(
              "font-mono text-base font-bold leading-none",
              isUp ? "text-chart-1" : "text-destructive",
            )}
          >
            {formatPrice(priceData.price, symbol)}
          </span>
        ) : (
          <Skeleton className="h-5 w-24" />
        )}
      </div>

      {priceData ? (
        <div
          className={cn(
            "flex items-center gap-1 rounded-sm px-2 py-1 text-[11px] font-semibold",
            isUp
              ? "bg-chart-1/10 text-chart-1"
              : "bg-destructive/10 text-destructive",
          )}
          data-ocid="trading.price_change"
        >
          {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          <span className="font-mono">
            {isUp ? "+" : ""}
            {priceData.change.toFixed(2)}
          </span>
          <span>
            ({isUp ? "+" : ""}
            {priceData.changePct.toFixed(2)}%)
          </span>
          {isFetching && (
            <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60" />
          )}
        </div>
      ) : (
        <Skeleton className="h-7 w-24" />
      )}
    </div>
  );
}

function BalanceInfo({ symbol }: { symbol: string }) {
  const { data: summary } = usePortfolioSummary();
  const { data: holdings = [] } = useHoldings();
  const heldQty = useMemo(
    () => holdings.find((h) => h.symbol === symbol)?.quantity ?? 0n,
    [holdings, symbol],
  );

  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-2">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Balance
        </span>
        {summary ? (
          <span
            className="font-mono text-[11px] font-semibold text-foreground"
            data-ocid="trading.available_balance"
          >
            {formatPaise(summary.balance)}
          </span>
        ) : (
          <Skeleton className="h-3.5 w-20" />
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Held
        </span>
        <span
          className="font-mono text-[11px] font-semibold text-foreground"
          data-ocid="trading.held_quantity"
        >
          {Number(heldQty)}{" "}
          <span className="text-muted-foreground">
            {getSymbolShort(symbol)}
          </span>
        </span>
      </div>
    </div>
  );
}

type OrderTabProps = {
  symbol: string;
  direction: "buy" | "sell";
  currentPricePaise: bigint | null;
  balancePaise: bigint;
  heldQty: bigint;
  onOrderComplete: (outcome: OrderOutcome) => void;
};

function OrderTab({
  symbol,
  direction,
  currentPricePaise,
  balancePaise,
  heldQty,
  onOrderComplete,
}: OrderTabProps) {
  const [quantity, setQuantity] = useState("1");
  const buyMutation = useBuy();
  const sellMutation = useSell();

  const isBuy = direction === "buy";
  const mutation = isBuy ? buyMutation : sellMutation;
  const isPending = mutation.isPending;

  const qty = Math.max(0, Math.floor(Number(quantity) || 0));
  const pricePaise = currentPricePaise ?? 0n;
  const totalPaise = pricePaise * BigInt(qty);

  // Validation
  const validationError = useMemo(() => {
    if (!qty || qty <= 0) return null; // silent, not yet typed
    if (isBuy) {
      if (currentPricePaise === null) return null; // price loading
      if (totalPaise > balancePaise) {
        const shortfall = totalPaise - balancePaise;
        return `Insufficient balance — short by ${formatINR(Number(shortfall) / 100)}`;
      }
    } else {
      if (BigInt(qty) > heldQty) {
        return `You only hold ${Number(heldQty)} share${Number(heldQty) !== 1 ? "s" : ""} of ${getSymbolShort(symbol)}`;
      }
    }
    return null;
  }, [
    qty,
    isBuy,
    currentPricePaise,
    totalPaise,
    balancePaise,
    heldQty,
    symbol,
  ]);

  const canSubmit =
    qty > 0 && !validationError && currentPricePaise !== null && !isPending;

  async function handlePlace() {
    if (!canSubmit || currentPricePaise === null) return;
    try {
      const result = await mutation.mutateAsync({
        symbol,
        quantity: BigInt(qty),
        pricePaise: currentPricePaise,
      });
      if (result.__kind__ === "ok") {
        onOrderComplete({ success: true, trade: result.ok, direction });
        setQuantity("1");
      } else {
        onOrderComplete({ success: false, error: result.err, direction });
      }
    } catch (e) {
      onOrderComplete({
        success: false,
        error: e instanceof Error ? e.message : "Unknown error",
        direction,
      });
    }
  }

  const symbolShort = getSymbolShort(symbol);
  const maxForBuy =
    currentPricePaise && currentPricePaise > 0n
      ? Number(balancePaise / currentPricePaise)
      : 0;

  return (
    <div className="flex flex-col gap-3 px-4 pb-4 pt-3">
      {/* Quantity input */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            className="text-[11px] text-muted-foreground"
            htmlFor={`${direction}-qty`}
          >
            Quantity (shares)
          </label>
          {isBuy ? (
            <span className="text-[10px] text-muted-foreground">
              Max ~{maxForBuy.toLocaleString("en-IN")}
            </span>
          ) : (
            <button
              type="button"
              className="text-[10px] text-primary transition-colors hover:text-primary/80"
              onClick={() => setQuantity(Number(heldQty).toString())}
              data-ocid="trading.sell_max_button"
            >
              Max ({Number(heldQty)})
            </button>
          )}
        </div>
        <Input
          id={`${direction}-qty`}
          data-ocid={`trading.${direction}_quantity_input`}
          type="number"
          min="1"
          max={!isBuy ? Number(heldQty) : undefined}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={cn(
            "h-9 border-input bg-background font-mono text-sm",
            validationError &&
              "border-destructive focus-visible:ring-destructive",
          )}
          placeholder="0"
        />
        {validationError && (
          <div
            className="flex items-center gap-1.5 text-[11px] text-destructive"
            data-ocid={`trading.${direction}_field_error`}
          >
            <AlertCircle size={11} />
            {validationError}
          </div>
        )}
      </div>

      {/* Order preview */}
      {qty > 0 && currentPricePaise !== null && (
        <div
          className={cn(
            "rounded-sm border px-3 py-2.5 space-y-1.5",
            isBuy
              ? "border-chart-1/20 bg-chart-1/5"
              : "border-destructive/20 bg-destructive/5",
          )}
          data-ocid={`trading.${direction}_order_preview`}
        >
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              {qty} × {symbolShort}
            </span>
            <span className="font-mono text-muted-foreground">
              @ {formatINR(Number(currentPricePaise) / 100)}
            </span>
          </div>
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground">
              {isBuy ? "Est. Cost" : "Est. Proceeds"}
            </span>
            <span
              className={cn(
                "font-mono",
                isBuy ? "text-chart-1" : "text-destructive",
              )}
              data-ocid={`trading.${direction}_total_display`}
            >
              {formatINR(Number(totalPaise) / 100)}
            </span>
          </div>
          {isBuy && totalPaise <= balancePaise && (
            <div className="flex justify-between text-[10px] text-muted-foreground/70">
              <span>After purchase</span>
              <span className="font-mono">
                {formatINR(Number(balancePaise - totalPaise) / 100)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Action button */}
      <Button
        type="button"
        data-ocid={`trading.place_${direction}_order_button`}
        className={cn(
          "h-11 w-full font-semibold",
          isBuy
            ? "bg-chart-1 text-card hover:bg-chart-1/90 glow-buy"
            : "bg-destructive text-destructive-foreground hover:bg-destructive/90 glow-sell",
        )}
        onClick={handlePlace}
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
      >
        {isPending ? (
          <span
            className="flex items-center gap-2"
            data-ocid={`trading.${direction}_loading_state`}
          >
            <Loader2 size={14} className="animate-spin" />
            Placing Order…
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            {isBuy ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            Place {isBuy ? "Buy" : "Sell"} Order
          </span>
        )}
      </Button>
    </div>
  );
}

/**
 * Full-featured trading panel with live price, balance info, validation,
 * order preview, loading states, and order confirmation overlay.
 */
export function TradingPanel({ symbol }: TradingPanelProps) {
  const [outcome, setOutcome] = useState<OrderOutcome | null>(null);
  const { data: prices } = usePrices([symbol]);
  const { data: summary } = usePortfolioSummary();
  const { data: holdings = [] } = useHoldings();

  const currentPricePaise = useMemo(() => {
    const price = prices?.[symbol]?.price;
    return price !== undefined ? BigInt(Math.round(price * 100)) : null;
  }, [prices, symbol]);

  const balancePaise = summary?.balance ?? 0n;
  const heldQty = useMemo(
    () => holdings.find((h) => h.symbol === symbol)?.quantity ?? 0n,
    [holdings, symbol],
  );

  const handleClose = useCallback(() => setOutcome(null), []);

  return (
    <>
      <div className="trading-panel flex flex-col" data-ocid="trading.panel">
        {/* Live price header */}
        <PriceHeader symbol={symbol} />

        {/* Balance + held quantity bar */}
        <BalanceInfo symbol={symbol} />

        {/* Buy / Sell tabs */}
        <Tabs defaultValue="buy" className="flex flex-1 flex-col">
          <TabsList
            className="mx-4 mt-3 h-9 rounded-sm bg-secondary/40 p-0.5"
            data-ocid="trading.direction_tabs"
          >
            <TabsTrigger
              value="buy"
              data-ocid="trading.buy_tab"
              className="flex-1 rounded-sm text-xs font-medium data-[state=active]:bg-chart-1 data-[state=active]:text-card"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              data-ocid="trading.sell_tab"
              className="flex-1 rounded-sm text-xs font-medium data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
            >
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="flex flex-1 flex-col">
            <OrderTab
              symbol={symbol}
              direction="buy"
              currentPricePaise={currentPricePaise}
              balancePaise={balancePaise}
              heldQty={heldQty}
              onOrderComplete={setOutcome}
            />
          </TabsContent>

          <TabsContent value="sell" className="flex flex-1 flex-col">
            <OrderTab
              symbol={symbol}
              direction="sell"
              currentPricePaise={currentPricePaise}
              balancePaise={balancePaise}
              heldQty={heldQty}
              onOrderComplete={setOutcome}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Order confirmation overlay — auto-closes in 3s */}
      <OrderConfirmation outcome={outcome} onClose={handleClose} />
    </>
  );
}
