import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  userRole: 'user' | 'staff' | 'admin';
  showBackButton?: boolean;
  title?: string;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleTheme,
  onToggleLanguage,
  userRole,
  showBackButton = false,
  title,
  onBackPress,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const { language, t } = useLanguage();

  const getRoleIndicator = () => {
    switch (userRole) {
      case 'admin':
        return { text: 'ADMIN', color: theme.colors.destructive };
      case 'staff':
        return { text: 'STAFF', color: theme.colors.warning };
      default:
        return null;
    }
  };

  const roleIndicator = getRoleIndicator();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={theme.dark ? 
            ['rgba(15, 23, 42, 0.95)', 'rgba(30, 41, 59, 0.90)'] : 
            ['rgba(240, 249, 255, 0.95)', 'rgba(255, 255, 255, 0.90)']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            {/* Left side */}
            <View style={styles.leftSection}>
              {showBackButton ? (
                <TouchableOpacity
                  style={[styles.iconButton, { backgroundColor: theme.colors.card }]}
                  onPress={onBackPress}
                >
                  <Icon
                    name="arrow-left"
                    size={20}
                    color={theme.colors.foreground}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.logoSection}>
                  <LinearGradient
                    colors={theme.gradients.blueGreen}
                    style={styles.logoGradient}
                  >
                    <Text style={styles.logoText}>C</Text>
                  </LinearGradient>
                  <View>
                    <Text style={[styles.appName, { color: theme.colors.foreground }]}>
                      CivicFix
                    </Text>
                    {roleIndicator && (
                      <Text
                        style={[
                          styles.roleText,
                          { color: roleIndicator.color },
                        ]}
                      >
                        {roleIndicator.text}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>

            {/* Center - Title if provided */}
            {title && (
              <View style={styles.centerSection}>
                <Text style={[styles.title, { color: theme.colors.foreground }]}>
                  {title}
                </Text>
              </View>
            )}

            {/* Right side */}
            <View style={styles.rightSection}>
              {/* Language Toggle */}
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: theme.colors.card }]}
                onPress={onToggleLanguage}
              >
                <Text
                  style={[
                    styles.languageText,
                    { color: theme.colors.primary },
                  ]}
                >
                  {language.toUpperCase()}
                </Text>
              </TouchableOpacity>

              {/* Theme Toggle */}
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  { backgroundColor: theme.colors.card, marginLeft: 8 },
                ]}
                onPress={onToggleTheme}
              >
                <Icon
                  name={isDark ? 'sun' : 'moon'}
                  size={18}
                  color={theme.colors.foreground}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  gradient: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 60,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: -2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  languageText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});