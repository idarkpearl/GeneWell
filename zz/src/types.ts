export interface PatientProfile {
  age: number | string;
  sex: 'male' | 'female' | 'other';
  height: number | string; // cm
  weight: number | string; // kg
  bmi: number; // calculated

  lifestyle: {
    smoker: 'never' | 'former' | 'current';
    alcohol: 'never' | 'rarely' | 'moderately' | 'frequently';
    exerciseFrequency: 'never' | '1-2' | '3-4' | '5+';
    diet: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'mixed';
    sleep: '<6' | '6-8' | '>8';
  };

  familyHistory: {
    diabetes: boolean;
    celiac: boolean;
    breastCancer: boolean;
    heartDisease: boolean;
    hypertension: boolean;
    alzheimers: boolean;
    colonCancer: boolean;
    prostateCancer: boolean;
    other: boolean; // Checkbox for 'Other'
    otherText: string; // Text for 'Other'
  };

  clinical: {
    notes: string;
    bloodSugar: number | string;
    cholesterol: number | string;
    bpSystolic: number | string;
    bpDiastolic: number | string;
    clinicalTestFile?: File | null;
  }
}

export interface DetectedCondition {
  diseaseName: string;
  patientRisk: number;
  averageRisk: number;
  riskLevel: 'High' | 'Moderate' | 'Low';
  contributingFactors: string[];
  recommendations: string[];
}

export interface LifestyleSummary {
  habitsToImprove: string[];
  habitsToMaintain: string[];
}

export interface AnalysisResult {
  patientOverview: string;
  detectedConditions: DetectedCondition[];
  lifestyleSummary: LifestyleSummary;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
export interface AiInsights {
  recommendations: Array<{
    title: string;
    details: string;
  }>;
  // other properties
  contributingFactors: Array<{
    factor: string;
    impact: string;
    isGenetic: boolean;
  }>;
}

export interface RiskScore {
  disease: string;
  risk: number;
  averageRisk: number;
}

export interface CardData {
    id: string | number;
    image: string;
    title: string;
    description: string;
}