"use client";

import { memo, ReactNode } from "react";
import { Activity, Bell, Wallet, Settings, Search } from "lucide-react";

interface TradingLayoutProps {
  children: ReactNode;
}

export const TradingLayout = memo(function TradingLayout({
  children,
}: TradingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Navigation */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Activity className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">AXIOM</h1>
                  <span className="text-xs text-muted-foreground">Pro</span>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discover
                </a>
                <a href="#" className="text-primary font-medium">
                  Pulse
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Trackers
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Perpetuals
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Yield
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Vision
                </a>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="hidden lg:flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
                <Search size={16} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by token or CA..."
                  className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-64"
                />
                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  /
                </kbd>
              </div>

              {/* Network Selector */}
              <button className="hidden md:flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                <span className="text-sm font-medium">SOL</span>
              </button>

              {/* Deposit Button */}
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                Deposit
              </button>

              {/* Icons */}
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell size={20} className="text-muted-foreground" />
              </button>

              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Wallet size={20} className="text-muted-foreground" />
              </button>

              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Settings size={20} className="text-muted-foreground" />
              </button>

              {/* User Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                75
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 bg-card/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Axiom Trade. Real-time token data powered by blockchain.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                API
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});
