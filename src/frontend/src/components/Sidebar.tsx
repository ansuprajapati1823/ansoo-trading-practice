import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { BarChart2, BookOpen, Plus, Star } from "lucide-react";
import { useRef, useState } from "react";
import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
  useWatchlist,
} from "../hooks/useBackend";
import { usePrices } from "../hooks/usePrices";
import { useSelectedSymbol } from "../hooks/useSelectedSymbol";
import { MARKET_SYMBOLS, getSymbolShort } from "../types/trading";
import { WatchlistItem } from "./WatchlistItem";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { data: watchlist = [], isLoading: wlLoading } = useWatchlist();
  const addMutation = useAddToWatchlist();
  const removeMutation = useRemoveFromWatchlist();
  const [selectedSymbol, setSelectedSymbol] = useSelectedSymbol();
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: pricesMap, isLoading: pricesLoading } = usePrices(watchlist);

  const filtered = MARKET_SYMBOLS.filter(
    (s) =>
      !watchlist.includes(s.symbol) &&
      (s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.exchange.toLowerCase().includes(search.toLowerCase())),
  );

  function handleAdd(sym: string) {
    addMutation.mutate(sym);
    setAddOpen(false);
    setSearch("");
  }

  function handleSelect(sym: string) {
    setSelectedSymbol(sym);
    onClose();
  }

  const navItems = [
    { to: "/", label: "Chart", icon: BarChart2 },
    { to: "/portfolio", label: "Portfolio", icon: BookOpen },
  ];

  // Group filtered by exchange
  const exchanges = Array.from(new Set(filtered.map((s) => s.exchange)));

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-10 bg-background/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-12 z-20 flex h-[calc(100vh-3rem)] w-64 flex-col border-r border-border bg-sidebar transition-transform duration-200 md:relative md:top-0 md:z-auto md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        data-ocid="watchlist.panel"
        aria-label="Watchlist sidebar"
      >
        {/* Nav links */}
        <nav className="flex items-center gap-1 border-b border-border px-2 py-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              data-ocid={`sidebar.nav_${label.toLowerCase()}_link`}
              onClick={onClose}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium transition-smooth",
                location.pathname === to
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon size={13} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Watchlist header */}
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-1.5">
            <Star size={12} className="text-primary" fill="currentColor" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Watchlist
            </span>
          </div>
          <Dialog
            open={addOpen}
            onOpenChange={(v) => {
              setAddOpen(v);
              if (v) setTimeout(() => inputRef.current?.focus(), 50);
            }}
          >
            <DialogTrigger asChild>
              <button
                type="button"
                data-ocid="watchlist.open_modal_button"
                className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
                aria-label="Add ticker to watchlist"
              >
                <Plus size={14} />
              </button>
            </DialogTrigger>
            <DialogContent
              className="border-border bg-popover sm:max-w-sm"
              data-ocid="watchlist.dialog"
            >
              <DialogHeader>
                <DialogTitle className="text-sm text-foreground">
                  Add to Watchlist
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2 rounded border border-input bg-background px-3 py-1.5">
                <Input
                  ref={inputRef}
                  data-ocid="watchlist.search_input"
                  placeholder="Search symbol or company…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-auto border-0 bg-transparent p-0 font-mono text-sm shadow-none focus-visible:ring-0"
                  aria-label="Search symbols"
                />
              </div>
              <ScrollArea className="h-64">
                <div className="pr-3">
                  {filtered.length === 0 ? (
                    <p className="py-4 text-center text-xs text-muted-foreground">
                      No symbols found
                    </p>
                  ) : (
                    exchanges.map((exchange) => {
                      const group = filtered.filter(
                        (s) => s.exchange === exchange,
                      );
                      return (
                        <div key={exchange}>
                          <div className="bg-muted/40 px-2 py-1">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                              {exchange}
                            </span>
                          </div>
                          {group.slice(0, 10).map((s, i) => (
                            <button
                              key={s.symbol}
                              type="button"
                              data-ocid={`watchlist.symbol_option.${i + 1}`}
                              onClick={() => handleAdd(s.symbol)}
                              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left transition-smooth hover:bg-secondary"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                                {getSymbolShort(s.symbol).charAt(0)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-mono text-xs font-semibold text-foreground">
                                  {getSymbolShort(s.symbol)}
                                </p>
                                <p className="truncate text-[10px] text-muted-foreground">
                                  {s.name}
                                </p>
                              </div>
                              <Badge
                                variant="secondary"
                                className="shrink-0 text-[10px]"
                              >
                                {exchange}
                              </Badge>
                            </button>
                          ))}
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* Column labels */}
        <div className="flex items-center justify-between border-b border-border px-3 py-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Asset
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            24h Change
          </span>
        </div>

        {/* Watchlist items */}
        <ScrollArea className="flex-1">
          {wlLoading ? (
            <div
              className="flex flex-col gap-0"
              data-ocid="watchlist.loading_state"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border-b border-border px-3 py-2"
                >
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-16" />
                    <Skeleton className="h-2.5 w-24" />
                  </div>
                  <div className="space-y-1.5 text-right">
                    <Skeleton className="ml-auto h-3.5 w-20" />
                    <Skeleton className="ml-auto h-2.5 w-14" />
                  </div>
                </div>
              ))}
            </div>
          ) : watchlist.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center"
              data-ocid="watchlist.empty_state"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                <Star size={22} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  No symbols yet
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Add symbols to track live prices
                </p>
              </div>
              <Button
                data-ocid="watchlist.add_ticker_button"
                size="sm"
                variant="outline"
                onClick={() => setAddOpen(true)}
                className="h-7 border-border text-xs"
              >
                <Plus size={12} className="mr-1" />
                Add Ticker
              </Button>
            </div>
          ) : (
            <div data-ocid="watchlist.list">
              {watchlist.map((sym, i) => (
                <WatchlistItem
                  key={sym}
                  symbol={sym}
                  priceData={pricesMap?.[sym]}
                  isLoading={pricesLoading}
                  isSelected={selectedSymbol === sym}
                  onSelect={handleSelect}
                  onRemove={(s) => removeMutation.mutate(s)}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer add ticker */}
        {!wlLoading && watchlist.length > 0 && (
          <div className="border-t border-border p-2">
            <Button
              data-ocid="watchlist.add_ticker_footer_button"
              variant="outline"
              size="sm"
              className="w-full border-border text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setAddOpen(true)}
            >
              <Plus size={12} className="mr-1" />
              Add Ticker
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
