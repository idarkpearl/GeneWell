import React, { useState, useCallback } from 'react';
import  Header  from '../components/Header';
import { InputForm } from '../components/InputForm';
import { FileUpload } from '../components/FileUpload';
import { Dashboard } from '../components/Dashboard';
import { Spinner } from '../components/Spinner';
import type { PatientProfile, AnalysisResult } from '../types';
import { generateAiInsights } from '../services/geminiService';

const App: React.FC = () => {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [dnaData, setDnaData] = useState<{ file: File | null; text: string }>({ file: null, text: '' });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileSubmit = (data: PatientProfile) => {
    setProfile(data);
  };

  const handleDataChange = (data: { file: File | null; text: string }) => {
    setDnaData(data);
  };
  
  const handleStartOver = () => {
    setProfile(null);
    setDnaData({ file: null, text: '' });
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
  }

  const isAnalysisDisabled = !profile || (!dnaData.file && !dnaData.text);

  const handleAnalysis = useCallback(async () => {
    if (!profile || (!dnaData.file && !dnaData.text)) {
      setError('Please fill out the form and upload a DNA file or paste sequence data.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // The AI service now handles the detection of relevant diseases
      // and the calculation of risk scores based on the complete profile.
      const insights = await generateAiInsights(profile);
      setAnalysisResult(insights);

    } catch (err) {
      console.error("Error during analysis:", err);
      setError('An error occurred while analyzing the data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [profile, dnaData]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!analysisResult && !isLoading && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-700 mb-2 text-center">Get Your Personalized Risk Report</h2>
            <p className="text-center text-gray-500 mb-8">Fill in your details, upload your genomic data, and let our AI provide insights.</p>
            
            <div className="bg-white p-8 rounded-xl shadow-md space-y-8">
              <InputForm onSubmit={handleProfileSubmit} />
              <FileUpload onDataChange={handleDataChange} />
              
              {error && <p className="text-red-500 text-center">{error}</p>}

              <div className="text-center pt-4">
                <button
                  onClick={handleAnalysis}
                  disabled={isAnalysisDisabled}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 px-12 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:transform-none"
                >
                  Analyze My Risk
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading && <Spinner />}

        {analysisResult && !isLoading && profile && (
          <Dashboard result={analysisResult} profile={profile} onStartOver={handleStartOver} />
        )}
      </main>
    </div>
  );
};

export default App;