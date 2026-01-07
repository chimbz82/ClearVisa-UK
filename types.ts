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

export interface SectionScore {
  name: string;
  score: number; // 0-100
  status: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  detail: string;
}

export interface AssessmentResult {
  verdict: 'likely' | 'borderline' | 'unlikely';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskFlags: string[];
  summary: string;
  nextSteps: string[];
  // New structured fields for Tiered depth
  sectionScores: SectionScore[];
  remediationSteps?: { issue: string; resolution: string }[];
  sampleWording?: { section: string; text: string }[];
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