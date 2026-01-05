
import React from 'react';

export type QuestionType = 'singleSelect' | 'multiSelect' | 'boolean' | 'number' | 'currency' | 'date' | 'shortText' | 'longText';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface QuestionConfig {
  id: string;
  section: string;
  label: string;
  placeholder?: string;
  helpText?: string;
  type: QuestionType;
  options?: QuestionOption[];
  showIf: (ctx: { tier: string; route: string; answers: Record<string, any> }) => boolean;
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
