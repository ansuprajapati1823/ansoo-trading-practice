import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoldingsTable } from "../components/HoldingsTable";
import { PortfolioSummaryCard } from "../components/PortfolioSummaryCard";
import { TradeHistoryTable } from "../components/TradeHistoryTable";
import {
  useHoldings,
  usePortfolioSummary,
  useTradeHistory,
} from "../hooks/useBackend";

export function PortfolioPage() {
  const { data: summary, isLoading: summaryLoading } = usePortfolioSummary();
  const { data: holdings = [], isLoading: holdingsLoading } = useHoldings();
  const { data: trades = [], isLoading: tradesLoading } = useTradeHistory();

  return (
    <div
      className="flex flex-1 flex-col overflow-hidden"
      data-ocid="portfolio.page"
    >
      {/* Page header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <h1 className="font-display text-xl font-bold text-foreground">
          Portfolio
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Your open positions, P&amp;L and trade history
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 space-y-5">
          {/* Summary cards */}
          <PortfolioSummaryCard
            summary={summary}
            isLoading={summaryLoading}
            openPositions={holdings.length}
          />

          {/* Holdings + History tabs */}
          <div
            className="trading-panel overflow-hidden"
            data-ocid="portfolio.tabs_panel"
          >
            <Tabs defaultValue="holdings">
              <div className="border-b border-border px-4 pt-3">
                <TabsList
                  className="h-8 bg-transparent p-0 gap-5"
                  data-ocid="portfolio.view_tabs"
                >
                  <TabsTrigger
                    value="holdings"
                    data-ocid="portfolio.holdings_tab"
                    className="h-8 rounded-none border-b-2 border-transparent px-0 text-xs font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent"
                  >
                    Holdings{holdings.length > 0 ? ` (${holdings.length})` : ""}
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    data-ocid="portfolio.history_tab"
                    className="h-8 rounded-none border-b-2 border-transparent px-0 text-xs font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent"
                  >
                    Trade History
                    {trades.length > 0 ? ` (${trades.length})` : ""}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="holdings" className="mt-0">
                <HoldingsTable
                  holdings={holdings}
                  isLoading={holdingsLoading}
                />
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <TradeHistoryTable trades={trades} isLoading={tradesLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
