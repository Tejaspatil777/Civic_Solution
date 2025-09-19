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
  private currentLocation: LocationData | null = null;

  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'CivicFix needs location access to automatically detect your location when reporting issues. Please enable location access in your device settings.',
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

      // Check if location services are enabled
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in your device settings to use this feature.',
          [{ text: 'OK' }]
        );
        return null;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 10,
      });

      const locationData: LocationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      // Get address details
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

      this.currentLocation = locationData;
      return locationData;

    } catch (error) {
      console.error('Error getting current location:', error);
      
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please check your location settings and try again.',
        [{ text: 'OK' }]
      );
      
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

  async searchLocation(query: string): Promise<LocationData[]> {
    try {
      const results = await Location.geocodeAsync(query);
      
      const locations: LocationData[] = [];
      
      for (const result of results) {
        try {
          const addressDetails = await this.reverseGeocode(
            result.latitude,
            result.longitude
          );
          
          locations.push({
            latitude: result.latitude,
            longitude: result.longitude,
            ...addressDetails,
          });
        } catch (error) {
          // Add basic location without address details
          locations.push({
            latitude: result.latitude,
            longitude: result.longitude,
          });
        }
      }

      return locations;
    } catch (error) {
      console.error('Error searching location:', error);
      return [];
    }
  }

  getLastKnownLocation(): LocationData | null {
    return this.currentLocation;
  }

  async watchLocation(
    callback: (location: LocationData) => void,
    errorCallback?: (error: string) => void
  ): Promise<Location.LocationSubscription | null> {
    try {
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) {
        errorCallback?.('Location permission denied');
        return null;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 30000, // Update every 30 seconds
          distanceInterval: 50, // Update when moved 50 meters
        },
        async (location) => {
          try {
            const locationData: LocationData = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };

            // Get address details
            const addressDetails = await this.reverseGeocode(
              location.coords.latitude,
              location.coords.longitude
            );
            
            if (addressDetails) {
              Object.assign(locationData, addressDetails);
            }

            this.currentLocation = locationData;
            callback(locationData);
          } catch (error) {
            console.error('Error processing location update:', error);
            errorCallback?.('Failed to process location update');
          }
        }
      );

      return subscription;
    } catch (error) {
      console.error('Error starting location watch:', error);
      errorCallback?.('Failed to start location tracking');
      return null;
    }
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
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

// Create singleton instance
const locationService = new LocationService();

// Export functions
export const requestLocationPermission = () => locationService.requestLocationPermission();
export const getCurrentLocation = () => locationService.getCurrentLocation();
export const reverseGeocode = (lat: number, lon: number) => locationService.reverseGeocode(lat, lon);
export const searchLocation = (query: string) => locationService.searchLocation(query);
export const getLastKnownLocation = () => locationService.getLastKnownLocation();
export const watchLocation = (callback: (location: LocationData) => void, errorCallback?: (error: string) => void) => 
  locationService.watchLocation(callback, errorCallback);
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => 
  locationService.calculateDistance(lat1, lon1, lat2, lon2);
export const formatAddress = (location: LocationData) => locationService.formatAddress(location);

export default locationService;