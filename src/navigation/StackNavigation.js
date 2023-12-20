import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// 아이콘
import BottomTabNavigation from './BottomTabNavigation';

// Home 관련 컴포넌트
import WebtoonDetailPage from '../home/WebtoonDetailPage';
import SearchPage from '../home/SearchPage';
// 로그인 관련 컴포넌트
import ResetPassword from '../profile/components/ResetPassword';
import Signup from '../profile/components/SignUp';
import LogIn from '../profile/components/LogIn';
import Profile from '../profile/components/Profile';

//커뮤니티 관련 컴포넌트
import AddCommunityPage from '../community/AddCommunityPage'
import DetailedCommunityPage from '../community/DetailedCommunityPage';
const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            {/* 메인 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="Home" component={BottomTabNavigation} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="WebtoonDetailPage" component={WebtoonDetailPage} options={{
                    title: '웹툰 정보',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen name="SearchPage" component={SearchPage} options={{
                    title: '',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                }} />
            </Stack.Group>
            
            {/* 로그인 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="ResetPassword" component={ResetPassword} options={{
                    title: '비밀번호를 되찾으세요',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않
                }} />
                <Stack.Screen name="SignUp" component={Signup} options={{
                    title: '계정을 만드세요',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                }} />
                  <Stack.Screen name="Profile" component={Profile} options={{
                    title: '계정을 만드세요',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                }} />
            </Stack.Group>
            {/* 커뮤니티 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="AddCommunityPage" component={AddCommunityPage} options={{
                    title: '글 작성',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen name="DetailedCommunityPage" component={DetailedCommunityPage} options={{
                    title: '상세보기',
                    headerTintColor: 'white',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        backgroundColor:'#435585',
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigation