import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

// Context Providers
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Screens
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ReportIssueScreen from './src/screens/ReportIssueScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import StaffDashboardScreen from './src/screens/StaffDashboardScreen';
import TransparencyDashboardScreen from './src/screens/TransparencyDashboardScreen';
import RegistrationSuccessScreen from './src/screens/RegistrationSuccessScreen';

// Services
import { initializeNotifications } from './src/services/NotificationService';
import { requestLocationPermission } from './src/services/LocationService';

// Types
export type UserRole = 'user' | 'staff' | 'admin';

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  registrationDate?: string;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  ReportIssue: undefined;
  AdminDashboard: undefined;
  StaffDashboard: undefined;
  TransparencyDashboard: undefined;
  RegistrationSuccess: { userData: UserData };
};

export type MainTabParamList = {
  Home: undefined;
  Report: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }: any) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingBottom: 20,
        paddingTop: 10,
        elevation: 8,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined 
          ? options.tabBarLabel 
          : options.title !== undefined 
          ? options.title 
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIconName = (routeName: string) => {
          switch (routeName) {
            case 'Home':
              return isFocused ? 'home' : 'home-outline';
            case 'Report':
              return isFocused ? 'add-circle' : 'add-circle-outline';
            case 'Notifications':
              return isFocused ? 'notifications' : 'notifications-outline';
            case 'Profile':
              return isFocused ? 'person' : 'person-outline';
            default:
              return 'help-outline';
          }
        };

        const getTranslationKey = (routeName: string) => {
          switch (routeName) {
            case 'Home':
              return 'home';
            case 'Report':
              return 'report';
            case 'Notifications':
              return 'notifications';
            case 'Profile':
              return 'profile';
            default:
              return routeName.toLowerCase();
          }
        };

        return (
          <View
            key={route.key}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                backgroundColor: isFocused ? `${theme.colors.primary}20` : 'transparent',
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 20,
                minWidth: 60,
                alignItems: 'center',
              }}
            >
              <Ionicons
                name={getIconName(route.name) as any}
                size={24}
                color={isFocused ? theme.colors.primary : theme.colors.textSecondary}
                onPress={onPress}
              />
              <Text
                onPress={onPress}
                style={{
                  color: isFocused ? theme.colors.primary : theme.colors.textSecondary,
                  fontSize: 12,
                  marginTop: 2,
                  fontWeight: isFocused ? '600' : '400',
                }}
              >
                {t(getTranslationKey(route.name))}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

// Main Tab Navigator
function MainTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Report" component={ReportIssueScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// App Content (inside providers)
function AppContent() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
          'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
          'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
        });

        // Initialize notifications
        await initializeNotifications();

        // Request location permission
        await requestLocationPermission();

        // Check authentication status
        const authData = await AsyncStorage.getItem('@auth_data');
        if (authData) {
          const { isAuthenticated: authStatus, userRole: role, userData: user } = JSON.parse(authData);
          setIsAuthenticated(authStatus);
          setUserRole(role);
          setUserData(user);
        }
      } catch (error) {
        console.error('App initialization error:', error);
        Alert.alert(t('error'), 'Failed to initialize app. Please restart.');
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  const handleLogin = async (role: UserRole, data: UserData) => {
    try {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserData(data);

      // Save authentication data
      await AsyncStorage.setItem('@auth_data', JSON.stringify({
        isAuthenticated: true,
        userRole: role,
        userData: data,
      }));
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(t('error'), 'Failed to save login data');
    }
  };

  const handleLogout = async () => {
    try {
      setIsAuthenticated(false);
      setUserRole('user');
      setUserData(null);

      // Clear authentication data
      await AsyncStorage.removeItem('@auth_data');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.colors.background 
      }}>
        <Text style={{ color: theme.colors.text }}>{t('loading')}</Text>
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        dark: theme.isDark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.accent,
        },
      }}
    >
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth">
            {(props) => <AuthScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="AdminDashboard" 
              component={AdminDashboardScreen}
              options={{
                headerShown: true,
                title: t('adminDashboard'),
                headerStyle: {
                  backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.text,
              }}
            />
            <Stack.Screen 
              name="StaffDashboard" 
              component={StaffDashboardScreen}
              options={{
                headerShown: true,
                title: t('staffDashboard'),
                headerStyle: {
                  backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.text,
              }}
            />
            <Stack.Screen 
              name="TransparencyDashboard" 
              component={TransparencyDashboardScreen}
              options={{
                headerShown: true,
                title: t('transparencyDashboard'),
                headerStyle: {
                  backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.text,
              }}
            />
            <Stack.Screen 
              name="RegistrationSuccess" 
              component={RegistrationSuccessScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}