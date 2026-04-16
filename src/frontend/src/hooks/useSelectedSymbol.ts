import { useEffect, useState } from "react";

const DEFAULT_SYMBOL = "BINANCE:BTCUSDT";

let _symbol = DEFAULT_SYMBOL;
const _listeners = new Set<(s: string) => void>();

function setGlobalSymbol(s: string) {
  _symbol = s;
  for (const fn of _listeners) {
    fn(s);
  }
}

/**
 * Global selected symbol state shared across chart, watchlist, and trading panel.
 * Uses a simple pub/sub pattern without context overhead.
 */
export function useSelectedSymbol(): [string, (symbol: string) => void] {
  const [symbol, setLocal] = useState<string>(_symbol);

  useEffect(() => {
    _listeners.add(setLocal);
    return () => {
      _listeners.delete(setLocal);
    };
  }, []);

  return [symbol, setGlobalSymbol];
}
