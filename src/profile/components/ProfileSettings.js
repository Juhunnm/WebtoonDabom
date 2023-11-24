import React, { useEffect, useState } from 'react';
import { signOut } from '@firebase/auth';
import { Text, View, Button } from 'react-native';
import { styles } from './Styling';
import { auth } from './../../../firebaseConfig';




export function LoggedIn() {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const getUserEmail = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    setUserEmail(user.email);
                }
            } catch (e) {
                console.error(e);
            }
        };

        getUserEmail();
    }, []);

    const logout = async () => {
        try {
            await auth.signOut();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.outer}>
            <View style={styles.inner}>
                <Text style={styles.header}>웹툰다봄계정</Text>
                <Text style={styles.email}>{userEmail}</Text>
                <Button title="로그아웃하기" onPress={logout} />
            </View>
        </View>
    );
}

  export default function ProfileSettings(){

  }

