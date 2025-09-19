import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

const AdminDashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const [stats, setStats] = useState({
    totalIssues: 1247,
    pendingIssues: 234,
    inProgressIssues: 89,
    resolvedIssues: 924,
    totalUsers: 3456,
    activeStaff: 24,
    avgResolutionTime: 3.2,
    satisfactionRate: 87,
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
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 16,
    },
    statCard: {
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
    statIcon: {
      marginBottom: 8,
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    statLabel: {
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
    quickActions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 16,
    },
    actionButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      width: (width - 44) / 2,
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    actionIcon: {
      marginBottom: 8,
    },
    actionText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 12,
      marginTop: 8,
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

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [124, 156, 189, 167, 203, 234],
        color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const barChartData = {
    labels: ['Roads', 'Water', 'Electric', 'Waste', 'Safety'],
    datasets: [
      {
        data: [89, 67, 45, 78, 56],
      },
    ],
  };

  const pieChartData = [
    {
      name: 'Resolved',
      population: stats.resolvedIssues,
      color: '#10B981',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Pending',
      population: stats.pendingIssues,
      color: '#F59E0B',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'In Progress',
      population: stats.inProgressIssues,
      color: '#3B82F6',
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    },
  ];

  const quickActions = [
    {
      title: language === 'en' ? 'Manage Users' : 'उपयोगकर्ता प्रबंधन',
      icon: 'people',
      color: '#3B82F6',
    },
    {
      title: language === 'en' ? 'Staff Management' : 'स्टाफ प्रबंधन',
      icon: 'briefcase',
      color: '#8B5CF6',
    },
    {
      title: language === 'en' ? 'System Settings' : 'सिस्टम सेटिंग्स',
      icon: 'settings',
      color: '#6B7280',
    },
    {
      title: language === 'en' ? 'Reports' : 'रिपोर्ट्स',
      icon: 'document-text',
      color: '#EF4444',
    },
    {
      title: language === 'en' ? 'Announcements' : 'घोषणाएं',
      icon: 'megaphone',
      color: '#F59E0B',
    },
    {
      title: language === 'en' ? 'Analytics' : 'विश्लेषण',
      icon: 'analytics',
      color: '#10B981',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>
            {language === 'en' ? 'Admin Dashboard' : 'एडमिन डैशबोर्ड'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {language === 'en' 
              ? 'System overview and management tools'
              : 'सिस्टम अवलोकन और प्रबंधन उपकरण'
            }
          </Text>
        </View>

        {/* Key Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={32} color="#3B82F6" style={styles.statIcon} />
            <Text style={styles.statValue}>{stats.totalIssues}</Text>
            <Text style={styles.statLabel}>
              {language === 'en' ? 'Total Issues' : 'कुल समस्याएं'}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="people" size={32} color="#10B981" style={styles.statIcon} />
            <Text style={styles.statValue}>{stats.totalUsers}</Text>
            <Text style={styles.statLabel}>
              {language === 'en' ? 'Total Users' : 'कुल उपयोगकर्ता'}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="briefcase" size={32} color="#8B5CF6" style={styles.statIcon} />
            <Text style={styles.statValue}>{stats.activeStaff}</Text>
            <Text style={styles.statLabel}>
              {language === 'en' ? 'Active Staff' : 'सक्रिय स्टाफ'}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="time" size={32} color="#F59E0B" style={styles.statIcon} />
            <Text style={styles.statValue}>{stats.avgResolutionTime}d</Text>
            <Text style={styles.statLabel}>
              {language === 'en' ? 'Avg Resolution' : 'औसत समाधान'}
            </Text>
          </View>
        </View>

        {/* Issue Status Distribution */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>
            {language === 'en' ? 'Issue Status Distribution' : 'समस्या स्थिति वितरण'}
          </Text>
          <PieChart
            data={pieChartData}
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

        {/* Monthly Trend */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>
            {language === 'en' ? 'Issues Reported (Monthly)' : 'रिपोर्ट की गई समस्याएं (मासिक)'}
          </Text>
          <LineChart
            data={lineChartData}
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

        {/* Category Breakdown */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>
            {language === 'en' ? 'Issues by Category' : 'श्रेणी के अनुसार समस्याएं'}
          </Text>
          <BarChart
            data={barChartData}
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

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Quick Actions' : 'त्वरित कार्य'}
        </Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionButton}>
              <Ionicons 
                name={action.icon as any} 
                size={32} 
                color={action.color} 
                style={styles.actionIcon} 
              />
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboardScreen;