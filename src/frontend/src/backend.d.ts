import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type Symbol = string;
export interface HoldingView {
    avgPrice: bigint;
    quantity: bigint;
    symbol: Symbol;
}
export interface PortfolioSummary {
    returnPct: bigint;
    balance: bigint;
    totalInvested: bigint;
    totalPnl: bigint;
}
export type TradeResult = {
    __kind__: "ok";
    ok: TradeView;
} | {
    __kind__: "err";
    err: string;
};
export interface TradeView {
    id: bigint;
    direction: Direction;
    timestamp: Timestamp;
    quantity: bigint;
    price: bigint;
    symbol: Symbol;
}
export enum Direction {
    buy = "buy",
    sell = "sell"
}
export interface backendInterface {
    addToWatchlist(symbol: Symbol): Promise<void>;
    buy(symbol: Symbol, quantity: bigint, pricePaise: bigint): Promise<TradeResult>;
    getHoldings(): Promise<Array<HoldingView>>;
    getPortfolioSummary(): Promise<PortfolioSummary>;
    getTradeHistory(): Promise<Array<TradeView>>;
    getWatchlist(): Promise<Array<Symbol>>;
    register(): Promise<void>;
    removeFromWatchlist(symbol: Symbol): Promise<void>;
    sell(symbol: Symbol, quantity: bigint, pricePaise: bigint): Promise<TradeResult>;
}
