
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { RiskScore } from '../types';

interface RiskChartProps {
  data: RiskScore[];
}

const getRiskColor = (risk: number, averageRisk: number) => {
    if (risk > averageRisk) return '#ef4444'; // Red for higher than average risk
    return '#22c55e'; // Green for lower or equal to average risk
}

export const RiskChart: React.FC<RiskChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    name: item.disease,
    'Your Risk': item.risk,
    'Average Risk': item.averageRisk,
    fill: getRiskColor(item.risk, item.averageRisk)
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 5, right: 30, left: -10, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis unit="%" />
          <Tooltip 
            formatter={(value: number) => `${value}%`}
            cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}
            />
          <Legend />
          <Bar dataKey="Your Risk">
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
          <Bar dataKey="Average Risk" fill="#9ca3af" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};