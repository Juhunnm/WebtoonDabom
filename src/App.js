import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { LoadingContextProvider } from './loading/LoadingContext';

export default function App() {
  return (
    <LoadingContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </LoadingContextProvider>
  );
}

