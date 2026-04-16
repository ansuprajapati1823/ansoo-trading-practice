import Types "../types/trading";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";

module {
  // ── Type aliases ─────────────────────────────────────────────────────────────
  public type User          = Types.User;
  public type Holding       = Types.Holding;
  public type Trade         = Types.Trade;
  public type TradeView     = Types.TradeView;
  public type HoldingView   = Types.HoldingView;
  public type PortfolioSummary = Types.PortfolioSummary;
  public type TradeResult   = Types.TradeResult;

  // ── State containers (one per user, stored in main.mo maps) ─────────────────
  public type UserState = {
    user      : User;
    watchlist : Set.Set<Types.Symbol>;
    holdings  : Map.Map<Types.Symbol, Holding>;
    trades    : List.List<Trade>;
    var nextTradeId : Nat;
  };

  // Initial virtual balance: 1,000,000,000 INR × 100 paise = 100,000,000,000 paise
  let INITIAL_BALANCE : Nat = 100_000_000_000;

  // ── User management ───────────────────────────────────────────────────────────
  public func newUserState(id : Types.UserId) : UserState {
    {
      user      = { id; var balance = INITIAL_BALANCE };
      watchlist = Set.empty<Types.Symbol>();
      holdings  = Map.empty<Types.Symbol, Holding>();
      trades    = List.empty<Trade>();
      var nextTradeId = 0;
    };
  };

  // ── Watchlist ─────────────────────────────────────────────────────────────────
  public func addToWatchlist(state : UserState, symbol : Types.Symbol) : () {
    state.watchlist.add(symbol);
  };

  public func removeFromWatchlist(state : UserState, symbol : Types.Symbol) : () {
    state.watchlist.remove(symbol);
  };

  public func listWatchlist(state : UserState) : [Types.Symbol] {
    state.watchlist.toArray();
  };

  // ── Portfolio ─────────────────────────────────────────────────────────────────
  public func listHoldings(state : UserState) : [HoldingView] {
    state.holdings.values().map<Holding, HoldingView>(func(h) {
      let avgPrice = if (h.quantity == 0) 0 else h.totalCost / h.quantity;
      { symbol = h.symbol; quantity = h.quantity; avgPrice };
    }).toArray();
  };

  // ── Trade execution ───────────────────────────────────────────────────────────
  public func executeBuy(state : UserState, symbol : Types.Symbol, quantity : Nat, pricePaise : Nat) : TradeResult {
    if (quantity == 0) return #err("Quantity must be greater than zero");
    if (pricePaise == 0) return #err("Price must be greater than zero");

    let cost = quantity * pricePaise;
    if (state.user.balance < cost) {
      return #err("Insufficient balance: need " # cost.toText() # " paise, have " # state.user.balance.toText());
    };

    // Deduct balance
    state.user.balance -= cost;

    // Update or create holding
    switch (state.holdings.get(symbol)) {
      case (?holding) {
        holding.quantity  += quantity;
        holding.totalCost += cost;
      };
      case null {
        let h : Holding = {
          symbol;
          var quantity  = quantity;
          var totalCost = cost;
        };
        state.holdings.add(symbol, h);
      };
    };

    // Record trade
    let tradeId = state.nextTradeId;
    state.nextTradeId += 1;
    let trade : Trade = {
      id        = tradeId;
      symbol;
      direction = #buy;
      quantity;
      price     = pricePaise;
      timestamp = Time.now();
    };
    state.trades.add(trade);

    #ok { id = tradeId; symbol; direction = #buy; quantity; price = pricePaise; timestamp = trade.timestamp };
  };

  public func executeSell(state : UserState, symbol : Types.Symbol, quantity : Nat, pricePaise : Nat) : TradeResult {
    if (quantity == 0) return #err("Quantity must be greater than zero");
    if (pricePaise == 0) return #err("Price must be greater than zero");

    switch (state.holdings.get(symbol)) {
      case null {
        #err("No holdings for symbol " # symbol);
      };
      case (?holding) {
        if (holding.quantity < quantity) {
          return #err("Insufficient holdings: have " # holding.quantity.toText() # ", selling " # quantity.toText());
        };

        let proceeds = quantity * pricePaise;

        // Reduce holding cost proportionally (avg cost × qty sold)
        let costReduction = if (holding.quantity == 0) 0 else (holding.totalCost * quantity) / holding.quantity;

        holding.quantity  -= quantity;
        if (holding.totalCost >= costReduction) {
          holding.totalCost -= costReduction;
        } else {
          holding.totalCost := 0;
        };

        // Remove holding entry if fully sold
        if (holding.quantity == 0) {
          state.holdings.remove(symbol);
        };

        // Credit balance
        state.user.balance += proceeds;

        // Record trade
        let tradeId = state.nextTradeId;
        state.nextTradeId += 1;
        let trade : Trade = {
          id        = tradeId;
          symbol;
          direction = #sell;
          quantity;
          price     = pricePaise;
          timestamp = Time.now();
        };
        state.trades.add(trade);

        #ok { id = tradeId; symbol; direction = #sell; quantity; price = pricePaise; timestamp = trade.timestamp };
      };
    };
  };

  // ── Trade history ─────────────────────────────────────────────────────────────
  public func listTrades(state : UserState) : [TradeView] {
    state.trades.map<Trade, TradeView>(func(t) {
      { id = t.id; symbol = t.symbol; direction = t.direction; quantity = t.quantity; price = t.price; timestamp = t.timestamp };
    }).toArray();
  };

  // ── Portfolio summary ─────────────────────────────────────────────────────────
  public func portfolioSummary(state : UserState) : PortfolioSummary {
    // totalInvested = sum of totalCost across all active holdings
    let totalInvested = state.holdings.values().foldLeft(0, func(acc, h) {
      acc + h.totalCost;
    });

    // P&L is not computable without live prices — return 0 for both
    let totalPnl : Int  = 0;
    let returnPct : Int = 0;

    {
      balance       = state.user.balance;
      totalInvested;
      totalPnl;
      returnPct;
    };
  };
};
