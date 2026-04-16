import { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol: string;
}

/**
 * Embeds the TradingView Advanced Real-Time Charting Widget.
 * Re-initializes whenever `symbol` changes by clearing the container and
 * re-injecting the embed script (per TradingView's recommended approach).
 */
export function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing widget
    container.innerHTML = "";

    // Inner widget div that TradingView targets
    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.cssText = "height:100%;width:100%;";
    container.appendChild(widgetDiv);

    // Script with configuration as body text
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    const config = {
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      calendar: false,
      hide_top_toolbar: false,
      support_host: "https://www.tradingview.com",
      backgroundColor: "rgba(15, 17, 22, 1)",
      gridColor: "rgba(255, 255, 255, 0.04)",
      studies_overrides: {
        "volume.volume.color.0": "rgba(239,68,68,0.5)",
        "volume.volume.color.1": "rgba(34,197,94,0.5)",
        "volume.volume ma.color": "rgba(255,255,255,0.3)",
      },
    };

    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container h-full w-full"
      style={{ height: "100%", width: "100%" }}
    />
  );
}
