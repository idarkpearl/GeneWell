// import React, { forwardRef } from 'react';
// import type { AnalysisResult, PatientProfile } from '../types';

// interface ReportPDFProps {
//     result: AnalysisResult;
//     profile: PatientProfile;
// }

// const DnaIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a9 9 0 100 12A9 9 0 0012 6zm-2.293 3.293a1 1 0 011.414 0l.001.001.001.001a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414l2-2.001z" />
//     </svg>
// );

// const riskLevelColorsPDF = {
//     High: { border: '#ef4444', bg: '#fee2e2', text: '#b91c1c' },
//     Moderate: { border: '#f59e0b', bg: '#fef3c7', text: '#b45309' },
//     Low: { border: '#22c55e', bg: '#dcfce7', text: '#166534' }
// };

// export const ReportPDF = forwardRef<HTMLDivElement, ReportPDFProps>(({ result, profile }, ref) => {
    
//     return (
//         <div ref={ref} className="bg-white text-black p-10 font-sans" style={{ width: '100%', height: '100%', fontSize: '10px' }}>
//             {/* Header */}
//             <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4">
//                 <div className="flex items-center space-x-3">
//                     <DnaIcon />
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-800">AI Genetic Counsellor</h1>
//                         <p className="text-gray-600">Personalized Health Insight Report</p>
//                     </div>
//                 </div>
//                 <div className="text-right text-xs">
//                     <p><strong>Date Generated:</strong> {new Date().toLocaleDateString()}</p>
//                     <p><strong>Patient Age:</strong> {profile.age} | <strong>Sex:</strong> {profile.sex}</p>
//                 </div>
//             </div>

//             {/* Section A: Patient Overview */}
//             <div className="my-4">
//                 <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b">Section A: Patient Overview</h2>
//                 <p className="text-gray-700">{result.patientOverview}</p>
//             </div>

//             {/* Section B: Detected Health Conditions */}
//             <div className="my-4">
//                  <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b">Section B: Detected Health Conditions</h2>
//                  {result.detectedConditions.length > 0 ? (
//                     <div className="space-y-4">
//                         {result.detectedConditions.map(condition => {
//                             const colors = riskLevelColorsPDF[condition.riskLevel];
//                             return (
//                                 <div key={condition.diseaseName} style={{ borderLeft: `4px solid ${colors.border}`, backgroundColor: colors.bg, padding: '12px', borderRadius: '4px' }}>
//                                     <div className="flex justify-between items-center">
//                                         <h3 className="text-base font-bold" style={{color: colors.text}}>{condition.diseaseName}</h3>
//                                         <span className="font-bold" style={{color: colors.text}}>{condition.riskLevel} Risk</span>
//                                     </div>
//                                     <p className="my-2">
//                                         Your estimated risk is <strong>{condition.patientRisk}%</strong>, compared to an average population risk of {condition.averageRisk}%.
//                                     </p>
//                                     <div className="grid grid-cols-2 gap-4 mt-2">
//                                         <div>
//                                             <h4 className="font-semibold mb-1">Top Contributing Factors:</h4>
//                                             <ul className="list-disc list-inside text-xs">
//                                                 {condition.contributingFactors.map((f, i) => <li key={i}>{f}</li>)}
//                                             </ul>
//                                         </div>
//                                         <div>
//                                             <h4 className="font-semibold mb-1">Recommendations:</h4>
//                                             <ul className="list-disc list-inside text-xs">
//                                                 {condition.recommendations.map((r, i) => <li key={i}>{r}</li>)}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                  ) : (
//                     <div style={{ borderLeft: '4px solid #22c55e', backgroundColor: '#dcfce7', padding: '12px', borderRadius: '4px', color: '#166534' }}>
//                         <h3 className="font-bold">No Significant Increased Risks Detected</h3>
//                         <p className="mt-1 text-xs">Based on the provided DNA data and family history, our analysis did not find any significant markers for increased hereditary risk. Continue to maintain a healthy lifestyle and consult with your healthcare provider for routine screenings.</p>
//                     </div>
//                  )}
//             </div>

//             {/* Section C: Lifestyle Review */}
//             <div className="my-4">
//                 <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b">Section C: Lifestyle Review</h2>
//                 <div className="grid grid-cols-2 gap-4">
//                      <div>
//                         <h3 className="font-semibold mb-1" style={{color: '#b91c1c'}}>Habits to Improve</h3>
//                         {result.lifestyleSummary.habitsToImprove.length > 0 ? (
//                              <ul className="list-disc list-inside text-xs">
//                                 {result.lifestyleSummary.habitsToImprove.map((h, i) => <li key={i}>{h}</li>)}
//                             </ul>
//                         ) : <p className="text-xs">None identified.</p>}
//                     </div>
//                      <div>
//                         <h3 className="font-semibold mb-1" style={{color: '#166534'}}>Habits to Maintain</h3>
//                          {result.lifestyleSummary.habitsToMaintain.length > 0 ? (
//                              <ul className="list-disc list-inside text-xs">
//                                 {result.lifestyleSummary.habitsToMaintain.map((h, i) => <li key={i}>{h}</li>)}
//                             </ul>
//                         ) : <p className="text-xs">None identified.</p>}
//                     </div>
//                 </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center text-xs text-gray-500 absolute bottom-10 left-10 right-10">
//                 <p><strong>Disclaimer:</strong> This report is generated by an AI model and is for informational purposes only. It is not a medical diagnosis. Consult with a qualified healthcare professional for medical advice.</p>
//             </div>
//         </div>
//     );
// });


import React, { forwardRef } from 'react';
import type { AnalysisResult, PatientProfile } from '../types';

interface ReportPDFProps {
    result: AnalysisResult;
    profile: PatientProfile;
}

const DnaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a9 9 0 100 12A9 9 0 0012 6zm-2.293 3.293a1 1 0 011.414 0l.001.001.001.001a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414l2-2.001z" />
    </svg>
);

const riskLevelColorsPDF = {
    High: { border: '#ef4444', bg: '#fee2e2', text: '#b91c1c' },
    Moderate: { border: '#f59e0b', bg: '#fef3c7', text: '#b45309' },
    Low: { border: '#22c55e', bg: '#dcfce7', text: '#166534' }
};

export const ReportPDF = forwardRef<HTMLDivElement, ReportPDFProps>(({ result, profile }, ref) => {
    
    return (
        <div ref={ref} className="bg-white text-black p-10 font-sans" style={{ width: '100%', height: '100%', fontSize: '10px' }}>
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4">
                <div className="flex items-center space-x-3">
                    <DnaIcon />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">AI Genetic Counsellor</h1>
                        <p className="text-gray-600">Personalized Health Insight Report</p>
                    </div>
                </div>
                <div className="text-right text-xs">
                    <p><strong>Date Generated:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Patient Age:</strong> {profile.age} | <strong>Sex:</strong> {profile.sex}</p>
                </div>
            </div>

            {/* Section A: Patient Overview */}
            <div className="my-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b">Section A: Patient Overview</h2>
                <p className="text-gray-700">{result.patientOverview}</p>
            </div>

            {/* Section B: Detected Health Conditions */}
            <div className="my-4">
                 <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b">Section B: Detected Health Conditions</h2>
                 {result.detectedConditions.length > 0 ? (
                    <div className="space-y-4">
                        {result.detectedConditions.map(condition => {
                            const colors = riskLevelColorsPDF[condition.riskLevel];
                            return (
                                <div key={condition.diseaseName} style={{ borderLeft: `4px solid ${colors.border}`, backgroundColor: colors.bg, padding: '12px', borderRadius: '4px' }}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-base font-bold" style={{color: colors.text}}>{condition.diseaseName}</h3>
                                        <span className="font-bold" style={{color: colors.text}}>{condition.riskLevel} Risk</span>
                                    </div>
                                    <p className="my-2">
                                        Your estimated risk is <strong>{condition.patientRisk}%</strong>, compared to an average population risk of {condition.averageRisk}%.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <h4 className="font-semibold mb-1">Top Contributing Factors:</h4>
                                            <ul className="list-disc list-inside text-xs">
                                                {condition.contributingFactors.map((f, i) => <li key={i}>{f}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Recommendations:</h4>
                                            <ul className="list-disc list-inside text-xs">
                                                {condition.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                 ) : (
                    <div style={{ borderLeft: '4px solid #22c55e', backgroundColor: '#dcfce7', padding: '12px', borderRadius: '4px', color: '#166534' }}>
                        <h3 className="font-bold">No Significant Increased Risks Detected</h3>
                        <p className="mt-1 text-xs">Based on the provided DNA data and family history, our analysis did not find any significant markers for increased hereditary risk. Continue to maintain a healthy lifestyle and consult with your healthcare provider for routine screenings.</p>
                    </div>
                 )}
            </div>

            {/* Section C: Lifestyle Review */}
            <div className="my-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b">Section C: Lifestyle Review</h2>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <h3 className="font-semibold mb-1" style={{color: '#b91c1c'}}>Habits to Improve</h3>
                        {result.lifestyleSummary.habitsToImprove.length > 0 ? (
                             <ul className="list-disc list-inside text-xs">
                                {result.lifestyleSummary.habitsToImprove.map((h, i) => <li key={i}>{h}</li>)}
                            </ul>
                        ) : <p className="text-xs">None identified.</p>}
                    </div>
                     <div>
                        <h3 className="font-semibold mb-1" style={{color: '#166534'}}>Habits to Maintain</h3>
                         {result.lifestyleSummary.habitsToMaintain.length > 0 ? (
                             <ul className="list-disc list-inside text-xs">
                                {result.lifestyleSummary.habitsToMaintain.map((h, i) => <li key={i}>{h}</li>)}
                            </ul>
                        ) : <p className="text-xs">None identified.</p>}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center text-xs text-gray-500 absolute bottom-10 left-10 right-10">
                <p><strong>Disclaimer:</strong> This report is generated by an AI model and is for informational purposes only. It is not a medical diagnosis. Consult with a qualified healthcare professional for medical advice.</p>
            </div>
        </div>
    );
});