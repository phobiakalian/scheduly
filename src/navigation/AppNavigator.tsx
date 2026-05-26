import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import JadwalScreen from '../screens/JadwalScreen';
import TugasScreen from '../screens/TugasScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FormJadwalScreen from '../screens/FormJadwalScreen';
import FormTugasScreen from '../screens/FormTugasScreen';
import { COLORS } from '../theme/colors';
import { useAuthStore } from '../store/useAuthStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: COLORS.bgCard, borderTopColor: COLORS.border, borderTopWidth: 1, paddingTop: 8, height: 64 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'calendar';
          if (route.name === 'JadwalTab') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'TugasTab') iconName = focused ? 'checkbox-marked-circle' : 'checkbox-outline';
          else if (route.name === 'SettingsTab') iconName = focused ? 'cog' : 'cog-outline';
          return <Icon name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Beranda', tabBarButton: () => null }} />
      <Tab.Screen name="JadwalTab" component={JadwalScreen} options={{ tabBarLabel: 'Jadwal' }} />
      <Tab.Screen name="TugasTab" component={TugasScreen} options={{ tabBarLabel: 'Tugas' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="FormJadwal" component={FormJadwalScreen} />
          <Stack.Screen name="FormTugas" component={FormTugasScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}