import Types "../types/trading";
import TradingLib "../lib/trading";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

/// Mixin that exposes the paper-trading public API.
/// Receives `users` map (Principal → UserState) injected from main.mo.
mixin (users : Map.Map<Types.UserId, TradingLib.UserState>) {

  // ── Internal helpers ──────────────────────────────────────────────────────────

  /// Returns the caller's state, trapping if not registered.
  func requireState(caller : Types.UserId) : TradingLib.UserState {
    switch (users.get(caller)) {
      case (?s) s;
      case null Runtime.trap("User not registered — call register() first");
    };
  };

  // ── Registration ──────────────────────────────────────────────────────────────
  /// Registers the caller; no-op if already registered.
  public shared ({ caller }) func register() : async () {
    if (caller.isAnonymous()) Runtime.trap("Anonymous principal cannot register");
    switch (users.get(caller)) {
      case (?_) ();   // already registered
      case null {
        let state = TradingLib.newUserState(caller);
        users.add(caller, state);
      };
    };
  };

  // ── Watchlist ─────────────────────────────────────────────────────────────────
  public shared ({ caller }) func addToWatchlist(symbol : Types.Symbol) : async () {
    let state = requireState(caller);
    TradingLib.addToWatchlist(state, symbol);
  };

  public shared ({ caller }) func removeFromWatchlist(symbol : Types.Symbol) : async () {
    let state = requireState(caller);
    TradingLib.removeFromWatchlist(state, symbol);
  };

  public shared query ({ caller }) func getWatchlist() : async [Types.Symbol] {
    let state = requireState(caller);
    TradingLib.listWatchlist(state);
  };

  // ── Portfolio ─────────────────────────────────────────────────────────────────
  public shared query ({ caller }) func getHoldings() : async [Types.HoldingView] {
    let state = requireState(caller);
    TradingLib.listHoldings(state);
  };

  public shared query ({ caller }) func getPortfolioSummary() : async Types.PortfolioSummary {
    let state = requireState(caller);
    TradingLib.portfolioSummary(state);
  };

  // ── Trade execution ───────────────────────────────────────────────────────────
  /// pricePaise: price in paise (1 INR = 100 paise)
  public shared ({ caller }) func buy(symbol : Types.Symbol, quantity : Nat, pricePaise : Nat) : async Types.TradeResult {
    let state = requireState(caller);
    TradingLib.executeBuy(state, symbol, quantity, pricePaise);
  };

  public shared ({ caller }) func sell(symbol : Types.Symbol, quantity : Nat, pricePaise : Nat) : async Types.TradeResult {
    let state = requireState(caller);
    TradingLib.executeSell(state, symbol, quantity, pricePaise);
  };

  // ── Trade history ─────────────────────────────────────────────────────────────
  public shared query ({ caller }) func getTradeHistory() : async [Types.TradeView] {
    let state = requireState(caller);
    TradingLib.listTrades(state);
  };
};
