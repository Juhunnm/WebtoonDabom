import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import {styles} from './Styling';

<<<<<<< Updated upstream
export default function LogIn({ setScreen }) {
=======
export default function LogIn() {
    const navigation = useNavigation();
>>>>>>> Stashed changes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  
    const loginUser = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
          setError('Your email or password was incorrect');
        } else if (error.code === 'auth/email-already-in-use') {
          setError('An account with this email already exists');
        } else {
          setError('이메일이랑 비밀번호를 확인해주시고 다시 로그인해주세요');
          //reflesh after 5 seconds
          setTimeout(() => {
            setError(null);
          }, 5000);
    };
      }}
    return (
      <View style={styles.mainScreen} >
        <View style={styles.topScreen}>
  
         
          <Text style={styles.label}>이메일</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="이메일을 입력"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
           <Text style={styles.label}>비밀번호</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="8자 이상 입력(문자/숫자/기호 사용 가능)"
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
<<<<<<< Updated upstream
  
          <TouchableOpacity onPress={() => setScreen('reset-password')}>
            <Text style={[styles.link, { color: '#333' }]}>비밀번호를 잊어버렸는데요?</Text>
=======
         {error && <Text style={styles.error}>{error}</Text>}
</View>


<View style={styles.bottomScreen}>
          <Pressable style={styles.button} onPress={loginUser} >
              <Text style={styles.buttonText}>로그인</Text>
              </Pressable>
         <View style={styles.sameLine}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>계정을 만들기</Text>
>>>>>>> Stashed changes
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={[styles.link, { color: '#333' }]}>비밀번호를 재설정</Text>
          </TouchableOpacity>
          </View>
         </View>
        </View>
    );
  }
  