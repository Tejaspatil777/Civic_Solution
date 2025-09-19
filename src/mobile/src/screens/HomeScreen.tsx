import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  location: string;
  upvotes: number;
  comments: number;
  imageUrl?: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const navigation = useNavigation();
  
  const [issues, setIssues] = useState<Issue[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    greeting: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    subGreeting: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    quickActions: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 12,
    },
    quickActionButton: {
      flex: 1,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    quickActionIcon: {
      marginBottom: 8,
    },
    quickActionText: {
      fontSize: 12,
      fontWeight: '600',
      color: 'white',
      textAlign: 'center',
    },
    filterContainer: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    filterScroll: {
      flexDirection: 'row',
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    activeFilterButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterText: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
    },
    activeFilterText: {
      color: 'white',
    },
    issuesContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 16,
    },
    issueCard: {
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
    issueHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    issueTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      flex: 1,
      marginRight: 12,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      minWidth: 80,
      alignItems: 'center',
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    issueImage: {
      width: '100%',
      height: 150,
      borderRadius: 12,
      marginBottom: 12,
    },
    issueDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    issueMetadata: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    locationText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginLeft: 4,
    },
    issueActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    actionText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    priorityIndicator: {
      width: 4,
      height: '100%',
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      position: 'absolute',
      left: 0,
      top: 0,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  // Mock data
  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    // Simulate API call
    const mockIssues: Issue[] = [
      {
        id: '1',
        title: 'Broken Street Light on MG Road',
        description: 'The street light near the bus stop has been non-functional for over a week, causing safety concerns for pedestrians.',
        category: 'electricity',
        status: 'pending',
        location: 'MG Road, Sector 15',
        upvotes: 24,
        comments: 5,
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        timestamp: '2 hours ago',
        priority: 'high',
      },
      {
        id: '2',
        title: 'Pothole on Highway Junction',
        description: 'Large pothole causing traffic congestion and vehicle damage. Multiple vehicles have been affected.',
        category: 'roads',
        status: 'in-progress',
        location: 'Highway Junction, Phase 2',
        upvotes: 45,
        comments: 12,
        imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400',
        timestamp: '5 hours ago',
        priority: 'high',
      },
      {
        id: '3',
        title: 'Garbage Collection Delayed',
        description: 'Residential area garbage has not been collected for 3 days. Starting to create hygiene issues.',
        category: 'waste',
        status: 'resolved',
        location: 'Green Valley Apartments',
        upvotes: 18,
        comments: 3,
        timestamp: '1 day ago',
        priority: 'medium',
      },
      {
        id: '4',
        title: 'Water Supply Interruption',
        description: 'No water supply for the past 12 hours in the residential complex. Affecting over 200 families.',
        category: 'water',
        status: 'pending',
        location: 'Sunrise Residency',
        upvotes: 67,
        comments: 23,
        timestamp: '8 hours ago',
        priority: 'high',
      },
      {
        id: '5',
        title: 'Park Maintenance Required',
        description: 'Playground equipment needs repair and grass cutting is overdue. Children safety is a concern.',
        category: 'environment',
        status: 'in-progress',
        location: 'Central Park, Block A',
        upvotes: 12,
        comments: 7,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
        timestamp: '1 day ago',
        priority: 'low',
      },
    ];

    setIssues(mockIssues);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadIssues();
    setRefreshing(false);
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return { backgroundColor: '#FEF3C7', color: '#92400E' };
      case 'in-progress':
        return { backgroundColor: '#DBEAFE', color: '#1E40AF' };
      case 'resolved':
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
      default:
        return { backgroundColor: theme.colors.background, color: theme.colors.text };
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return theme.colors.border;
    }
  };

  const getStatusText = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return t('pending');
      case 'in-progress':
        return t('inProgress');
      case 'resolved':
        return t('resolved');
      default:
        return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'roads':
        return 'car';
      case 'water':
        return 'water';
      case 'electricity':
        return 'flash';
      case 'waste':
        return 'trash';
      case 'safety':
        return 'shield';
      case 'environment':
        return 'leaf';
      default:
        return 'alert-circle';
    }
  };

  const filteredIssues = filter === 'all' ? issues : issues.filter(issue => issue.status === filter);

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity 
        style={[styles.quickActionButton]}
        onPress={() => navigation.navigate('Report' as never)}
      >
        <LinearGradient
          colors={['#0EA5E9', '#06B6D4']}
          style={[styles.quickActionButton, { flex: 1 }]}
        >
          <Ionicons name="add-circle" size={24} color="white" style={styles.quickActionIcon} />
          <Text style={styles.quickActionText}>{t('reportIssue')}</Text>
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.quickActionButton]}
        onPress={() => navigation.navigate('TransparencyDashboard' as never)}
      >
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={[styles.quickActionButton, { flex: 1 }]}
        >
          <Ionicons name="stats-chart" size={24} color="white" style={styles.quickActionIcon} />
          <Text style={styles.quickActionText}>{t('transparencyDashboard')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderFilterButtons = () => {
    const filters = [
      { key: 'all', label: 'All' },
      { key: 'pending', label: t('pending') },
      { key: 'in-progress', label: t('inProgress') },
      { key: 'resolved', label: t('resolved') },
    ];

    return (
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {filters.map((filterOption) => (
            <TouchableOpacity
              key={filterOption.key}
              style={[
                styles.filterButton,
                filter === filterOption.key && styles.activeFilterButton,
              ]}
              onPress={() => setFilter(filterOption.key as any)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === filterOption.key && styles.activeFilterText,
                ]}
              >
                {filterOption.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderIssueCard = (issue: Issue) => (
    <TouchableOpacity key={issue.id} style={styles.issueCard}>
      <View
        style={[
          styles.priorityIndicator,
          { backgroundColor: getPriorityColor(issue.priority) },
        ]}
      />
      
      <View style={styles.issueHeader}>
        <Text style={styles.issueTitle}>{issue.title}</Text>
        <View style={[styles.statusBadge, getStatusColor(issue.status)]}>
          <Text style={[styles.statusText, { color: getStatusColor(issue.status).color }]}>
            {getStatusText(issue.status)}
          </Text>
        </View>
      </View>

      {issue.imageUrl && (
        <Image source={{ uri: issue.imageUrl }} style={styles.issueImage} />
      )}

      <Text style={styles.issueDescription} numberOfLines={2}>
        {issue.description}
      </Text>

      <View style={styles.issueMetadata}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {issue.location}
          </Text>
        </View>

        <View style={styles.issueActions}>
          <View style={styles.actionContainer}>
            <Ionicons name="arrow-up" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.actionText}>{issue.upvotes}</Text>
          </View>
          <View style={styles.actionContainer}>
            <Ionicons name="chatbubble" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.actionText}>{issue.comments}</Text>
          </View>
          <View style={styles.actionContainer}>
            <Ionicons
              name={getCategoryIcon(issue.category) as any}
              size={14}
              color={theme.colors.textSecondary}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {language === 'en' ? 'Good Morning!' : 'शुभ प्रभात!'}
          </Text>
          <Text style={styles.subGreeting}>
            {language === 'en' 
              ? 'Let\'s make our community better together' 
              : 'आइए मिलकर अपने समुदाय को बेहतर बनाएं'
            }
          </Text>
        </View>

        {renderQuickActions()}
        {renderFilterButtons()}

        <View style={styles.issuesContainer}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Recent Issues' : 'हाल की समस्याएं'}
          </Text>

          {filteredIssues.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={64} color={theme.colors.textSecondary} />
              <Text style={styles.emptyText}>
                {language === 'en' 
                  ? 'No issues found for the selected filter' 
                  : 'चयनित फ़िल्टर के लिए कोई समस्या नहीं मिली'
                }
              </Text>
            </View>
          ) : (
            filteredIssues.map(renderIssueCard)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;