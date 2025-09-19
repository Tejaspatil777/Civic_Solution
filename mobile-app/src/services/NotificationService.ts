import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        const token = await Notifications.getExpoPushTokenAsync({
          projectId: 'your-project-id-here',
        });
        
        this.expoPushToken = token.data;
        await AsyncStorage.setItem('@expo_push_token', this.expoPushToken);
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#0EA5E9',
        });
      }

      this.setupNotificationListeners();

    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }

  private setupNotificationListeners(): void {
    Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
    });
  }

  async sendLocalNotification(
    title: string, 
    body: string, 
    data?: any, 
    delay?: number
  ): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
          sound: 'default',
        },
        trigger: delay ? { seconds: delay } : null,
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  }
}

const notificationService = new NotificationService();

export const initializeNotifications = () => notificationService.initializeNotifications();
export const sendLocalNotification = (title: string, body: string, data?: any, delay?: number) => 
  notificationService.sendLocalNotification(title, body, data, delay);

export default notificationService;