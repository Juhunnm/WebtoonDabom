//ImagePicker UI 다자인
/*
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

*/ 
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable} from 'react-native';
import { updateProfile } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';
import { styles } from './Styling';
import { useNavigation } from '@react-navigation/native';


export default function Profile() {

    const [name, setName] = useState('');
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    
    // 회원가입 버튼을 눌렀을 때의 처리
 const handleSignup = async () => {
    let newError = '';
    try {
      if (!name) {
        newError = '닉네임을 입력해주세요.';
      } else if (name.length < 2) {
        newError = '닉네임을 2글자 이상 입력해주세요.';
      } else {
        
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          navigation.navigate('Home' , {screen: '프로필'});
        }).catch((error) => {
          console.error("에러 났습니다: " + error)
        });
  
      }
      setError(newError);
    } catch (e) {
      console.log("Error adding document: ", e);
    } 
  };  
    return (
        <View style={styles.mainScreen}>
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
          </View>
          <View style={styles.bottomScreen}>
            <Pressable style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>계정을 만들기</Text>
            </Pressable>
          </View>
        </View>
      );
      }