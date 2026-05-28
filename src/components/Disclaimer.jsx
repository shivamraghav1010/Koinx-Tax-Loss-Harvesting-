import React, { useState } from 'react';

const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('koinx_disclaimer_open');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleOpen = () => {
    setIsOpen(prev => {
      const next = !prev;
      localStorage.setItem('koinx_disclaimer_open', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className={`disclaimer ${isOpen ? '' : 'collapsed'}`}>
      <div className="disclaimer-header" onClick={toggleOpen}>
        <div className="disclaimer-title-area">
          {/* Line-based stroke-based Info Icon */}
          <svg
            className="disclaimer-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Important Notes & Disclaimers</span>
        </div>
        {/* Line-based chevron up icon */}
        <svg
          className="disclaimer-toggle-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="disclaimer-content">
          <ul>
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Disclaimer;
