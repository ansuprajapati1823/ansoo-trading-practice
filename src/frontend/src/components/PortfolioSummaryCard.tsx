import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Activity,
  BarChart2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { formatPaise, formatPnl } from "../hooks/useBackend";
import type { PortfolioSummary } from "../types/trading";

interface Props {
  summary: PortfolioSummary | null | undefined;
  isLoading: boolean;
  openPositions: number;
}

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  positive?: boolean;
  colored?: boolean;
}

function StatCard({
  label,
  value,
  subValue,
  icon: Icon,
  positive,
  colored,
}: StatCardProps) {
  return (
    <div
      className="portfolio-card flex flex-col gap-2"
      data-ocid={`portfolio.stat_${label.toLowerCase().replace(/[\s&/]+/g, "_")}_card`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
          {label}
        </span>
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-sm",
            colored
              ? positive === true
                ? "bg-chart-1/15"
                : positive === false
                  ? "bg-destructive/15"
                  : "bg-primary/10"
              : "bg-primary/10",
          )}
        >
          <Icon
            size={12}
            className={cn(
              colored
                ? positive === true
                  ? "text-chart-1"
                  : positive === false
                    ? "text-destructive"
                    : "text-primary"
                : "text-primary",
            )}
          />
        </span>
      </div>
      <div
        className={cn(
          "font-mono text-base font-bold leading-tight",
          colored
            ? positive === true
              ? "text-chart-1"
              : positive === false
                ? "text-destructive"
                : "text-foreground"
            : "text-foreground",
        )}
      >
        {value}
      </div>
      {subValue && (
        <div
          className={cn(
            "font-mono text-[10px]",
            colored
              ? positive === true
                ? "text-chart-1/60"
                : positive === false
                  ? "text-destructive/60"
                  : "text-muted-foreground"
              : "text-muted-foreground",
          )}
        >
          {subValue}
        </div>
      )}
    </div>
  );
}

export function PortfolioSummaryCard({
  summary,
  isLoading,
  openPositions,
}: Props) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
        data-ocid="portfolio.summary_loading_state"
      >
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-sm" />
        ))}
      </div>
    );
  }

  const totalPnl = summary?.totalPnl ?? BigInt(0);
  const totalInvested = summary?.totalInvested ?? BigInt(0);
  const balance = summary?.balance ?? BigInt(0);
  const returnPct = summary ? Number(summary.returnPct) / 100 : 0;
  const isPnlPositive = Number(totalPnl) >= 0;
  const returnStr = `${returnPct >= 0 ? "+" : ""}${returnPct.toFixed(2)}%`;

  return (
    <div
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
      data-ocid="portfolio.summary_section"
    >
      <StatCard
        label="Balance"
        value={formatPaise(balance)}
        subValue="Available cash"
        icon={Wallet}
      />
      <StatCard
        label="Invested"
        value={formatPaise(totalInvested)}
        subValue={`${openPositions} position${openPositions !== 1 ? "s" : ""}`}
        icon={BarChart2}
      />
      <StatCard
        label="Total P&L"
        value={formatPnl(totalPnl)}
        subValue={returnStr}
        icon={isPnlPositive ? TrendingUp : TrendingDown}
        colored
        positive={isPnlPositive}
      />
      <StatCard
        label="Return %"
        value={returnStr}
        subValue={isPnlPositive ? "Profitable" : "Loss"}
        icon={Activity}
        colored
        positive={isPnlPositive}
      />
    </div>
  );
}
