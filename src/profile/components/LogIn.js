import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import {styles} from './Styling';
import { useNavigation } from '@react-navigation/native';

export default function LogIn({ setScreen }) {
    const navigation = useNavigation();

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
          setError('There was a problem with your request');
        }
      }
    };
  
    return (
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Text style={styles.header}>로그인하세요</Text>
  
          {error && <Text style={styles.error}>{error}</Text>}
  
          <TouchableOpacity onPress={() => setScreen('signup')}>
            <Text style={styles.link}>계정을 만들까요?</Text>
          </TouchableOpacity>
  
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="이메일을 입력하세요"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="비밀번호를 입력하세요"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
  
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={[styles.link, { color: '#333' }]}>비밀번호를 잊어버렸는데요?</Text>
          </TouchableOpacity>
  
          <Button title="로그인" onPress={loginUser} disabled={!email || !password} />
        </View>
      </View>
    );
  }
  