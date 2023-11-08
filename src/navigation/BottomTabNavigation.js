import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// Pages
import HomePage from '../home/HomePage';
import SearchPage from '../search/SearchPage';
import ProfilePage from '../profile/ProfilePage';
import CommunityPage from '../community/CommunityPage';

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='홈' component={HomePage} options={{
                headerShown: false, 
                tabBarIcon: ( { color, size } ) => (
                    <Entypo name="home" size={size} color={color} />
                  ),
            }}/>
            <Tab.Screen name='검색' component={SearchPage} options={{
                headerShown: false,
                tabBarIcon: ( { color, size } ) => (
                    <FontAwesome name="search" size={size} color={color} />
                  ),
            }}/>
            <Tab.Screen name="커뮤니티" component={CommunityPage} options={{
                headerShown: false,
                tabBarIcon: ( { color, size } ) => (
                    <MaterialIcons name="message" size={size} color={color} />
                  ),
            }}/>
            <Tab.Screen name="프로필" component={ProfilePage} options={{
                headerShown: false,
                tabBarIcon: ( { color, size } ) => (
                    <FontAwesome5 name="user-alt" size={size} color={color} />
                  ),
            }}/>
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;