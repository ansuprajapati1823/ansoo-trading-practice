import { c as createLucideIcon, p as usePrices, j as jsxRuntimeExports, S as Skeleton, q as ChartNoAxesColumn, n as ScrollArea, g as getSymbolShort, m as getSymbolName, a as cn, f as formatPaise, T as TrendingUp, o as formatPnl, s as Badge, b as usePortfolioSummary, d as useHoldings, t as useTradeHistory } from "./index-DRD9eRQ7.js";
import { T as TrendingDown, a as Tabs, b as TabsList, c as TabsTrigger, d as TabsContent } from "./tabs-DXBKl5t9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
function formatPrice(paise) {
  const amount = paise / 100;
  const [intPart, decPart] = amount.toFixed(2).split(".");
  const last3 = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const formatted = rest ? [...rest.match(/.{1,2}/g) ?? [], last3].join(",") : last3;
  return `₹${formatted}.${decPart}`;
}
function PnlCell({ value, pct }) {
  const isUp = value >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "font-mono text-xs font-semibold",
          isUp ? "text-chart-1" : "text-destructive"
        ),
        children: [
          isUp ? "+" : "",
          pct.toFixed(2),
          "%"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "font-mono text-[10px]",
          isUp ? "text-chart-1/70" : "text-destructive/70"
        ),
        children: [
          isUp ? "+" : "",
          Math.abs(value) >= 1e7 ? `₹${(value / 1e7).toFixed(2)}Cr` : Math.abs(value) >= 1e5 ? `₹${(value / 1e5).toFixed(2)}L` : `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
        ]
      }
    )
  ] });
}
function HoldingsTable({ holdings, isLoading }) {
  const symbols = holdings.map((h) => h.symbol);
  const { data: prices = {} } = usePrices(symbols);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-2 p-4",
        "data-ocid": "portfolio.holdings_loading_state",
        children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, i))
      }
    );
  }
  if (holdings.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center gap-3 py-16 text-center",
        "data-ocid": "portfolio.holdings_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 40, className: "text-muted-foreground/25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No open positions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Place a buy order from the Trading page to get started" })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "portfolio.holdings_list", className: "overflow-x-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[640px] grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 border-b border-border px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Symbol" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Qty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Avg Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Curr. Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "P&L/Share" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Total P&L" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[calc(100vh-26rem)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[640px]", children: holdings.map((h, i) => {
      const short = getSymbolShort(h.symbol);
      const name = getSymbolName(h.symbol);
      const avgPaise = Number(h.avgPrice);
      const avgRupees = avgPaise / 100;
      const currentPaise = prices[h.symbol] ?? avgPaise;
      const currentRupees = currentPaise / 100;
      const qty = Number(h.quantity);
      const pnlPerShare = currentRupees - avgRupees;
      const totalPnl = pnlPerShare * qty;
      const pnlPct = avgRupees > 0 ? pnlPerShare / avgRupees * 100 : 0;
      const isUp = pnlPerShare >= 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `portfolio.holding_item.${i + 1}`,
          className: "grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 border-b border-border/40 px-4 py-3 last:border-0 hover:bg-secondary/20 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-[11px] font-bold text-foreground", children: short.slice(0, 2) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-mono text-sm font-semibold text-foreground", children: short }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] text-muted-foreground", children: name })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right font-mono text-sm text-foreground", children: qty.toLocaleString("en-IN") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right font-mono text-sm text-muted-foreground", children: formatPrice(avgPaise) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "text-right font-mono text-sm font-medium",
                  isUp ? "text-chart-1" : "text-destructive"
                ),
                children: formatPrice(currentPaise)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "font-mono text-xs font-semibold",
                  isUp ? "text-chart-1" : "text-destructive"
                ),
                children: [
                  isUp ? "+" : "",
                  formatPrice(pnlPerShare * 100)
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PnlCell, { value: totalPnl, pct: pnlPct })
          ]
        },
        h.symbol
      );
    }) }) })
  ] });
}
function StatCard({
  label,
  value,
  subValue,
  icon: Icon,
  positive,
  colored
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "portfolio-card flex flex-col gap-2",
      "data-ocid": `portfolio.stat_${label.toLowerCase().replace(/[\s&/]+/g, "_")}_card`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-medium", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "flex h-6 w-6 items-center justify-center rounded-sm",
                colored ? positive === true ? "bg-chart-1/15" : positive === false ? "bg-destructive/15" : "bg-primary/10" : "bg-primary/10"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  size: 12,
                  className: cn(
                    colored ? positive === true ? "text-chart-1" : positive === false ? "text-destructive" : "text-primary" : "text-primary"
                  )
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "font-mono text-base font-bold leading-tight",
              colored ? positive === true ? "text-chart-1" : positive === false ? "text-destructive" : "text-foreground" : "text-foreground"
            ),
            children: value
          }
        ),
        subValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "font-mono text-[10px]",
              colored ? positive === true ? "text-chart-1/60" : positive === false ? "text-destructive/60" : "text-muted-foreground" : "text-muted-foreground"
            ),
            children: subValue
          }
        )
      ]
    }
  );
}
function PortfolioSummaryCard({
  summary,
  isLoading,
  openPositions
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 gap-3 md:grid-cols-4",
        "data-ocid": "portfolio.summary_loading_state",
        children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-sm" }, i))
      }
    );
  }
  const totalPnl = (summary == null ? void 0 : summary.totalPnl) ?? BigInt(0);
  const totalInvested = (summary == null ? void 0 : summary.totalInvested) ?? BigInt(0);
  const balance = (summary == null ? void 0 : summary.balance) ?? BigInt(0);
  const returnPct = summary ? Number(summary.returnPct) / 100 : 0;
  const isPnlPositive = Number(totalPnl) >= 0;
  const returnStr = `${returnPct >= 0 ? "+" : ""}${returnPct.toFixed(2)}%`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid grid-cols-2 gap-3 md:grid-cols-4",
      "data-ocid": "portfolio.summary_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Balance",
            value: formatPaise(balance),
            subValue: "Available cash",
            icon: Wallet
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Invested",
            value: formatPaise(totalInvested),
            subValue: `${openPositions} position${openPositions !== 1 ? "s" : ""}`,
            icon: ChartNoAxesColumn
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total P&L",
            value: formatPnl(totalPnl),
            subValue: returnStr,
            icon: isPnlPositive ? TrendingUp : TrendingDown,
            colored: true,
            positive: isPnlPositive
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Return %",
            value: returnStr,
            subValue: isPnlPositive ? "Profitable" : "Loss",
            icon: Activity,
            colored: true,
            positive: isPnlPositive
          }
        )
      ]
    }
  );
}
var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2["buy"] = "buy";
  Direction2["sell"] = "sell";
  return Direction2;
})(Direction || {});
function formatTradePrice(paise) {
  const amount = Number(paise) / 100;
  const [intPart, decPart] = amount.toFixed(2).split(".");
  const last3 = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const formatted = rest ? [...rest.match(/.{1,2}/g) ?? [], last3].join(",") : last3;
  return `₹${formatted}.${decPart}`;
}
function formatTotalValue(quantity, pricePaise) {
  const total = Number(quantity) * Number(pricePaise) / 100;
  if (total >= 1e7) return `₹${(total / 1e7).toFixed(2)}Cr`;
  if (total >= 1e5) return `₹${(total / 1e5).toFixed(2)}L`;
  return `₹${total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
function formatTradeTime(ns) {
  const ms = Number(ns) / 1e6;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return { date: "—", time: "—" };
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit"
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })
  };
}
function TradeHistoryTable({ trades, isLoading }) {
  const sorted = [...trades].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-2 p-4",
        "data-ocid": "portfolio.history_loading_state",
        children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i))
      }
    );
  }
  if (sorted.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center gap-3 py-16 text-center",
        "data-ocid": "portfolio.history_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 40, className: "text-muted-foreground/25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No trade history yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Your completed trades will appear here" })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "portfolio.history_list", className: "overflow-x-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[580px] grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 border-b border-border px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Asset / Time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Direction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Quantity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Total Value" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[calc(100vh-26rem)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[580px]", children: sorted.map((trade, i) => {
      const short = getSymbolShort(trade.symbol);
      const isBuy = trade.direction === Direction.buy;
      const { date, time } = formatTradeTime(trade.timestamp);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `portfolio.trade_item.${i + 1}`,
          className: "grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-2 border-b border-border/40 px-4 py-3 last:border-0 hover:bg-secondary/20 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm font-mono text-[10px] font-bold",
                    isBuy ? "bg-chart-1/10 text-chart-1" : "bg-destructive/10 text-destructive"
                  ),
                  children: short.slice(0, 2)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-mono text-xs font-semibold text-foreground", children: short }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground whitespace-nowrap", children: [
                  date,
                  " ",
                  time
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                "data-ocid": `portfolio.trade_direction_badge.${i + 1}`,
                className: cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold uppercase gap-0.5",
                  isBuy ? "bg-chart-1/15 text-chart-1 hover:bg-chart-1/20" : "bg-destructive/15 text-destructive hover:bg-destructive/20"
                ),
                children: [
                  isBuy ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 9 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 9 }),
                  isBuy ? "Buy" : "Sell"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right font-mono text-xs text-foreground", children: Number(trade.quantity).toLocaleString("en-IN") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right font-mono text-xs text-muted-foreground", children: formatTradePrice(trade.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right font-mono text-xs text-foreground font-medium", children: formatTotalValue(trade.quantity, trade.price) })
          ]
        },
        Number(trade.id)
      );
    }) }) })
  ] });
}
function PortfolioPage() {
  const { data: summary, isLoading: summaryLoading } = usePortfolioSummary();
  const { data: holdings = [], isLoading: holdingsLoading } = useHoldings();
  const { data: trades = [], isLoading: tradesLoading } = useTradeHistory();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-1 flex-col overflow-hidden",
      "data-ocid": "portfolio.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Portfolio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your open positions, P&L and trade history" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PortfolioSummaryCard,
            {
              summary,
              isLoading: summaryLoading,
              openPositions: holdings.length
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "trading-panel overflow-hidden",
              "data-ocid": "portfolio.tabs_panel",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "holdings", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-4 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsList,
                  {
                    className: "h-8 bg-transparent p-0 gap-5",
                    "data-ocid": "portfolio.view_tabs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        TabsTrigger,
                        {
                          value: "holdings",
                          "data-ocid": "portfolio.holdings_tab",
                          className: "h-8 rounded-none border-b-2 border-transparent px-0 text-xs font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent",
                          children: [
                            "Holdings",
                            holdings.length > 0 ? ` (${holdings.length})` : ""
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        TabsTrigger,
                        {
                          value: "history",
                          "data-ocid": "portfolio.history_tab",
                          className: "h-8 rounded-none border-b-2 border-transparent px-0 text-xs font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent",
                          children: [
                            "Trade History",
                            trades.length > 0 ? ` (${trades.length})` : ""
                          ]
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "holdings", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  HoldingsTable,
                  {
                    holdings,
                    isLoading: holdingsLoading
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TradeHistoryTable, { trades, isLoading: tradesLoading }) })
              ] })
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  PortfolioPage
};
