import type {
  Direction,
  HoldingView,
  PortfolioSummary,
  TradeResult,
  TradeView,
} from "../backend.d";
import type { Symbol as BackendSymbol } from "../backend.d";

export type TickerSymbol = BackendSymbol;
export type {
  HoldingView,
  PortfolioSummary,
  TradeView,
  Direction,
  TradeResult,
};

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
}

export interface MarketSymbol {
  symbol: string;
  name: string;
  exchange: string;
}

export const MARKET_SYMBOLS: MarketSymbol[] = [
  { symbol: "NSE:RELIANCE", name: "Reliance Industries", exchange: "NSE" },
  { symbol: "NSE:TCS", name: "Tata Consultancy Services", exchange: "NSE" },
  { symbol: "NSE:INFY", name: "Infosys", exchange: "NSE" },
  { symbol: "NSE:HDFCBANK", name: "HDFC Bank", exchange: "NSE" },
  { symbol: "NSE:ICICIBANK", name: "ICICI Bank", exchange: "NSE" },
  { symbol: "NSE:HINDUNILVR", name: "Hindustan Unilever", exchange: "NSE" },
  { symbol: "NSE:WIPRO", name: "Wipro", exchange: "NSE" },
  { symbol: "NSE:SBIN", name: "State Bank of India", exchange: "NSE" },
  { symbol: "NSE:AXISBANK", name: "Axis Bank", exchange: "NSE" },
  { symbol: "NSE:BHARTIARTL", name: "Bharti Airtel", exchange: "NSE" },
  { symbol: "NASDAQ:AAPL", name: "Apple Inc.", exchange: "NASDAQ" },
  { symbol: "NASDAQ:GOOGL", name: "Alphabet Inc.", exchange: "NASDAQ" },
  { symbol: "NASDAQ:MSFT", name: "Microsoft Corp.", exchange: "NASDAQ" },
  { symbol: "NASDAQ:AMZN", name: "Amazon.com Inc.", exchange: "NASDAQ" },
  { symbol: "NASDAQ:TSLA", name: "Tesla Inc.", exchange: "NASDAQ" },
  { symbol: "NYSE:JPM", name: "JPMorgan Chase", exchange: "NYSE" },
  { symbol: "BINANCE:BTCUSDT", name: "Bitcoin / USD", exchange: "CRYPTO" },
  { symbol: "BINANCE:ETHUSDT", name: "Ethereum / USD", exchange: "CRYPTO" },
  { symbol: "INDEX:NIFTY50", name: "Nifty 50", exchange: "INDEX" },
  { symbol: "INDEX:SENSEX", name: "BSE Sensex", exchange: "INDEX" },
];

export function getSymbolName(symbol: string): string {
  const found = MARKET_SYMBOLS.find((s) => s.symbol === symbol);
  return found ? found.name : symbol;
}

export function getSymbolShort(symbol: string): string {
  return symbol.includes(":") ? symbol.split(":")[1] : symbol;
}
