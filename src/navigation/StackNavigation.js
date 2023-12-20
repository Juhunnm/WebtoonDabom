import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


import BottomTabNavigation from './BottomTabNavigation';


import WebtoonDetailPage from '../home/WebtoonDetailPage';
import SearchPage from '../home/SearchPage';

import ResetPassword from '../profile/components/ResetPassword';
import Signup from '../profile/components/SignUp';
import LogIn from '../profile/components/LogIn';
import Profile from '../profile/components/Profile';

import AddCommunityPage from '../community/AddCommunityPage'
import DetailedCommunityPage from '../community/DetailedCommunityPage';
const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="Home" component={BottomTabNavigation} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="WebtoonDetailPage" component={WebtoonDetailPage} options={{
                    title: '웹툰 정보',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        borderBottomWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }} />
                <Stack.Screen name="SearchPage" component={SearchPage} options={{
                    title: '',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false,
                }} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="ResetPassword" component={ResetPassword} options={{
                    title: '비밀번호를 되찾으세요',
                    headerBackTitleVisible: false,
                }} />
                <Stack.Screen name="SignUp" component={Signup} options={{
                    title: '계정을 만드세요',
                    headerBackTitleVisible: false,
                }} />
                <Stack.Screen name="Profile" component={Profile} options={{
                    title: '사용자 정보',
                    headerBackTitleVisible: false,
                }} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="AddCommunityPage" component={AddCommunityPage} options={{
                    title: '글 작성',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        borderBottomWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }} />
                <Stack.Screen name="DetailedCommunityPage" component={DetailedCommunityPage} options={{
                    title: '상세보기',
                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: '#435585',
                        borderBottomWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigation