import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface UserProfileProps {
  language: 'en' | 'hi';
  isDark: boolean;
  onToggleDark: () => void;
  userRole: 'user' | 'staff' | 'admin';
  userData: any;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  language,
  isDark,
  onToggleDark,
  userRole,
  userData,
  onLogout,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage, t } = useLanguage();

  const profileStats = [
    {
      id: 'reported',
      value: '12',
      label: language === 'en' ? 'Issues Reported' : 'रिपोर्ट की गई समस्याएं',
      icon: 'flag',
      color: theme.colors.primary,
    },
    {
      id: 'resolved',
      value: '8',
      label: language === 'en' ? 'Issues Resolved' : 'समाधान की गई समस्याएं',
      icon: 'check-circle',
      color: theme.colors.secondary,
    },
    {
      id: 'points',
      value: '240',
      label: language === 'en' ? 'Civic Points' : 'नागरिक अंक',
      icon: 'star',
      color: '#F59E0B',
    },
  ];

  const menuItems = [
    {
      id: 'personal-info',
      icon: 'user',
      label: language === 'en' ? 'Personal Information' : 'व्यक्तिगत जानकारी',
      onPress: () => {},
    },
    {
      id: 'my-reports',
      icon: 'file-text',
      label: language === 'en' ? 'My Reports' : 'मेरी रिपोर्ट्स',
      onPress: () => {},
    },
    {
      id: 'notifications',
      icon: 'bell',
      label: language === 'en' ? 'Notification Settings' : 'सूचना सेटिंग्स',
      onPress: () => {},
    },
    {
      id: 'privacy',
      icon: 'shield',
      label: language === 'en' ? 'Privacy & Security' : 'गोपनीयता और सुरक्षा',
      onPress: () => {},
    },
    {
      id: 'help',
      icon: 'help-circle',
      label: language === 'en' ? 'Help & Support' : 'सहायता और समर्थन',
      onPress: () => {},
    },
    {
      id: 'about',
      icon: 'info',
      label: language === 'en' ? 'About CivicFix' : 'CivicFix के बारे में',
      onPress: () => {},
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      language === 'en' ? 'Logout' : 'लॉगआउट',
      language === 'en' ? 'Are you sure you want to logout?' : 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
      [
        {
          text: language === 'en' ? 'Cancel' : 'रद्द करें',
          style: 'cancel',
        },
        {
          text: language === 'en' ? 'Logout' : 'लॉगआउट',
          onPress: onLogout,
          style: 'destructive',
        },
      ]
    );
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
        return '#EF4444';
      case 'staff':
        return '#8B5CF6';
      default:
        return theme.colors.primary;
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'admin':
        return language === 'en' ? 'Administrator' : 'प्रशासक';
      case 'staff':
        return language === 'en' ? 'Staff Member' : 'स्टाफ सदस्य';
      default:
        return language === 'en' ? 'Citizen' : 'नागरिक';
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }, theme.shadows.medium]}>
        <View style={styles.profileInfo}>
          {/* Avatar */}
          <LinearGradient
            colors={theme.gradients.blueGreen}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </LinearGradient>

          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.colors.foreground }]}>
              {userData?.name || 'User'}
            </Text>
            <Text style={[styles.userEmail, { color: theme.colors.mutedForeground }]}>
              {userData?.email || 'user@civicfix.com'}
            </Text>
            
            {/* Role Badge */}
            <View style={[styles.roleBadge, { backgroundColor: getRoleColor() + '20', borderColor: getRoleColor() }]}>
              <Text style={[styles.roleText, { color: getRoleColor() }]}>
                {getRoleLabel()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {profileStats.map((stat) => (
          <View key={stat.id} style={[styles.statCard, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <Icon name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={[styles.statValue, { color: theme.colors.foreground }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.mutedForeground }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          {language === 'en' ? 'Settings' : 'सेटिंग्स'}
        </Text>

        {/* Dark Mode Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name={isDark ? 'moon' : 'sun'} size={20} color={theme.colors.foreground} />
            <Text style={[styles.settingText, { color: theme.colors.foreground }]}>
              {language === 'en' ? 'Dark Mode' : 'डार्क मोड'}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.colors.mutedForeground, true: theme.colors.primary }}
            thumbColor={isDark ? theme.colors.primaryForeground : theme.colors.background}
          />
        </View>

        {/* Language Toggle */}
        <TouchableOpacity style={styles.settingItem} onPress={toggleLanguage}>
          <View style={styles.settingInfo}>
            <Icon name="globe" size={20} color={theme.colors.foreground} />
            <Text style={[styles.settingText, { color: theme.colors.foreground }]}>
              {language === 'en' ? 'Language' : 'भाषा'}
            </Text>
          </View>
          <View style={styles.languageIndicator}>
            <Text style={[styles.languageText, { color: theme.colors.primary }]}>
              {language === 'en' ? 'English' : 'हिंदी'}
            </Text>
            <Icon name="chevron-right" size={16} color={theme.colors.mutedForeground} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          {language === 'en' ? 'Account' : 'खाता'}
        </Text>

        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemInfo}>
              <Icon name={item.icon} size={20} color={theme.colors.foreground} />
              <Text style={[styles.menuItemText, { color: theme.colors.foreground }]}>
                {item.label}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={theme.colors.mutedForeground} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.logoutGradient}
          >
            <Icon name="log-out" size={20} color="#ffffff" />
            <Text style={styles.logoutText}>
              {language === 'en' ? 'Logout' : 'लॉगआउट'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: theme.colors.mutedForeground }]}>
          CivicFix v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    padding: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 8,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  languageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  menuItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutContainer: {
    margin: 16,
  },
  logoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
  },
});