import React, { useState, useEffect } from 'react';
import type { PatientProfile } from '../types';

interface InputFormProps {
  onSubmit: (data: PatientProfile) => void;
}

const initialFormData: PatientProfile = {
  age: 35,
  sex: 'female',
  height: 165,
  weight: 68,
  bmi: 0,
  lifestyle: {
    smoker: 'never',
    alcohol: 'rarely',
    exerciseFrequency: '1-2',
    diet: 'mixed',
    sleep: '6-8',
  },
  familyHistory: {
    diabetes: false,
    celiac: false,
    breastCancer: false,
    heartDisease: false,
    hypertension: false,
    alzheimers: false,
    colonCancer: false,
    prostateCancer: false,
    other: false,
    otherText: '',
  },
  clinical: {
    notes: '',
    bloodSugar: '',
    cholesterol: '',
    bpSystolic: '',
    bpDiastolic: '',
    clinicalTestFile: null,
  },
};

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PatientProfile>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const [section, key] = name.split('.');

    setFormData(prev => {
      // Create a new object with shallow copies of nested objects to avoid mutation
      const newFormData = {
        ...prev,
        lifestyle: { ...prev.lifestyle },
        familyHistory: { ...prev.familyHistory },
        clinical: { ...prev.clinical },
      };

      if (section === 'lifestyle' || section === 'familyHistory' || section === 'clinical') {
        if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            (newFormData[section] as any)[key] = file;
        } else {
            const isCheckbox = type === 'checkbox';
            const checkedValue = (e.target as HTMLInputElement).checked;
            (newFormData[section] as any)[key] = isCheckbox ? checkedValue : value;
        }
      } else {
        (newFormData as any)[name] = type === 'number' && value !== '' ? parseFloat(value) : value;
      }
      return newFormData;
    });
  };

  useEffect(() => {
    const heightM = Number(formData.height) / 100;
    const weightKg = Number(formData.weight);
    if (heightM > 0 && weightKg > 0) {
      const bmi = weightKg / (heightM * heightM);
      setFormData(prev => ({ ...prev, bmi: isFinite(bmi) ? bmi : 0 }));
    } else {
      setFormData(prev => ({ ...prev, bmi: 0 }));
    }
  }, [formData.height, formData.weight]);
  
  useEffect(() => {
    onSubmit(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const familyHistoryOptions = [
    { id: 'diabetes', label: 'Type 2 Diabetes' },
    { id: 'celiac', label: 'Celiac Disease' },
    { id: 'breastCancer', label: 'Hereditary Breast/Ovarian Cancer' },
    { id: 'heartDisease', label: 'Heart Disease' },
    { id: 'hypertension', label: 'Hypertension' },
    { id: 'alzheimers', label: 'Alzheimer’s / Dementia' },
    { id: 'colonCancer', label: 'Colon Cancer' },
    { id: 'prostateCancer', label: 'Prostate Cancer' },
  ];

  return (
    <div className="space-y-8">
      {/* Personal & Lifestyle */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">1. Personal & Lifestyle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InputItem label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />
          <SelectItem label="Sex" name="sex" value={formData.sex} onChange={handleChange} options={['female', 'male', 'other']} />
          <InputItem label="Height (cm)" name="height" type="number" value={formData.height} onChange={handleChange} />
          <InputItem label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} />
          <SelectItem label="Smoking Status" name="lifestyle.smoker" value={formData.lifestyle.smoker} onChange={handleChange} options={['never', 'former', 'current']} />
          <SelectItem label="Alcohol Consumption" name="lifestyle.alcohol" value={formData.lifestyle.alcohol} onChange={handleChange} options={['never', 'rarely', 'moderately', 'frequently']} />
          <SelectItem label="Exercise (times/week)" name="lifestyle.exerciseFrequency" value={formData.lifestyle.exerciseFrequency} onChange={handleChange} options={['never', '1-2', '3-4', '5+']} />
          <SelectItem label="Diet Type" name="lifestyle.diet" value={formData.lifestyle.diet} onChange={handleChange} options={['mixed', 'vegetarian', 'non-vegetarian', 'vegan']} />
          <SelectItem label="Sleep (hours/night)" name="lifestyle.sleep" value={formData.lifestyle.sleep} onChange={handleChange} options={['6-8', '<6', '>8']} />
        </div>
      </div>

      {/* Family History */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">2. Family History</h3>
        <p className="text-sm text-gray-500 mb-4">Select conditions affecting immediate family members.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {familyHistoryOptions.map(opt => (
            <CheckboxItem key={opt.id} id={`familyHistory.${opt.id}`} label={opt.label} checked={formData.familyHistory[opt.id as keyof typeof formData.familyHistory] as boolean} onChange={handleChange} />
          ))}
          <CheckboxItem id="familyHistory.other" label="Other" checked={formData.familyHistory.other} onChange={handleChange} />
        </div>
        {formData.familyHistory.other && (
          <div className="mt-4">
            <InputItem label="Please specify other conditions" name="familyHistory.otherText" type="text" value={formData.familyHistory.otherText} onChange={handleChange} />
          </div>
        )}
      </div>

      {/* Clinical Notes & Lab Tests */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">3. Clinical Notes & Lab Tests</h3>
        <div className="space-y-6">
          <div>
            <label htmlFor="clinical.notes" className="block text-sm font-medium text-gray-600">Clinical Notes</label>
            <p className="text-xs text-gray-500 mt-1 mb-2">Provide relevant information by typing notes below, or by uploading a document.</p>
            <textarea name="clinical.notes" id="clinical.notes" value={formData.clinical.notes} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g., Doctor/family history notes..."></textarea>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">OR</span>
            </div>
          </div>

          <FileInputItem 
            label="Upload Clinical Document" 
            name="clinical.clinicalTestFile" 
            onChange={handleChange} 
            fileName={formData.clinical.clinicalTestFile?.name}
            optional
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-gray-200">
            <InputItem label="Blood Sugar (mg/dL)" name="clinical.bloodSugar" type="number" value={formData.clinical.bloodSugar} onChange={handleChange} optional />
            <InputItem label="Cholesterol (mg/dL)" name="clinical.cholesterol" type="number" value={formData.clinical.cholesterol} onChange={handleChange} optional />
            <InputItem label="Blood Pressure (Systolic)" name="clinical.bpSystolic" type="number" value={formData.clinical.bpSystolic} onChange={handleChange} optional />
            <InputItem label="Blood Pressure (Diastolic)" name="clinical.bpDiastolic" type="number" value={formData.clinical.bpDiastolic} onChange={handleChange} optional />
             <div>
                <label className="block text-sm font-medium text-gray-600">Calculated BMI</label>
                <div className="mt-1 h-[38px] flex items-center px-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                  {formData.bmi > 0 ? formData.bmi.toFixed(1) : 'N/A'}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper sub-components for form elements ---
const InputItem = ({ label, name, type, value, onChange, optional = false }: any) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label} {optional && <span className="text-gray-400">(Optional)</span>}</label>
    <input type={type} name={name} id={name} value={value} onChange={onChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
);

const SelectItem = ({ label, name, value, onChange, options }: any) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>
    <select name={name} id={name} value={value} onChange={onChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm capitalize">
      {options.map((opt: string) => <option key={opt} value={opt}>{opt.replace('-', ' ')}</option>)}
    </select>
  </div>
);

const CheckboxItem = ({ id, label, checked, onChange }: any) => (
  <div className="flex items-center">
    <input id={id} name={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
    <label htmlFor={id} className="ml-3 block text-sm font-medium text-gray-700">{label}</label>
  </div>
);

const FileInputItem = ({ label, name, onChange, fileName, optional = false }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label} {optional && <span className="text-gray-400">(Optional PDF, JPG, etc.)</span>}</label>
    <div className="mt-1 flex items-center">
      <label htmlFor={name} className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span>Choose File</span>
        <input id={name} name={name} type="file" className="sr-only" onChange={onChange} />
      </label>
      {fileName && <span className="ml-3 text-sm text-gray-500 truncate" title={fileName}>{fileName}</span>}
    </div>
  </div>
);