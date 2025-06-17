// src/api/fetchStockPrice.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

export const fetchStockPrice = async (symbol) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: '67P38PJA16I7L3KG',
      },
    });

    const data = response.data['Global Quote'];
    return quote && quote['05. price']
      ? parseFloat(quote['05. price'])
      : null;
  } catch (error) {
    console.error(`Error fetching stock price for ${symbol}:`, error);
    return null;
  }
};
