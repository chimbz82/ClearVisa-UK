
import React from 'react';

export type QuestionType = 'singleSelect' | 'multiSelect' | 'boolean' | 'number' | 'currency' | 'date' | 'shortText';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface QuestionConfig {
  id: string;
  route: 'shared' | 'spouse' | 'skilledWorker';
  section: string;
  label: string;
  placeholder?: string;
  helpText?: string;
  type: QuestionType;
  options?: QuestionOption[];
  conditionalOn?: {
    questionId: string;
    values: string[];
  };
}

export interface AssessmentResult {
  verdict: 'likely' | 'borderline' | 'unlikely';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskFlags: string[];
  summary: string;
  nextSteps: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface UseCase {
  title: string;
  description: string;
  icon: React.ReactNode;
}
