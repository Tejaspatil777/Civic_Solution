import * as Location from 'expo-location';
import { Alert } from 'react-native';

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

class LocationService {
  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'CivicFix needs location access to automatically detect your location when reporting issues.',
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) {
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const locationData: LocationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      try {
        const addressDetails = await this.reverseGeocode(
          location.coords.latitude,
          location.coords.longitude
        );
        
        if (addressDetails) {
          Object.assign(locationData, addressDetails);
        }
      } catch (geocodeError) {
        console.warn('Failed to get address details:', geocodeError);
      }

      return locationData;

    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<Partial<LocationData> | null> {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result && result.length > 0) {
        const address = result[0];
        
        return {
          address: [
            address.name,
            address.street,
            address.streetNumber,
          ].filter(Boolean).join(', '),
          city: address.city || address.subregion || undefined,
          state: address.region || undefined,
          country: address.country || undefined,
          pincode: address.postalCode || undefined,
        };
      }

      return null;
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      return null;
    }
  }

  formatAddress(location: LocationData): string {
    const parts = [
      location.address,
      location.city,
      location.state,
      location.pincode,
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(', ') : 
      `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  }
}

const locationService = new LocationService();

export const requestLocationPermission = () => locationService.requestLocationPermission();
export const getCurrentLocation = () => locationService.getCurrentLocation();
export const formatAddress = (location: LocationData) => locationService.formatAddress(location);

export default locationService;