
// Added React import to provide the React namespace required for React.ReactNode
import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface UseCase {
  title: string;
  description: string;
  icon: React.ReactNode;
}
