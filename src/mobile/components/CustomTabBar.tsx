import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

interface CustomTabBarProps extends BottomTabBarProps {
  userRole: 'user' | 'staff' | 'admin';
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  userRole,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const getIconName = (routeName: string): string => {
    switch (routeName) {
      case 'Home':
        return 'home';
      case 'Report':
        return 'plus-circle';
      case 'Search':
        return 'search';
      case 'Notifications':
        return 'bell';
      case 'Profile':
        return 'user';
      default:
        return 'circle';
    }
  };

  const getTabLabel = (routeName: string): string => {
    switch (routeName) {
      case 'Home':
        return t('home');
      case 'Report':
        return t('report');
      case 'Search':
        return t('search');
      case 'Notifications':
        return t('notifications');
      case 'Profile':
        return t('profile');
      default:
        return routeName;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <LinearGradient
        colors={theme.dark ? ['rgba(30, 41, 59, 0.95)', 'rgba(15, 23, 42, 0.98)'] : ['rgba(255, 255, 255, 0.95)', 'rgba(240, 249, 255, 0.98)']}
        style={styles.gradient}
      >
        <View
          style={[
            styles.tabBar,
            {
              borderTopColor: theme.colors.border,
              backgroundColor: 'transparent',
            },
          ]}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const iconName = getIconName(route.name);
            const label = getTabLabel(route.name);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            // Special styling for Report button
            if (route.name === 'Report') {
              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.reportButton}
                >
                  <LinearGradient
                    colors={theme.gradients.blueGreen}
                    style={styles.reportGradient}
                  >
                    <Icon
                      name={iconName}
                      size={24}
                      color={theme.colors.primaryForeground}
                    />
                  </LinearGradient>
                  <Text
                    style={[
                      styles.reportLabel,
                      { color: theme.colors.primary },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tab}
              >
                <View
                  style={[
                    styles.tabContent,
                    isFocused && {
                      backgroundColor: theme.colors.primary + '20',
                    },
                  ]}
                >
                  <Icon
                    name={iconName}
                    size={20}
                    color={
                      isFocused
                        ? theme.colors.primary
                        : theme.colors.mutedForeground
                    }
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        color: isFocused
                          ? theme.colors.primary
                          : theme.colors.mutedForeground,
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </View>

                {/* Role indicator for Profile tab */}
                {route.name === 'Profile' && (userRole === 'admin' || userRole === 'staff') && (
                  <View
                    style={[
                      styles.roleIndicator,
                      {
                        backgroundColor:
                          userRole === 'admin'
                            ? theme.colors.destructive
                            : theme.colors.warning,
                      },
                    ]}
                  >
                    <Text style={styles.roleText}>
                      {userRole === 'admin' ? 'A' : 'S'}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradient: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 60,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  reportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  reportGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  reportLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  roleIndicator: {
    position: 'absolute',
    top: 4,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});