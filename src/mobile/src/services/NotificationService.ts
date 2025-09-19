import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  data?: any;
  timestamp: number;
  read: boolean;
  type: 'issue_update' | 'system' | 'announcement' | 'reminder';
}

class NotificationService {
  private expoPushToken: string | null = null;

  async initializeNotifications(): Promise<void> {
    try {
      // Register for push notifications
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          console.warn('Failed to get push token for push notification!');
          return;
        }

        // Get push token
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: 'your-project-id-here', // Replace with your actual project ID
        });
        
        this.expoPushToken = token.data;
        console.log('Expo Push Token:', this.expoPushToken);

        // Save token for sending notifications from backend
        await AsyncStorage.setItem('@expo_push_token', this.expoPushToken);
      } else {
        console.warn('Must use physical device for Push Notifications');
      }

      // Configure notification channels for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#0EA5E9',
        });

        await Notifications.setNotificationChannelAsync('issue_updates', {
          name: 'Issue Updates',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#10B981',
          description: 'Notifications about your reported issues',
        });

        await Notifications.setNotificationChannelAsync('system', {
          name: 'System Notifications',
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250],
          lightColor: '#06B6D4',
          description: 'System announcements and updates',
        });
      }

      // Set up notification listeners
      this.setupNotificationListeners();

    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }

  private setupNotificationListeners(): void {
    // Handle notification received while app is in foreground
    Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
      this.saveNotificationToStorage(notification);
    });

    // Handle notification response (when user taps on notification)
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
      this.handleNotificationPress(response);
    });
  }

  private async saveNotificationToStorage(notification: Notifications.Notification): Promise<void> {
    try {
      const notificationData: NotificationData = {
        id: notification.request.identifier,
        title: notification.request.content.title || 'CivicFix',
        body: notification.request.content.body || '',
        data: notification.request.content.data,
        timestamp: Date.now(),
        read: false,
        type: notification.request.content.data?.type || 'system',
      };

      // Get existing notifications
      const existingNotifications = await this.getStoredNotifications();
      
      // Add new notification to the beginning
      const updatedNotifications = [notificationData, ...existingNotifications];
      
      // Keep only last 100 notifications
      const trimmedNotifications = updatedNotifications.slice(0, 100);

      // Save updated notifications
      await AsyncStorage.setItem('@notifications', JSON.stringify(trimmedNotifications));

      // Update badge count
      await this.updateBadgeCount();

    } catch (error) {
      console.error('Error saving notification:', error);
    }
  }

  private handleNotificationPress(response: Notifications.NotificationResponse): void {
    const { data } = response.notification.request.content;
    
    // Navigate based on notification type
    if (data?.type === 'issue_update' && data?.issueId) {
      // Navigate to specific issue
      console.log('Navigate to issue:', data.issueId);
    } else if (data?.screen) {
      // Navigate to specific screen
      console.log('Navigate to screen:', data.screen);
    }

    // Mark notification as read
    this.markNotificationAsRead(response.notification.request.identifier);
  }

  async getStoredNotifications(): Promise<NotificationData[]> {
    try {
      const notificationsJson = await AsyncStorage.getItem('@notifications');
      return notificationsJson ? JSON.parse(notificationsJson) : [];
    } catch (error) {
      console.error('Error getting stored notifications:', error);
      return [];
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      const notifications = await this.getStoredNotifications();
      const updatedNotifications = notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      );

      await AsyncStorage.setItem('@notifications', JSON.stringify(updatedNotifications));
      await this.updateBadgeCount();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  async markAllNotificationsAsRead(): Promise<void> {
    try {
      const notifications = await this.getStoredNotifications();
      const updatedNotifications = notifications.map(notification => 
        ({ ...notification, read: true })
      );

      await AsyncStorage.setItem('@notifications', JSON.stringify(updatedNotifications));
      await this.updateBadgeCount();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }

  async getUnreadCount(): Promise<number> {
    try {
      const notifications = await this.getStoredNotifications();
      return notifications.filter(notification => !notification.read).length;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }

  private async updateBadgeCount(): Promise<void> {
    try {
      const unreadCount = await this.getUnreadCount();
      await Notifications.setBadgeCountAsync(unreadCount);
    } catch (error) {
      console.error('Error updating badge count:', error);
    }
  }

  async sendLocalNotification(
    title: string, 
    body: string, 
    data?: any, 
    delay?: number
  ): Promise<void> {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
          sound: 'default',
        },
        trigger: delay ? { seconds: delay } : null,
      });

      console.log('Local notification scheduled:', notificationId);
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  }

  getExpoPushToken(): string | null {
    return this.expoPushToken;
  }
}

// Create singleton instance
const notificationService = new NotificationService();

// Export functions
export const initializeNotifications = () => notificationService.initializeNotifications();
export const getStoredNotifications = () => notificationService.getStoredNotifications();
export const markNotificationAsRead = (id: string) => notificationService.markNotificationAsRead(id);
export const markAllNotificationsAsRead = () => notificationService.markAllNotificationsAsRead();
export const getUnreadCount = () => notificationService.getUnreadCount();
export const sendLocalNotification = (title: string, body: string, data?: any, delay?: number) => 
  notificationService.sendLocalNotification(title, body, data, delay);
export const cancelAllNotifications = () => notificationService.cancelAllNotifications();
export const getExpoPushToken = () => notificationService.getExpoPushToken();

export default notificationService;