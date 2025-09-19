import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  dark: boolean;
  colors: {
    // Primary colors
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    
    // Background colors
    background: string;
    backgroundSolid: string;
    surface: string;
    card: string;
    cardForeground: string;
    
    // Text colors
    foreground: string;
    muted: string;
    mutedForeground: string;
    
    // Interactive colors
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    
    // Borders and separators
    border: string;
    separator: string;
    
    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // CivicFix specific colors
    civicBlue: string;
    civicGreen: string;
    blueGreen: string;
  };
  navigationTheme: {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  };
  gradients: {
    background: string[];
    blueGreen: string[];
    card: string[];
  };
  shadows: {
    small: any;
    medium: any;
    large: any;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#0EA5E9',
    primaryForeground: '#ffffff',
    secondary: '#10B981',
    secondaryForeground: '#ffffff',
    
    background: '#F0F9FF',
    backgroundSolid: '#F0F9FF',
    surface: '#ffffff',
    card: 'rgba(255, 255, 255, 0.9)',
    cardForeground: '#0F172A',
    
    foreground: '#0F172A',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    
    accent: '#06B6D4',
    accentForeground: '#ffffff',
    destructive: '#EF4444',
    destructiveForeground: '#ffffff',
    
    border: 'rgba(14, 165, 233, 0.2)',
    separator: '#E2E8F0',
    
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#0EA5E9',
    
    civicBlue: '#0EA5E9',
    civicGreen: '#10B981',
    blueGreen: '#06B6D4',
  },
  navigationTheme: {
    dark: false,
    colors: {
      primary: '#0EA5E9',
      background: '#F0F9FF',
      card: '#ffffff',
      text: '#0F172A',
      border: 'rgba(14, 165, 233, 0.2)',
      notification: '#EF4444',
    },
  },
  gradients: {
    background: ['#E3F2FD', '#E8F5E8'],
    blueGreen: ['#0EA5E9', '#06B6D4', '#10B981'],
    card: ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'],
  },
  shadows: {
    small: {
      shadowColor: '#0EA5E9',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#0EA5E9',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#0EA5E9',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
};

const darkTheme: Theme = {
  ...lightTheme,
  dark: true,
  colors: {
    primary: '#38BDF8',
    primaryForeground: '#0F172A',
    secondary: '#34D399',
    secondaryForeground: '#0F172A',
    
    background: '#0F172A',
    backgroundSolid: '#0F172A',
    surface: '#1E293B',
    card: 'rgba(30, 41, 59, 0.9)',
    cardForeground: '#F8FAFC',
    
    foreground: '#F8FAFC',
    muted: '#1E293B',
    mutedForeground: '#94A3B8',
    
    accent: '#22D3EE',
    accentForeground: '#0F172A',
    destructive: '#F87171',
    destructiveForeground: '#0F172A',
    
    border: 'rgba(56, 189, 248, 0.3)',
    separator: '#334155',
    
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#38BDF8',
    
    civicBlue: '#38BDF8',
    civicGreen: '#34D399',
    blueGreen: '#22D3EE',
  },
  navigationTheme: {
    dark: true,
    colors: {
      primary: '#38BDF8',
      background: '#0F172A',
      card: '#1E293B',
      text: '#F8FAFC',
      border: 'rgba(56, 189, 248, 0.3)',
      notification: '#F87171',
    },
  },
  gradients: {
    background: ['#0F172A', '#134E4A'],
    blueGreen: ['#38BDF8', '#22D3EE', '#34D399'],
    card: ['rgba(30, 41, 59, 0.9)', 'rgba(30, 41, 59, 0.7)'],
  },
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadThemePreference();
    
    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only auto-switch if user hasn't manually set a preference
      checkAutoThemeSwitch(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themePreference');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      } else {
        // Default to system preference
        const systemColorScheme = Appearance.getColorScheme();
        setIsDark(systemColorScheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const checkAutoThemeSwitch = async (colorScheme: ColorSchemeName) => {
    try {
      const savedTheme = await AsyncStorage.getItem('themePreference');
      // Only auto-switch if no manual preference is set
      if (!savedTheme) {
        setIsDark(colorScheme === 'dark');
      }
    } catch (error) {
      console.error('Error checking auto theme switch:', error);
    }
  };

  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    try {
      await AsyncStorage.setItem('themePreference', newIsDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};