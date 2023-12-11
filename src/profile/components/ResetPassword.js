import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';
import {styles} from './Styling';
export default function ResetPassword({ setScreen }) {
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
      <View style={styles.mainScreen}>
        <View style={styles.topScreen}>
          {error && <Text style={styles.error}>{error}</Text>}
  
<<<<<<< Updated upstream
          <TouchableOpacity onPress={() => setScreen('login')}>
            <Text style={styles.link}>로그인하러 가기</Text>
          </TouchableOpacity>
  
=======
>>>>>>> Stashed changes
          {submitted ? (
            <Text>Please check your email for a reset password link.</Text>
          ) : (
            <>
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
 </>
           )}
              </View>
              <View style={styles.bottomScreen}>
              < Pressable style={styles.button} onPress={resetUserPassword}>
              <Text style={styles.buttonText}>보내기</Text>
              </Pressable>
                <View style={styles.sameLine}>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.link}>로그인하기</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.link, { color: '#333' }]}>계정을 만들기</Text>
          </TouchableOpacity>
          </View>
        </View>
          
        </View>

    );
  }
  