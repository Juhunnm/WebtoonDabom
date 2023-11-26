import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';
import {styles} from './Styling';
import { useNavigation } from '@react-navigation/native';
export default function ResetPassword({ setScreen }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
  
    const resetUserPassword = async () => {
      try {
        await sendPasswordResetEmail(auth, email);
        setSubmitted(true);
        setError(null);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          setError('User not found');
        } else {
          setError('There was a problem with your request');
        }
      }
    };
  
    return (
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Text style={styles.header}>비밀번호를 되찾으세요</Text>
  
          {error && <Text style={styles.error}>{error}</Text>}
  
          <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: '프로필',})}>
            <Text style={styles.link}>로그인하러 가기</Text>
          </TouchableOpacity>
  
          {submitted ? (
            <Text>Please check your email for a reset password link.</Text>
          ) : (
            <>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="이메일을 입력하세요"
                autoCapitalize="none"
                placeholderTextColor="#aaa"
                style={styles.input}
              />
  
              <Button title="비밀번호를 되찾기" onPress={resetUserPassword} disabled={!email} />
            </>
          )}
        </View>
      </View>
    );
  }
  