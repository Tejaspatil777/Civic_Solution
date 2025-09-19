import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import { Alert } from 'react-native';

export interface ImageData {
  uri: string;
  width: number;
  height: number;
  type?: string;
  fileName?: string;
  fileSize?: number;
}

class CameraService {
  async requestCameraPermissions(): Promise<boolean> {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'CivicFix needs camera access to take photos of civic issues you want to report. Please enable camera access in your device settings.',
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      return false;
    }
  }

  async requestMediaLibraryPermissions(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Media Library Permission Required',
          'CivicFix needs access to your photo library to select images for issue reports. Please enable photo library access in your device settings.',
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting media library permissions:', error);
      return false;
    }
  }

  async takePhoto(): Promise<ImageData | null> {
    try {
      const hasPermission = await this.requestCameraPermissions();
      if (!hasPermission) {
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false,
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type || 'image',
        fileName: asset.fileName,
        fileSize: asset.fileSize,
      };
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert(
        'Camera Error',
        'Failed to take photo. Please try again.',
        [{ text: 'OK' }]
      );
      return null;
    }
  }

  async selectFromGallery(): Promise<ImageData | null> {
    try {
      const hasPermission = await this.requestMediaLibraryPermissions();
      if (!hasPermission) {
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false,
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type || 'image',
        fileName: asset.fileName,
        fileSize: asset.fileSize,
      };
    } catch (error) {
      console.error('Error selecting photo:', error);
      Alert.alert(
        'Gallery Error',
        'Failed to select photo. Please try again.',
        [{ text: 'OK' }]
      );
      return null;
    }
  }

  async selectMultipleFromGallery(maxImages: number = 5): Promise<ImageData[]> {
    try {
      const hasPermission = await this.requestMediaLibraryPermissions();
      if (!hasPermission) {
        return [];
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: maxImages,
        quality: 0.8,
        exif: false,
      });

      if (result.canceled) {
        return [];
      }

      return result.assets.map(asset => ({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type || 'image',
        fileName: asset.fileName,
        fileSize: asset.fileSize,
      }));
    } catch (error) {
      console.error('Error selecting multiple photos:', error);
      Alert.alert(
        'Gallery Error',
        'Failed to select photos. Please try again.',
        [{ text: 'OK' }]
      );
      return [];
    }
  }

  showImagePickerOptions(
    onTakePhoto: () => void,
    onSelectFromGallery: () => void,
    onCancel?: () => void
  ): void {
    Alert.alert(
      'Select Image',
      'Choose how you want to add an image for your issue report',
      [
        {
          text: 'Take Photo',
          onPress: onTakePhoto,
        },
        {
          text: 'Choose from Gallery',
          onPress: onSelectFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: onCancel,
        },
      ],
      { cancelable: true }
    );
  }

  async checkCameraAvailability(): Promise<boolean> {
    try {
      const available = await Camera.isAvailableAsync();
      return available;
    } catch (error) {
      console.error('Error checking camera availability:', error);
      return false;
    }
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  async compressImage(imageUri: string, quality: number = 0.7): Promise<string> {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: quality,
        allowsEditing: false,
      });

      if (!result.canceled) {
        return result.assets[0].uri;
      }
      
      return imageUri; // Return original if compression fails
    } catch (error) {
      console.error('Error compressing image:', error);
      return imageUri; // Return original if compression fails
    }
  }
}

// Create singleton instance
const cameraService = new CameraService();

// Export functions
export const requestCameraPermissions = () => cameraService.requestCameraPermissions();
export const requestMediaLibraryPermissions = () => cameraService.requestMediaLibraryPermissions();
export const takePhoto = () => cameraService.takePhoto();
export const selectFromGallery = () => cameraService.selectFromGallery();
export const selectMultipleFromGallery = (maxImages?: number) => cameraService.selectMultipleFromGallery(maxImages);
export const showImagePickerOptions = (
  onTakePhoto: () => void,
  onSelectFromGallery: () => void,
  onCancel?: () => void
) => cameraService.showImagePickerOptions(onTakePhoto, onSelectFromGallery, onCancel);
export const checkCameraAvailability = () => cameraService.checkCameraAvailability();
export const formatFileSize = (bytes?: number) => cameraService.formatFileSize(bytes);
export const compressImage = (imageUri: string, quality?: number) => cameraService.compressImage(imageUri, quality);

export default cameraService;