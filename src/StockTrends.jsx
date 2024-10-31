// src/StockTrends.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  Zoom,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  Zoom
);

const StockTrends = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then(response => {
        const articles = response.data;
        const dates = articles.map(article => article.date);
        const sentiments = articles.map(article =>
          article.sentiment === 'positive' ? 1 :
          article.sentiment === 'negative' ? -1 : 0
        );

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Sentiment Score',
              data: sentiments,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              fill: true,
              tension: 0.4,
              pointRadius: 5,
              hoverRadius: 8,
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
        pan: { enabled: true, mode: 'x' },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Sentiment Score' }, min: -1, max: 1 },
    },
  };

  return (
    <div className="chart-container">
      <h2>Stock Trends</h2>
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default StockTrends;
