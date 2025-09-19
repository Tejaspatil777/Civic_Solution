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
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
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
    methodSelector: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    methodOption: {
      width: '48%',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center',
      marginBottom: 12,
    },
    activeMethodOption: {
      borderColor: theme.colors.primary,
      backgroundColor: `${theme.colors.primary}10`,
    },
    methodText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text,
      marginTop: 4,
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
    eyeIcon: {
      padding: 8,
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
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    guestButton: {
      backgroundColor: theme.colors.textSecondary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
    },
    secondaryButtonText: {
      color: theme.colors.primary,
    },
    linkText: {
      color: theme.colors.primary,
      textAlign: 'center',
      marginTop: 16,
      fontSize: 14,
    },
    roleSelector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    roleOption: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    activeRoleOption: {
      borderColor: theme.colors.primary,
      backgroundColor: `${theme.colors.primary}10`,
    },
    roleEmoji: {
      fontSize: 20,
      marginBottom: 4,
    },
    roleText: {
      fontSize: 12,
      color: theme.colors.text,
    },
  });

  const [selectedRole, setSelectedRole] = useState<UserRole>('user');

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Basic validation
      if (authMode === 'register' && !name.trim()) {
        Alert.alert(t('error'), 'Please enter your name');
        return;
      }

      if (loginMethod === 'email' && !email.trim()) {
        Alert.alert(t('error'), 'Please enter your email');
        return;
      }

      if (loginMethod === 'phone' && !phone.trim()) {
        Alert.alert(t('error'), 'Please enter your phone number');
        return;
      }

      if (loginMethod === 'aadhar' && !aadhar.trim()) {
        Alert.alert(t('error'), 'Please enter your Aadhar number');
        return;
      }

      if ((loginMethod === 'email' || loginMethod === 'phone' || loginMethod === 'aadhar') && !password.trim()) {
        Alert.alert(t('error'), 'Please enter your password');
        return;
      }

      if (loginMethod === 'otp' && !otp.trim()) {
        Alert.alert(t('error'), 'Please enter the OTP');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create user data
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

  const renderMethodSelector = () => {
    if (authMode === 'guest') return null;

    const methods = [
      { key: 'email', icon: 'mail', label: t('email') },
      { key: 'phone', icon: 'call', label: t('phone') },
      { key: 'otp', icon: 'keypad', label: 'OTP' },
      { key: 'aadhar', icon: 'card', label: 'Aadhar' },
    ];

    return (
      <View style={styles.methodSelector}>
        {methods.map((method) => (
          <TouchableOpacity
            key={method.key}
            style={[
              styles.methodOption,
              loginMethod === method.key && styles.activeMethodOption,
            ]}
            onPress={() => setLoginMethod(method.key as LoginMethod)}
          >
            <Ionicons
              name={method.icon as any}
              size={20}
              color={loginMethod === method.key ? theme.colors.primary : theme.colors.textSecondary}
            />
            <Text style={styles.methodText}>{method.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderRoleSelector = () => {
    if (authMode !== 'login') return null;

    const roles = [
      { key: 'user', emoji: '👤', label: t('citizen') },
      { key: 'staff', emoji: '👨‍💼', label: t('staffMember') },
      { key: 'admin', emoji: '🔐', label: t('administrator') },
    ];

    return (
      <View style={styles.roleSelector}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.key}
            style={[
              styles.roleOption,
              selectedRole === role.key && styles.activeRoleOption,
            ]}
            onPress={() => setSelectedRole(role.key as UserRole)}
          >
            <Text style={styles.roleEmoji}>{role.emoji}</Text>
            <Text style={styles.roleText}>{role.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderInputs = () => {
    if (authMode === 'guest') return null;

    return (
      <>
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

        {loginMethod === 'email' && (
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
        )}

        {loginMethod === 'phone' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('phone')}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        )}

        {loginMethod === 'aadhar' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Aadhar Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={aadhar}
                onChangeText={setAadhar}
                placeholder="Enter your Aadhar number"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numeric"
                maxLength={12}
              />
            </View>
          </View>
        )}

        {loginMethod === 'otp' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>OTP</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter 6-digit OTP"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
          </View>
        )}

        {(loginMethod === 'email' || loginMethod === 'phone' || loginMethod === 'aadhar') && (
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
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
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
            {t('language') === 'en' ? 'Connecting Communities, Solving Issues' : 'समुदायों को जोड़ना, समस्याओं का समाधान'}
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
            <TouchableOpacity
              style={[styles.modeOption, authMode === 'guest' && styles.activeModeOption]}
              onPress={() => setAuthMode('guest')}
            >
              <Text style={[styles.modeText, authMode === 'guest' && styles.activeModeText]}>
                Guest
              </Text>
            </TouchableOpacity>
          </View>

          {renderRoleSelector()}
          {renderMethodSelector()}
          {renderInputs()}

          {authMode === 'guest' ? (
            <TouchableOpacity style={[styles.button, styles.guestButton]} onPress={handleGuestLogin}>
              <Text style={styles.buttonText}>Continue as Guest</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? t('loading') : authMode === 'login' ? t('login') : t('signup')}
              </Text>
            </TouchableOpacity>
          )}

          {authMode !== 'guest' && (
            <TouchableOpacity onPress={handleGuestLogin}>
              <Text style={styles.linkText}>Continue as Guest</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;