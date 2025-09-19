import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthScreenProps {
  onLogin: (role: 'user' | 'staff' | 'admin', userData: any) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: '',
    aadhar: '',
    name: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { theme } = useTheme();
  const { language, t } = useLanguage();

  const mockUsers = {
    admin: { email: 'admin@civicfix.com', password: 'admin123', name: 'Admin User' },
    staff: { email: 'staff@civicfix.com', password: 'staff123', name: 'Staff Member' },
    user: { email: 'user@civicfix.com', password: 'user123', name: 'Regular User' },
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert(
        t('error'),
        language === 'en' ? 'Please fill in all fields' : 'कृपया सभी फ़ील्ड भरें'
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      let role: 'user' | 'staff' | 'admin' = 'user';
      let userData: any = null;

      // Check mock users
      Object.entries(mockUsers).forEach(([userRole, user]) => {
        if (user.email === formData.email && user.password === formData.password) {
          role = userRole as 'user' | 'staff' | 'admin';
          userData = {
            id: Date.now().toString(),
            name: user.name,
            email: user.email,
            role: userRole,
          };
        }
      });

      if (userData) {
        onLogin(role, userData);
      } else {
        Alert.alert(
          t('error'),
          language === 'en' ? 'Invalid credentials' : 'गलत जानकारी'
        );
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert(
        t('error'),
        language === 'en' ? 'Please fill in all fields' : 'कृपया सभी फ़ील्ड भरें'
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert(
        t('error'),
        language === 'en' ? 'Passwords do not match' : 'पासवर्ड मेल नहीं खाते'
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        registrationDate: new Date().toISOString(),
        role: 'user',
      };

      onLogin('user', userData);
      setIsLoading(false);
    }, 2000);
  };

  const renderAuthForm = () => {
    if (isLogin) {
      return (
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} color={theme.colors.mutedForeground} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.foreground, borderColor: theme.colors.border }]}
              placeholder={t('email')}
              placeholderTextColor={theme.colors.mutedForeground}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color={theme.colors.mutedForeground} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.foreground, borderColor: theme.colors.border }]}
              placeholder={t('password')}
              placeholderTextColor={theme.colors.mutedForeground}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={20} 
                color={theme.colors.mutedForeground} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <LinearGradient
              colors={theme.gradients.blueGreen}
              style={styles.gradientButton}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>{t('loading')}</Text>
              ) : (
                <Text style={styles.buttonText}>{t('login')}</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color={theme.colors.mutedForeground} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.foreground, borderColor: theme.colors.border }]}
              placeholder={language === 'en' ? 'Full Name' : 'पूरा नाम'}
              placeholderTextColor={theme.colors.mutedForeground}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} color={theme.colors.mutedForeground} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.foreground, borderColor: theme.colors.border }]}
              placeholder={t('email')}
              placeholderTextColor={theme.colors.mutedForeground}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color={theme.colors.mutedForeground} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.foreground, borderColor: theme.colors.border }]}
              placeholder={t('password')}
              placeholderTextColor={theme.colors.mutedForeground}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={20} 
                color={theme.colors.mutedForeground} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color={theme.colors.mutedForeground} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.foreground, borderColor: theme.colors.border }]}
              placeholder={language === 'en' ? 'Confirm Password' : 'पासवर्ड की पुष्टि करें'}
              placeholderTextColor={theme.colors.mutedForeground}
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Icon 
                name={showConfirmPassword ? 'eye-off' : 'eye'} 
                size={20} 
                color={theme.colors.mutedForeground} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSignup}
            disabled={isLoading}
          >
            <LinearGradient
              colors={theme.gradients.blueGreen}
              style={styles.gradientButton}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>{t('loading')}</Text>
              ) : (
                <Text style={styles.buttonText}>{t('signup')}</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Logo and Title */}
        <View style={styles.header}>
          <LinearGradient
            colors={theme.gradients.blueGreen}
            style={styles.logo}
          >
            <Text style={styles.logoText}>C</Text>
          </LinearGradient>
          <Text style={[styles.title, { color: theme.colors.foreground }]}>
            CivicFix
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.mutedForeground }]}>
            {language === 'en' 
              ? 'Report. Track. Improve.' 
              : 'रिपोर्ट करें। ट्रैक करें। सुधारें।'}
          </Text>
        </View>

        {/* Auth Toggle */}
        <View style={styles.authToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              isLogin && [styles.activeToggle, { backgroundColor: theme.colors.primary }]
            ]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[
              styles.toggleText,
              { color: isLogin ? theme.colors.primaryForeground : theme.colors.mutedForeground }
            ]}>
              {t('login')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !isLogin && [styles.activeToggle, { backgroundColor: theme.colors.primary }]
            ]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[
              styles.toggleText,
              { color: !isLogin ? theme.colors.primaryForeground : theme.colors.mutedForeground }
            ]}>
              {t('signup')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Auth Form */}
        {renderAuthForm()}

        {/* Demo Credentials */}
        <View style={[styles.demoSection, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.demoTitle, { color: theme.colors.foreground }]}>
            {language === 'en' ? 'Demo Credentials' : 'डेमो क्रेडेंशियल्स'}
          </Text>
          <Text style={[styles.demoText, { color: theme.colors.mutedForeground }]}>
            Admin: admin@civicfix.com / admin123{'\n'}
            Staff: staff@civicfix.com / staff123{'\n'}
            User: user@civicfix.com / user123
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  authToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 48,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  submitButton: {
    marginTop: 16,
  },
  gradientButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  demoSection: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});