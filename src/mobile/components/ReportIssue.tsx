import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ReportIssueProps {
  onClose: () => void;
  language: 'en' | 'hi';
}

export const ReportIssue: React.FC<ReportIssueProps> = ({ onClose, language }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { theme } = useTheme();
  const { t } = useLanguage();

  const categories = [
    { id: 'roads', icon: '🛣️', label: language === 'en' ? 'Roads & Infrastructure' : 'सड़क और बुनियादी ढांचा' },
    { id: 'water', icon: '💧', label: language === 'en' ? 'Water & Drainage' : 'पानी और जल निकासी' },
    { id: 'garbage', icon: '🗑️', label: language === 'en' ? 'Garbage & Sanitation' : 'कचरा और स्वच्छता' },
    { id: 'electricity', icon: '⚡', label: language === 'en' ? 'Electricity' : 'बिजली' },
    { id: 'other', icon: '🏢', label: language === 'en' ? 'Other' : 'अन्य' },
  ];

  const text = {
    en: {
      title: 'Report New Issue',
      subtitle: 'Help improve your community',
      photos: 'Add Photos',
      takePhoto: 'Take Photo',
      choosePhoto: 'Choose from Gallery',
      issueTitle: 'Issue Title',
      titlePlaceholder: 'Brief description of the issue',
      description: 'Description',
      descPlaceholder: 'Provide detailed information about the issue...',
      location: 'Location',
      detectLocation: 'Detect My Location',
      category: 'Category',
      selectCategory: 'Select category',
      submit: 'Submit Report',
      submitting: 'Submitting...',
    },
    hi: {
      title: 'नई समस्या रिपोर्ट करें',
      subtitle: 'अपने समुदाय को बेहतर बनाने में मदद करें',
      photos: 'फोटो जोड़ें',
      takePhoto: 'फोटो लें',
      choosePhoto: 'गैलरी से चुनें',
      issueTitle: 'समस्या का शीर्षक',
      titlePlaceholder: 'समस्या का संक्षिप्त विवरण',
      description: 'विवरण',
      descPlaceholder: 'समस्या के बारे में विस्तृत जानकारी प्रदान करें...',
      location: 'स्थान',
      detectLocation: 'मेरा स्थान पता करें',
      category: 'श्रेणी',
      selectCategory: 'श्रेणी चुनें',
      submit: 'रिपोर्ट जमा करें',
      submitting: 'जमा कर रहे हैं...',
    },
  };

  const currentText = text[language];

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  const requestLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImages(prev => [...prev, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const chooseFromLibrary = async () => {
    const hasPermission = await requestLibraryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Photo library permission is required to select photos.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        allowsEditing: false,
        quality: 0.8,
        selectionLimit: 6 - selectedImages.length,
      });

      if (!result.canceled) {
        const newImages = result.assets.map(asset => asset.uri);
        setSelectedImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      console.error('Error selecting photos:', error);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location permission is required to detect your location.'
        );
        setIsDetectingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address[0]) {
        const formattedAddress = `${address[0].street || ''} ${address[0].city || ''} ${address[0].region || ''}`.trim();
        setLocation(formattedAddress);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not detect location. Please enter manually.');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !selectedCategory || !location.trim()) {
      Alert.alert(
        'Missing Information',
        'Please fill in all required fields (title, category, and location).'
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Success',
        'Your issue has been reported successfully!',
        [{ text: 'OK', onPress: onClose }]
      );
    }, 2000);
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.card }, theme.shadows.small]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="x" size={24} color={theme.colors.foreground} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: theme.colors.foreground }]}>
              {currentText.title}
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.mutedForeground }]}>
              {currentText.subtitle}
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Photo Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
              {currentText.photos} ({selectedImages.length}/6)
            </Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: image }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.removePhoto}
                    onPress={() => removeImage(index)}
                  >
                    <Icon name="x" size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              ))}
              
              {selectedImages.length < 6 && (
                <View style={styles.photoActions}>
                  <TouchableOpacity
                    style={[styles.photoButton, { backgroundColor: theme.colors.primary }]}
                    onPress={takePhoto}
                  >
                    <Icon name="camera" size={20} color="#ffffff" />
                    <Text style={styles.photoButtonText}>{currentText.takePhoto}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.photoButton, { backgroundColor: theme.colors.secondary }]}
                    onPress={chooseFromLibrary}
                  >
                    <Icon name="image" size={20} color="#ffffff" />
                    <Text style={styles.photoButtonText}>{currentText.choosePhoto}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Title */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
              {currentText.issueTitle} *
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.foreground, borderColor: theme.colors.border }]}
              placeholder={currentText.titlePlaceholder}
              placeholderTextColor={theme.colors.mutedForeground}
              value={title}
              onChangeText={setTitle}
              multiline
            />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
              {currentText.description}
            </Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.colors.card, color: theme.colors.foreground, borderColor: theme.colors.border }]}
              placeholder={currentText.descPlaceholder}
              placeholderTextColor={theme.colors.mutedForeground}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
              {currentText.location} *
            </Text>
            <View style={styles.locationContainer}>
              <TextInput
                style={[styles.locationInput, { backgroundColor: theme.colors.card, color: theme.colors.foreground, borderColor: theme.colors.border }]}
                placeholder="Enter location or detect automatically"
                placeholderTextColor={theme.colors.mutedForeground}
                value={location}
                onChangeText={setLocation}
                multiline
              />
              <TouchableOpacity
                style={[styles.locationButton, { backgroundColor: theme.colors.primary }]}
                onPress={detectLocation}
                disabled={isDetectingLocation}
              >
                <Icon 
                  name="map-pin" 
                  size={20} 
                  color="#ffffff"
                  style={isDetectingLocation ? styles.spinning : {}}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
              {currentText.category} *
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
                    selectedCategory === category.id && { 
                      backgroundColor: theme.colors.primary,
                      borderColor: theme.colors.primary 
                    }
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[
                    styles.categoryText,
                    { color: selectedCategory === category.id ? '#ffffff' : theme.colors.foreground }
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={[styles.footer, { backgroundColor: theme.colors.card }]}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={theme.gradients.blueGreen}
              style={styles.submitGradient}
            >
              {isSubmitting ? (
                <Text style={styles.submitText}>{currentText.submitting}</Text>
              ) : (
                <>
                  <Icon name="upload" size={20} color="#ffffff" />
                  <Text style={styles.submitText}>{currentText.submit}</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 44 : 12,
  },
  closeButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  photoScroll: {
    marginHorizontal: -8,
  },
  photoContainer: {
    position: 'relative',
    marginHorizontal: 8,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  removePhoto: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoActions: {
    marginHorizontal: 8,
  },
  photoButton: {
    width: 80,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  photoButtonText: {
    color: '#ffffff',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 12,
    minHeight: 48,
  },
  locationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinning: {
    // Add animation here if needed
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 120,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  submitButton: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});