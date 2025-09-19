import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole, UserData } from '../../App';

interface AuthScreenProps {
  onLogin: (role: UserRole, data: UserData) => void;
}

type AuthMode = 'login' | 'register' | 'guest';
type LoginMethod = 'email' | 'phone' | 'otp' | 'aadhar';

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    gradientHeader: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    appTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
      marginTop: 8,
    },
    formContainer: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 30,
      paddingHorizontal: 24,
      marginTop: -20,
    },
    modeSelector: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      padding: 4,
      marginBottom: 24,
    },
    modeOption: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    activeModeOption: {
      backgroundColor: theme.colors.primary,
    },
    modeText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    activeModeText: {
      color: 'white',
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 16,
    },
    input: {
      flex: 1,
      paddingVertical: 16,
      fontSize: 16,
      color: theme.colors.text,
    },
    button: {
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginVertical: 8,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
    },
  });

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userData: UserData = {
        id: Date.now().toString(),
        name: name || `User ${Date.now()}`,
        email: email || `user${Date.now()}@example.com`,
        phone: phone || undefined,
        role: selectedRole,
        registrationDate: authMode === 'register' ? new Date().toISOString() : undefined,
      };

      onLogin(selectedRole, userData);

    } catch (error) {
      Alert.alert(t('error'), 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestData: UserData = {
      id: 'guest_' + Date.now(),
      name: 'Guest User',
      email: 'guest@civicfix.com',
      role: 'user',
    };

    onLogin('user', guestData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={['#0EA5E9', '#06B6D4', '#10B981']}
          style={styles.gradientHeader}
        >
          <View style={styles.logo}>
            <Text style={styles.logoText}>CF</Text>
          </View>
          <Text style={styles.appTitle}>{t('appTitle')}</Text>
          <Text style={styles.subtitle}>
            Connecting Communities, Solving Issues
          </Text>
        </LinearGradient>

        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeOption, authMode === 'login' && styles.activeModeOption]}
              onPress={() => setAuthMode('login')}
            >
              <Text style={[styles.modeText, authMode === 'login' && styles.activeModeText]}>
                {t('login')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeOption, authMode === 'register' && styles.activeModeOption]}
              onPress={() => setAuthMode('register')}
            >
              <Text style={[styles.modeText, authMode === 'register' && styles.activeModeText]}>
                {t('signup')}
              </Text>
            </TouchableOpacity>
          </View>

          {authMode === 'register' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('email')}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('password')}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={!showPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? t('loading') : authMode === 'login' ? t('login') : t('signup')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGuestLogin}>
            <Text style={{ color: theme.colors.primary, textAlign: 'center', marginTop: 16 }}>
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;