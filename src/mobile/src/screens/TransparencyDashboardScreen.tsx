import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

const TransparencyDashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const [stats] = useState({
    totalReported: 1247,
    resolved: 924,
    pending: 234,
    inProgress: 89,
    avgResolutionTime: 3.2,
    citizenSatisfaction: 87,
    budgetAllocated: 2500000,
    budgetSpent: 1875000,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: 16,
    },
    headerCard: {
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
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 16,
    },
    metricCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      width: (width - 44) / 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    metricIcon: {
      marginBottom: 8,
    },
    metricValue: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    metricLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    chartCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 16,
    },
    performanceCard: {
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
    performanceTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 16,
    },
    performanceMetric: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    performanceLabel: {
      fontSize: 14,
      color: theme.colors.text,
      flex: 1,
    },
    performanceValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    progressBar: {
      height: 6,
      backgroundColor: theme.colors.border,
      borderRadius: 3,
      marginTop: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 3,
    },
    budgetContainer: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    budgetRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    budgetLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    budgetValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
  });

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
    labelColor: (opacity = 1) => theme.colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  // Chart data
  const resolutionTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [78, 82, 85, 79, 88, 92],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const categoryData = {
    labels: ['Roads', 'Water', 'Electric', 'Waste', 'Safety'],
    datasets: [
      {
        data: [234, 189, 156, 123, 98],
      },
    ],
  };

  const statusDistribution = [
    {
      name: 'Resolved',
      population: stats.resolved,
      color: '#10B981',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Pending',
      population: stats.pending,
      color: '#F59E0B',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'In Progress',
      population: stats.inProgress,
      color: '#3B82F6',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
  ];

  const formatCurrency = (amount: number) => {
    const inLakhs = amount / 100000;
    return `₹${inLakhs.toFixed(1)}L`;
  };

  const resolutionRate = Math.round((stats.resolved / stats.totalReported) * 100);
  const budgetUtilization = Math.round((stats.budgetSpent / stats.budgetAllocated) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>
            {language === 'en' ? 'Transparency Dashboard' : 'पारदर्शिता डैशबोर्ड'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {language === 'en' 
              ? 'Open data on civic issue resolution and government performance'
              : 'नागरिक समस्या समाधान और सरकारी प्रदर्शन पर खुला डेटा'
            }
          </Text>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Ionicons name="document-text" size={28} color="#3B82F6" style={styles.metricIcon} />
            <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{stats.totalReported}</Text>
            <Text style={styles.metricLabel}>
              {language === 'en' ? 'Total Reported' : 'कुल रिपोर्ट'}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="checkmark-circle" size={28} color="#10B981" style={styles.metricIcon} />
            <Text style={[styles.metricValue, { color: '#10B981' }]}>{resolutionRate}%</Text>
            <Text style={styles.metricLabel}>
              {language === 'en' ? 'Resolution Rate' : 'समाधान दर'}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="time" size={28} color="#F59E0B" style={styles.metricIcon} />
            <Text style={[styles.metricValue, { color: '#F59E0B' }]}>{stats.avgResolutionTime}d</Text>
            <Text style={styles.metricLabel}>
              {language === 'en' ? 'Avg Resolution Time' : 'औसत समाधान समय'}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="happy" size={28} color="#8B5CF6" style={styles.metricIcon} />
            <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>{stats.citizenSatisfaction}%</Text>
            <Text style={styles.metricLabel}>
              {language === 'en' ? 'Satisfaction Rate' : 'संतुष्टि दर'}
            </Text>
          </View>
        </View>

        {/* Issue Status Distribution */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>
            {language === 'en' ? 'Issue Status Distribution' : 'समस्या स्थिति वितरण'}
          </Text>
          <PieChart
            data={statusDistribution}
            width={width - 64}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            absolute
          />
        </View>

        {/* Resolution Trend */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>
            {language === 'en' ? 'Monthly Resolution Rate (%)' : 'मासिक समाधान दर (%)'}
          </Text>
          <LineChart
            data={resolutionTrendData}
            width={width - 64}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Issues by Category */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>
            {language === 'en' ? 'Issues by Category' : 'श्रेणी के अनुसार समस्याएं'}
          </Text>
          <BarChart
            data={categoryData}
            width={width - 64}
            height={200}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Performance Metrics */}
        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>
            {language === 'en' ? 'Government Performance' : 'सरकारी प्रदर्शन'}
          </Text>

          <View style={styles.performanceMetric}>
            <Text style={styles.performanceLabel}>
              {language === 'en' ? 'Issue Resolution Rate' : 'समस्या समाधान दर'}
            </Text>
            <Text style={styles.performanceValue}>{resolutionRate}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { backgroundColor: '#10B981', width: `${resolutionRate}%` }
              ]} 
            />
          </View>

          <View style={styles.performanceMetric}>
            <Text style={styles.performanceLabel}>
              {language === 'en' ? 'Average Response Time' : 'औसत प्रतिक्रिया समय'}
            </Text>
            <Text style={styles.performanceValue}>{stats.avgResolutionTime} days</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { backgroundColor: '#F59E0B', width: '75%' }
              ]} 
            />
          </View>

          <View style={styles.performanceMetric}>
            <Text style={styles.performanceLabel}>
              {language === 'en' ? 'Citizen Satisfaction' : 'नागरिक संतुष्टि'}
            </Text>
            <Text style={styles.performanceValue}>{stats.citizenSatisfaction}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { backgroundColor: '#8B5CF6', width: `${stats.citizenSatisfaction}%` }
              ]} 
            />
          </View>

          {/* Budget Information */}
          <View style={styles.budgetContainer}>
            <Text style={[styles.performanceTitle, { fontSize: 16, marginBottom: 12 }]}>
              {language === 'en' ? 'Budget Transparency' : 'बजट पारदर्शिता'}
            </Text>
            
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>
                {language === 'en' ? 'Allocated Budget:' : 'आवंटित बजट:'}
              </Text>
              <Text style={styles.budgetValue}>{formatCurrency(stats.budgetAllocated)}</Text>
            </View>

            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>
                {language === 'en' ? 'Amount Spent:' : 'खर्च की गई राशि:'}
              </Text>
              <Text style={styles.budgetValue}>{formatCurrency(stats.budgetSpent)}</Text>
            </View>

            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>
                {language === 'en' ? 'Utilization Rate:' : 'उपयोग दर:'}
              </Text>
              <Text style={[styles.budgetValue, { color: theme.colors.primary }]}>
                {budgetUtilization}%
              </Text>
            </View>

            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { backgroundColor: theme.colors.primary, width: `${budgetUtilization}%` }
                ]} 
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransparencyDashboardScreen;