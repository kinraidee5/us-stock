import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Stock.css';

const Stock = () => {
  const [query, setQuery] = useState('');
  const [defaultKeyStatistics, setDefaultKeyStatistics] = useState([]);
  const [stockEarnings, setStockEarnings] = useState({});
  const [insiderHolders, setInsiderHolders] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleButtonClick = async () => {
    if (isLoading) return; // Prevent multiple API calls while loading
    setIsLoading(true);

    try {
      const options = {
        method: 'GET',
        url: 'https://mboum-finance.p.rapidapi.com/mo/module/',
        params: {
          symbol: query,
          module: 'default-key-statistics,insider-holders,earnings-history,calendar-events',
        },
        headers: {
          'X-RapidAPI-Key': '5a577095f9msh3fa29dd93e04d75p158707jsn37a73f83df3b',
          'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      console.log(response.data);

      const { defaultKeyStatistics, earningsHistory, insiderHolders, calendarEvents } = response.data;

      if (Object.keys(earningsHistory).length > 0) {
        setDefaultKeyStatistics(defaultKeyStatistics);
        setStockEarnings(earningsHistory);
        setInsiderHolders(insiderHolders);
        setCalendarEvents(calendarEvents);
      } else {
        console.error('Stock data not found in the API response.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch stock data. Please try again.');
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  const handleClearData = () => {
    setStockEarnings({});
    setDefaultKeyStatistics([]);
    setInsiderHolders([]);
    setCalendarEvents({});
    setHasLoaded(false);
  };

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" name="query" value={query} onChange={handleInputChange} />
      </div>
      <div className="button-container">
        <button style={{ borderRadius: '8px' }} onClick={handleButtonClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
        {hasLoaded && (
          <button
            style={{
              backgroundColor: '#ff4d4f',
              color: '#ffffff',
              border: 'none',
              marginLeft: '10px',
              borderRadius: '8px',
            }}
            onClick={handleClearData}
          >
            Clear Data
          </button>
        )}
      </div>
      {hasLoaded && (
        <div className="result-container">
          <div className="topic">
            <h2>Stock Data:</h2>
          </div>
          {defaultKeyStatistics && Object.keys(defaultKeyStatistics).length > 0 ? (
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(defaultKeyStatistics).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value ? value.fmt : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No stock data found.</p>
          )}

          {Object.keys(stockEarnings).length > 0 && stockEarnings.history ? (
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>EPS Actual</th>
                  <th>EPS Estimate</th>
                  <th>EPS Difference</th>
                  <th>Surprise Percent</th>
                  <th>Quarter</th>
                </tr>
              </thead>
              <tbody>
                {stockEarnings.history.map((earnings, index) => (
                  <tr key={index}>
                    <td>{earnings.period}</td>
                    <td>{earnings.epsActual.fmt}</td>
                    <td>{earnings.epsEstimate.fmt}</td>
                    <td>{earnings.epsDifference.fmt}</td>
                    <td>{earnings.surprisePercent.fmt}</td>
                    <td>{earnings.quarter.fmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No earnings data found.</p>
          )}

          {insiderHolders && Object.keys(insiderHolders).length > 0 && insiderHolders.holders ? (
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Relation</th>
                  <th>Transaction Description</th>
                  <th>Latest Transaction Date</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {insiderHolders.holders.map((holder, index) => (
                  <tr key={index}>
                    <td>{holder.name}</td>
                    <td>{holder.relation}</td>
                    <td>{holder.transactionDescription}</td>
                    <td>{holder.latestTransDate.fmt}</td>
                    <td>{holder.positionDirect ? holder.positionDirect.fmt : holder.positionIndirect.fmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No insider holders found.</p>
          )}

          {Object.keys(calendarEvents).length > 0 && calendarEvents.earnings ? (
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Earnings Date</th>
                  <th>Earnings Average</th>
                  <th>Earnings Range</th>
                  <th>Revenue Average</th>
                  <th>Revenue Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <ul>
                      {calendarEvents.earnings.earningsDate.map((date, index) => (
                        <li key={index}>{date.fmt}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{calendarEvents.earnings.earningsAverage.fmt}</td>
                  <td>
                    {calendarEvents.earnings.earningsLow.fmt} - {calendarEvents.earnings.earningsHigh.fmt}
                  </td>
                  <td>{calendarEvents.earnings.revenueAverage.fmt}</td>
                  <td>
                    {calendarEvents.earnings.revenueLow.fmt} - {calendarEvents.earnings.revenueHigh.fmt}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No earnings information found.</p>
          )}

          {Object.keys(calendarEvents).length > 0 && calendarEvents.exDividendDate ? (
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Ex-Dividend Date</th>
                  <th>Dividend Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{calendarEvents.exDividendDate.fmt}</td>
                  <td>{calendarEvents.dividendDate.fmt}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No dividend information found.</p>
          )}

        </div>
      )}
    </div>
  );
};

export default Stock;
