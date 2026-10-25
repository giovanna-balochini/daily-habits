import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, MainTabsParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import { colors, fontSize, fontWeight, radius, spacing } from '../utils/theme';

const Tab = createBottomTabNavigator<MainTabsParamList>();

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function HomeHeaderTitle() {
  return (
    <View style={styles.headerTitle}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      <Text style={styles.headerTitleText}>Meus Hábitos</Text>
    </View>
  );
}

function NewHabitButton() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => navigation.navigate('NewHabit')}
      activeOpacity={0.8}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="button"
      accessibilityLabel="Criar novo hábito"
    >
      <Ionicons name="add" size={16} color={colors.textInverse} />
      <Text style={styles.headerButtonText}>Novo</Text>
    </TouchableOpacity>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Hoje',
          headerTitle: () => <HomeHeaderTitle />,
          headerTitleAlign: 'left',
          headerRight: () => <NewHabitButton />,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: 'Estatísticas',
          headerTitle: 'Estatísticas',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerLogo: {
    width: 34,
    height: 34,
  },
  headerTitleText: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginRight: spacing.lg,
  },
  headerButtonText: {
    color: colors.textInverse,
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  tabBarLabel: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
  },
  tabBarItem: {
    paddingVertical: spacing.xs,
  },
});
