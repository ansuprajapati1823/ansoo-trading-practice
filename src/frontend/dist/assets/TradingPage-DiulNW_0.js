import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, X, f as formatPaise, T as TrendingUp, u as usePrices, b as usePortfolioSummary, d as useHoldings, g as getSymbolShort, e as formatPrice, S as Skeleton, h as useBuy, i as useSell, k as formatINR, I as Input, B as Button, l as useSelectedSymbol, M as MARKET_SYMBOLS, m as getSymbolName, C as ChevronDown, n as ScrollArea, o as formatPnl } from "./index-DRD9eRQ7.js";
import { T as TrendingDown, a as Tabs, b as TabsList, c as TabsTrigger, d as TabsContent } from "./tabs-DXBKl5t9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function formatTimestamp(ts) {
  const ms = Number(ts / 1000000n);
  const d = new Date(ms);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function OrderConfirmation({
  outcome,
  onClose
}) {
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!outcome) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onClose, 3e3);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [outcome, onClose]);
  if (!outcome) return null;
  const isBuy = outcome.direction === "buy";
  const isSuccess = outcome.success;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "order_confirmation.dialog",
      className: "pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-sm border shadow-2xl",
            isSuccess && isBuy && "border-chart-1/40 bg-card",
            isSuccess && !isBuy && "border-destructive/40 bg-card",
            !isSuccess && "border-destructive/40 bg-card"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 bg-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "h-full w-full origin-left",
                  "animate-[progress-shrink_3s_linear_forwards]",
                  isSuccess && isBuy && "bg-chart-1",
                  isSuccess && !isBuy && "bg-destructive",
                  !isSuccess && "bg-destructive"
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      size: 16,
                      className: cn(
                        isBuy ? "text-chart-1" : "text-destructive",
                        "flex-shrink-0"
                      )
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 16, className: "flex-shrink-0 text-destructive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: isSuccess ? "Order Filled" : "Order Failed" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "order_confirmation.close_button",
                    onClick: onClose,
                    "aria-label": "Dismiss",
                    className: "rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                  }
                )
              ] }),
              isSuccess && outcome.success ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                SuccessDetails,
                {
                  trade: outcome.trade,
                  direction: outcome.direction
                }
              ) : !outcome.success && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorDetails, { message: outcome.error })
            ] })
          ]
        }
      )
    }
  );
}
function SuccessDetails({
  trade,
  direction
}) {
  const isBuy = direction === "buy";
  const filledPrice = formatPaise(trade.price);
  const quantity = Number(trade.quantity);
  const total = formatPaise(trade.price * trade.quantity);
  const time = formatTimestamp(trade.timestamp);
  const symbolShort = trade.symbol.includes(":") ? trade.symbol.split(":")[1] : trade.symbol;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: cn(
            "flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider",
            isBuy ? "bg-chart-1/15 text-chart-1" : "bg-destructive/15 text-destructive"
          ),
          children: [
            isBuy ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 10 }),
            isBuy ? "BUY" : "SELL"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-foreground", children: symbolShort })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Quantity", value: `${quantity} shares` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Filled At", value: filledPrice, mono: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: isBuy ? "Total Cost" : "Proceeds",
          value: total,
          mono: true,
          highlight: isBuy ? "buy" : "sell"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Time", value: time, mono: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
      "Order ID #",
      Number(trade.id).toString().padStart(6, "0"),
      " ·",
      " ",
      isBuy ? "BOUGHT" : "SOLD",
      " at market"
    ] })
  ] });
}
function ErrorDetails({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-destructive/20 bg-destructive/5 px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: message }) });
}
function DetailRow({
  label,
  value,
  mono,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "text-xs font-semibold",
          mono && "font-mono",
          highlight === "buy" && "text-chart-1",
          highlight === "sell" && "text-destructive",
          !highlight && "text-foreground"
        ),
        children: value
      }
    )
  ] });
}
function PriceHeader({ symbol }) {
  const { data: prices, isFetching } = usePrices([symbol]);
  const priceData = prices == null ? void 0 : prices[symbol];
  const isUp = priceData ? priceData.change >= 0 : true;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: getSymbolShort(symbol) }),
      priceData ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "font-mono text-base font-bold leading-none",
            isUp ? "text-chart-1" : "text-destructive"
          ),
          children: formatPrice(priceData.price, symbol)
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" })
    ] }),
    priceData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex items-center gap-1 rounded-sm px-2 py-1 text-[11px] font-semibold",
          isUp ? "bg-chart-1/10 text-chart-1" : "bg-destructive/10 text-destructive"
        ),
        "data-ocid": "trading.price_change",
        children: [
          isUp ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 11 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            isUp ? "+" : "",
            priceData.change.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "(",
            isUp ? "+" : "",
            priceData.changePct.toFixed(2),
            "%)"
          ] }),
          isFetching && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24" })
  ] });
}
function BalanceInfo({ symbol }) {
  const { data: summary } = usePortfolioSummary();
  const { data: holdings = [] } = useHoldings();
  const heldQty = reactExports.useMemo(
    () => {
      var _a;
      return ((_a = holdings.find((h) => h.symbol === symbol)) == null ? void 0 : _a.quantity) ?? 0n;
    },
    [holdings, symbol]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Balance" }),
      summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-mono text-[11px] font-semibold text-foreground",
          "data-ocid": "trading.available_balance",
          children: formatPaise(summary.balance)
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-20" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Held" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "font-mono text-[11px] font-semibold text-foreground",
          "data-ocid": "trading.held_quantity",
          children: [
            Number(heldQty),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: getSymbolShort(symbol) })
          ]
        }
      )
    ] })
  ] });
}
function OrderTab({
  symbol,
  direction,
  currentPricePaise,
  balancePaise,
  heldQty,
  onOrderComplete
}) {
  const [quantity, setQuantity] = reactExports.useState("1");
  const buyMutation = useBuy();
  const sellMutation = useSell();
  const isBuy = direction === "buy";
  const mutation = isBuy ? buyMutation : sellMutation;
  const isPending = mutation.isPending;
  const qty = Math.max(0, Math.floor(Number(quantity) || 0));
  const pricePaise = currentPricePaise ?? 0n;
  const totalPaise = pricePaise * BigInt(qty);
  const validationError = reactExports.useMemo(() => {
    if (!qty || qty <= 0) return null;
    if (isBuy) {
      if (currentPricePaise === null) return null;
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
    symbol
  ]);
  const canSubmit = qty > 0 && !validationError && currentPricePaise !== null && !isPending;
  async function handlePlace() {
    if (!canSubmit || currentPricePaise === null) return;
    try {
      const result = await mutation.mutateAsync({
        symbol,
        quantity: BigInt(qty),
        pricePaise: currentPricePaise
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
        direction
      });
    }
  }
  const symbolShort = getSymbolShort(symbol);
  const maxForBuy = currentPricePaise && currentPricePaise > 0n ? Number(balancePaise / currentPricePaise) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 px-4 pb-4 pt-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "text-[11px] text-muted-foreground",
            htmlFor: `${direction}-qty`,
            children: "Quantity (shares)"
          }
        ),
        isBuy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
          "Max ~",
          maxForBuy.toLocaleString("en-IN")
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "text-[10px] text-primary transition-colors hover:text-primary/80",
            onClick: () => setQuantity(Number(heldQty).toString()),
            "data-ocid": "trading.sell_max_button",
            children: [
              "Max (",
              Number(heldQty),
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${direction}-qty`,
          "data-ocid": `trading.${direction}_quantity_input`,
          type: "number",
          min: "1",
          max: !isBuy ? Number(heldQty) : void 0,
          value: quantity,
          onChange: (e) => setQuantity(e.target.value),
          className: cn(
            "h-9 border-input bg-background font-mono text-sm",
            validationError && "border-destructive focus-visible:ring-destructive"
          ),
          placeholder: "0"
        }
      ),
      validationError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-1.5 text-[11px] text-destructive",
          "data-ocid": `trading.${direction}_field_error`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
            validationError
          ]
        }
      )
    ] }),
    qty > 0 && currentPricePaise !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "rounded-sm border px-3 py-2.5 space-y-1.5",
          isBuy ? "border-chart-1/20 bg-chart-1/5" : "border-destructive/20 bg-destructive/5"
        ),
        "data-ocid": `trading.${direction}_order_preview`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              qty,
              " × ",
              symbolShort
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
              "@ ",
              formatINR(Number(currentPricePaise) / 100)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: isBuy ? "Est. Cost" : "Est. Proceeds" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "font-mono",
                  isBuy ? "text-chart-1" : "text-destructive"
                ),
                "data-ocid": `trading.${direction}_total_display`,
                children: formatINR(Number(totalPaise) / 100)
              }
            )
          ] }),
          isBuy && totalPaise <= balancePaise && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "After purchase" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatINR(Number(balancePaise - totalPaise) / 100) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        "data-ocid": `trading.place_${direction}_order_button`,
        className: cn(
          "h-11 w-full font-semibold",
          isBuy ? "bg-chart-1 text-card hover:bg-chart-1/90 glow-buy" : "bg-destructive text-destructive-foreground hover:bg-destructive/90 glow-sell"
        ),
        onClick: handlePlace,
        disabled: !canSubmit,
        "aria-disabled": !canSubmit,
        children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-2",
            "data-ocid": `trading.${direction}_loading_state`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
              "Placing Order…"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          isBuy ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 14 }),
          "Place ",
          isBuy ? "Buy" : "Sell",
          " Order"
        ] })
      }
    )
  ] });
}
function TradingPanel({ symbol }) {
  const [outcome, setOutcome] = reactExports.useState(null);
  const { data: prices } = usePrices([symbol]);
  const { data: summary } = usePortfolioSummary();
  const { data: holdings = [] } = useHoldings();
  const currentPricePaise = reactExports.useMemo(() => {
    var _a;
    const price = (_a = prices == null ? void 0 : prices[symbol]) == null ? void 0 : _a.price;
    return price !== void 0 ? BigInt(Math.round(price * 100)) : null;
  }, [prices, symbol]);
  const balancePaise = (summary == null ? void 0 : summary.balance) ?? 0n;
  const heldQty = reactExports.useMemo(
    () => {
      var _a;
      return ((_a = holdings.find((h) => h.symbol === symbol)) == null ? void 0 : _a.quantity) ?? 0n;
    },
    [holdings, symbol]
  );
  const handleClose = reactExports.useCallback(() => setOutcome(null), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "trading-panel flex flex-col", "data-ocid": "trading.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PriceHeader, { symbol }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BalanceInfo, { symbol }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "buy", className: "flex flex-1 flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsList,
          {
            className: "mx-4 mt-3 h-9 rounded-sm bg-secondary/40 p-0.5",
            "data-ocid": "trading.direction_tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: "buy",
                  "data-ocid": "trading.buy_tab",
                  className: "flex-1 rounded-sm text-xs font-medium data-[state=active]:bg-chart-1 data-[state=active]:text-card",
                  children: "Buy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: "sell",
                  "data-ocid": "trading.sell_tab",
                  className: "flex-1 rounded-sm text-xs font-medium data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground",
                  children: "Sell"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "buy", className: "flex flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          OrderTab,
          {
            symbol,
            direction: "buy",
            currentPricePaise,
            balancePaise,
            heldQty,
            onOrderComplete: setOutcome
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sell", className: "flex flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          OrderTab,
          {
            symbol,
            direction: "sell",
            currentPricePaise,
            balancePaise,
            heldQty,
            onOrderComplete: setOutcome
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrderConfirmation, { outcome, onClose: handleClose })
  ] });
}
function TradingViewChart({ symbol }) {
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.cssText = "height:100%;width:100%;";
    container.appendChild(widgetDiv);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    const config = {
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      calendar: false,
      hide_top_toolbar: false,
      support_host: "https://www.tradingview.com",
      backgroundColor: "rgba(15, 17, 22, 1)",
      gridColor: "rgba(255, 255, 255, 0.04)",
      studies_overrides: {
        "volume.volume.color.0": "rgba(239,68,68,0.5)",
        "volume.volume.color.1": "rgba(34,197,94,0.5)",
        "volume.volume ma.color": "rgba(255,255,255,0.3)"
      }
    };
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);
    return () => {
      if (container) container.innerHTML = "";
    };
  }, [symbol]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: containerRef,
      className: "tradingview-widget-container h-full w-full",
      style: { height: "100%", width: "100%" }
    }
  );
}
function SymbolSwitcher({
  symbol,
  onSelect
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const dropdownRef = reactExports.useRef(null);
  const searchInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);
  const filtered = MARKET_SYMBOLS.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.symbol.toLowerCase().includes(search.toLowerCase())
  );
  const groups = filtered.reduce(
    (acc, s) => {
      acc[s.exchange] = [...acc[s.exchange] ?? [], s];
      return acc;
    },
    {}
  );
  reactExports.useEffect(() => {
    function handleOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);
  const short = getSymbolShort(symbol);
  const name = getSymbolName(symbol);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: dropdownRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "trading.symbol_switcher_button",
        onClick: () => setOpen((p) => !p),
        className: "flex items-center gap-2 rounded-sm border border-border bg-secondary/40 px-3 py-1.5 text-sm transition-colors hover:bg-secondary/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: short }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden max-w-[140px] truncate text-xs text-muted-foreground sm:block", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              size: 14,
              className: cn(
                "flex-shrink-0 text-muted-foreground transition-transform duration-200",
                open && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "trading.symbol_switcher_dropdown",
        className: "absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-md border border-border bg-card shadow-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: searchInputRef,
              type: "text",
              placeholder: "Search symbols…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              "data-ocid": "trading.symbol_search_input",
              className: "w-full rounded-sm bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollArea, { className: "max-h-64", children: [
            Object.entries(groups).map(([exchange, symbols]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 bg-card/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: exchange }),
              symbols.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `trading.symbol_option.${s.symbol.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`,
                  onClick: () => {
                    onSelect(s.symbol);
                    setOpen(false);
                    setSearch("");
                  },
                  className: "flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-secondary/40",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: getSymbolShort(s.symbol) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: s.name })
                    ] }),
                    s.symbol === symbol && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, className: "text-chart-1" })
                  ]
                },
                s.symbol
              ))
            ] }, exchange)),
            filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 text-center text-xs text-muted-foreground", children: "No symbols found" })
          ] })
        ]
      }
    )
  ] });
}
function HoldingsMiniPanel() {
  const { data: holdings = [], isLoading } = useHoldings();
  const { data: summary } = usePortfolioSummary();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "trading-panel flex flex-col", "data-ocid": "holdings.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-foreground", children: "Portfolio" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-4 pb-1 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 grid grid-cols-4 gap-1 text-[10px] uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Asset" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Avg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "P&L" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 py-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-full" }, i)) }) : holdings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "py-4 text-center text-xs text-muted-foreground",
          "data-ocid": "holdings.empty_state",
          children: "No open positions"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: holdings.map((h, i) => {
        const short = getSymbolShort(h.symbol);
        const avgPrice = Number(h.avgPrice) / 100;
        const mockCurrent = avgPrice * (1 + ((h.symbol.charCodeAt(5) ?? 3) % 20 - 10) * 0.02);
        const pnl = (mockCurrent - avgPrice) * Number(h.quantity);
        const isUp = pnl >= 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `holdings.item.${i + 1}`,
            className: "grid grid-cols-4 gap-1 border-b border-border/40 py-1.5 text-xs last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono font-semibold text-foreground", children: short }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-mono text-muted-foreground", children: Number(h.quantity) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-mono text-muted-foreground", children: avgPrice.toLocaleString("en-IN", {
                maximumFractionDigits: 0
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: cn(
                    "text-right font-mono font-semibold",
                    isUp ? "text-chart-1" : "text-destructive"
                  ),
                  children: [
                    isUp ? "+" : "",
                    (pnl / avgPrice / Number(h.quantity) * 100).toFixed(1),
                    "%"
                  ]
                }
              )
            ]
          },
          h.symbol
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Performance Summary" }),
      summary ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Portfolio P&L" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              "data-ocid": "holdings.portfolio_pnl",
              className: cn(
                "font-mono font-semibold",
                Number(summary.totalPnl) >= 0 ? "text-chart-1" : "text-destructive"
              ),
              children: formatPnl(summary.totalPnl)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Invested" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: formatPaise(summary.totalInvested) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Return %" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "font-mono font-semibold",
                Number(summary.returnPct) >= 0 ? "text-chart-1" : "text-destructive"
              ),
              children: [
                (Number(summary.returnPct) / 100).toFixed(2),
                "%"
              ]
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
      ] })
    ] })
  ] });
}
function TradingPage() {
  const [selectedSymbol, setSelectedSymbol] = useSelectedSymbol();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-full flex-col overflow-hidden md:flex-row",
      "data-ocid": "trading.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 border-b border-border bg-card px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SymbolSwitcher,
            {
              symbol: selectedSymbol,
              onSelect: setSelectedSymbol
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1", "data-ocid": "trading.chart_canvas_target", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TradingViewChart, { symbol: selectedSymbol }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TradingPanel, { symbol: selectedSymbol }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden w-72 flex-shrink-0 flex-col gap-0 overflow-y-auto border-l border-border md:flex xl:w-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TradingPanel, { symbol: selectedSymbol }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HoldingsMiniPanel, {})
        ] })
      ]
    }
  );
}
export {
  TradingPage
};
