import React, { useState } from 'react';
import { View, Text,TextInput, TouchableOpacity, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';
import { styles } from './Styling';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', password);
        navigation.navigate('Profile');
      } else {
        setError("비밀번호가 일치하지 않습니다");
      }
    } catch (e) {
      setError('다른 이메일을 사용해주세요');
    }
  };

  // Use AsyncStorage here to fix the problem
  AsyncStorage;

  return (
    <View style={styles.mainScreen}>

      <View style={styles.topScreen}>


            <Text style={styles.label}>이메일</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder='이메일을 입력'
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
<Text style={styles.label}>비밀번호</Text>
             <TextInput
               value={password}
               onChangeText={setPassword}
               secureTextEntry
               placeholder='8자 이상 입력(문자/숫자/기호 사용 가능)'
               autoCapitalize="none"
               placeholderTextColor="#aaa"
               style={styles.input}
             />
             <Text style={styles.label}>비밀번호 확인</Text>
             <TextInput
               value={confirmPassword}
               onChangeText={setConfirmPassword}
               secureTextEntry
                placeholder='비밀번호를 한번 더 입력'
               autoCapitalize="none"
               placeholderTextColor="#aaa"
               maxFontSizeMultiplier={40}
               style={styles.input}
             />
          {error && <Text style={styles.error}>{error}</Text>}
      </View>
  
      <View style={styles.bottomScreen}>
        <Pressable style={styles.button} onPress={createAccount}>
          <Text style={styles.buttonText}>다음</Text>
        </Pressable>
        <View style={styles.sameLine}>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.link}>로그인하기</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={[styles.link, { color: '#333' }]}>비밀번호를 재설정</Text>
          </TouchableOpacity>
          </View>
      </View>
    </View>
  
  );
}
