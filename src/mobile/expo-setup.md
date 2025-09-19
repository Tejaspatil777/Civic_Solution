# 📱 CivicFix Mobile App Setup Guide

## 🚀 Quick Start

### **Step 1: Install Expo CLI**
```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Or using yarn
yarn global add @expo/cli

# Verify installation
expo --version
```

### **Step 2: Navigate to Mobile Directory**
```bash
cd mobile
```

### **Step 3: Install Dependencies**
```bash
# Install all dependencies
npm install

# Or using yarn  
yarn install
```

### **Step 4: Start Development Server**
```bash
# Start Expo development server
expo start

# Or start with specific platform
expo start --ios      # For iOS Simulator
expo start --android  # For Android Emulator
expo start --web      # For web browser
```

## 📱 **Running on Device**

### **Physical Device (Recommended)**
1. **Install Expo Go app** from App Store (iOS) or Google Play (Android)
2. **Scan QR code** shown in terminal or Expo Dev Tools
3. **App will load** on your device with hot reload

### **iOS Simulator**
1. **Install Xcode** from Mac App Store (macOS only)
2. **Open iOS Simulator** from Xcode or Spotlight
3. **Run command**: `expo start --ios`

### **Android Emulator**
1. **Install Android Studio**
2. **Set up Android Virtual Device (AVD)**
3. **Start emulator** and run: `expo start --android`

## 🔧 **Development Commands**

```bash
# Start development server
expo start

# Start with cleared cache
expo start --clear

# Build for production
expo build:android    # Android APK/AAB
expo build:ios        # iOS IPA

# Update over-the-air
expo publish

# Eject from Expo (not recommended unless needed)
expo eject
```

## 🛠 **Troubleshooting**

### **Common Issues:**

1. **"expo command not found"**
   ```bash
   npm install -g @expo/cli
   ```

2. **Metro bundler issues**
   ```bash
   expo start --clear
   ```

3. **iOS Simulator not opening**
   - Make sure Xcode is installed
   - Try: `expo start --ios`

4. **Android emulator not connecting**
   - Check if emulator is running
   - Try: `expo start --android`

5. **Dependencies issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

## 🌟 **Features Available**

✅ **Authentication** - Login/Signup with validation  
✅ **Camera Integration** - Take photos with device camera  
✅ **Location Services** - GPS location detection  
✅ **Offline Storage** - AsyncStorage for user data  
✅ **Push Notifications** - Ready for implementation  
✅ **Dark/Light Mode** - Automatic theme switching  
✅ **Multi-Language** - English/Hindi support  
✅ **Role-Based Access** - Admin/Staff/User roles  

## 📊 **Performance Tips**

- **Use physical device** for better performance testing
- **Enable Fast Refresh** for quick development
- **Test on both iOS and Android** before release
- **Optimize images** before including in app
- **Use Expo DevTools** for debugging

## 🚀 **Production Build**

When ready to publish:

```bash
# Install EAS CLI (Expo Application Services)
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build for app stores
eas build --platform all

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 📱 **App Store Preparation**

Before submitting:
- [ ] Test on real devices
- [ ] Prepare app icons (1024x1024 for iOS, various sizes for Android)
- [ ] Create app screenshots
- [ ] Write app description
- [ ] Set up app store accounts
- [ ] Configure app metadata in app.json

---

**Need help?** Check the [Expo Documentation](https://docs.expo.dev/) or reach out to the development team.