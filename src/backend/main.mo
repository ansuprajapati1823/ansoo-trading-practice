import Types "types/trading";
import TradingLib "lib/trading";
import TradingApi "mixins/trading-api";
import Map "mo:core/Map";

actor {
  // ── Stable state ──────────────────────────────────────────────────────────────
  // Map from user Principal → their full trading state
  let users = Map.empty<Types.UserId, TradingLib.UserState>();

  // ── Include mixins ────────────────────────────────────────────────────────────
  include TradingApi(users);
};
