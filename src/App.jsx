import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Disclaimer from './components/Disclaimer';
import GainsSummary from './components/GainsSummary';
import HoldingsTable from './components/HoldingsTable';
import { fetchHoldings, fetchCapitalGains } from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState([]);
  const [preGains, setPreGains] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        const processedHoldings = holdingsData.map((item, idx) => ({
          ...item,
          id: `${item.coin}-${item.coinName}-${idx}`
        }));
        setHoldings(processedHoldings);
        setPreGains(gainsData.stcg ? gainsData : gainsData.capitalGains); // handles both shapes safely
      } catch (error) {
        console.error('Error fetching tax harvesting data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <Header />
        <div className="loading-container">
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
            Fetching portfolio & tax details...
          </p>
        </div>
      </div>
    );
  }

  // Calculate post-harvesting gains based on selected assets
  const postGains = {
    stcg: { ...preGains.stcg },
    ltcg: { ...preGains.ltcg }
  };

  selectedIds.forEach(id => {
    const matchedHolding = holdings.find(item => item.id === id);
    if (matchedHolding) {
      // Short-Term Gain Adjustment
      if (matchedHolding.stcg.gain > 0) {
        postGains.stcg.profits += matchedHolding.stcg.gain;
      } else if (matchedHolding.stcg.gain < 0) {
        postGains.stcg.losses += Math.abs(matchedHolding.stcg.gain);
      }

      // Long-Term Gain Adjustment
      if (matchedHolding.ltcg.gain > 0) {
        postGains.ltcg.profits += matchedHolding.ltcg.gain;
      } else if (matchedHolding.ltcg.gain < 0) {
        postGains.ltcg.losses += Math.abs(matchedHolding.ltcg.gain);
      }
    }
  });

  // Handle single holding selection toggle
  const handleSelectChange = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Handle select/deselect all holdings
  const handleSelectAll = (shouldSelectAll) => {
    if (shouldSelectAll) {
      const allIds = holdings.map(item => item.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Body */}
      <main className="content-wrapper">
        
        <div className="title-section">
          <h1>Tax Harvesting</h1>
          <div className="tooltip-container">
            <span className="how-it-works" onClick={() => setShowHelpModal(true)}>
              How it works?
            </span>
            <div className="tooltip-content">
              Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. <a href="#" className="tooltip-link" onClick={(e) => { e.preventDefault(); setShowHelpModal(true); }}>Know More</a>
              <div className="tooltip-arrow"></div>
            </div>
          </div>
        </div>

        {/* Collapsible notes/disclaimers */}
        <Disclaimer />

        {/* Capital Gains Summary Cards */}
        {preGains && (
          <GainsSummary 
            preGains={preGains}
            postGains={postGains}
          />
        )}

        {/* Holdings Table */}
        <HoldingsTable 
          holdings={holdings}
          selectedIds={selectedIds}
          onSelectChange={handleSelectChange}
          onSelectAll={handleSelectAll}
        />
      </main>

      {/* Educational Help Modal */}
      {showHelpModal && (
        <div className="modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowHelpModal(false)}>
              &times;
            </button>
            <h2 className="modal-title">Tax Loss Harvesting</h2>
            <div className="modal-body">
              <p>
                <strong>Tax-Loss Harvesting</strong> is a powerful strategy to reduce your overall crypto tax liability.
              </p>
              <p>Here is how to use this tool:</p>
              <ol>
                <li>
                  Review your <strong>Holdings list</strong> at the bottom of the page. Under the <em>Short-Term Gain</em> and <em>Long-Term Gain</em> columns, look for values marked in red (which represent losses).
                </li>
                <li>
                  Check the box next to assets containing losses to simulate selling them.
                </li>
                <li>
                  The <strong>After Harvesting</strong> card will automatically update in real-time. Notice how your overall capital losses increase, which reduces your net capital gains.
                </li>
                <li>
                  If the strategy reduces your tax burden, you will see a badge showing your estimated tax savings.
                </li>
              </ol>
              <p style={{ fontSize: '13px', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                Note: In real life, tax-loss harvesting involves selling assets to realize losses, then optionally rebuying them (subject to wash-sale rules depending on your tax jurisdiction).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
