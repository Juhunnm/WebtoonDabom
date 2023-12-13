import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { LoadingContext, LoadingContextProvider } from './loading/LoadingContext';

export default function App() {
  // App.js는 수정하지 말 것
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

