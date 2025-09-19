import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const navigation = useNavigation();

  const [userData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    role: 'user' as 'user' | 'staff' | 'admin',
    joinDate: '2024-01-15',
    issuesReported: 12,
    issuesResolved: 8,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    profileSection: {
      backgroundColor: theme.colors.surface,
      margin: 16,
      borderRadius: 16,
      padding: 20,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    avatarContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
    },
    userEmail: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: 4,
    },
    roleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
    },
    roleBadge: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    roleText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    menuSection: {
      backgroundColor: theme.colors.surface,
      margin: 16,
      marginTop: 0,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    lastMenuItem: {
      borderBottomWidth: 0,
    },
    menuIcon: {
      marginRight: 16,
    },
    menuText: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
    },
    menuValue: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginRight: 8,
    },
    switchContainer: {
      marginLeft: 8,
    },
    logoutButton: {
      backgroundColor: theme.colors.destructive,
      margin: 16,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    logoutText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 8,
    },
  });

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      language === 'en' 
        ? 'Are you sure you want to logout?' 
        : 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@auth_data');
              // The app will automatically redirect to auth screen
              // due to the auth state management in App.tsx
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  const getRoleIcon = () => {
    switch (userData.role) {
      case 'admin':
        return '🔐';
      case 'staff':
        return '👨‍💼';
      default:
        return '👤';
    }
  };

  const getRoleLabel = () => {
    switch (userData.role) {
      case 'admin':
        return t('administrator');
      case 'staff':
        return t('staffMember');
      default:
        return t('citizen');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(userData.name)}
              </Text>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
            
            <View style={styles.roleContainer}>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>
                  {getRoleIcon()} {getRoleLabel()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.issuesReported}</Text>
              <Text style={styles.statLabel}>
                {language === 'en' ? 'Reported' : 'रिपोर्ट किए गए'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.issuesResolved}</Text>
              <Text style={styles.statLabel}>
                {language === 'en' ? 'Resolved' : 'हल किए गए'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round((userData.issuesResolved / userData.issuesReported) * 100) || 0}%
              </Text>
              <Text style={styles.statLabel}>
                {language === 'en' ? 'Success Rate' : 'सफलता दर'}
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>{t('settings')}</Text>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person" size={24} color={theme.colors.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuText}>
              {language === 'en' ? 'Edit Profile' : 'प्रोफाइल संपादित करें'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <Ionicons name="moon" size={24} color={theme.colors.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('darkMode')}</Text>
            <View style={styles.switchContainer}>
              <Switch
                value={theme.isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={theme.isDark ? 'white' : theme.colors.background}
              />
            </View>
          </View>

          <View style={styles.menuItem}>
            <Ionicons name="globe" size={24} color={theme.colors.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('language')}</Text>
            <Text style={styles.menuValue}>
              {language === 'en' ? 'English' : 'हिंदी'}
            </Text>
            <TouchableOpacity onPress={toggleLanguage}>
              <Ionicons name="swap-horizontal" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications" size={24} color={theme.colors.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuText}>
              {language === 'en' ? 'Notification Settings' : 'सूचना सेटिंग्स'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
            <Ionicons name="shield-checkmark" size={24} color={theme.colors.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuText}>
              {language === 'en' ? 'Privacy & Security' : 'गोपनीयता और सुरक्षा'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Dashboards Section (for staff/admin) */}
        {(userData.role === 'staff' || userData.role === 'admin') && (
          <>
            <Text style={styles.sectionTitle}>
              {language === 'en' ? 'Dashboards' : 'डैशबोर्ड'}
            </Text>
            <View style={styles.menuSection}>
              {userData.role === 'admin' && (
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('AdminDashboard' as never)}
                >
                  <Ionicons name="shield" size={24} color="#EF4444" style={styles.menuIcon} />
                  <Text style={styles.menuText}>{t('adminDashboard')}</Text>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                style={[styles.menuItem, userData.role !== 'admin' && styles.lastMenuItem]}
                onPress={() => navigation.navigate('StaffDashboard' as never)}
              >
                <Ionicons name="briefcase" size={24} color="#8B5CF6" style={styles.menuIcon} />
                <Text style={styles.menuText}>{t('staffDashboard')}</Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.menuItem, styles.lastMenuItem]}
                onPress={() => navigation.navigate('TransparencyDashboard' as never)}
              >
                <Ionicons name="analytics" size={24} color={theme.colors.primary} style={styles.menuIcon} />
                <Text style={styles.menuText}>{t('transparencyDashboard')}</Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Help & Support Section */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Help & Support' : 'सहायता और समर्थन'}
        </Text>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle" size={24} color={theme.colors.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuText}>
              {language === 'en' ? 'Help Center' : 'सहायता केंद्र'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="mail" size={24} color={theme.colors.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuText}>
              {language === 'en' ? 'Contact Support' : 'समर्थन से संपर्क करें'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
            <Ionicons name="information-circle" size={24} color={theme.colors.textSecondary} style={styles.menuIcon} />
            <Text style={styles.menuText}>
              {language === 'en' ? 'About CivicFix' : 'सिविकफिक्स के बारे में'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;