import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import NewHabitScreen from '../screens/NewHabitScreen';
import HabitDetailScreen from '../screens/HabitDetailScreen';
import { RootStackParamList } from '../types/navigation';
import { colors, fontSize, fontWeight } from '../utils/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontSize: fontSize.title,
          fontWeight: fontWeight.semibold,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NewHabit"
        component={NewHabitScreen}
        options={({ navigation }) => ({
          title: 'Novo hábito',
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: fontSize.bodyLg,
                  fontWeight: fontWeight.medium,
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="HabitDetail"
        component={HabitDetailScreen}
        options={{ title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}
