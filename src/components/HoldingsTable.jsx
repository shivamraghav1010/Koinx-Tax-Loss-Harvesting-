import React, { useState } from 'react';
import CurrencyValue from './CurrencyValue';

const HoldingsTable = ({ holdings, selectedIds, onSelectChange, onSelectAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortField, setSortField] = useState('stcg'); // 'name', 'price', 'stcg', 'ltcg'
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc', 'desc'

  // Helper to format coin balances cleanly
  const formatCoin = (val) => {
    if (val === 0) return '0';
    if (val < 1e-6) return '0.00';
    
    // Format with up to 5 decimals, stripping trailing zeros
    return Number(val.toFixed(5)).toLocaleString(undefined, {
      maximumFractionDigits: 5
    });
  };

  // Sorting logic
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    let aVal, bVal;

    switch (sortField) {
      case 'name':
        aVal = a.coinName.toLowerCase();
        bVal = b.coinName.toLowerCase();
        break;
      case 'price':
        aVal = a.currentPrice;
        bVal = b.currentPrice;
        break;
      case 'stcg':
        aVal = a.stcg.gain;
        bVal = b.stcg.gain;
        break;
      case 'ltcg':
        aVal = a.ltcg.gain;
        bVal = b.ltcg.gain;
        break;
      default:
        aVal = a.stcg.gain;
        bVal = b.stcg.gain;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Limit displayed holdings unless expanded
  const displayedHoldings = isExpanded ? sortedHoldings : sortedHoldings.slice(0, 6);

  // Checkbox states
  const allSelected = holdings.length > 0 && selectedIds.length === holdings.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < holdings.length;

  const handleMasterCheckboxChange = (e) => {
    onSelectAll(e.target.checked);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="holdings-container">
      <div className="holdings-header">
        <div className="holdings-title-row">
          <h2>Holdings</h2>
        </div>
      </div>

      <div className="table-responsive">
        <table className="holdings-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={el => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={handleMasterCheckboxChange}
                  />
                  <span className={`checkmark ${someSelected ? 'indeterminate' : ''}`}></span>
                </label>
              </th>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Asset{getSortIcon('name')}
              </th>
              <th className="align-right">
                Holdings <br />
                <span style={{ fontSize: '10px', textTransform: 'none', color: 'var(--text-muted)' }}>
                  Avg Buy Price
                </span>
              </th>
              <th onClick={() => handleSort('price')} className="align-right" style={{ cursor: 'pointer', userSelect: 'none' }}>
                Current Price{getSortIcon('price')}
              </th>
              <th onClick={() => handleSort('stcg')} className="align-right" style={{ cursor: 'pointer', userSelect: 'none' }}>
                Short-Term{getSortIcon('stcg')}
              </th>
              <th onClick={() => handleSort('ltcg')} className="align-right" style={{ cursor: 'pointer', userSelect: 'none' }}>
                Long-Term{getSortIcon('ltcg')}
              </th>
              <th className="align-right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {displayedHoldings.map((item) => {
              const uniqueId = item.id;
              const isSelected = selectedIds.includes(uniqueId);

              return (
                <tr key={uniqueId} className={isSelected ? 'selected' : ''}>
                  <td>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectChange(uniqueId)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>
                    <div className="asset-cell">
                      <img
                        className="asset-logo"
                        src={item.logo}
                        alt={`${item.coin} logo`}
                        onError={(e) => {
                          e.target.src = 'https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg';
                        }}
                      />
                      <div className="asset-info">
                        <span className="asset-name">{item.coinName}</span>
                        <span className="asset-coin">{item.coin}</span>
                      </div>
                    </div>
                  </td>
                  <td className="align-right">
                    <div className="holdings-cell">
                      <span className="holdings-balance">
                        {formatCoin(item.totalHolding)} {item.coin}
                      </span>
                      <span className="holdings-rate">
                        <CurrencyValue value={item.averageBuyPrice} />/{item.coin}
                      </span>
                    </div>
                  </td>
                  <td className="align-right">
                    <span className="current-price-cell">
                      <CurrencyValue value={item.currentPrice} />
                    </span>
                  </td>
                  <td className="align-right">
                    <div className="gains-cell">
                      <span className={`gain-value ${item.stcg.gain > 0 ? 'positive' : item.stcg.gain < 0 ? 'negative' : ''}`}>
                        <CurrencyValue value={item.stcg.gain} isGain={true} />
                      </span>
                      <span className="gain-balance">
                        {formatCoin(item.stcg.balance)} {item.coin}
                      </span>
                    </div>
                  </td>
                  <td className="align-right">
                    <div className="gains-cell">
                      <span className={`gain-value ${item.ltcg.gain > 0 ? 'positive' : item.ltcg.gain < 0 ? 'negative' : ''}`}>
                        <CurrencyValue value={item.ltcg.gain} isGain={true} />
                      </span>
                      <span className="gain-balance">
                        {formatCoin(item.ltcg.balance)} {item.coin}
                      </span>
                    </div>
                  </td>
                  <td className="align-right amount-sell-cell">
                    {isSelected ? `${formatCoin(item.totalHolding)} ${item.coin}` : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <button className="view-all-btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'View Less' : 'View all'}
        </button>
      </div>
    </div>
  );
};

export default HoldingsTable;
