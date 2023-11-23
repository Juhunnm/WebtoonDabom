import React from 'react';
import { View,} from 'react-native';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../../firebaseConfig';
import {LoggedIn} from './components/ProfileSettings';
import Login from './components/LogIn';
import Signup from './components/SignUp';
import ResetPassword from './components/ResetPassword';
const ProfilePage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [screen, setScreen] = useState(null);
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
      
    const getScreen = () => {
        if (loggedIn) return <LoggedIn />;
        if (screen === 'signup') return <Signup setScreen={setScreen} />;
        if (screen === 'reset-password') return <ResetPassword setScreen={setScreen} />;
        return <Login setScreen={setScreen} />;
      };
    
      return <View style={{ flex: 1 }}>{getScreen()}</View>;
    }
          

export default ProfilePage;