import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { AnalysisResult, PatientProfile, DetectedCondition } from '../types';
import { Chatbot } from './Chatbot';
import { ReportPDF } from './ReportPDF';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';


interface DashboardProps {
  result: AnalysisResult;
  profile: PatientProfile;
  onStartOver: () => void;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const riskLevelColors = {
    High: {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-800',
        pillBg: 'bg-red-200',
        pillText: 'text-red-800'
    },
    Moderate: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-500',
        text: 'text-yellow-800',
        pillBg: 'bg-yellow-200',
        pillText: 'text-yellow-800'
    },
    Low: {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-800',
        pillBg: 'bg-green-200',
        pillText: 'text-green-800'
    }
}

const ConditionCard: React.FC<{ condition: DetectedCondition }> = ({ condition }) => {
    const colors = riskLevelColors[condition.riskLevel] || riskLevelColors.Low;
    const chartData = [
        { name: 'Your Risk', value: condition.patientRisk, fill: colors.pillBg },
        { name: 'Average Risk', value: condition.averageRisk, fill: '#cbd5e1' },
    ];

    return (
        <div className={`rounded-xl shadow-md overflow-hidden border-l-4 ${colors.border}`}>
            <div className={`p-6 ${colors.bg}`}>
                <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold">{condition.diseaseName}</h4>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${colors.pillBg} ${colors.pillText}`}>{condition.riskLevel} Risk</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Risk Visualization */}
                    <div className="flex flex-col">
                         <div className="flex items-baseline space-x-2">
                             <span className={`text-4xl font-bold ${colors.text}`}>{condition.patientRisk}%</span>
                             <span className="text-gray-500">Your Estimated Risk</span>
                         </div>
                         <div className="text-sm text-gray-500 mt-1">
                            Average Population Risk: {condition.averageRisk}%
                         </div>
                         <div className="flex-grow mt-4" style={{height: '100px'}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" hide/>
                                    <Bar dataKey="value" barSize={20} radius={[4, 4, 4, 4]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                         </div>
                    </div>

                    {/* Factors and Recommendations */}
                    <div>
                        <div>
                            <h5 className="font-semibold text-gray-700 mb-2">Top Contributing Factors</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                {condition.contributingFactors.map((factor, i) => <li key={i}>{factor}</li>)}
                            </ul>
                        </div>
                        <div className="mt-4">
                             <h5 className="font-semibold text-gray-700 mb-2">Recommendations</h5>
                             <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                {condition.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const Dashboard: React.FC<DashboardProps> = ({ result, profile, onStartOver }) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadPdf = () => {
    const input = pdfRef.current;
    if (!input) {
      alert('PDF content is not ready. Please try again.');
      return;
    }

    html2canvas(input, {
      scale: 2, // Improves the image quality
      useCORS: true // Important if you have external images
    })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      // Check if the content is taller than the page, if so it needs to be scaled down.
      if (height > pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      }
      
      pdf.save('AI_Genetic_Counsellor_Report.pdf');
    })
    .catch(error => {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check the console for more details.');
    });
  };


  return (
    <div className="space-y-8 animate-fade-in">
        {/* Hidden component for PDF generation */}
        <div className="absolute top-0 left-0 -z-10 opacity-0" style={{width: '210mm', height: '297mm'}}>
            <ReportPDF ref={pdfRef} result={result} profile={profile} />
        </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Your Health Insight Report</h2>
          <p className="text-gray-500 mt-1">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={handleDownloadPdf}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center"
            >
              <DownloadIcon />
              Download PDF Report
            </button>
            <button
              onClick={onStartOver}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              New Analysis
            </button>
        </div>
      </div>

      {/* Section A: Patient Overview */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Section A: Patient Overview</h3>
        <p className="text-gray-600">{result.patientOverview}</p>
      </div>

      {/* Section B: Detected Conditions */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700">Section B: Detected Health Conditions</h3>
        {result.detectedConditions.length > 0 ? (
            <div className="space-y-6">
                {result.detectedConditions.map(condition => (
                    <ConditionCard key={condition.diseaseName} condition={condition} />
                ))}
            </div>
        ) : (
             <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-6 rounded-xl shadow-md">
                <h4 className="font-bold text-lg">No Significant Increased Risks Detected</h4>
                <p className="mt-2">Based on the provided DNA data and family history, our analysis did not find any significant markers for increased hereditary risk. This is great news! Continue to maintain a healthy lifestyle and consult with your healthcare provider for routine screenings.</p>
            </div>
        )}
      </div>

      {/* Section C: Lifestyle Summary */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                 <h3 className="text-xl font-semibold text-gray-700 mb-4">Section C: Lifestyle Review</h3>
                <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                    <div>
                        <h4 className="font-semibold text-red-600 mb-2">Habits to Improve</h4>
                        {result.lifestyleSummary.habitsToImprove.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {result.lifestyleSummary.habitsToImprove.map((habit, i) => <li key={i}>{habit}</li>)}
                            </ul>
                        ) : <p className="text-gray-500 text-sm">None identified. Great job!</p>}
                    </div>
                     <hr/>
                    <div>
                         <h4 className="font-semibold text-green-600 mb-2">Habits to Maintain</h4>
                         {result.lifestyleSummary.habitsToMaintain.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {result.lifestyleSummary.habitsToMaintain.map((habit, i) => <li key={i}>{habit}</li>)}
                            </ul>
                        ) : <p className="text-gray-500 text-sm">No specific positive habits were highlighted, but consistency is key.</p>}
                    </div>
                </div>
            </div>
            {/* Chatbot */}
            <div className="bg-white rounded-xl shadow-md">
                <Chatbot profile={profile} analysisResult={result} />
            </div>
       </div>
    </div>
  );
};