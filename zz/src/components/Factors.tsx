
import React from 'react';
import type { AiInsights } from '../types';

interface FactorsProps {
  factors: AiInsights['contributingFactors'];
}

const DnaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a9 9 0 100 12A9 9 0 0012 6zm-2.293 3.293a1 1 0 011.414 0l.001.001.001.001a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414l2-2.001z" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);


export const Factors: React.FC<FactorsProps> = ({ factors }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Contributing Factors</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factor</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact on Risk</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {factors.map((factor, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{factor.factor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factor.impact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                   <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${factor.isGenetic ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      <div className="mr-2">
                        {factor.isGenetic ? <DnaIcon/> : <HeartIcon/>}
                      </div>
                      {factor.isGenetic ? 'Genetic' : 'Lifestyle'}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
