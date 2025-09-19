import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

// Register push notification handlers
import './src/services/NotificationService';

registerRootComponent(App);