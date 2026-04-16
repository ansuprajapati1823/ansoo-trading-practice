import Common "common";

module {
  public type UserId   = Common.UserId;
  public type Symbol   = Common.Symbol;
  public type Timestamp = Common.Timestamp;

  // ── User / Account ──────────────────────────────────────────────────────────
  public type User = {
    id      : UserId;
    var balance : Nat;  // stored as paise (1 INR = 100 paise) for integer math
  };

  // ── Watchlist ────────────────────────────────────────────────────────────────
  // One set of symbols per user (stored inside UserState)

  // ── Holding (one row per symbol the user currently owns) ────────────────────
  public type Holding = {
    symbol       : Symbol;
    var quantity : Nat;
    var totalCost : Nat; // paise; avgPrice = totalCost / quantity
  };

  // ── Trade direction ──────────────────────────────────────────────────────────
  public type Direction = { #buy; #sell };

  // ── Trade record (immutable, stored in history) ──────────────────────────────
  public type Trade = {
    id        : Nat;
    symbol    : Symbol;
    direction : Direction;
    quantity  : Nat;
    price     : Nat;      // paise per unit
    timestamp : Timestamp;
  };

  // ── Public API surface types (shared — no var fields, no mutable containers) ─
  public type HoldingView = {
    symbol   : Symbol;
    quantity : Nat;
    avgPrice : Nat; // paise per unit
  };

  public type TradeView = {
    id        : Nat;
    symbol    : Symbol;
    direction : Direction;
    quantity  : Nat;
    price     : Nat;
    timestamp : Timestamp;
  };

  public type PortfolioSummary = {
    balance       : Nat;  // paise, available cash
    totalInvested : Nat;  // paise, current market value at avg cost
    totalPnl      : Int;  // paise, unrealised P&L (requires live prices, kept as 0 here)
    returnPct     : Int;  // basis points (1% = 100 bp) for integer representation
  };

  public type TradeResult = { #ok : TradeView; #err : Text };
};
