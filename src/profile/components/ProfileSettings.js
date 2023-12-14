import React, { useEffect, useState } from 'react';
import { signOut } from '@firebase/auth';
import { Text, View, Button, Image,TouchableOpacity} from 'react-native';
import { styles } from './Styling';
import { auth } from './../../../firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
// navigation
import { useNavigation } from '@react-navigation/native';




export function LoggedIn() {
    const [userEmail, setUserEmail] = useState('');
    const [name, setName] = useState('');
    const [imgURL, setImgURL] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const getUserEmail = async () => {
            try {
                const user = auth.currentUser;
                const name = user.displayName;
                const imgURL = user.photoURL;

                if (user) {
                    setUserEmail(user.email);
                    setName(name);
                    setImgURL(imgURL);
                }
            } catch (e) {
                console.error(e);
            }
        };

        getUserEmail();
    }, []);

    const logout = async () => {
      Alert.alert(
        '로그아웃',
        '로그아웃 하시겠습니까?',
        [
          { text: '아니요', style: 'cancel' },
          { text: '네', onPress: () => signOut(auth) },
        ],
        { cancelable: false }
      );
    };

    return (
        <View style={styles.mainScreen}>
          <View style={styles.topScreen}>
        
            <View style={styles.mainBox}>
              <View style={styles.imageBox}>
              <Image
        source={imgURL ? { uri: imgURL } : require('./../../../img/DefaultProfile.png')}
        style={styles.image}
      />
            <View style={styles.profileEdit}>
        
                <TouchableOpacity style={styles.profileEditIconBox} onPress={() => navigation.navigate('Profile')} >
                    <Icon name="plus" size={10} color="white" style={styles.profileEditIcon} />
                </TouchableOpacity>
                </View>
              </View>
              </View> 


              <View style={styles.mainBox}>
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
            <View style={[styles.mainBox, {justifyContent:'flex-end'}]}>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logout}>로그아웃</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
      );
}

  export default function ProfileSettings(){

  }