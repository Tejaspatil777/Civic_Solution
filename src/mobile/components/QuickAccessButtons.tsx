import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

interface QuickAccessButtonsProps {
  userRole: 'user' | 'staff' | 'admin';
  language: 'en' | 'hi';
  onScreenChange: (screen: string) => void;
}

export const QuickAccessButtons: React.FC<QuickAccessButtonsProps> = ({
  userRole,
  language,
  onScreenChange,
}) => {
  const { theme } = useTheme();

  const text = {
    en: {
      adminDashboard: 'Admin Dashboard',
      staffDashboard: 'Staff Dashboard',
      transparencyDashboard: 'View Transparency Dashboard',
    },
    hi: {
      adminDashboard: 'एडमिन डैशबोर्ड',
      staffDashboard: 'स्टाफ डैशबोर्ड',
      transparencyDashboard: 'पारदर्शिता डैशबोर्ड देखें',
    },
  };

  const t = text[language];

  return (
    <View style={styles.container}>
      {/* Admin Dashboard Button */}
      {userRole === 'admin' && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onScreenChange('admin')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={[styles.button, theme.shadows.medium]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.emoji}>🔐</Text>
            <Text style={styles.buttonText}>{t.adminDashboard}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Staff Dashboard Button */}
      {(userRole === 'staff' || userRole === 'admin') && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onScreenChange('staff')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={[styles.button, theme.shadows.medium]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.emoji}>👨‍💼</Text>
            <Text style={styles.buttonText}>{t.staffDashboard}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Transparency Dashboard Button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => onScreenChange('dashboard')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={theme.gradients.blueGreen}
          style={[styles.button, theme.shadows.medium]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.emoji}>📊</Text>
          <Text style={styles.buttonText}>{t.transparencyDashboard}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 8,
  },
  buttonContainer: {
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    minHeight: 60,
  },
  emoji: {
    fontSize: 20,
    marginRight: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});