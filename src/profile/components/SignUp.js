import React, { useState } from 'react';
import { View, Text, Button, TextInput,TouchableOpacity } from 'react-native';
import {createUserWithEmailAndPassword,} from 'firebase/auth';
import { auth } from './../../../firebaseConfig';
import {styles} from './Styling';

export default function Signup({ setScreen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
  
    const createAccount = async () => {
      try {
        if (password === confirmPassword) {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          setError("Passwords don't match");
        }
      } catch (e) {
        setError('There was a problem creating your account');
      }
    };
  
    return (
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Text style={styles.header}>계정을 만드세요</Text>
  
          {error && <Text style={styles.error}>{error}</Text>}
  
          <TouchableOpacity onPress={() => setScreen('login')}>
            <Text style={styles.link}>이미 계정이 있을까요?</Text>
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
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="비밀번호를 다시 입력하세요"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
  
          <Button
            title="계정을 만들기"
            onPress={createAccount}
            disabled={!email || !password || !confirmPassword}
          />
        </View>
      </View>
    );
  }