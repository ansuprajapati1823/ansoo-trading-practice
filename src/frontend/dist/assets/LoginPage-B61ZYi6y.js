import { c as createLucideIcon, F as useInternetIdentity, G as useRegister, r as reactExports, j as jsxRuntimeExports, T as TrendingUp, q as ChartNoAxesColumn, B as Button } from "./index-DRD9eRQ7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function LoginPage() {
  const { login, loginStatus, isAuthenticated } = useInternetIdentity();
  const registerMutation = useRegister();
  const { mutate: register } = registerMutation;
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      register();
    }
  }, [isAuthenticated, register]);
  const isLoading = loginStatus === "logging-in" || loginStatus === "initializing";
  const features = [
    { icon: ChartNoAxesColumn, text: "Real-time TradingView charts" },
    { icon: Zap, text: "Instant buy & sell execution" },
    { icon: ShieldCheck, text: "₹1,00,00,00,000 virtual balance" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-1 flex-col items-center justify-center bg-background px-4",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 overflow-hidden",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-xl bg-primary/15 ring-2 ring-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 32, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight text-foreground", children: "ANSOO" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground", children: "Trading Practice" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "trading-panel p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Start Paper Trading" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Practice trading the Indian & global markets with virtual money — no risk, real experience." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mb-6 space-y-3", children: features.map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-3 text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, className: "text-primary" }) }),
                  text
                ]
              },
              text
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "login.signin_button",
                className: "w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary",
                size: "lg",
                onClick: () => login(),
                disabled: isLoading,
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" }),
                  "Connecting…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }),
                  "Sign in with Internet Identity"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-[11px] text-muted-foreground/60", children: "Secure, decentralized authentication. No password required." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-[11px] text-muted-foreground/40", children: "Paper trading only — no real money involved" })
        ] })
      ]
    }
  );
}
export {
  LoginPage
};
