import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

// Services
import { takePhoto, selectFromGallery, showImagePickerOptions, ImageData } from '../services/CameraService';
import { getCurrentLocation, LocationData, formatAddress } from '../services/LocationService';
import { sendLocalNotification } from '../services/NotificationService';

interface Category {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  color: string;
}

const ReportIssueScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const categories: Category[] = [
    {
      id: 'roads',
      name: 'Roads & Transport',
      nameHi: 'सड़कें और परिवहन',
      icon: 'car',
      color: '#EF4444',
    },
    {
      id: 'water',
      name: 'Water & Sanitation',
      nameHi: 'पानी और स्वच्छता',
      icon: 'water',
      color: '#3B82F6',
    },
    {
      id: 'electricity',
      name: 'Electricity',
      nameHi: 'बिजली',
      icon: 'flash',
      color: '#F59E0B',
    },
    {
      id: 'waste',
      name: 'Waste Management',
      nameHi: 'कचरा प्रबंधन',
      icon: 'trash',
      color: '#10B981',
    },
    {
      id: 'safety',
      name: 'Public Safety',
      nameHi: 'सार्वजनिक सुरक्षा',
      icon: 'shield',
      color: '#8B5CF6',
    },
    {
      id: 'environment',
      name: 'Environment',
      nameHi: 'पर्यावरण',
      icon: 'leaf',
      color: '#059669',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    backButton: {
      padding: 8,
      marginRight: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      flex: 1,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 12,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: theme.colors.text,
      borderWidth: 1,
      borderColor: theme.colors.border,
      minHeight: 50,
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    categoryCard: {
      width: '47%',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedCategoryCard: {
      borderColor: theme.colors.primary,
      backgroundColor: `${theme.colors.primary}10`,
    },
    categoryIcon: {
      marginBottom: 8,
    },
    categoryName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
    },
    imagesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 12,
    },
    imageCard: {
      width: 100,
      height: 100,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    removeImageButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 12,
      padding: 4,
    },
    addImageButton: {
      width: 100,
      height: 100,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
    },
    locationContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    locationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    locationText: {
      fontSize: 14,
      color: theme.colors.text,
      flex: 1,
    },
    detectLocationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    detectLocationText: {
      color: 'white',
      fontSize: 12,
      marginLeft: 4,
      fontWeight: '600',
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    submitButtonDisabled: {
      backgroundColor: theme.colors.textSecondary,
      opacity: 0.6,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    requiredIndicator: {
      color: theme.colors.destructive,
      fontSize: 16,
    },
  });

  useEffect(() => {
    // Auto-detect location when component mounts
    handleDetectLocation();
  }, []);

  const handleDetectLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const currentLocation = await getCurrentLocation();
      if (currentLocation) {
        setLocation(currentLocation);
      }
    } catch (error) {
      console.error('Error detecting location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleAddImage = () => {
    showImagePickerOptions(
      async () => {
        const image = await takePhoto();
        if (image) {
          setImages(prev => [...prev, image]);
        }
      },
      async () => {
        const image = await selectFromGallery();
        if (image) {
          setImages(prev => [...prev, image]);
        }
      }
    );
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert(t('error'), 'Please enter a title for your issue');
      return false;
    }

    if (!description.trim()) {
      Alert.alert(t('error'), 'Please provide a description of the issue');
      return false;
    }

    if (!selectedCategory) {
      Alert.alert(t('error'), 'Please select a category for your issue');
      return false;
    }

    if (!location) {
      Alert.alert(t('error'), 'Please add location information for your issue');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create issue object
      const newIssue = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category: selectedCategory,
        images: images,
        location: location,
        timestamp: new Date().toISOString(),
        status: 'pending',
      };

      console.log('New issue submitted:', newIssue);

      // Send local notification
      await sendLocalNotification(
        t('success'),
        language === 'en' 
          ? 'Your issue has been reported successfully!' 
          : 'आपकी समस्या सफलतापूर्वक रिपोर्ट की गई है!',
        { type: 'issue_submitted', issueId: newIssue.id }
      );

      Alert.alert(
        t('success'),
        language === 'en'
          ? 'Your issue has been reported successfully! You will receive updates on its progress.'
          : 'आपकी समस्या सफलतापूर्वक रिपोर्ट की गई है! आपको इसकी प्रगति के बारे में अपडेट मिलेंगे।',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setTitle('');
              setDescription('');
              setSelectedCategory('');
              setImages([]);
              setLocation(null);
              
              // Navigate back to home
              navigation.navigate('Home' as never);
            },
          },
        ]
      );

    } catch (error) {
      console.error('Error submitting issue:', error);
      Alert.alert(
        t('error'),
        language === 'en'
          ? 'Failed to submit your issue. Please try again.'
          : 'आपकी समस्या जमा करने में विफल। कृपया पुनः प्रयास करें।'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryName = (category: Category) => {
    return language === 'en' ? category.name : category.nameHi;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('reportIssue')}</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Title Section */}
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {language === 'en' ? 'Issue Title' : 'समस्या का शीर्षक'}
                <Text style={styles.requiredIndicator}> *</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder={language === 'en' ? 'Brief title describing the issue' : 'समस्या का संक्षिप्त शीर्षक'}
                placeholderTextColor={theme.colors.textSecondary}
                maxLength={100}
              />
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {t('description')}
                <Text style={styles.requiredIndicator}> *</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder={language === 'en' 
                  ? 'Provide detailed description of the issue, when it started, and how it affects the community...'
                  : 'समस्या का विस्तृत विवरण दें, यह कब शुरू हुई, और यह समुदाय को कैसे प्रभावित करती है...'
                }
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                maxLength={500}
              />
            </View>
          </View>

          {/* Category Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t('category')}
              <Text style={styles.requiredIndicator}> *</Text>
            </Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.selectedCategoryCard,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={32}
                    color={selectedCategory === category.id ? theme.colors.primary : category.color}
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryName}>{getCategoryName(category)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Images Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'en' ? 'Add Photos' : 'फोटो जोड़ें'}
              {language === 'en' ? ' (Optional)' : ' (वैकल्पिक)'}
            </Text>
            <View style={styles.imagesContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageCard}>
                  <Image source={{ uri: image.uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
              {images.length < 5 && (
                <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                  <Ionicons name="camera" size={32} color={theme.colors.textSecondary} />
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 }}>
                    {language === 'en' ? 'Add Photo' : 'फोटो जोड़ें'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t('location')}
              <Text style={styles.requiredIndicator}> *</Text>
            </Text>
            <View style={styles.locationContainer}>
              <View style={styles.locationHeader}>
                <Text style={styles.locationText}>
                  {location 
                    ? formatAddress(location)
                    : (language === 'en' ? 'No location selected' : 'कोई स्थान चयनित नहीं')
                  }
                </Text>
                <TouchableOpacity
                  style={styles.detectLocationButton}
                  onPress={handleDetectLocation}
                  disabled={isLoadingLocation}
                >
                  <Ionicons 
                    name={isLoadingLocation ? "refresh" : "location"} 
                    size={16} 
                    color="white" 
                  />
                  <Text style={styles.detectLocationText}>
                    {isLoadingLocation 
                      ? (language === 'en' ? 'Detecting...' : 'खोज रहा है...')
                      : (language === 'en' ? 'Detect' : 'खोजें')
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting 
                ? (language === 'en' ? 'Submitting...' : 'जमा कर रहा है...')
                : t('submit')
              }
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportIssueScreen;