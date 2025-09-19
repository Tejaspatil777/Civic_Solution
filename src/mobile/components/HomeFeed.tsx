import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  location: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  user: {
    name: string;
    avatar?: string;
  };
}

export const HomeFeed: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [likedIssues, setLikedIssues] = useState<Set<string>>(new Set());

  const { theme } = useTheme();
  const { language, t } = useLanguage();

  // Mock data
  const mockIssues: Issue[] = [
    {
      id: '1',
      title: language === 'en' ? 'Pothole on MG Road' : 'एमजी रोड पर गड्ढा',
      description: language === 'en' 
        ? 'Large pothole causing traffic issues near metro station' 
        : 'मेट्रो स्टेशन के पास बड़ा गड्ढा ट्रैफिक की समस्या पैदा कर रहा है',
      category: 'roads',
      status: 'pending',
      location: 'MG Road, Sector 15',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      likes: 24,
      comments: 8,
      timeAgo: language === 'en' ? '2 hours ago' : '2 घंटे पहले',
      user: {
        name: 'Rajesh Kumar',
      },
    },
    {
      id: '2',
      title: language === 'en' ? 'Water Supply Issue' : 'पानी की आपूर्ति की समस्या',
      description: language === 'en' 
        ? 'No water supply for 3 days in Sector 12' 
        : 'सेक्टर 12 में 3 दिन से पानी की आपूर्ति नहीं',
      category: 'water',
      status: 'in-progress',
      location: 'Sector 12, Noida',
      likes: 45,
      comments: 12,
      timeAgo: language === 'en' ? '5 hours ago' : '5 घंटे पहले',
      user: {
        name: 'Priya Singh',
      },
    },
    {
      id: '3',
      title: language === 'en' ? 'Garbage Collection Delayed' : 'कचरा संग्रह में देरी',
      description: language === 'en' 
        ? 'Garbage not collected for a week, causing hygiene issues' 
        : 'एक सप्ताह से कचरा नहीं उठाया गया, स्वच्छता की समस्या',
      category: 'garbage',
      status: 'resolved',
      location: 'Sector 18, Noida',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
      likes: 18,
      comments: 5,
      timeAgo: language === 'en' ? '1 day ago' : '1 दिन पहले',
      user: {
        name: 'Amit Sharma',
      },
    },
  ];

  useEffect(() => {
    setIssues(mockIssues);
  }, [language]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIssues([...mockIssues]);
      setRefreshing(false);
    }, 1000);
  };

  const toggleLike = (issueId: string) => {
    const newLikedIssues = new Set(likedIssues);
    if (likedIssues.has(issueId)) {
      newLikedIssues.delete(issueId);
    } else {
      newLikedIssues.add(issueId);
    }
    setLikedIssues(newLikedIssues);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return ['#FEF3C7', '#FDE68A'];
      case 'in-progress':
        return ['#DBEAFE', '#BFDBFE'];
      case 'resolved':
        return ['#D1FAE5', '#A7F3D0'];
      default:
        return ['#F3F4F6', '#E5E7EB'];
    }
  };

  const getStatusText = (status: string) => {
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
        return '🛣️';
      case 'water':
        return '💧';
      case 'garbage':
        return '🗑️';
      case 'electricity':
        return '⚡';
      default:
        return '🏢';
    }
  };

  const renderIssueCard = (issue: Issue) => (
    <View key={issue.id} style={[styles.card, { backgroundColor: theme.colors.card }, theme.shadows.medium]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>
              {issue.user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, { color: theme.colors.foreground }]}>
              {issue.user.name}
            </Text>
            <Text style={[styles.timeAgo, { color: theme.colors.mutedForeground }]}>
              {issue.timeAgo}
            </Text>
          </View>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryEmoji}>{getCategoryIcon(issue.category)}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={[styles.issueTitle, { color: theme.colors.foreground }]}>
          {issue.title}
        </Text>
        <Text style={[styles.issueDescription, { color: theme.colors.mutedForeground }]}>
          {issue.description}
        </Text>
        
        <View style={styles.locationContainer}>
          <Icon name="map-pin" size={14} color={theme.colors.primary} />
          <Text style={[styles.location, { color: theme.colors.primary }]}>
            {issue.location}
          </Text>
        </View>
      </View>

      {/* Image */}
      {issue.image && (
        <Image source={{ uri: issue.image }} style={styles.issueImage} />
      )}

      {/* Status */}
      <View style={styles.statusContainer}>
        <LinearGradient
          colors={getStatusColor(issue.status)}
          style={styles.statusBadge}
        >
          <Text style={[styles.statusText, { color: theme.colors.foreground }]}>
            {getStatusText(issue.status)}
          </Text>
        </LinearGradient>
      </View>

      {/* Actions */}
      <View style={[styles.actions, { borderTopColor: theme.colors.border }]}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLike(issue.id)}
        >
          <Icon
            name={likedIssues.has(issue.id) ? 'heart' : 'heart'}
            size={18}
            color={likedIssues.has(issue.id) ? '#EF4444' : theme.colors.mutedForeground}
            fill={likedIssues.has(issue.id) ? '#EF4444' : 'none'}
          />
          <Text style={[styles.actionText, { color: theme.colors.mutedForeground }]}>
            {issue.likes + (likedIssues.has(issue.id) ? 1 : 0)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="message-circle" size={18} color={theme.colors.mutedForeground} />
          <Text style={[styles.actionText, { color: theme.colors.mutedForeground }]}>
            {issue.comments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={18} color={theme.colors.mutedForeground} />
          <Text style={[styles.actionText, { color: theme.colors.mutedForeground }]}>
            {t('share')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.feedHeader}>
          <Text style={[styles.feedTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Community Feed' : 'समुदायिक फ़ीड'}
          </Text>
          <Text style={[styles.feedSubtitle, { color: theme.colors.mutedForeground }]}>
            {language === 'en' ? 'Latest civic issues from your area' : 'आपके क्षेत्र की नवीनतम नागरिक समस्याएं'}
          </Text>
        </View>

        {/* Issues */}
        {issues.map(renderIssueCard)}

        {/* Load More */}
        <TouchableOpacity style={[styles.loadMoreButton, { borderColor: theme.colors.border }]}>
          <Text style={[styles.loadMoreText, { color: theme.colors.primary }]}>
            {language === 'en' ? 'Load More Issues' : 'और समस्याएं लोड करें'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 100, // For tab bar
  },
  feedHeader: {
    paddingVertical: 20,
  },
  feedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  feedSubtitle: {
    fontSize: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 14,
    marginTop: 2,
  },
  categoryBadge: {
    padding: 8,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  issueDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  issueImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  statusContainer: {
    padding: 16,
    paddingTop: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  loadMoreButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  loadMoreText: {
    fontSize: 16,
    fontWeight: '600',
  },
});