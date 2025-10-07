
import React from 'react';
import type { AiInsights } from '../types';

interface RecommendationsProps {
  recommendations: AiInsights['recommendations'];
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Personalized Recommendations</h3>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 pt-1">
                <CheckIcon/>
            </div>
            <div className="ml-3">
              <h4 className="text-md font-semibold text-gray-800">{rec.title}</h4>
              <p className="text-gray-600 text-sm">{rec.details}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
