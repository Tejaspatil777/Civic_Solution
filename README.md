# 🏛️ CivicFix - Complete Civic Issue Reporting Platform

A comprehensive civic issue reporting platform helping communities report, track, and resolve civic problems efficiently. Available as both **Web Application** and **Mobile App (React Native)**.

## 🚀 **Quick Start Guide**

### **Option 1: Run Web Application**

```bash
# Navigate to web app
cd web-app

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
cd mobile-app

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
- **Location**: `web-app/`

### **📱 Mobile Application** 
- **Framework**: React Native + Expo
- **Styling**: StyleSheet with theme system
- **Features**: Native camera, GPS, push notifications
- **Platforms**: iOS + Android
- **Location**: `mobile-app/`

## 🎯 **Core Features**

### **🔐 Authentication System**
- **Multi-method login**: Email, Phone, OTP, Aadhar
- **Role-based access**: User, Staff, Admin
- **Guest access option**
- **Secure session management**

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
├── Expo SDK 50 (Development platform)
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
│   ├── mobile-app/
│   │   ├── App.tsx                 # Main mobile app
│   │   ├── src/
│   │   │   ├── context/           # Theme & Language context
│   │   │   ├── screens/           # Mobile screens
│   │   │   └── services/          # Native services
│   │   ├── package.json           # Mobile dependencies
│   │   └── app.json              # Expo configuration
│
├── 🌐 Web App (React + Vite)
│   ├── web-app/
│   │   ├── src/
│   │   │   ├── components/        # Web components
│   │   │   │   ├── ui/           # shadcn/ui components
│   │   │   │   └── ...           # Feature components
│   │   │   ├── App.tsx           # Main web app
│   │   │   └── main.tsx          # Entry point
│   │   ├── package.json          # Web dependencies
│   │   └── vite.config.ts        # Vite configuration
│
└── 📄 Documentation
    ├── README.md                  # This file
    └── ...                       # Additional docs
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
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- For mobile: **Expo CLI** + **iOS Simulator** or **Android Emulator**

### **Web Development**
```bash
# Navigate to web app
cd web-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Mobile Development**
```bash
# Install Expo CLI
npm install -g @expo/cli

# Navigate to mobile app
cd mobile-app

# Install dependencies
npm install

# Start development
expo start

# Run on iOS Simulator
expo start --ios

# Run on Android Emulator
expo start --android
```

## 📊 **Demo Credentials**

Test the applications with these demo accounts:

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

This project is licensed under the MIT License.

## 🙏 **Acknowledgments**

- **shadcn/ui** for excellent component library
- **Radix UI** for accessible headless components
- **Expo** for amazing React Native development experience
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons

---

**Built with ❤️ for better civic engagement**

For detailed setup instructions:
- 🌐 **Web App**: See `/web-app/README.md`
- 📱 **Mobile App**: See `/mobile-app/README.md`