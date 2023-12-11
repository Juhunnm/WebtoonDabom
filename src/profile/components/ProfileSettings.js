import React, { useEffect, useState } from 'react';
import { signOut } from '@firebase/auth';
import { Text, View, Button, Image,TouchableOpacity} from 'react-native';
import { styles } from './Styling';
import { auth } from './../../../firebaseConfig';




export function LoggedIn() {
    const [userEmail, setUserEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const getUserEmail = async () => {
            try {
                const user = auth.currentUser;
                const name = user.displayName;
                if (user) {
                    setUserEmail(user.email);
                    setName(name);
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
        <View style={styles.mainScreen}>
          <View style={styles.topScreen}>
            <View style={styles.mainBox}>
              <View style={styles.imageBox}>
              <Image
        source={require('./../../../img/DefaultProfile.png')}
        style={styles.image}
      />
              </View>
    
              <View style={styles.userInfoBox}>
                <View style={styles.leftbox}>
                  <Text style={styles.alignLeft}>이름</Text>
                  <Text style={styles.alignLeft}>이메일</Text>
                </View>
                <View style={styles.rightbox}>
                  <Text style={styles.alignRight}>{name}</Text>
                  <Text style={styles.alignRight}>{userEmail}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomScreen}>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.link}>로그아웃하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

  export default function ProfileSettings(){

  }

