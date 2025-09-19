import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface AssignedIssue {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'assigned' | 'in-progress' | 'completed';
  assignedDate: string;
  dueDate: string;
  location: string;
}

const StaffDashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const [assignedIssues] = useState<AssignedIssue[]>([
    {
      id: '1',
      title: 'Repair broken street light on MG Road',
      category: 'electricity',
      priority: 'high',
      status: 'assigned',
      assignedDate: '2024-01-15',
      dueDate: '2024-01-17',
      location: 'MG Road, Sector 15',
    },
    {
      id: '2',
      title: 'Fix pothole on Highway Junction',
      category: 'roads',
      priority: 'high',
      status: 'in-progress',
      assignedDate: '2024-01-14',
      dueDate: '2024-01-18',
      location: 'Highway Junction, Phase 2',
    },
    {
      id: '3',
      title: 'Clean up garbage accumulation',
      category: 'waste',
      priority: 'medium',
      status: 'completed',
      assignedDate: '2024-01-13',
      dueDate: '2024-01-15',
      location: 'Green Valley Apartments',
    },
  ]);

  const stats = {
    assigned: assignedIssues.filter(issue => issue.status === 'assigned').length,
    inProgress: assignedIssues.filter(issue => issue.status === 'in-progress').length,
    completed: assignedIssues.filter(issue => issue.status === 'completed').length,
    overdue: 1, // Mock data
  };

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
    statsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 20,
    },
    statCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      flex: 1,
      minWidth: 150,
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
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 12,
    },
    issueCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    issueHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    issueTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      flex: 1,
      marginRight: 12,
    },
    priorityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      minWidth: 60,
      alignItems: 'center',
    },
    priorityText: {
      fontSize: 12,
      fontWeight: '600',
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    issueMetadata: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    metadataItem: {
      flex: 1,
    },
    metadataLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 2,
    },
    metadataValue: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    locationText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginLeft: 4,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryAction: {
      backgroundColor: theme.colors.primary,
    },
    secondaryAction: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    actionButtonText: {
      fontSize: 12,
      fontWeight: '600',
    },
    primaryActionText: {
      color: 'white',
    },
    secondaryActionText: {
      color: theme.colors.text,
    },
  });

  const getPriorityColor = (priority: AssignedIssue['priority']) => {
    switch (priority) {
      case 'high':
        return { backgroundColor: '#FEE2E2', color: '#DC2626' };
      case 'medium':
        return { backgroundColor: '#FEF3C7', color: '#D97706' };
      case 'low':
        return { backgroundColor: '#D1FAE5', color: '#059669' };
      default:
        return { backgroundColor: theme.colors.background, color: theme.colors.text };
    }
  };

  const getStatusColor = (status: AssignedIssue['status']) => {
    switch (status) {
      case 'assigned':
        return { backgroundColor: '#DBEAFE', color: '#1D4ED8' };
      case 'in-progress':
        return { backgroundColor: '#FEF3C7', color: '#D97706' };
      case 'completed':
        return { backgroundColor: '#D1FAE5', color: '#059669' };
      default:
        return { backgroundColor: theme.colors.background, color: theme.colors.text };
    }
  };

  const getStatusText = (status: AssignedIssue['status']) => {
    switch (status) {
      case 'assigned':
        return language === 'en' ? 'Assigned' : 'सौंपा गया';
      case 'in-progress':
        return language === 'en' ? 'In Progress' : 'प्रगति में';
      case 'completed':
        return language === 'en' ? 'Completed' : 'पूर्ण';
      default:
        return status;
    }
  };

  const getPriorityText = (priority: AssignedIssue['priority']) => {
    switch (priority) {
      case 'high':
        return language === 'en' ? 'High' : 'उच्च';
      case 'medium':
        return language === 'en' ? 'Medium' : 'मध्यम';
      case 'low':
        return language === 'en' ? 'Low' : 'कम';
      default:
        return priority;
    }
  };

  const renderIssueCard = ({ item }: { item: AssignedIssue }) => (
    <View style={styles.issueCard}>
      <View style={styles.issueHeader}>
        <Text style={styles.issueTitle}>{item.title}</Text>
        <View style={[styles.priorityBadge, getPriorityColor(item.priority)]}>
          <Text style={[styles.priorityText, { color: getPriorityColor(item.priority).color }]}>
            {getPriorityText(item.priority)}
          </Text>
        </View>
      </View>

      <View style={[styles.statusBadge, getStatusColor(item.status)]}>
        <Text style={[styles.statusText, { color: getStatusColor(item.status).color }]}>
          {getStatusText(item.status)}
        </Text>
      </View>

      <View style={styles.locationContainer}>
        <Ionicons name="location" size={14} color={theme.colors.textSecondary} />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      <View style={styles.issueMetadata}>
        <View style={styles.metadataItem}>
          <Text style={styles.metadataLabel}>
            {language === 'en' ? 'Assigned' : 'सौंपा गया'}
          </Text>
          <Text style={styles.metadataValue}>{item.assignedDate}</Text>
        </View>
        <View style={styles.metadataItem}>
          <Text style={styles.metadataLabel}>
            {language === 'en' ? 'Due Date' : 'नियत तारीख'}
          </Text>
          <Text style={styles.metadataValue}>{item.dueDate}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        {item.status === 'assigned' && (
          <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
            <Text style={[styles.actionButtonText, styles.primaryActionText]}>
              {language === 'en' ? 'Start Work' : 'काम शुरू करें'}
            </Text>
          </TouchableOpacity>
        )}
        {item.status === 'in-progress' && (
          <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
            <Text style={[styles.actionButtonText, styles.primaryActionText]}>
              {language === 'en' ? 'Mark Complete' : 'पूर्ण करें'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
          <Text style={[styles.actionButtonText, styles.secondaryActionText]}>
            {language === 'en' ? 'View Details' : 'विवरण देखें'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>
            {language === 'en' ? 'Staff Dashboard' : 'स्टाफ डैशबोर्ड'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {language === 'en' 
              ? 'Manage assigned issues and track progress'
              : 'सौंपी गई समस्याओं का प्रबंधन और प्रगति ट्रैक करें'
            }
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="clipboard" size={24} color="#3B82F6" style={styles.statIcon} />
            <Text style={[styles.statValue, { color: '#3B82F6' }]}>{stats.assigned}</Text>
            <Text style={styles.statLabel}>
              {language === 'en' ? 'Assigned' : 'सौंपे गए'}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="construct" size={24} color="#F59E0B" style={styles.statIcon} />
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>{stats.inProgress}</Text>
            <Text style={styles.statLabel}>
              {language === 'en' ? 'In Progress' : 'प्रगति में'}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#10B981" style={styles.statIcon} />
            <Text style={[styles.statValue, { color: '#10B981' }]}>{stats.completed}</Text>
            <Text style={styles.statLabel}>
              {language === 'en' ? 'Completed' : 'पूर्ण'}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#EF4444" style={styles.statIcon} />
            <Text style={[styles.statValue, { color: '#EF4444' }]}>{stats.overdue}</Text>
            <Text style={styles.statLabel}>
              {language === 'en' ? 'Overdue' : 'विलंबित'}
            </Text>
          </View>
        </View>

        {/* Assigned Issues */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'My Assigned Issues' : 'मेरी सौंपी गई समस्याएं'}
        </Text>
        
        <FlatList
          data={assignedIssues}
          renderItem={renderIssueCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffDashboardScreen;