import React from 'react';
import { View, } from 'react-native';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../../firebaseConfig';
import { LoggedIn } from './components/LoggedIn';
import Login from './components/LogIn';
const ProfilePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const getScreen = () => {
    if (loggedIn) return <LoggedIn />;
    return <Login />;
  };

  return <View style={{ flex: 1 }}>{getScreen()}</View>;
}


export default ProfilePage;