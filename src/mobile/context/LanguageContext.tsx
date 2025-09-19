import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

export type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // App Title
  appTitle: {
    en: 'CivicFix',
    hi: 'नागरिक समाधान'
  },
  
  // Navigation
  home: {
    en: 'Home',
    hi: 'होम'
  },
  report: {
    en: 'Report',
    hi: 'रिपोर्ट'
  },
  profile: {
    en: 'Profile',
    hi: 'प्रोफाइल'
  },
  notifications: {
    en: 'Notifications',
    hi: 'सूचनाएं'
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
  logout: {
    en: 'Logout',
    hi: 'लॉगआउट'
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
  description: {
    en: 'Description',
    hi: 'विवरण'
  },
  location: {
    en: 'Location',
    hi: 'स्थान'
  },
  category: {
    en: 'Category',
    hi: 'श्रेणी'
  },
  
  // Categories
  roads: {
    en: 'Roads & Transport',
    hi: 'सड़कें और परिवहन'
  },
  water: {
    en: 'Water & Sanitation',
    hi: 'पानी और स्वच्छता'
  },
  electricity: {
    en: 'Electricity',
    hi: 'बिजली'
  },
  waste: {
    en: 'Waste Management',
    hi: 'कचरा प्रबंधन'
  },
  safety: {
    en: 'Public Safety',
    hi: 'सार्वजनिक सुरक्षा'
  },
  environment: {
    en: 'Environment',
    hi: 'पर्यावरण'
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
  submit: {
    en: 'Submit',
    hi: 'जमा करें'
  },
  cancel: {
    en: 'Cancel',
    hi: 'रद्द करें'
  },
  save: {
    en: 'Save',
    hi: 'सेव करें'
  },
  delete: {
    en: 'Delete',
    hi: 'हटाएं'
  },
  edit: {
    en: 'Edit',
    hi: 'संपादित करें'
  },
  back: {
    en: 'Back',
    hi: 'वापस'
  },
  next: {
    en: 'Next',
    hi: 'अगला'
  },
  
  // Messages
  success: {
    en: 'Success!',
    hi: 'सफल!'
  },
  error: {
    en: 'Error',
    hi: 'त्रुटि'
  },
  loading: {
    en: 'Loading...',
    hi: 'लोड हो रहा है...'
  },
  noData: {
    en: 'No data available',
    hi: 'कोई डेटा उपलब्ध नहीं'
  },
  
  // Permissions
  cameraPermission: {
    en: 'Camera Permission Required',
    hi: 'कैमरा अनुमति आवश्यक'
  },
  locationPermission: {
    en: 'Location Permission Required',
    hi: 'स्थान अनुमति आवश्यक'
  },
  
  // Dashboard
  adminDashboard: {
    en: 'Admin Dashboard',
    hi: 'एडमिन डैशबोर्ड'
  },
  staffDashboard: {
    en: 'Staff Dashboard',
    hi: 'स्टाफ डैशबोर्ड'
  },
  transparencyDashboard: {
    en: 'Transparency Dashboard',
    hi: 'पारदर्शिता डैशबोर्ड'
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
  
  // User Roles
  administrator: {
    en: 'Administrator',
    hi: 'प्रशासक'
  },
  staffMember: {
    en: 'Staff Member',
    hi: 'स्टाफ सदस्य'
  },
  citizen: {
    en: 'Citizen',
    hi: 'नागरिक'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
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
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('@language_preference');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
          setLanguageState(savedLanguage as Language);
        } else {
          // Use system locale if available
          const locales = getLocales();
          const systemLang = locales[0]?.languageCode;
          if (systemLang === 'hi') {
            setLanguageState('hi');
          } else {
            setLanguageState('en');
          }
        }
      } catch (error) {
        console.log('Error loading language preference:', error);
        setLanguageState('en');
      }
    };

    loadLanguage();
  }, []);

  const saveLanguagePreference = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('@language_preference', lang);
    } catch (error) {
      console.log('Error saving language preference:', error);
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguagePreference(lang);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};