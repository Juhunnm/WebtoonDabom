import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomTabNavigation from './BottomTabNavigation';

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
const Stack = createStackNavigator();

const StackNavigation = () => {
    const ref = useRef(null);
  return (
    <Stack.Navigator>
            {/* 메인 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="Home" component={BottomTabNavigation} options={{
<<<<<<< Updated upstream
                    title: '웹툰다봄',
                    headerLeft: null, //뒤로가기 버튼을 없앰
                    headerRight: () => (//헤더바 오른쪽에 배치할 놈들
                        <View style={styles.headerRight}>
                            <MaterialCommunityIcons name="bell" size={24} color="black" style={styles.icons} />
                        </View>
                    )
=======
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
            <Stack.Screen name="LogIn" component={LogIn} options={{
                    title: '로그인하세요',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                }} />
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
>>>>>>> Stashed changes
                }} />
            </Stack.Group>
        </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        marginRight: 20,
    }
});

export default StackNavigation
