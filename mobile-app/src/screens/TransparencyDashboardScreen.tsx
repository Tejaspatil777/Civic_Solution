import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const TransparencyDashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
    },
    statCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    statValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 8,
    },
    statLabel: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language === 'en' ? 'Transparency Dashboard' : 'पारदर्शिता डैशबोर्ड'}
        </Text>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>76%</Text>
          <Text style={styles.statLabel}>
            {language === 'en' ? 'Resolution Rate' : 'समाधान दर'}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>3.2</Text>
          <Text style={styles.statLabel}>
            {language === 'en' ? 'Avg Resolution Time (days)' : 'औसत समाधान समय (दिन)'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransparencyDashboardScreen;