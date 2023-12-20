import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { styles } from './ProfileStyles';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { LoadingContext } from './../../loading/LoadingContext';
import LoadingSpinner from './../../loading/LoadingSpinner';

export default function LogIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { loading } = useContext(LoadingContext);
  const { spinner } = useContext(LoadingContext);

  const loginUser = async () => {
    try {
      spinner.start();
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home', { screen: '프로필' });
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        setError('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else {
        setError('이메일이랑 비밀번호를 확인해주시고 다시 로그인해주세요');

        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    } finally {
      spinner.stop();
    }
  }
  return (
    <View style={styles.mainScreen} >
      {loading && <LoadingSpinner />}
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
        {error && <Text style={styles.error}>{error}</Text>}
      </View>


      <View style={styles.bottomScreen}>
        <TouchableOpacity style={styles.button} onPress={loginUser} >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.sameLine}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>계정을 만들기</Text>
          </TouchableOpacity>
          <View style={styles.verticalLine}></View>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={[styles.link, { color: '#333' }]}>비밀번호를 재설정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
