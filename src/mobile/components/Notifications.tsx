import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';

interface NotificationsProps {
  language: 'en' | 'hi';
}

interface Notification {
  id: string;
  type: 'update' | 'resolved' | 'comment' | 'like' | 'assigned';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  issueId?: string;
}

export const Notifications: React.FC<NotificationsProps> = ({ language }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'update',
      title: language === 'en' ? 'Issue Status Updated' : 'समस्या की स्थिति अपडेट हुई',
      message: language === 'en' 
        ? 'Your reported road issue is now in progress' 
        : 'आपकी रिपोर्ट की गई सड़क समस्या अब प्रगति में है',
      time: language === 'en' ? '2 hours ago' : '2 घंटे पहले',
      isRead: false,
      issueId: '1',
    },
    {
      id: '2',
      type: 'resolved',
      title: language === 'en' ? 'Issue Resolved' : 'समस्या हल हुई',
      message: language === 'en' 
        ? 'Water supply issue in Sector 15 has been resolved' 
        : 'सेक्टर 15 में पानी की आपूर्ति की समस्या हल हो गई है',
      time: language === 'en' ? '1 day ago' : '1 दिन पहले',
      isRead: true,
      issueId: '2',
    },
    {
      id: '3',
      type: 'comment',
      title: language === 'en' ? 'New Comment' : 'नई टिप्पणी',
      message: language === 'en' 
        ? 'Someone commented on your issue report' 
        : 'किसी ने आपकी समस्या रिपोर्ट पर टिप्पणी की है',
      time: language === 'en' ? '3 days ago' : '3 दिन पहले',
      isRead: true,
      issueId: '1',
    },
    {
      id: '4',
      type: 'like',
      title: language === 'en' ? 'Issue Liked' : 'समस्या को पसंद किया गया',
      message: language === 'en' 
        ? '5 people liked your reported issue' 
        : '5 लोगों ने आपकी रिपोर्ट की गई समस्या को पसंद किया',
      time: language === 'en' ? '1 week ago' : '1 सप्ताह पहले',
      isRead: true,
      issueId: '3',
    },
    {
      id: '5',
      type: 'assigned',
      title: language === 'en' ? 'Staff Assigned' : 'स्टाफ असाइन किया गया',
      message: language === 'en' 
        ? 'Rajesh Kumar has been assigned to your issue' 
        : 'राजेश कुमार को आपकी समस्या सौंपी गई है',
      time: language === 'en' ? '2 weeks ago' : '2 सप्ताह पहले',
      isRead: true,
      issueId: '1',
    },
  ]);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);

  const { theme } = useTheme();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'update':
        return { name: 'refresh-ccw', color: theme.colors.primary };
      case 'resolved':
        return { name: 'check-circle', color: theme.colors.secondary };
      case 'comment':
        return { name: 'message-circle', color: theme.colors.accent };
      case 'like':
        return { name: 'heart', color: '#EF4444' };
      case 'assigned':
        return { name: 'user-plus', color: '#8B5CF6' };
      default:
        return { name: 'bell', color: theme.colors.mutedForeground };
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.colors.foreground }]}>
              {language === 'en' ? 'Notifications' : 'सूचनाएं'}
            </Text>
            {unreadCount > 0 && (
              <Text style={[styles.unreadCount, { color: theme.colors.mutedForeground }]}>
                {unreadCount} {language === 'en' ? 'unread' : 'अपठित'}
              </Text>
            )}
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={[styles.markAllRead, { color: theme.colors.primary }]}>
                {language === 'en' ? 'Mark all read' : 'सभी को पढ़ा मार्क करें'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notification Settings */}
        <View style={[styles.settingsCard, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <Text style={[styles.settingsTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Notification Settings' : 'सूचना सेटिंग्स'}
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="smartphone" size={20} color={theme.colors.primary} />
              <Text style={[styles.settingText, { color: theme.colors.foreground }]}>
                {language === 'en' ? 'Push Notifications' : 'पुश सूचनाएं'}
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: theme.colors.mutedForeground, true: theme.colors.primary }}
              thumbColor={pushEnabled ? theme.colors.primaryForeground : theme.colors.background}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="mail" size={20} color={theme.colors.secondary} />
              <Text style={[styles.settingText, { color: theme.colors.foreground }]}>
                {language === 'en' ? 'Email Notifications' : 'ईमेल सूचनाएं'}
              </Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: theme.colors.mutedForeground, true: theme.colors.secondary }}
              thumbColor={emailEnabled ? theme.colors.secondaryForeground : theme.colors.background}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="message-square" size={20} color={theme.colors.accent} />
              <Text style={[styles.settingText, { color: theme.colors.foreground }]}>
                {language === 'en' ? 'SMS Notifications' : 'SMS सूचनाएं'}
              </Text>
            </View>
            <Switch
              value={smsEnabled}
              onValueChange={setSmsEnabled}
              trackColor={{ false: theme.colors.mutedForeground, true: theme.colors.accent }}
              thumbColor={smsEnabled ? theme.colors.accentForeground : theme.colors.background}
            />
          </View>
        </View>

        {/* Notifications List */}
        <View style={[styles.notificationsList, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <Text style={[styles.listTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Recent Notifications' : 'हाल की सूचनाएं'}
          </Text>
          
          {notifications.map((notification) => {
            const iconConfig = getNotificationIcon(notification.type);
            
            return (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.isRead && { backgroundColor: theme.colors.primary + '10' },
                  { borderBottomColor: theme.colors.border }
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <View style={styles.notificationIcon}>
                  <LinearGradient
                    colors={[iconConfig.color + '20', iconConfig.color + '10']}
                    style={styles.iconContainer}
                  >
                    <Icon name={iconConfig.name} size={18} color={iconConfig.color} />
                  </LinearGradient>
                </View>
                
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={[
                      styles.notificationTitle,
                      { color: theme.colors.foreground },
                      !notification.isRead && { fontWeight: '600' }
                    ]}>
                      {notification.title}
                    </Text>
                    <Text style={[styles.notificationTime, { color: theme.colors.mutedForeground }]}>
                      {notification.time}
                    </Text>
                  </View>
                  
                  <Text style={[
                    styles.notificationMessage,
                    { color: theme.colors.mutedForeground },
                    !notification.isRead && { color: theme.colors.foreground }
                  ]}>
                    {notification.message}
                  </Text>
                  
                  {!notification.isRead && (
                    <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Empty State (if no notifications) */}
        {notifications.length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
            <Icon name="bell-off" size={40} color={theme.colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: theme.colors.foreground }]}>
              {language === 'en' ? 'No Notifications' : 'कोई सूचना नहीं'}
            </Text>
            <Text style={[styles.emptyMessage, { color: theme.colors.mutedForeground }]}>
              {language === 'en' 
                ? 'You\'ll see notifications about your issues here' 
                : 'आपको अपनी समस्याओं के बारे में सूचनाएं यहाँ दिखाई देंगी'}
            </Text>
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  unreadCount: {
    fontSize: 14,
  },
  markAllRead: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  notificationsList: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    position: 'relative',
  },
  notificationIcon: {
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
  unreadDot: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    borderRadius: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});