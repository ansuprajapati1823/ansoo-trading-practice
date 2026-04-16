import { useQuery } from "@tanstack/react-query";
import { getSymbolShort } from "../types/trading";

export interface PriceData {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
}

// Simulated price data for NSE/NASDAQ/INDEX/CRYPTO symbols
// Prices in INR (for NSE/INDEX) or USD (for NASDAQ/CRYPTO)
const SEED_PRICES: Record<string, { price: number; change: number }> = {
  "NSE:RELIANCE": { price: 2874.5, change: 12.3 },
  "NSE:TCS": { price: 3891.2, change: -18.7 },
  "NSE:INFY": { price: 1502.6, change: 8.45 },
  "NSE:HDFCBANK": { price: 1634.8, change: -4.2 },
  "NSE:ICICIBANK": { price: 1178.4, change: 15.6 },
  "NSE:HINDUNILVR": { price: 2213.9, change: -9.8 },
  "NSE:WIPRO": { price: 462.3, change: 3.15 },
  "NSE:SBIN": { price: 821.7, change: -6.2 },
  "NSE:AXISBANK": { price: 1098.5, change: 7.85 },
  "NSE:BHARTIARTL": { price: 1587.3, change: 22.4 },
  "NASDAQ:AAPL": { price: 2238.5, change: 186.7 },
  "NASDAQ:GOOGL": { price: 1640.0, change: -0.33 },
  "NASDAQ:MSFT": { price: 1336.9, change: 3.34 },
  "NASDAQ:AMZN": { price: 1624.8, change: 15.9 },
  "NASDAQ:TSLA": { price: 1395.2, change: -28.4 },
  "NYSE:JPM": { price: 1895.6, change: 12.3 },
  "BINANCE:BTCUSDT": { price: 6870234.5, change: 45678.0 },
  "BINANCE:ETHUSDT": { price: 330450.8, change: -2340.0 },
  "INDEX:NIFTY50": { price: 22456.7, change: -78.3 },
  "INDEX:SENSEX": { price: 73890.4, change: 234.5 },
};

// Simulate live price with small random drift
function simulatePrice(base: { price: number; change: number }): PriceData {
  const drift = (Math.random() - 0.499) * base.price * 0.001;
  const price = base.price + drift;
  const change = base.change + drift;
  const changePct = (change / (price - change)) * 100;
  return { symbol: "", price, change, changePct };
}

async function fetchSimulatedPrices(
  symbols: string[],
): Promise<Record<string, PriceData>> {
  // Simulate a small network delay
  await new Promise((r) => setTimeout(r, 150));
  const result: Record<string, PriceData> = {};
  for (const sym of symbols) {
    const seed = SEED_PRICES[sym] ?? { price: 1000, change: 0 };
    const data = simulatePrice(seed);
    // Update seed with slight drift for next poll
    seed.price = data.price;
    seed.change = data.change;
    SEED_PRICES[sym] = seed;
    result[sym] = { ...data, symbol: sym };
  }
  return result;
}

/**
 * Polls simulated prices for the given list of symbols every 5 seconds.
 * Returns a map of symbol -> PriceData.
 */
export function usePrices(symbols: string[]) {
  const key = symbols.slice().sort().join(",");
  return useQuery<Record<string, PriceData>>({
    queryKey: ["prices", key],
    queryFn: () => fetchSimulatedPrices(symbols),
    enabled: symbols.length > 0,
    refetchInterval: 5_000,
    staleTime: 4_000,
  });
}

export function formatPrice(price: number, symbol: string): string {
  const short = getSymbolShort(symbol);
  const isCrypto =
    short.includes("BTC") || short.includes("ETH") || short.includes("USDT");
  if (isCrypto) {
    if (price > 1_00_000) {
      return `₹${(price / 1_00_000).toFixed(2)}L`;
    }
    return `₹${price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₹${price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
