# KoinX Tax Loss Harvesting Tool

A responsive React application that simulates tax-loss harvesting strategies for crypto holdings. Users can select holdings with gains or losses to see the real-time impact on their capital gains tax.

## Features

- **Pre vs. After Harvesting Cards**: Displays profits, losses, net capital gains, and effective gains.
- **Estimated Savings**: Shows tax savings when capital gains are reduced.
- **Holdings Table**: Interactive list of crypto assets with selection checkboxes, current prices, average buy rates, and short/long-term gains.
- **Hover Tooltips**: Abbreviates large currency values (e.g. `-$16.76M`) and displays the full exact value when hovered.
- **Notes & Disclaimers**: Collapsible regulatory disclaimer banner.
- **Help Guide**: Modal explaining the tax-loss harvesting process.

## Setup & Running

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```
