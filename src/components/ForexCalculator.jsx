// src/components/ForexCalculator.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForexCalculator = () => {
  const [sourceValue, setSourceValue] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('INR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [targetValue, setTargetValue] = useState('');
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://open.er-api.com/v6/latest');
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error.message);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleConvert = () => {
    if (exchangeRates) {
      const rate = exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
      setTargetValue((parseFloat(sourceValue) * rate).toFixed(2));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Forex Calculator</h1>
      <div className="mb-3">
        <label>Source Value:</label>
        <input
          type="number"
          className="form-control"
          value={sourceValue}
          onChange={(e) => setSourceValue(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Source Currency:</label>
        <select
          className="form-select"
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
        >
          {/* Add a default option */}
          <option value="" disabled>
            Select Source Currency
          </option>
          {/* Add currency options dynamically */}
          {exchangeRates &&
            Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleConvert}>
        Convert
      </button>
      <div className="mb-3">
        <label>Target Currency:</label>
        <select
          className="form-select"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          {/* Add a default option */}
          <option value="" disabled>
            Select Target Currency
          </option>
          {/* Add currency options dynamically */}
          {exchangeRates &&
            Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Target Value:</label>
        <input type="text" className="form-control" value={targetValue} readOnly />
      </div>
    </div>
  );
};

export default ForexCalculator;
