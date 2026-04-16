import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { BarChart2, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { useEffect } from "react";
import { useRegister } from "../hooks/useBackend";

export function LoginPage() {
  const { login, loginStatus, isAuthenticated } = useInternetIdentity();
  const registerMutation = useRegister();

  const { mutate: register } = registerMutation;

  // Auto-register on first login
  useEffect(() => {
    if (isAuthenticated) {
      register();
    }
  }, [isAuthenticated, register]);

  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";

  const features = [
    { icon: BarChart2, text: "Real-time TradingView charts" },
    { icon: Zap, text: "Instant buy & sell execution" },
    { icon: ShieldCheck, text: "₹1,00,00,00,000 virtual balance" },
  ];

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center bg-background px-4"
      data-ocid="login.page"
    >
      {/* Glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo + Title */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/15 ring-2 ring-primary/30">
            <TrendingUp size={32} className="text-primary" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              ANSOO
            </h1>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Trading Practice
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="trading-panel p-6">
          <div className="mb-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Start Paper Trading
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Practice trading the Indian & global markets with virtual money —
              no risk, real experience.
            </p>
          </div>

          {/* Feature list */}
          <ul className="mb-6 space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-primary/10">
                  <Icon size={13} className="text-primary" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <Button
            data-ocid="login.signin_button"
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
            size="lg"
            onClick={() => login()}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Connecting…
              </span>
            ) : (
              <>
                <ShieldCheck size={16} />
                Sign in with Internet Identity
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-[11px] text-muted-foreground/60">
            Secure, decentralized authentication. No password required.
          </p>
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-[11px] text-muted-foreground/40">
          Paper trading only — no real money involved
        </p>
      </div>
    </div>
  );
}
