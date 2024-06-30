import 'react-native-gesture-handler';
import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import { AuthProvider } from './src/shared/helpers/AuthContext';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
      <Toast />
    </>
  );
}

export default App;