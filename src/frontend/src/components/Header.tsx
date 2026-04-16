import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { ChevronDown, LogOut, Menu, TrendingUp, User, X } from "lucide-react";
import { useState } from "react";
import { formatPaise, usePortfolioSummary } from "../hooks/useBackend";

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const { identity, isAuthenticated, login, clear } = useInternetIdentity();
  const { data: summary } = usePortfolioSummary();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const balance =
    summary?.balance != null ? formatPaise(summary.balance) : "₹1,00,00,00,000";
  const principalShort = identity
    ? `${identity.getPrincipal().toText().slice(0, 8)}...`
    : "";

  return (
    <header className="flex h-12 items-center gap-3 border-b border-border bg-card px-3 shadow-elevated">
      {/* Hamburger for mobile */}
      <button
        type="button"
        data-ocid="header.sidebar_toggle"
        onClick={onToggleSidebar}
        className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground md:hidden"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
          <TrendingUp size={16} className="text-primary-foreground" />
        </div>
        <div className="hidden sm:block">
          <div className="font-display text-sm font-bold leading-none text-foreground">
            ANSOO
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Trading Practice
          </div>
        </div>
      </div>

      {/* Balance display — center */}
      {isAuthenticated && (
        <div className="mx-auto flex items-baseline gap-2">
          <span className="hidden text-xs text-muted-foreground sm:block">
            Total Balance:
          </span>
          <span
            className="font-mono text-sm font-semibold tracking-tight text-foreground sm:text-base"
            data-ocid="header.balance_display"
          >
            {balance}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            INR
          </span>
        </div>
      )}

      {/* Right side actions */}
      <div className="ml-auto flex items-center gap-2">
        {isAuthenticated ? (
          <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                data-ocid="header.user_menu_open_modal_button"
                className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/40">
                  <User size={14} className="text-primary" />
                </div>
                <span className="hidden font-mono text-xs sm:block">
                  {principalShort}
                </span>
                <ChevronDown size={12} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 border-border bg-popover"
              data-ocid="header.user_menu_dialog"
            >
              <DropdownMenuItem
                disabled
                className="text-xs text-muted-foreground"
              >
                {identity?.getPrincipal().toText().slice(0, 20)}...
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                data-ocid="header.logout_button"
                onClick={() => clear()}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut size={13} className="mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            data-ocid="header.login_button"
            size="sm"
            onClick={() => login()}
            className="h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <User size={13} /> Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
