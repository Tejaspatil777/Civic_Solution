import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';

interface RegistrationSuccessProps {
  userData: any;
  onContinue: () => void;
  language: 'en' | 'hi';
}

export const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  userData,
  onContinue,
  language,
}) => {
  const { theme } = useTheme();
  const scaleValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, []);

  const text = {
    en: {
      welcome: 'Welcome to CivicFix!',
      success: 'Registration Successful',
      message: 'Your account has been created successfully. You can now start reporting civic issues and help improve your community.',
      getStarted: 'Get Started',
      userInfo: 'Account Information',
    },
    hi: {
      welcome: 'CivicFix में आपका स्वागत है!',
      success: 'पंजीकरण सफल',
      message: 'आपका खाता सफलतापूर्वक बनाया गया है। अब आप नागरिक समस्याओं की रिपोर्ट करना शुरू कर सकते हैं और अपने समुदाय को बेहतर बनाने में मदद कर सकते हैं।',
      getStarted: 'शुरू करें',
      userInfo: 'खाता जानकारी',
    },
  };

  const t = text[language];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.iconContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <LinearGradient
            colors={theme.gradients.blueGreen}
            style={styles.successIcon}
          >
            <Icon name="check" size={40} color="#ffffff" />
          </LinearGradient>
        </Animated.View>

        {/* Welcome Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.welcomeTitle, { color: theme.colors.foreground }]}>
            {t.welcome}
          </Text>
          <Text style={[styles.successTitle, { color: theme.colors.primary }]}>
            {t.success}
          </Text>
          <Text style={[styles.message, { color: theme.colors.mutedForeground }]}>
            {t.message}
          </Text>
        </View>

        {/* User Info Card */}
        <View style={[styles.userCard, { backgroundColor: theme.colors.card }, theme.shadows.medium]}>
          <Text style={[styles.cardTitle, { color: theme.colors.foreground }]}>
            {t.userInfo}
          </Text>
          <View style={styles.userDetails}>
            <View style={styles.userRow}>
              <Icon name="user" size={16} color={theme.colors.primary} />
              <Text style={[styles.userLabel, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Name:' : 'नाम:'}
              </Text>
              <Text style={[styles.userValue, { color: theme.colors.foreground }]}>
                {userData?.name}
              </Text>
            </View>
            <View style={styles.userRow}>
              <Icon name="mail" size={16} color={theme.colors.primary} />
              <Text style={[styles.userLabel, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Email:' : 'ईमेल:'}
              </Text>
              <Text style={[styles.userValue, { color: theme.colors.foreground }]}>
                {userData?.email}
              </Text>
            </View>
            <View style={styles.userRow}>
              <Icon name="calendar" size={16} color={theme.colors.primary} />
              <Text style={[styles.userLabel, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Joined:' : 'शामिल हुए:'}
              </Text>
              <Text style={[styles.userValue, { color: theme.colors.foreground }]}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Features Preview */}
        <View style={[styles.featuresCard, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <Text style={[styles.cardTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'What you can do:' : 'आप क्या कर सकते हैं:'}
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={[styles.featureText, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Report civic issues with photos' : 'फोटो के साथ नागरिक समस्याओं की रिपोर्ट करें'}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📍</Text>
              <Text style={[styles.featureText, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Track issue status in real-time' : 'वास्तविक समय में समस्या की स्थिति ट्रैक करें'}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏆</Text>
              <Text style={[styles.featureText, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Earn civic points for contributions' : 'योगदान के लिए नागरिक अंक अर्जित करें'}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👥</Text>
              <Text style={[styles.featureText, { color: theme.colors.mutedForeground }]}>
                {language === 'en' ? 'Connect with your community' : 'अपने समुदाय से जुड़ें'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Get Started Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <LinearGradient
            colors={theme.gradients.blueGreen}
            style={styles.continueGradient}
          >
            <Text style={styles.continueText}>{t.getStarted}</Text>
            <Icon name="arrow-right" size={20} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  userCard: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userDetails: {
    gap: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLabel: {
    fontSize: 14,
    marginLeft: 12,
    marginRight: 8,
    minWidth: 60,
  },
  userValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  featuresCard: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});