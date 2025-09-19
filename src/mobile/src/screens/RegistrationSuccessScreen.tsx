import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserData } from '../../App';

const { width } = Dimensions.get('window');

interface RegistrationSuccessScreenProps {
  route: {
    params: {
      userData: UserData;
    };
  };
  navigation: any;
}

const RegistrationSuccessScreen: React.FC<RegistrationSuccessScreenProps> = ({ 
  route, 
  navigation 
}) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const { userData } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    successIcon: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 32,
    },
    userInfoCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      width: '100%',
      marginBottom: 32,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    userInfoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    userInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    userInfoIcon: {
      marginRight: 12,
      width: 24,
    },
    userInfoLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      flex: 1,
    },
    userInfoValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 2,
    },
    benefitsSection: {
      width: '100%',
      marginBottom: 32,
    },
    benefitsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    benefitIcon: {
      marginRight: 12,
    },
    benefitText: {
      fontSize: 14,
      color: theme.colors.text,
      flex: 1,
      lineHeight: 20,
    },
    continueButton: {
      borderRadius: 16,
      padding: 18,
      width: '100%',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    continueButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    skipButton: {
      marginTop: 16,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    skipButtonText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      textAlign: 'center',
    },
  });

  const benefits = [
    {
      icon: 'checkmark-circle',
      text: language === 'en' 
        ? 'Track your reported issues in real-time'
        : 'अपनी रिपोर्ट की गई समस्याओं को वास्तविक समय में ट्रैक करें',
    },
    {
      icon: 'notifications',
      text: language === 'en'
        ? 'Receive instant updates on issue progress'
        : 'समस्या की प्रगति पर तुरंत अपडेट प्राप्त करें',
    },
    {
      icon: 'people',
      text: language === 'en'
        ? 'Connect with your local community'
        : 'अपने स्थानीय समुदाय से जुड़ें',
    },
    {
      icon: 'analytics',
      text: language === 'en'
        ? 'Access transparency dashboard and analytics'
        : 'पारदर्शिता डैशबोर्ड और एनालिटिक्स तक पहुंच',
    },
  ];

  const handleContinue = () => {
    // Navigation will be handled by the parent component
    navigation.navigate('Main');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={styles.successIcon}
        >
          <Ionicons name="checkmark" size={60} color="white" />
        </LinearGradient>

        {/* Welcome Message */}
        <Text style={styles.title}>
          {language === 'en' ? 'Welcome to CivicFix!' : 'सिविकफिक्स में आपका स्वागत है!'}
        </Text>
        
        <Text style={styles.subtitle}>
          {language === 'en'
            ? 'Your registration was successful! You\'re now part of a community working together to improve civic life.'
            : 'आपका पंजीकरण सफल रहा! अब आप उस समुदाय का हिस्सा हैं जो नागरिक जीवन को बेहतर बनाने के लिए मिलकर काम कर रहा है।'
          }
        </Text>

        {/* User Information */}
        <View style={styles.userInfoCard}>
          <Text style={styles.userInfoTitle}>
            {language === 'en' ? 'Your Account Details' : 'आपके खाते का विवरण'}
          </Text>
          
          <View style={styles.userInfoRow}>
            <Ionicons name="person" size={20} color={theme.colors.primary} style={styles.userInfoIcon} />
            <Text style={styles.userInfoLabel}>
              {language === 'en' ? 'Name:' : 'नाम:'}
            </Text>
            <Text style={styles.userInfoValue}>{userData.name}</Text>
          </View>

          <View style={styles.userInfoRow}>
            <Ionicons name="mail" size={20} color={theme.colors.primary} style={styles.userInfoIcon} />
            <Text style={styles.userInfoLabel}>
              {language === 'en' ? 'Email:' : 'ईमेल:'}
            </Text>
            <Text style={styles.userInfoValue}>{userData.email}</Text>
          </View>

          {userData.phone && (
            <View style={styles.userInfoRow}>
              <Ionicons name="call" size={20} color={theme.colors.primary} style={styles.userInfoIcon} />
              <Text style={styles.userInfoLabel}>
                {language === 'en' ? 'Phone:' : 'फोन:'}
              </Text>
              <Text style={styles.userInfoValue}>{userData.phone}</Text>
            </View>
          )}

          <View style={styles.userInfoRow}>
            <Ionicons name="calendar" size={20} color={theme.colors.primary} style={styles.userInfoIcon} />
            <Text style={styles.userInfoLabel}>
              {language === 'en' ? 'Joined:' : 'शामिल हुए:'}
            </Text>
            <Text style={styles.userInfoValue}>
              {userData.registrationDate ? formatDate(userData.registrationDate) : 'Today'}
            </Text>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>
            {language === 'en' ? 'What you can do now:' : 'अब आप क्या कर सकते हैं:'}
          </Text>
          
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Ionicons 
                name={benefit.icon as any} 
                size={20} 
                color={theme.colors.primary} 
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitText}>{benefit.text}</Text>
            </View>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity onPress={handleContinue}>
          <LinearGradient
            colors={['#0EA5E9', '#06B6D4', '#10B981']}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>
              {language === 'en' ? 'Start Exploring' : 'एक्सप्लोर करना शुरू करें'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleContinue}>
          <Text style={styles.skipButtonText}>
            {language === 'en' ? 'Skip for now' : 'अभी के लिए छोड़ें'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationSuccessScreen;