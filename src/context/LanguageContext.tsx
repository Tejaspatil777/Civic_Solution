import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // App Name
  appName: {
    en: 'CivicFix',
    hi: 'नागरिक समाधान'
  },
  
  // Navigation
  home: {
    en: 'Home',
    hi: 'होम'
  },
  dashboard: {
    en: 'Dashboard',
    hi: 'डैशबोर्ड'
  },
  notifications: {
    en: 'Notifications',
    hi: 'सूचनाएं'
  },
  profile: {
    en: 'Profile',
    hi: 'प्रोफ़ाइल'
  },
  
  // Authentication
  login: {
    en: 'Login',
    hi: 'लॉगिन'
  },
  signup: {
    en: 'Sign Up',
    hi: 'साइन अप'
  },
  email: {
    en: 'Email',
    hi: 'ईमेल'
  },
  password: {
    en: 'Password',
    hi: 'पासवर्ड'
  },
  phone: {
    en: 'Phone Number',
    hi: 'फोन नंबर'
  },
  name: {
    en: 'Name',
    hi: 'नाम'
  },
  
  // Issue Reporting
  reportIssue: {
    en: 'Report Issue',
    hi: 'समस्या रिपोर्ट करें'
  },
  takePhoto: {
    en: 'Take Photo',
    hi: 'फोटो लें'
  },
  selectPhoto: {
    en: 'Select Photo',
    hi: 'फोटो चुनें'
  },
  location: {
    en: 'Location',
    hi: 'स्थान'
  },
  description: {
    en: 'Description',
    hi: 'विवरण'
  },
  category: {
    en: 'Category',
    hi: 'श्रेणी'
  },
  submit: {
    en: 'Submit',
    hi: 'जमा करें'
  },
  
  // Categories
  roadInfrastructure: {
    en: 'Road & Infrastructure',
    hi: 'सड़क और बुनियादी ढांचा'
  },
  waterSanitation: {
    en: 'Water & Sanitation',
    hi: 'पानी और स्वच्छता'
  },
  electricityPower: {
    en: 'Electricity & Power',
    hi: 'बिजली और विद्युत'
  },
  wasteManagement: {
    en: 'Waste Management',
    hi: 'अपशिष्ट प्रबंधन'
  },
  publicSafety: {
    en: 'Public Safety',
    hi: 'सार्वजनिक सुरक्षा'
  },
  other: {
    en: 'Other',
    hi: 'अन्य'
  },
  
  // Status
  pending: {
    en: 'Pending',
    hi: 'लंबित'
  },
  inProgress: {
    en: 'In Progress',
    hi: 'प्रगति में'
  },
  resolved: {
    en: 'Resolved',
    hi: 'हल किया गया'
  },
  
  // Common Actions
  save: {
    en: 'Save',
    hi: 'सेव करें'
  },
  cancel: {
    en: 'Cancel',
    hi: 'रद्द करें'
  },
  edit: {
    en: 'Edit',
    hi: 'संपादित करें'
  },
  delete: {
    en: 'Delete',
    hi: 'हटाएं'
  },
  search: {
    en: 'Search',
    hi: 'खोजें'
  },
  filter: {
    en: 'Filter',
    hi: 'फिल्टर'
  },
  
  // Settings
  settings: {
    en: 'Settings',
    hi: 'सेटिंग्स'
  },
  darkMode: {
    en: 'Dark Mode',
    hi: 'डार्क मोड'
  },
  language: {
    en: 'Language',
    hi: 'भाषा'
  },
  logout: {
    en: 'Logout',
    hi: 'लॉगआउट'
  },
  
  // Roles
  user: {
    en: 'User',
    hi: 'उपयोगकर्ता'
  },
  staff: {
    en: 'Staff Member',
    hi: 'स्टाफ सदस्य'
  },
  admin: {
    en: 'Administrator',
    hi: 'प्रशासक'
  },
  
  // Dashboard
  totalIssues: {
    en: 'Total Issues',
    hi: 'कुल समस्याएं'
  },
  resolvedIssues: {
    en: 'Resolved Issues',
    hi: 'हल की गई समस्याएं'
  },
  pendingIssues: {
    en: 'Pending Issues',
    hi: 'लंबित समस्याएं'
  },
  
  // Messages
  welcomeMessage: {
    en: 'Welcome to CivicFix',
    hi: 'नागरिक समाधान में आपका स्वागत है'
  },
  issueSubmitted: {
    en: 'Issue submitted successfully',
    hi: 'समस्या सफलतापूर्वक जमा की गई'
  },
  noIssuesFound: {
    en: 'No issues found',
    hi: 'कोई समस्या नहीं मिली'
  },
  
  // Permissions
  cameraPermission: {
    en: 'Camera Permission',
    hi: 'कैमरा अनुमति'
  },
  locationPermission: {
    en: 'Location Permission',
    hi: 'स्थान अनुमति'
  },
  grantPermission: {
    en: 'Grant Permission',
    hi: 'अनुमति दें'
  },
  permissionDenied: {
    en: 'Permission Denied',
    hi: 'अनुमति मना कर दी गई'
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('civicfix_language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
        setLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  };

  const toggleLanguage = async () => {
    try {
      const newLanguage: Language = language === 'en' ? 'hi' : 'en';
      setLanguage(newLanguage);
      await AsyncStorage.setItem('civicfix_language', newLanguage);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en || key;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};