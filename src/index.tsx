import React from 'react';
import AppLoading from 'expo-app-loading';

import AppRouting from './routes';
import { OnboardingScreen } from './screens/onboarding-screen';
import { useAppSelector } from './store.hooks';

import { useLoadAsync } from './utils/use-load-async';

import { useAppDispatch } from './store.hooks';
import { setOnboardingComplete } from './redux/onboarding.slice';

import { SessionService } from './services/session.service';

export default () => {
  const dispatch = useAppDispatch();
  const [_, done] = useLoadAsync(() =>
    SessionService.getItem('onboardingComplete').then((onboardingComplete) =>
      dispatch(setOnboardingComplete(onboardingComplete))
    )
  );

  const onboardingComplete = useAppSelector((state) => state.onboarding.onboardingComplete);

  if (!done) return <AppLoading />;

  if (!onboardingComplete) return <OnboardingScreen />;

  return <AppRouting />;
};
