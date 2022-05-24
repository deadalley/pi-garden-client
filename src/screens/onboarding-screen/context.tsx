import { createContext } from 'react';

export const OnboardingContext = createContext({
  currentIndex: 0,
  setCurrentIndex: (c: number) => {},
});
OnboardingContext.displayName = 'OnboardingContext';
