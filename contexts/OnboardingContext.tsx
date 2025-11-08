import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingData {
  style: 'realistic' | 'anime' | null;
  ethnicity: 'caucasian' | 'asian' | 'arab' | 'african' | 'latina' | null;
  age: number;
  bodyType: 'slim' | 'athletic' | 'curvy' | 'thicc' | null;
  breastSize: 'small' | 'medium' | 'large' | 'huge' | null;
  bootySize: 'small' | 'medium' | 'athletic' | 'large' | null;
  hairStyle: 'straight' | 'wavy' | 'braids' | 'bun' | 'curly' | 'ponytail' | null;
  hairColor: 'black' | 'brunette' | 'blonde' | 'pink' | 'redhead' | null;
  eyeColor: 'brown' | 'blue' | 'green' | null;
  voice: 'cute' | 'student' | 'soft' | 'dominant' | null;
  relationship: 'step-sister' | 'step-mom' | 'girlfriend' | 'fuck-buddy' | null;
  personality: 'stepsister' | 'cute' | null;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (key: keyof OnboardingData, value: any) => void;
  resetData: () => void;
}

const defaultData: OnboardingData = {
  style: null,
  ethnicity: null,
  age: 30,
  bodyType: null,
  breastSize: null,
  bootySize: null,
  hairStyle: null,
  hairColor: null,
  eyeColor: null,
  voice: null,
  relationship: null,
  personality: null,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(defaultData);

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const resetData = () => {
    setData(defaultData);
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

