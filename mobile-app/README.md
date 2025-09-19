# CivicFix Mobile App

A React Native mobile application for civic issue reporting built with Expo.

## Features

- **Multi-platform**: iOS and Android support
- **Authentication**: Login/Signup with role-based access
- **Issue Reporting**: Camera integration and location detection
- **Real-time Updates**: Push notifications for issue status
- **Multi-language**: English and Hindi support
- **Dark Mode**: Automatic theme switching
- **Offline Support**: AsyncStorage for local data

## Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- For iOS: Xcode and iOS Simulator
- For Android: Android Studio and emulator

### Installation

1. **Navigate to mobile app directory**
   ```bash
   cd mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS Simulator
   npm run ios

   # Android Emulator
   npm run android

   # Physical device (scan QR code with Expo Go)
   ```

### Development

- Use Expo Go app for quick testing
- Hot reload enabled for fast development
- TypeScript support with strict mode
- ESLint configuration for code quality

### Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure build
eas build:configure

# Build for app stores
eas build --platform all
```

## Technology Stack

- **React Native** with Expo SDK 50
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Expo Camera** for photo capture
- **Expo Location** for GPS services
- **AsyncStorage** for local storage
- **Linear Gradient** for UI effects

## Project Structure

```
mobile-app/
├── App.tsx                 # Main app component
├── src/
│   ├── context/           # React Context providers
│   ├── screens/           # Screen components
│   └── services/          # Service modules
├── assets/                # Images and fonts
└── app.json              # Expo configuration
```