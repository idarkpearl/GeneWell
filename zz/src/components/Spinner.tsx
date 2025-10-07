
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-blue-600"></div>
      <p className="mt-4 text-lg text-gray-600">Analyzing your data...</p>
      <p className="mt-2 text-sm text-gray-500">This may take a moment.</p>
    </div>
  );
};
