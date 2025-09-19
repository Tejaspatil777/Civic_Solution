import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

import App from './App';

// Register push notification handlers
import './src/services/NotificationService';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately.
registerRootComponent(App);