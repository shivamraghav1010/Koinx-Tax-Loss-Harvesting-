import React from 'react';

const CurrencyValue = ({ value, currency = 'USD', isGain = false, isLossRow = false }) => {
  const rate = currency === 'USD' ? 1 / 85 : 1;
  const converted = value * rate;
  const symbol = currency === 'USD' ? '$' : '₹';
  const absVal = Math.abs(converted);
  const isNeg = converted < 0;

  // Format full amount for the tooltip hover
  const fullFormatted = absVal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  let tooltipText = '';
  if (isGain && converted > 0) {
    tooltipText = `+${symbol}${fullFormatted}`;
  } else if (isLossRow) {
    tooltipText = `-${symbol}${fullFormatted}`;
  } else {
    tooltipText = `${isNeg ? '-' : ''}${symbol}${fullFormatted}`;
  }

  // Format abbreviated amount for display
  let displayValue = '';
  if (absVal >= 1000000) {
    displayValue = `${(absVal / 1000000).toFixed(2)}M`;
  } else if (absVal >= 100000) {
    displayValue = `${(absVal / 1000).toFixed(2)}K`;
  } else {
    displayValue = absVal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  let displayText = '';
  if (isGain && converted > 0) {
    displayText = `+${symbol}${displayValue}`;
  } else if (isLossRow) {
    displayText = `- ${symbol}${displayValue}`;
  } else {
    displayText = `${isNeg ? '-' : ''}${symbol}${displayValue}`;
  }

  return (
    <span className="tooltip-value-wrapper" data-tooltip={tooltipText}>
      {displayText}
    </span>
  );
};

export default CurrencyValue;
