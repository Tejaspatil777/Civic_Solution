import React, { createContext, useContext, useState, useEffect } from 'react';
import { StatusBarStyle } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  // Colors
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  
  // Gradients
  primaryGradient: string[];
  backgroundGradient: string[];
  
  // UI Elements
  border: string;
  divider: string;
  ripple: string;
  overlay: string;
  
  // Status bar
  statusBarStyle: StatusBarStyle;
  
  // Shadows
  shadowColor: string;
  
  // Input
  inputBackground: string;
  inputBorder: string;
  
  // Button variants
  buttonPrimary: string;
  buttonSecondary: string;
  buttonText: string;
}

const lightTheme: Theme = {
  background: '#F0F9FF',
  surface: '#FFFFFF',
  card: 'rgba(255, 255, 255, 0.9)',
  text: '#0F172A',
  textSecondary: '#64748B',
  primary: '#1D9BF0',
  secondary: '#34C759',
  accent: '#06B6D4',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  primaryGradient: ['#1D9BF0', '#06B6D4', '#34C759'],
  backgroundGradient: ['#E3F2FD', '#E8F5E8'],
  
  border: 'rgba(29, 155, 240, 0.2)',
  divider: '#E2E8F0',
  ripple: 'rgba(29, 155, 240, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  statusBarStyle: 'auto' as StatusBarStyle,
  
  shadowColor: '#000000',
  
  inputBackground: 'rgba(255, 255, 255, 0.8)',
  inputBorder: 'rgba(29, 155, 240, 0.3)',
  
  buttonPrimary: '#1D9BF0',
  buttonSecondary: '#34C759',
  buttonText: '#FFFFFF',
};

const darkTheme: Theme = {
  background: '#0F172A',
  surface: '#1E293B',
  card: 'rgba(30, 41, 59, 0.9)',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  primary: '#38BDF8',
  secondary: '#34D399',
  accent: '#22D3EE',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#F87171',
  
  primaryGradient: ['#38BDF8', '#22D3EE', '#34D399'],
  backgroundGradient: ['#0F172A', '#134E4A'],
  
  border: 'rgba(56, 189, 248, 0.3)',
  divider: '#334155',
  ripple: 'rgba(56, 189, 248, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  statusBarStyle: 'light' as StatusBarStyle,
  
  shadowColor: '#000000',
  
  inputBackground: 'rgba(30, 41, 59, 0.8)',
  inputBorder: 'rgba(56, 189, 248, 0.3)',
  
  buttonPrimary: '#38BDF8',
  buttonSecondary: '#34D399',
  buttonText: '#0F172A',
};

interface ThemeContextType {
  isDark: boolean;
  currentTheme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('civicfix_theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('civicfix_theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};