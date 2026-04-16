import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import type { PriceData } from "../hooks/usePrices";
import { formatPrice } from "../hooks/usePrices";
import { getSymbolName, getSymbolShort } from "../types/trading";

interface WatchlistItemProps {
  symbol: string;
  priceData: PriceData | undefined;
  isLoading: boolean;
  isSelected: boolean;
  onSelect: (symbol: string) => void;
  onRemove: (symbol: string) => void;
  index: number;
}

export function WatchlistItem({
  symbol,
  priceData,
  isLoading,
  isSelected,
  onSelect,
  onRemove,
  index,
}: WatchlistItemProps) {
  const shortName = getSymbolShort(symbol);
  const fullName = getSymbolName(symbol);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(symbol);
  };

  return (
    <button
      type="button"
      className={[
        "watchlist-row group relative flex w-full items-center gap-2 text-left",
        isSelected
          ? "border-l-2 border-l-primary bg-secondary/50"
          : "border-l-2 border-l-transparent",
      ].join(" ")}
      onClick={() => onSelect(symbol)}
      data-ocid={`watchlist.item.${index}`}
      aria-pressed={isSelected}
    >
      {/* Symbol icon — colored first letter */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary"
        aria-hidden="true"
      >
        {shortName.charAt(0)}
      </div>

      {/* Symbol info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-sm font-semibold leading-tight text-foreground">
            {shortName}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">{fullName}</p>
      </div>

      {/* Price + Change */}
      <div className="shrink-0 text-right">
        {isLoading ? (
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-14" />
          </div>
        ) : priceData ? (
          <>
            <p className="font-mono text-sm font-medium tabular-nums text-foreground">
              {formatPrice(priceData.price, symbol)}
            </p>
            <p
              className={`font-mono text-xs tabular-nums ${
                priceData.changePct >= 0 ? "price-up" : "price-down"
              }`}
              data-ocid={`watchlist.change.${index}`}
            >
              {priceData.changePct >= 0 ? "+" : ""}
              {priceData.changePct.toFixed(2)}%{" "}
              <span className="opacity-70">
                {priceData.change >= 0 ? "+" : ""}
                {priceData.change.toFixed(2)}
              </span>
            </p>
          </>
        ) : (
          <p className="font-mono text-xs text-muted-foreground">—</p>
        )}
      </div>

      {/* Remove button — visible on hover */}
      <button
        type="button"
        className="ml-1 shrink-0 rounded p-0.5 opacity-0 transition-smooth hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100"
        onClick={handleRemove}
        aria-label={`Remove ${shortName} from watchlist`}
        data-ocid={`watchlist.delete_button.${index}`}
      >
        <X size={13} />
      </button>
    </button>
  );
}
