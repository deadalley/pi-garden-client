import React, { Suspense, memo } from 'react';
import { Text, View } from 'react-native';
import { NetworkErrorBoundary } from 'rest-hooks';
import AppLoading from 'expo-app-loading';

import AppRouting from './routes';
import { OnboardingScreen } from './screens/onboarding-screen';
import { Spinner } from './components/spinner';

import { useLoadAsync } from './utils/use-load-async';

import { useAppDispatch, useAppSelector } from './store.hooks';
import { setOnboardingComplete } from './redux/onboarding.slice';

import { SessionService } from './services/session.service';
import { FONT_STYLES, COLORS, PADDING } from './styles';

export default memo(() => {
  const dispatch = useAppDispatch();
  const [_, done] = useLoadAsync(() =>
    SessionService.getItem('onboardingComplete').then((onboardingComplete) =>
      dispatch(setOnboardingComplete(onboardingComplete))
    )
  );

  const onboardingComplete = useAppSelector((state) => state.onboarding.onboardingComplete);

  if (!done) return <AppLoading />;

  if (true || !onboardingComplete) return <OnboardingScreen />;

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Spinner />
        </View>
      }
    >
      <NetworkErrorBoundary
        fallbackComponent={({ error }) => {
          return (
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                padding: PADDING.BIG,
              }}
            >
              <Text style={{ ...FONT_STYLES.h3, color: COLORS.MAIN_DARK }}>Error</Text>
              <Text style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_MEDIUM }}>
                Uh oh, something went wrong!
              </Text>
              <Text style={{ ...FONT_STYLES.text, color: COLORS.MAIN_DARK }}>{error.message}</Text>
            </View>
          );
        }}
      >
        <AppRouting />
      </NetworkErrorBoundary>
    </Suspense>
  );
});
