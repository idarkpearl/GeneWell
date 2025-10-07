import { GoogleGenAI, Type } from "@google/genai";
import type { PatientProfile, AnalysisResult, ChatMessage } from '../types';

const apiKey = "AIzaSyByytgeiLDc65VTEt-8OO-grZmgaIjobKg"
if (!apiKey) {
  throw new Error("API_KEY environment variable is missing.");
}
const ai = new GoogleGenAI({ apiKey });
const model = "gemini-2.5-flash";

const getProfileSummary = (profile: PatientProfile): string => {
  const familyHistorySummary = Object.entries(profile.familyHistory)
    .filter(([key, value]) => value === true && !['other', 'otherText'].includes(key))
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()))
    .join(', ');

  const otherHistory = profile.familyHistory.other && profile.familyHistory.otherText
    ? `Other: ${profile.familyHistory.otherText}`
    : '';

  const labValuesSummary = [
    profile.clinical.bloodSugar && `Blood Sugar: ${profile.clinical.bloodSugar} mg/dL`,
    profile.clinical.cholesterol && `Cholesterol: ${profile.clinical.cholesterol} mg/dL`,
    profile.clinical.bpSystolic && profile.clinical.bpDiastolic && `Blood Pressure: ${profile.clinical.bpSystolic}/${profile.clinical.bpDiastolic} mmHg`
  ].filter(Boolean).join('\n      - ');

  const clinicalTestFileSummary = profile.clinical.clinicalTestFile
    ? `- A clinical test result file named "${profile.clinical.clinicalTestFile.name}" was also provided.`
    : '';

  const dnaDataSummary = `A DNA file and/or sequence was provided for genomic analysis.`;

  return `
    Patient Profile:
    - Age: ${profile.age}
    - Sex: ${profile.sex}
    - BMI: ${profile.bmi > 0 ? profile.bmi.toFixed(1) : 'N/A'}

    Lifestyle:
    - Smoking Status: ${profile.lifestyle.smoker}
    - Alcohol Consumption: ${profile.lifestyle.alcohol}
    - Exercise Frequency: ${profile.lifestyle.exerciseFrequency} times per week
    - Diet: ${profile.lifestyle.diet}
    - Sleep Duration: ${profile.lifestyle.sleep} hours per night

    Family History: ${familyHistorySummary || 'None reported'}
    ${otherHistory ? `- ${otherHistory}` : ''}

    ${profile.clinical.notes ? `Clinical Notes:\n    """\n    ${profile.clinical.notes}\n    """\n` : ''}
    
    ${labValuesSummary ? `Lab Values:\n      - ${labValuesSummary}\n` : ''}
    ${clinicalTestFileSummary ? `    ${clinicalTestFileSummary}\n` : ''}

    Genomic Data:
    ${dnaDataSummary}
    `;
};

export const generateAiInsights = async (profile: PatientProfile): Promise<AnalysisResult> => {
  const prompt = `
    You are an AI Genetic Counsellor. Your role is to analyze a patient's profile and generate a focused, easy-to-understand health risk report.

    **CRITICAL INSTRUCTIONS:**
    1.  **DETECT, DON'T ASSUME:** Analyze the patient's family history, lifestyle, genomic data indicators, and clinical data to identify relevant disease risks. ONLY include diseases where there is a clear indicator in the provided data (e.g., family history of diabetes, clinical notes mentioning BRCA1 mutation, lifestyle habits pointing to heart disease).
    2.  **FOCUSED OUTPUT:** If no significant risk markers are found, the "detectedConditions" array in your JSON output MUST be empty.
    3.  **RISK LEVEL:** For each detected condition, you MUST assign a "riskLevel" of "High", "Moderate", or "Low".

    **PATIENT DATA:**
    ${getProfileSummary(profile)}

    **TASK:**
    Based on the patient data, generate a JSON response with the following structure.

    **JSON OUTPUT SCHEMA:**
    {
      "patientOverview": "A brief, 1-2 sentence summary of the patient's profile, e.g., 'A 35-year-old female with a family history of diabetes and a generally active lifestyle.'",
      "detectedConditions": [
        {
          "diseaseName": "e.g., Type 2 Diabetes",
          "patientRisk": 25,
          "averageRisk": 15,
          "riskLevel": "High",
          "contributingFactors": [
            "Family history of diabetes",
            "BMI is slightly elevated"
          ],
          "recommendations": [
            "Monitor blood sugar levels regularly.",
            "Consider incorporating more fiber into your diet."
          ]
        }
      ],
      "lifestyleSummary": {
        "habitsToImprove": [
          "Reducing alcohol consumption can lower long-term health risks."
        ],
        "habitsToMaintain": [
          "Exercising 3-4 times a week is excellent for cardiovascular health."
        ]
      }
    }

    **NO RISK SCENARIO EXAMPLE:**
    If the patient is healthy, with no family history and a good lifestyle, return an empty \`detectedConditions\` array and a positive \`patientOverview\`. The \`lifestyleSummary\` should praise their good habits in \`habitsToMaintain\`.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patientOverview: { type: Type.STRING },
            detectedConditions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  diseaseName: { type: Type.STRING },
                  patientRisk: { type: Type.NUMBER },
                  averageRisk: { type: Type.NUMBER },
                  riskLevel: { type: Type.STRING, enum: ['High', 'Moderate', 'Low'] },
                  contributingFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
                  recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['diseaseName', 'patientRisk', 'averageRisk', 'riskLevel', 'contributingFactors', 'recommendations']
              }
            },
            lifestyleSummary: {
              type: Type.OBJECT,
              properties: {
                habitsToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
                habitsToMaintain: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['habitsToImprove', 'habitsToMaintain']
            }
          },
          required: ['patientOverview', 'detectedConditions', 'lifestyleSummary'],
        },
      },
    });

    if (!response.text) {
      throw new Error("Gemini API response did not contain text.");
    }

    let result: AnalysisResult;
    try {
      result = JSON.parse(response.text.trim());
    } catch (jsonError) {
      throw new Error("Failed to parse Gemini API response as JSON.");
    }

    if (
      typeof result !== "object" ||
      !result.patientOverview ||
      !result.detectedConditions ||
      !result.lifestyleSummary
    ) {
      throw new Error("Gemini API response does not match expected schema.");
    }

    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate AI insights.");
  }
};

export const getChatbotResponse = async (
  profile: PatientProfile,
  analysis: AnalysisResult,
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  const detectedConditionsSummary =
    analysis.detectedConditions.length > 0
      ? analysis.detectedConditions
          .map(
            (c) =>
              `- ${c.diseaseName} (Risk: ${c.riskLevel}, ${c.patientRisk}% vs ${c.averageRisk}% avg)`
          )
          .join('\n')
      : 'No significant hereditary or lifestyle disease risks were detected.';

  const context = `
        You are a friendly and helpful AI health assistant. Your purpose is to answer questions about a user's genetic and lifestyle health report.
        You MUST base your answers on the following patient data and analysis results. Do not provide generic advice.
        Keep your answers concise, empathetic, and easy to understand. Avoid technical jargon.

        --- PATIENT CONTEXT ---
        ${getProfileSummary(profile)}

        --- ANALYSIS RESULTS ---
        Patient Overview: ${analysis.patientOverview}
        
        Detected Conditions & Risks:
        ${detectedConditionsSummary}

        Lifestyle Summary:
        - Habits to Improve: ${analysis.lifestyleSummary.habitsToImprove.join(', ') || 'None'}
        - Habits to Maintain: ${analysis.lifestyleSummary.habitsToMaintain.join(', ') || 'None'}
        
        --- END CONTEXT ---
    `;

  const chatHistory = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  }));

  try {
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: context,
      },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text ?? "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error calling Gemini API for chatbot:", error);
    return "I'm sorry, I encountered an error and can't respond right now. Please try again later.";
  }
};