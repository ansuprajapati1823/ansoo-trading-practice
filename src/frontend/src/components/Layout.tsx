import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
          {children}
        </main>
      </div>
      {/* Branding footer — minimal, doesn't consume trading vertical space */}
      <div className="hidden border-t border-border bg-card px-4 py-1.5 text-center text-[10px] text-muted-foreground/50 md:block">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/60 hover:text-primary transition-smooth"
        >
          caffeine.ai
        </a>
      </div>
    </div>
  );
}
