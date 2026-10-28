import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { HabitProvider, useHabits } from './src/context/HabitContext';
import AppSplash from './src/components/AppSplash';
import { colors } from './src/utils/theme';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
  },
};

const SPLASH_MIN_DURATION_MS = 2000;

function AppContent() {
  const { isLoading } = useHabits();
  const [minDurationElapsed, setMinDurationElapsed] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const appReady = !isLoading && minDurationElapsed;

  useEffect(() => {
    const timer = setTimeout(
      () => setMinDurationElapsed(true),
      SPLASH_MIN_DURATION_MS
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!appReady) return;

    Animated.timing(splashOpacity, {
      toValue: 0,
      duration: 400, 
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setSplashVisible(false);
      }
    });
  }, [appReady, splashOpacity]);

  return (
    <View style={styles.root}>
      {appReady && (
        <NavigationContainer theme={navigationTheme}>
          <RootNavigator />
        </NavigationContainer>
      )}

      {splashVisible && (
        <Animated.View style={[styles.splashOverlay, { opacity: splashOpacity }]}>
          <AppSplash />
        </Animated.View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <AppContent />
        <StatusBar style="dark" />
      </HabitProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
  },
});

