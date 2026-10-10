import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import { MainTabsParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabsParamList>();

type NavigationProp = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;

function NewHabitButton() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewHabit')}
      style={{ marginRight: 16, flexDirection: 'row', alignItems: 'center' }}
    >
      <Ionicons name="add" size={22} color="#fff" />
      <Text style={{ color: '#fff', marginLeft: 4, fontWeight: '600' }}>Novo</Text>
    </TouchableOpacity>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: '#6366F1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Hoje',
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 22 }}>✨</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#fff',
                }}
              >
                Meus Hábitos
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#6366F1',
          },
          headerTintColor: '#fff',
          headerRight: () => <NewHabitButton />,
        }}
      />

      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: 'Estatísticas',
        }}
      />
    </Tab.Navigator>
  );
}