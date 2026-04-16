# Design Brief: ANSOO Trading Practice

## Overview
Professional paper trading simulator with TradingView-inspired dark UI. Minimal ornamentation, data-forward layout, high contrast for rapid information parsing.

## Visual Direction
**Tone**: Professional, utilitarian, alert. No decorative elements—every pixel serves clarity.
**Aesthetic**: Financial software—deep charcoal, vibrant profit/loss indicators, monospace prices, clean typography hierarchy.
**Differentiation**: Trading-specific grid layouts (watchlist rows, portfolio cards), live color coding (green/red), order confirmation flows.

## Color Palette (Dark Mode Default)

| Token | OKLCH | Usage |
|-------|-------|-------|
| Background | 0.11 0 0 | Page background, main canvas |
| Card | 0.155 0 0 | Watchlist, portfolio cards, panels |
| Border | 0.24 0 0 | Dividers, form inputs, subtle separators |
| Foreground | 0.92 0 0 | Primary text, high contrast |
| Muted | 0.19 0 0 | Secondary backgrounds, disabled states |
| Primary (Accent) | 0.75 0.22 142 | CTA buttons (place order), active states, purchase accent |
| Destructive (Red) | 0.62 0.25 25 | Loss indicators, sell orders, warnings |
| Success (Green) | 0.7 0.28 142 | Profit indicators, buy orders, gains |
| Chart-1 (Green) | 0.7 0.28 142 | Candle up, positive price movement |
| Chart-2 (Red) | 0.65 0.25 25 | Candle down, negative price movement |

## Typography

| Scale | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display | DM Sans | 32–48px | 600 | App title, section headers |
| Body | General Sans | 14–16px | 400 | Watchlist rows, portfolio text, form labels |
| Mono | JetBrains Mono | 12–14px | 400 | Prices, balances, P&L figures, trade fills |

## Elevation & Depth
- **Flat card design**: Minimal shadows. Use border + background color, not drop shadows.
- `shadow-elevated` (0 4px 12px 0 rgba(0,0,0,0.15)): Trading panel, modals, order confirmations.
- Sidebar slightly elevated via `bg-sidebar` (0.13 0 0) against main background.

## Structural Zones

| Zone | Background | Border | Notes |
|------|-----------|--------|-------|
| Header | Card (0.155 0 0) | Border (0.24 0 0) | Logo, balance display, user menu |
| Sidebar | Sidebar (0.13 0 0) | Sidebar-Border (0.22 0 0) | Watchlist section, scrollable |
| Main Content | Background (0.11 0 0) | N/A | Chart area, trading panel overlay |
| Trading Panel | Card (0.155 0 0) | Border (0.24 0 0) | Buy/Sell form, order preview, place order button |
| Portfolio | Card (0.155 0 0) | Border (0.24 0 0) | Holdings table, summary card |

## Spacing & Rhythm
- **Compact**: 4px, 8px, 12px, 16px, 24px, 32px. Trading UI is information-dense.
- **Watchlist rows**: 12px vertical padding, 12px horizontal padding.
- **Cards**: 16px padding, 4px border radius.
- **Trading form**: 12px input height, 8px field spacing.

## Component Patterns
- **Watchlist**: Rows with live price + 24h % change; hover highlights on neutral background.
- **Trading Panel**: Form with quantity input, order type toggle, place order CTA (primary accent).
- **Portfolio**: Holdings table (symbol, quantity, entry price, current price, P&L) + summary card above.
- **Price Display**: Monospace font, right-aligned, color-coded (green up, red down).
- **Buttons**: Primary (accent), Secondary (card + border), Destructive (red).

## Motion & Interaction
- **Transition Default**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) — smooth, not bouncy.
- **Hover States**: Subtle background color shift (secondary/10 on watchlist).
- **Order Confirmation**: Fade-in toast with timestamp, filled price, order ID.
- **Chart Updates**: No animation—price ticks instantly (real trading app behavior).

## Responsiveness
- **Mobile-first**: Stack sidebar below header at `<md:` breakpoints.
- **Tablet (md)**: 2-column: sidebar + main content.
- **Desktop (lg)**: 3-column: sidebar + chart + portfolio panel.
- **Watchlist collapse**: Mobile uses hamburger; sidebar always visible on tablet+.

## Constraints
- **No gradients**: Use solid colors and borders.
- **No complex shadows**: Only elevated shadow for depth.
- **No decorative elements**: Every UI element serves information or interaction.
- **High contrast**: AA+ compliance for text and interactive elements.

## Signature Detail
Trading-specific grid layout: portfolio card displays mini sparkline (optional) + instant P&L color coding. Monospace balance display (₹1,00,00,00,000) conveys precision and financial authority.
