import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import MainTabs from './src/navigation/MainTabs';
import { HabitProvider } from './src/context/HabitContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="light" />
        </NavigationContainer>
      </HabitProvider>
    </SafeAreaProvider>
  );
}
