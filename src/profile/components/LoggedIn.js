import React, { useEffect, useState } from 'react';
import { signOut } from '@firebase/auth';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { styles } from './ProfileStyles';
import { auth } from '../../../firebaseConfig';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';




export function LoggedIn() {
  const [userEmail, setUserEmail] = useState('');
  const [name, setName] = useState('');
  const [imgURL, setImgURL] = useState('');

  // Function to fetch user information
  const getUserInfo = async () => {
    try {
      const user = auth.currentUser;
      const name = user.displayName;
      const imgURL = user.photoURL;

      if (user) {
        setUserEmail(user.email);
        setName(name);
        setImgURL(imgURL);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Load user information when the component mounts
  useEffect(() => {
    getUserInfo();
  }, []);

  // Reload user information when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
    }, [])
  );
  const logout = async () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        { text: '아니요', style: 'cancel' },
        { text: '네', onPress: () => signOut(auth) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.mainScreen}>

      <View style={styles.mainBox}>
        <View style={styles.imageBox}>
          <Image
            source={imgURL ? { uri: imgURL } : require('./../../../img/DefaultProfile.png')}
            style={styles.image}
          />
        </View>



        <View style={styles.userInfoBox}>
          <View style={styles.leftbox}>
            <Text style={styles.alignLeft}>이름</Text>
          </View>
          <View style={styles.rightbox}>
            <Text style={styles.alignRight}>{name}</Text>
          </View>
        </View>

        <View style={styles.userInfoBox}>
          <View style={styles.leftbox}>
            <Text style={styles.alignLeft}>이메일</Text>
          </View>
          <View style={styles.rightbox}>
            <Text style={styles.alignRight}>{userEmail}</Text>
          </View>
        </View>
      </View>




      <TouchableOpacity onPress={logout}>
        <Text style={styles.logout}>로그아웃</Text>
      </TouchableOpacity>
    </View>


  );
}
export default LoggedIn;