import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  getStoredNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  NotificationData 
} from '../services/NotificationService';

const NotificationsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    markAllButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
    },
    markAllText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    notificationItem: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
      padding: 16,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    unreadNotification: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    notificationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      flex: 1,
      marginRight: 8,
    },
    notificationTime: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    notificationBody: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: 8,
    },
    notificationFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    notificationType: {
      fontSize: 12,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    readButton: {
      padding: 4,
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

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const storedNotifications = await getStoredNotifications();
      setNotifications(storedNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      await loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      await loadNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
      return language === 'en' ? 'Just now' : 'अभी';
    } else if (minutes < 60) {
      return language === 'en' ? `${minutes}m ago` : `${minutes} मिनट पहले`;
    } else if (hours < 24) {
      return language === 'en' ? `${hours}h ago` : `${hours} घंटे पहले`;
    } else {
      return language === 'en' ? `${days}d ago` : `${days} दिन पहले`;
    }
  };

  const getTypeLabel = (type: NotificationData['type']) => {
    switch (type) {
      case 'issue_update':
        return language === 'en' ? 'Issue Update' : 'समस्या अपडेट';
      case 'system':
        return language === 'en' ? 'System' : 'सिस्टम';
      case 'announcement':
        return language === 'en' ? 'Announcement' : 'घोषणा';
      case 'reminder':
        return language === 'en' ? 'Reminder' : 'रिमाइंडर';
      default:
        return type;
    }
  };

  const renderNotificationItem = ({ item }: { item: NotificationData }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
      onPress={() => {
        if (!item.read) {
          handleMarkAsRead(item.id);
        }
      }}
    >
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationTime}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
      
      <Text style={styles.notificationBody}>{item.body}</Text>
      
      <View style={styles.notificationFooter}>
        <Text style={styles.notificationType}>
          {getTypeLabel(item.type)}
        </Text>
        
        {!item.read && (
          <TouchableOpacity
            style={styles.readButton}
            onPress={() => handleMarkAsRead(item.id)}
          >
            <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t('notifications')} {unreadCount > 0 && `(${unreadCount})`}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllAsRead}>
            <Text style={styles.markAllText}>
              {language === 'en' ? 'Mark All Read' : 'सभी पढ़े'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>
            {language === 'en' 
              ? 'No notifications yet\nYou\'ll receive updates about your reported issues here' 
              : 'अभी तक कोई सूचना नहीं\nआपको यहाँ अपनी रिपोर्ट की गई समस्याओं के बारे में अपडेट मिलेंगे'
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;