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
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
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
    quickActionText: {
      fontSize: 12,
      fontWeight: '600',
      color: 'white',
      textAlign: 'center',
      marginTop: 8,
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
    issueTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8,
    },
    issueDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    issueImage: {
      width: '100%',
      height: 150,
      borderRadius: 12,
      marginBottom: 12,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
      marginBottom: 8,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
  });

  const mockIssues: Issue[] = [
    {
      id: '1',
      title: 'Broken Street Light on MG Road',
      description: 'The street light near the bus stop has been non-functional for over a week.',
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
      description: 'Large pothole causing traffic congestion and vehicle damage.',
      category: 'roads',
      status: 'in-progress',
      location: 'Highway Junction, Phase 2',
      upvotes: 45,
      comments: 12,
      timestamp: '5 hours ago',
      priority: 'high',
    },
  ];

  useEffect(() => {
    setIssues(mockIssues);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setIssues([...mockIssues]);
      setRefreshing(false);
    }, 1000);
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

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Report' as never)}
          >
            <LinearGradient
              colors={['#0EA5E9', '#06B6D4']}
              style={[styles.quickActionButton, { flex: 1 }]}
            >
              <Ionicons name="add-circle" size={24} color="white" />
              <Text style={styles.quickActionText}>{t('reportIssue')}</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('TransparencyDashboard' as never)}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={[styles.quickActionButton, { flex: 1 }]}
            >
              <Ionicons name="stats-chart" size={24} color="white" />
              <Text style={styles.quickActionText}>{t('transparencyDashboard')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.issuesContainer}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Recent Issues' : 'हाल की समस्याएं'}
          </Text>

          {issues.map((issue) => (
            <View key={issue.id} style={styles.issueCard}>
              <Text style={styles.issueTitle}>{issue.title}</Text>
              
              <View style={[styles.statusBadge, getStatusColor(issue.status)]}>
                <Text style={[styles.statusText, { color: getStatusColor(issue.status).color }]}>
                  {getStatusText(issue.status)}
                </Text>
              </View>

              {issue.imageUrl && (
                <Image source={{ uri: issue.imageUrl }} style={styles.issueImage} />
              )}

              <Text style={styles.issueDescription} numberOfLines={2}>
                {issue.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;