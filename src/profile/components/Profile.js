import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from './../../../firebaseConfig';
import { styles } from './Styling';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useContext } from 'react';
import { LoadingContext } from './../../loading/LoadingContext';
import LoadingSpinner from './../../loading/LoadingSpinner';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FontAwesome } from '@expo/vector-icons';

export default function Profile() {

  const navigation = useNavigation();
  const { loading } = useContext(LoadingContext);
  const { spinner } = useContext(LoadingContext);

  const [name, setName] = useState('');
  const [error, setError] = useState(null);
//image  address
const [selectImageUrl, setImageUrl] = useState(null);
//권한 요청
const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

const uploadImage = async () => {
  // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
  if (!status?.granted) {
    const permission = await requestPermission();
    if (!permission.granted) {
      return null;
    }
  }
  // 이미지 업로드 기능
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 1,
    aspect: [1, 1]
  });
  if (result.canceled) {
    return null; // 이미지 업로드 취소한 경우
  }
  console.log(result);
  // 이미지 업로드 결과 및 이미지 경로 업데이트

  setImageUrl(result.assets[0].uri);
};


  const handleSignup = async () => {
    let newError = '';
    try {
      spinner.start();
      if (!name) {
        newError = '닉네임을 입력해주세요.';
      } else if (name.length < 2) {
        newError = '닉네임을 2글자 이상 입력해주세요.';
      } else {
        const firebaseImageUrl = await uploadImageToFirebase(selectImageUrl);

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: firebaseImageUrl,

        }).then(() => {
          navigation.navigate('Home', { screen: '프로필' });
        }).catch((error) => {
          console.error("에러 났습니다: " + error)
        });

      }
      setError(newError);
    } catch (e) {
      console.log("Error adding document: ", e);
    } finally {
      spinner.stop();
    }

  };

  

  const uploadImageToFirebase = async (imageUri) => {
    // 이미지 파일 이름 (예: image_12345.jpg)
    const fileName = `profile_image_${new Date().getTime()}.jpg`;
    const storageRef = ref(storage, `profileImages/${fileName}`);

    try {
      // 이미지를 Blob 형태로 변환
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Blob을 Firebase Storage에 업로드
        await uploadBytesResumable(storageRef, blob);

        // 업로드된 이미지의 URL 가져오기
        const url = await getDownloadURL(storageRef);
        return url;
      } else {
        return null;
      }

    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  return (
    <View style={styles.mainScreen}>
      {loading && <LoadingSpinner />}
      <View style={styles.topScreen}>
        {error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.label}>이름:</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="이름을 입력해주세요"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <View style={styles.uploadBox}>
          <Pressable style={styles.uploadButton}
            onPress={uploadImage}>
            <Image
              source={selectImageUrl ? { uri: selectImageUrl } : require('./../../../img/DefaultProfile.png')}
              style={styles.profileImage}
            />
            <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.uploadIcon} />
            <Text style={styles.uploadLabel}>이미지 업로드</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomScreen}>
        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>계정을 만들기</Text>
        </Pressable>
        <View style={styles.sameLine}>
        </View>
      </View>
    </View>
  );
}
