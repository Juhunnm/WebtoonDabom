import React, { useState } from 'react';
import { View, Text,TextInput, TouchableOpacity, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';
import { styles } from './Styling';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { LoadingContext } from './../../loading/LoadingContext';
import LoadingSpinner from './../../loading/LoadingSpinner';  

export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { loading } = useContext(LoadingContext);
  const { spinner } = useContext(LoadingContext);

  const createAccount = async () => {
    try {
        spinner.start();
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate('Profile',{
          email: email,
          password: password,
        });
        
      } else {
        setError("비밀번호가 일치하지 않습니다");
      }
    } catch (e) {
      setError('다른 이메일을 사용해주세요');
    }
    finally {
      spinner.stop();
    }
  };

  return (
    <View style={styles.mainScreen}>
      {loading && <LoadingSpinner />}
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
          <TouchableOpacity onPress={() =>  navigation.navigate('Home' , {screen: '프로필'})}>
            <Text style={styles.link}>로그인하기</Text>
          </TouchableOpacity>
          <View style={styles.verticalLine}></View>
          <TouchableOpacity  onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={[styles.link, { color: '#333' }]}>비밀번호를 재설정</Text>
          </TouchableOpacity>
          </View>
      </View>
    </View>
  
  );
}
