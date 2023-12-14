import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
// Pages
import HomePage from '../home/HomePage';
import BookMarkPage from '../bookMark/BookMarkPage';
// import SearchPage from '../home/SearchPage';
import ProfilePage from '../profile/ProfilePage';
import CommunityPage from '../community/CommunityPage';
import EditProfile from '../profile/components/EditProfile';
import { auth } from './../../firebaseConfig';

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
    const navigation = useNavigation();

    const handleSearch = () => {
        navigation.navigate("SearchPage",{isWrite:false});
    }
    const handleEdit= () => {
        navigation.navigate("EditProfile");
    }

    return (
        <Tab.Navigator>
            <Tab.Screen name='홈' component={HomePage} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={handleSearch}>
                        <FontAwesome name="search" size={24} color="black" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                ),
                tabBarIcon: ( { color, size } ) => (
                    <Entypo name="home" size={size} color={color} />
                ),
            }}/>
            <Tab.Screen name='즐겨찾기' component={BookMarkPage} options={{
                tabBarIcon: ( { color, size } ) => (
                    <AntDesign name="star" size={size} color={color} />
                  ),
            }}/>
            <Tab.Screen name="커뮤니티" component={CommunityPage} options={{
                tabBarIcon: ( { color, size } ) => (
                    <MaterialIcons name="message" size={size} color={color} />
                  ),
            }}/>
            <Tab.Screen name="프로필" component={ProfilePage} options={{
                 headerRight: () => (
                    //if user is logged in then show below button
                    auth.currentUser && (
                        <TouchableOpacity onPress={() => handleEdit}>
                            <Text style={{ marginRight: 15, fontSize: 15 }}>수정</Text>
                        </TouchableOpacity>
                    )
                ),
                tabBarIcon: ( { color, size } ) => (
                    <FontAwesome5 name="user-alt" size={size} color={color} />
                  ),
            }}/>
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;