# CivicFix Mobile App

A comprehensive React Native mobile application for civic issue reporting and community engagement, built with Expo and TypeScript.

## Features

### Core Functionality
- **Multi-method Authentication**: Email, Phone, OTP, Aadhar, and Guest login
- **Issue Reporting**: Camera integration, GPS location detection, categorization
- **Real-time Tracking**: Track reported issues with status updates
- **Push Notifications**: Native notifications for issue updates
- **Role-based Access**: User, Staff, and Admin roles with different dashboards
- **Transparency Dashboard**: Public data on issue resolution and government performance

### Technical Features
- **Native Camera Integration**: Take photos or select from gallery
- **GPS Services**: Automatic location detection with address resolution
- **Offline Storage**: AsyncStorage for user data and preferences
- **Multi-language Support**: English and Hindi with easy switching
- **Dark Mode**: Automatic theme switching with user preference
- **Charts & Analytics**: Beautiful charts using react-native-chart-kit
- **Responsive Design**: Optimized for all screen sizes

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **UI Components**: React Native Paper + Custom components
- **Charts**: react-native-chart-kit
- **Notifications**: Expo Notifications
- **Camera**: Expo Camera & Image Picker
- **Location**: Expo Location
- **Storage**: AsyncStorage

## Project Structure

```
mobile/
├── App.tsx                 # Main app entry point
├── index.js               # App registration
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler config
├── tsconfig.json         # TypeScript config
├── context/              # React Context providers
│   ├── ThemeContext.tsx  # Theme management
│   └── LanguageContext.tsx # Language management
├── src/
│   ├── screens/          # Screen components
│   │   ├── AuthScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ReportIssueScreen.tsx
│   │   ├── NotificationsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── AdminDashboardScreen.tsx
│   │   ├── StaffDashboardScreen.tsx
│   │   ├── TransparencyDashboardScreen.tsx
│   │   └── RegistrationSuccessScreen.tsx
│   └── services/         # Service modules
│       ├── NotificationService.ts
│       ├── LocationService.ts
│       └── CameraService.ts
└── assets/               # Images, fonts, icons
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g @expo/cli`)
- For iOS: Xcode and iOS Simulator
- For Android: Android Studio and emulator

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd civicfix-mobile/mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS Simulator
   npm run ios
   # or press 'i' in the terminal

   # Android Emulator
   npm run android
   # or press 'a' in the terminal

   # Physical device (scan QR code with Expo Go app)
   ```

### Expo Go Setup (Recommended for Development)

1. Install [Expo Go](https://expo.dev/client) on your mobile device
2. Run `expo start` or `npm start`
3. Scan the QR code with your device's camera (iOS) or Expo Go app (Android)

### Development Build Setup

For production or testing native features:

1. **Create development build**
   ```bash
   eas build --profile development --platform ios
   eas build --profile development --platform android
   ```

2. **Install on device**
   ```bash
   eas build:run --platform ios
   eas build:run --platform android
   ```

## Configuration

### Environment Setup

1. **Update app.json**
   - Set your `projectId` in `extra.eas.projectId`
   - Update `owner` with your Expo username
   - Customize app name, icons, and splash screen

2. **Push Notifications**
   - Replace `projectId` in `NotificationService.ts`
   - Configure notification settings in app.json

3. **App Icons & Splash Screen**
   - Add your app icon to `assets/icon.png` (1024x1024)
   - Add splash screen to `assets/splash.png`
   - Add adaptive icon to `assets/adaptive-icon.png`

### Build Configuration

Update `app.json` for production builds:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

## Building for Production

### Using EAS Build (Recommended)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for stores**
   ```bash
   # iOS App Store
   eas build --platform ios --profile production

   # Google Play Store
   eas build --platform android --profile production

   # Both platforms
   eas build --platform all --profile production
   ```

### Local Development Builds

```bash
# iOS development build
eas build --profile development --platform ios --local

# Android development build  
eas build --profile development --platform android --local
```

## Key Features Implementation

### Authentication System
- Multiple login methods (Email, Phone, OTP, Aadhar)
- Guest access option
- Role-based authentication (User, Staff, Admin)
- Secure token storage with AsyncStorage

### Camera Integration
- Native camera access with permission handling
- Photo gallery selection
- Image compression and optimization
- Multiple image support for issue reporting

### Location Services
- GPS location detection
- Reverse geocoding for address resolution
- Location permission management
- Manual location search capability

### Push Notifications
- Local and remote notification support
- Notification categorization and management
- Badge count management
- Deep linking from notifications

### Offline Support
- AsyncStorage for user preferences
- Cached data for offline viewing
- Sync mechanism for when connection returns

## Customization

### Theming
The app uses a comprehensive theme system:

```typescript
// Customize colors in context/ThemeContext.tsx
const lightTheme = {
  primary: '#0EA5E9',      // Main brand color
  secondary: '#10B981',    // Secondary actions
  background: '#F8FAFC',   // App background
  surface: '#FFFFFF',      // Card backgrounds
  // ... more colors
};
```

### Language Support
Add new languages in `context/LanguageContext.tsx`:

```typescript
const translations = {
  'welcome': {
    en: 'Welcome',
    hi: 'स्वागत है',
    // Add new language here
    fr: 'Bienvenue'
  }
};
```

### Charts & Analytics
Customize charts in dashboard screens:
- Line charts for trends
- Bar charts for categories
- Pie charts for distributions
- Custom styling and animations

## Performance Optimization

### Bundle Size
- Tree shaking enabled
- Lazy loading for screens
- Optimized image assets
- Minimal dependencies

### Runtime Performance
- FlatList for large data sets
- Image caching and optimization
- Background task management
- Memory leak prevention

## Testing

### Unit Testing
```bash
npm test
```

### E2E Testing
```bash
# Install Detox for E2E testing
npm install -g detox-cli
detox test
```

### Device Testing
- Test on multiple device sizes
- Test camera and location permissions
- Test offline functionality
- Performance testing on older devices

## Deployment

### App Store (iOS)
1. Build with `eas build --platform ios --profile production`
2. Download .ipa file
3. Upload to App Store Connect
4. Submit for review

### Google Play Store (Android)
1. Build with `eas build --platform android --profile production`
2. Download .aab file
3. Upload to Google Play Console
4. Submit for review

### Over-the-Air Updates
```bash
# Deploy updates without app store review
eas update --branch production
```

## Troubleshooting

### Common Issues

1. **Metro bundler errors**
   ```bash
   npx expo start --clear
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean
   ```

4. **Permission issues**
   - Check app.json permissions
   - Test on physical device
   - Review native code modifications

### Debug Mode

Enable debug features in development:
- Remote debugging with Chrome DevTools
- React Native Debugger
- Flipper integration
- Performance monitoring

## Support

For issues and questions:
- Check the [Expo documentation](https://docs.expo.dev/)
- Review [React Native guides](https://reactnative.dev/docs/getting-started)
- Open GitHub issues for bugs
- Join the Expo Discord community

## License

[Your License Here]

---

Built with ❤️ using React Native and Expo