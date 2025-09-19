import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  destructive: string;
  success: string;
  warning: string;
  info: string;
  card: string;
  shadow: string;
}

export interface Theme {
  isDark: boolean;
  colors: ThemeColors;
}

const lightTheme: ThemeColors = {
  primary: '#0EA5E9',
  secondary: '#10B981',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  accent: '#06B6D4',
  destructive: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#0EA5E9',
  card: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkTheme: ThemeColors = {
  primary: '#38BDF8',
  secondary: '#34D399',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#334155',
  accent: '#22D3EE',
  destructive: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  info: '#38BDF8',
  card: '#1E293B',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme_preference');
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        } else {
          const systemColorScheme = Appearance.getColorScheme();
          setIsDark(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.log('Error loading theme preference:', error);
        const systemColorScheme = Appearance.getColorScheme();
        setIsDark(systemColorScheme === 'dark');
      }
    };

    loadTheme();

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      AsyncStorage.getItem('@theme_preference').then((savedTheme) => {
        if (savedTheme === null) {
          setIsDark(colorScheme === 'dark');
        }
      });
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const saveThemePreference = async (theme: boolean) => {
    try {
      await AsyncStorage.setItem('@theme_preference', theme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    saveThemePreference(newTheme);
  };

  const setTheme = (newIsDark: boolean) => {
    setIsDark(newIsDark);
    saveThemePreference(newIsDark);
  };

  const theme: Theme = {
    isDark,
    colors: isDark ? darkTheme : lightTheme,
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};