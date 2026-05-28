import React from 'react';
import CurrencyValue from './CurrencyValue';

const GainsSummary = ({ preGains, postGains }) => {
  // Pre-harvesting details
  const preStcgNet = preGains.stcg.profits - preGains.stcg.losses;
  const preLtcgNet = preGains.ltcg.profits - preGains.ltcg.losses;
  const preRealised = preStcgNet + preLtcgNet;

  // Post-harvesting details
  const postStcgNet = postGains.stcg.profits - postGains.stcg.losses;
  const postLtcgNet = postGains.ltcg.profits - postGains.ltcg.losses;
  const postEffective = postStcgNet + postLtcgNet;

  // Savings calculation
  const savings = preRealised - postEffective;
  const showSavings = savings > 0;

  return (
    <div className="gains-grid">
      {/* Pre Harvesting Card */}
      <div className="gains-card pre-harvest">
        <div>
          <h3 className="card-header-title">Pre Harvesting</h3>
          <table className="card-table">
            <thead>
              <tr>
                <th></th>
                <th>Short-term</th>
                <th>Long-term</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Profits</td>
                <td><CurrencyValue value={preGains.stcg.profits} /></td>
                <td><CurrencyValue value={preGains.ltcg.profits} /></td>
              </tr>
              <tr className="label-row">
                <td>Losses</td>
                <td style={{ color: '#ef4444' }}><CurrencyValue value={preGains.stcg.losses} isLossRow={true} /></td>
                <td style={{ color: '#ef4444' }}><CurrencyValue value={preGains.ltcg.losses} isLossRow={true} /></td>
              </tr>
              <tr className="net-row">
                <td>Net Capital Gains</td>
                <td style={{ color: preStcgNet >= 0 ? '#10b981' : '#ef4444' }}>
                  <CurrencyValue value={preStcgNet} />
                </td>
                <td style={{ color: preLtcgNet >= 0 ? '#10b981' : '#ef4444' }}>
                  <CurrencyValue value={preLtcgNet} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <span className="footer-label">Realised Capital Gains:</span>
          <span className={`footer-value ${preRealised < 0 ? 'negative' : ''}`}>
            <CurrencyValue value={preRealised} />
          </span>
        </div>
      </div>

      {/* After Harvesting Card */}
      <div className="gains-card after-harvest">
        <div>
          <h3 className="card-header-title">After Harvesting</h3>
          <table className="card-table">
            <thead>
              <tr>
                <th></th>
                <th>Short-term</th>
                <th>Long-term</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Profits</td>
                <td><CurrencyValue value={postGains.stcg.profits} /></td>
                <td><CurrencyValue value={postGains.ltcg.profits} /></td>
              </tr>
              <tr className="label-row">
                <td>Losses</td>
                <td><CurrencyValue value={postGains.stcg.losses} isLossRow={true} /></td>
                <td><CurrencyValue value={postGains.ltcg.losses} isLossRow={true} /></td>
              </tr>
              <tr className="net-row">
                <td>Net Capital Gains</td>
                <td><CurrencyValue value={postStcgNet} /></td>
                <td><CurrencyValue value={postLtcgNet} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <div className="footer-main-row">
            <span className="footer-label">Effective Capital Gains:</span>
            <span className="footer-value">
              <CurrencyValue value={postEffective} />
            </span>
          </div>
          {showSavings && (
            <div className="savings-badge">
              <span>🎉 You are going to save upto <CurrencyValue value={savings} /></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GainsSummary;
