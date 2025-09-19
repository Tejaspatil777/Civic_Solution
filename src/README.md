# 🏛️ CivicFix - Complete Civic Issue Reporting Platform

A comprehensive civic issue reporting platform helping communities report, track, and resolve civic problems efficiently. Available as both **Web Application** and **Mobile App (React Native)**.

## 🚀 **Quick Start Guide**

### **Option 1: Run Web Application (Recommended to start)**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### **Option 2: Run Mobile Application**

```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Navigate to mobile folder
cd mobile

# Install mobile dependencies
npm install

# Start mobile development
expo start
```

## 📱 **Two Complete Applications**

### **🌐 Web Application**
- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Radix UI + shadcn/ui
- **Features**: Full civic issue reporting platform

### **📱 Mobile Application** 
- **Framework**: React Native + Expo
- **Styling**: StyleSheet with theme system
- **Features**: Native camera, GPS, push notifications
- **Platforms**: iOS + Android

## 🎯 **Core Features**

### **🔐 Authentication System**
- **Multi-method login**: Email, Phone, OTP, Aadhar
- **Role-based access**: User, Staff, Admin
- **Guest access option**
- **Registration success flow**

### **📊 Issue Management**
- **Report issues** with photos and GPS location
- **Track status** (Pending → In Progress → Resolved)
- **Category filtering** (Roads, Water, Garbage, Electricity, Other)
- **Auto-assign staff** based on location and category
- **Community feed** with likes and comments

### **👥 User Roles & Dashboards**
- **Citizens**: Report issues, track progress, earn civic points
- **Staff**: Manage assigned issues, update status
- **Admin**: Full system management, analytics, user management

### **🌍 Accessibility & Localization**
- **Multi-language**: English + Hindi support
- **Dark/Light mode** with system detection
- **Responsive design** for all screen sizes
- **WCAG accessibility** compliance

### **🔍 Advanced Features**
- **Search & filters** by category, status, location
- **Transparency dashboard** with real-time stats
- **Notification system** (Push, Email, SMS)
- **Location suggestions** with GPS integration
- **Photo upload** with camera integration

## 🛠 **Technical Architecture**

### **Web App Stack**
```
React 18 + TypeScript
├── Vite (Build tool)
├── Tailwind CSS v4.0 (Styling)
├── Radix UI (Headless components)
├── shadcn/ui (Component library)
├── Lucide React (Icons)
├── Recharts (Data visualization)
└── React Hook Form (Form handling)
```

### **Mobile App Stack**
```
React Native + Expo
├── Expo SDK 49 (Development platform)
├── React Navigation (Navigation)
├── Expo Camera (Camera integration)
├── Expo Location (GPS services)
├── AsyncStorage (Local storage)
├── Linear Gradient (UI effects)
└── Vector Icons (Icon library)
```

## 📁 **Project Structure**

```
civicfix/
├── 📱 Mobile App (React Native)
│   ├── mobile/
│   │   ├── App.tsx                 # Main mobile app
│   │   ├── components/             # Mobile components
│   │   ├── context/               # Language context
│   │   ├── theme/                 # Theme system
│   │   ├── package.json           # Mobile dependencies
│   │   └── app.json              # Expo configuration
│   └── mobile/expo-setup.md       # Mobile setup guide
│
├── 🌐 Web App (React + Vite)
│   ├── App.tsx                    # Main web app
│   ├── components/                # Web components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── auth-screen.tsx       # Authentication
│   │   ├── home-feed.tsx         # Issue feed
│   │   ├── report-issue.tsx      # Issue reporting
│   │   ├── admin-dashboard.tsx   # Admin interface
│   │   └── ...                   # Other components
│   ├── styles/globals.css        # Tailwind CSS
│   ├── package.json              # Web dependencies
│   └── vite.config.ts           # Vite configuration
│
└── 📄 Documentation
    ├── README.md                  # This file
    ├── guidelines/Guidelines.md   # Development guidelines
    └── Attributions.md           # Third-party credits
```

## 🎨 **Design System**

### **Color Palette**
- **Primary**: `#0EA5E9` (Civic Blue)
- **Secondary**: `#10B981` (Civic Green)
- **Accent**: `#06B6D4` (Blue-Green blend)
- **Background**: Gradient from blue to green tones
- **Dark Mode**: Deep blues with enhanced contrast

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Responsive sizing** with CSS custom properties
- **Consistent weight scale** (400, 500, 600, 700)

### **Components**
- **Rounded corners** (0.75rem default radius)
- **Soft shadows** with blue-green tints
- **Gradient buttons** and accent elements
- **Card-based layouts** for content organization

## 🚦 **Getting Started**

### **Prerequisites**
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- For mobile: **Expo CLI** + **iOS Simulator** or **Android Emulator**

### **Web Development**
```bash
# Clone repository
git clone <repository-url>
cd civicfix

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Mobile Development**
```bash
# Install Expo CLI
npm install -g @expo/cli

# Navigate to mobile folder
cd mobile

# Install dependencies
npm install

# Start development
expo start

# Run on iOS Simulator
expo start --ios

# Run on Android Emulator
expo start --android

# Build for production
expo build:android  # Android APK/AAB
expo build:ios      # iOS IPA
```

## 📊 **Demo Credentials**

Test the application with these demo accounts:

| Role | Email | Password |
|------|--------|----------|
| **Admin** | admin@civicfix.com | admin123 |
| **Staff** | staff@civicfix.com | staff123 |
| **User** | user@civicfix.com | user123 |

## 🌟 **Key Features Showcase**

### **🎯 Smart Issue Reporting**
- **Photo capture** with native camera integration
- **GPS location detection** with reverse geocoding
- **Auto-staff assignment** based on category and location
- **Estimated resolution time** calculation

### **📊 Real-time Analytics**
- **Transparency dashboard** with live statistics
- **Category-wise breakdown** with progress tracking
- **Monthly trend analysis** with charts
- **Performance metrics** and KPIs

### **👤 Role-based Access Control**
- **Dynamic UI** based on user permissions
- **Admin dashboard** for system management
- **Staff interface** for issue management
- **Citizen tools** for reporting and tracking

### **🔔 Notification System**
- **Push notifications** for mobile app
- **Email notifications** for updates
- **SMS alerts** for critical issues
- **In-app notifications** with read/unread status

## 🛡️ **Security & Privacy**

- **Role-based authentication** with secure session management
- **Data validation** on both client and server side
- **Privacy-compliant** data handling
- **Secure file uploads** with type validation

## 🌍 **Internationalization**

- **Multi-language support**: English and Hindi
- **RTL layout support** ready
- **Localized date/time** formatting
- **Cultural adaptation** for Indian civic context

## 📱 **Mobile-Specific Features**

- **Native camera access** for issue photos
- **GPS location services** for accurate reporting
- **Offline capability** with local data storage
- **Push notifications** for real-time updates
- **Touch-friendly interface** optimized for mobile use

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **shadcn/ui** for excellent component library
- **Radix UI** for accessible headless components
- **Expo** for amazing React Native development experience
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons

---

**Built with ❤️ for better civic engagement**

For detailed setup instructions, see:
- 🌐 **Web App**: Follow instructions above
- 📱 **Mobile App**: See `/mobile/expo-setup.md`