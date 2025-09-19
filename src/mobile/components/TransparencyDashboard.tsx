import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';

interface TransparencyDashboardProps {
  language: 'en' | 'hi';
}

const { width } = Dimensions.get('window');

export const TransparencyDashboard: React.FC<TransparencyDashboardProps> = ({ language }) => {
  const { theme } = useTheme();

  const stats = [
    {
      id: 'total',
      value: '1,247',
      label: language === 'en' ? 'Total Issues' : 'कुल समस्याएं',
      icon: 'flag',
      color: theme.colors.primary,
      change: '+12%',
    },
    {
      id: 'resolved',
      value: '943',
      label: language === 'en' ? 'Resolved' : 'हल हुई',
      icon: 'check-circle',
      color: theme.colors.secondary,
      change: '+8%',
    },
    {
      id: 'pending',
      value: '201',
      label: language === 'en' ? 'Pending' : 'लंबित',
      icon: 'clock',
      color: '#F59E0B',
      change: '-5%',
    },
    {
      id: 'progress',
      value: '103',
      label: language === 'en' ? 'In Progress' : 'प्रगति में',
      icon: 'refresh-ccw',
      color: '#8B5CF6',
      change: '+15%',
    },
  ];

  const categories = [
    {
      id: 'roads',
      name: language === 'en' ? 'Roads' : 'सड़कें',
      total: 423,
      resolved: 312,
      percentage: 74,
      icon: '🛣️',
    },
    {
      id: 'water',
      name: language === 'en' ? 'Water' : 'पानी',
      total: 298,
      resolved: 245,
      percentage: 82,
      icon: '💧',
    },
    {
      id: 'garbage',
      name: language === 'en' ? 'Garbage' : 'कचरा',
      total: 234,
      resolved: 198,
      percentage: 85,
      icon: '🗑️',
    },
    {
      id: 'electricity',
      name: language === 'en' ? 'Electricity' : 'बिजली',
      total: 167,
      resolved: 134,
      percentage: 80,
      icon: '⚡',
    },
    {
      id: 'other',
      name: language === 'en' ? 'Other' : 'अन्य',
      total: 125,
      resolved: 54,
      percentage: 43,
      icon: '🏢',
    },
  ];

  const monthlyData = [
    { month: language === 'en' ? 'Jan' : 'जन', reported: 89, resolved: 76 },
    { month: language === 'en' ? 'Feb' : 'फर', reported: 124, resolved: 98 },
    { month: language === 'en' ? 'Mar' : 'मार', reported: 156, resolved: 142 },
    { month: language === 'en' ? 'Apr' : 'अप्र', reported: 178, resolved: 165 },
    { month: language === 'en' ? 'May' : 'मई', reported: 134, resolved: 128 },
    { month: language === 'en' ? 'Jun' : 'जून', reported: 145, resolved: 139 },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Transparency Dashboard' : 'पारदर्शिता डैशबोर्ड'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.mutedForeground }]}>
            {language === 'en' ? 'Real-time civic issue statistics' : 'रियल-टाइम नागरिक समस्या आंकड़े'}
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.id} style={[styles.statCard, { backgroundColor: theme.colors.card }, theme.shadows.medium]}>
              <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Icon name={stat.icon} size={18} color={stat.color} />
                </View>
                <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? theme.colors.secondary : theme.colors.destructive }]}>
                  {stat.change}
                </Text>
              </View>
              <Text style={[styles.statValue, { color: theme.colors.foreground }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.mutedForeground }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Resolution Rate */}
        <View style={[styles.resolutionCard, { backgroundColor: theme.colors.card }, theme.shadows.medium]}>
          <Text style={[styles.cardTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Overall Resolution Rate' : 'समग्र समाधान दर'}
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressRing}>
              <LinearGradient
                colors={theme.gradients.blueGreen}
                style={styles.progressGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.progressInner, { backgroundColor: theme.colors.card }]}>
                  <Text style={[styles.progressValue, { color: theme.colors.foreground }]}>
                    76%
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.progressDetails}>
              <Text style={[styles.progressText, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Average resolution time: 3.2 days' : 'औसत समाधान समय: 3.2 दिन'}
              </Text>
              <Text style={[styles.progressText, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Citizen satisfaction: 4.2/5' : 'नागरिक संतुष्टि: 4.2/5'}
              </Text>
            </View>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={[styles.categoryCard, { backgroundColor: theme.colors.card }, theme.shadows.medium]}>
          <Text style={[styles.cardTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Issues by Category' : 'श्रेणी के अनुसार समस्याएं'}
          </Text>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.categoryDetails}>
                    <Text style={[styles.categoryName, { color: theme.colors.foreground }]}>
                      {category.name}
                    </Text>
                    <Text style={[styles.categoryStats, { color: theme.colors.mutedForeground }]}>
                      {category.resolved}/{category.total} {language === 'en' ? 'resolved' : 'हल'}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.categoryPercentage, { color: theme.colors.foreground }]}>
                  {category.percentage}%
                </Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.muted }]}>
                <LinearGradient
                  colors={theme.gradients.blueGreen}
                  style={[styles.progressFill, { width: `${category.percentage}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Monthly Trends */}
        <View style={[styles.trendsCard, { backgroundColor: theme.colors.card }, theme.shadows.medium]}>
          <Text style={[styles.cardTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Monthly Trends' : 'मासिक रुझान'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.chartContainer}>
              {monthlyData.map((data, index) => {
                const maxValue = Math.max(...monthlyData.map(d => Math.max(d.reported, d.resolved)));
                const reportedHeight = (data.reported / maxValue) * 120;
                const resolvedHeight = (data.resolved / maxValue) * 120;
                
                return (
                  <View key={index} style={styles.chartBar}>
                    <View style={styles.barContainer}>
                      <View style={[styles.bar, { 
                        height: reportedHeight, 
                        backgroundColor: theme.colors.primary + '60' 
                      }]} />
                      <View style={[styles.bar, { 
                        height: resolvedHeight, 
                        backgroundColor: theme.colors.secondary,
                        position: 'absolute',
                        bottom: 0,
                      }]} />
                    </View>
                    <Text style={[styles.chartLabel, { color: theme.colors.mutedForeground }]}>
                      {data.month}
                    </Text>
                    <Text style={[styles.chartValue, { color: theme.colors.foreground }]}>
                      {data.resolved}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.legendText, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Reported' : 'रिपोर्ट की गई'}
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: theme.colors.secondary }]} />
              <Text style={[styles.legendText, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Resolved' : 'हल हुई'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // For tab bar
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    width: (width - 44) / 2, // Account for padding and gap
    padding: 16,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  resolutionCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 8,
    marginBottom: 16,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressDetails: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    marginBottom: 4,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryStats: {
    fontSize: 12,
    marginTop: 2,
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  trendsCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  chartBar: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 40,
  },
  barContainer: {
    height: 120,
    width: 20,
    justifyContent: 'flex-end',
    position: 'relative',
    marginBottom: 8,
  },
  bar: {
    width: '100%',
    borderRadius: 2,
  },
  chartLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  chartValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
  },
});