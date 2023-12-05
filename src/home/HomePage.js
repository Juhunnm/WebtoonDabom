import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import WebtoonList from './components/WebtoonList';

import { Button } from 'react-native-paper';

import { Image } from 'expo-image';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';

import PlatformButton from './components/PlatformButton';

const Tab = createMaterialTopTabNavigator();
const WINDOW_HEIGHT = Dimensions.get('window').height;


// 플랫폼 선택 영역 사이즈
const PLATFORM_SIZE = WINDOW_HEIGHT * 0.13;


const HomePage = () => {
    // 플랫폼 선택 state
    const [isNaverChecked, setNaverChecked] = useState(true);
    const [isKakaoChecked, setKakaoChecked] = useState(true);
    const [isPageChecked, setPageChecked] = useState(true);
    const [isLejinChecked, setLejinChecked] = useState(true);

    // react native paper 테마
    const theme = {
        ...DefaultTheme,
        myOwnProperty: true,
        colors: {
            ...DefaultTheme.colors,
            primary: '#585858',
        },
    };

    // 웹툰 정보 API 요청
    const fetchWebtoonData = async (apiUrl) => {
        try {
            const storedData = await AsyncStorage.getItem('webtoons');

            if (storedData !== null) {
                console.log("AsyncStorage에서 데이터를 불러왔습니다.");
                return JSON.parse(storedData);
            }
            
            const startTime = new Date().getTime();  // 요청 시작 시간 측정

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();  // JSON 응답을 파싱

            const endTime = new Date().getTime();  // 요청 종료 시간 측정
            const duration = (endTime - startTime) / 1000;  // 요청에 걸린 시간 계산 (초 단위)

            console.log(`API 요청에 걸린 시간: ${duration}초`);

            await AsyncStorage.setItem('webtoons', JSON.stringify(data));
        } catch (e) {
            console.error(`An error occurred: ${e.message}`);
            return null;
        }
    };


    const apiUrl = "https://korea-webtoon-api.herokuapp.com/?perPage=6847"

    useEffect(() => {
        fetchWebtoonData(apiUrl);
    }, [])



    return (
        <View style={styles.container}>
            <View style={styles.platformList}>
                <PlatformButton
                    isChecked={isNaverChecked}
                    onPress={() => setNaverChecked(!isNaverChecked)}
                    image={require('../../img/naverWebtoonIcon.svg')}
                />

                <PlatformButton
                    isChecked={isKakaoChecked}
                    onPress={() => setKakaoChecked(!isKakaoChecked)}
                    image={require('../../img/kakaoWebtoonIcon.svg')}
                />

                <PlatformButton
                    isChecked={isPageChecked}
                    onPress={() => setPageChecked(!isPageChecked)}
                    image={require('../../img/kakaoPageIcon.png')}
                />

                <PlatformButton
                    isChecked={isLejinChecked}
                    onPress={() => setLejinChecked(!isLejinChecked)}
                    image={require('../../img/lejinIcon.svg')}
                />

            </View>
            <View style={{ backgroundColor: '#fff', height: WINDOW_HEIGHT * 0.05, paddingHorizontal: 5 }} >
                <ScrollView
                    horizontal={true}
                    style={{ backgroundColor: '#fff' }}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.categoryList}>
                        <Button mode="contained" theme={theme}>
                            #액션
                        </Button>
                        <Button mode="contained" theme={theme}>
                            #로맨스
                        </Button>
                        <Button mode="contained" theme={theme}>
                            #판타지
                        </Button>
                        <Button mode="contained" theme={theme}>
                            #일상
                        </Button><Button mode="contained" theme={theme}>
                            #무협
                        </Button>
                        <Button mode="contained" theme={theme}>
                            #드라마 원작
                        </Button>
                        <Button mode="contained" theme={theme}>
                            #스포츠
                        </Button>
                    </View>
                </ScrollView>
            </View>
            <Tab.Navigator
                screenOptions={{
                    scrollEnabled: false, // 탭 스크롤 활성화
                    tabBarItemStyle: { flex: 1 }, // 탭 아이템 너비를 자동 조절
                }}
            >
                <Tab.Screen name="월" children={() => <WebtoonList updateDay={"mon"} />} />
                <Tab.Screen name="화" children={() => <WebtoonList updateDay={"tue"} />} />
                <Tab.Screen name="수" children={() => <WebtoonList updateDay={"wed"} />} />
                <Tab.Screen name="목" children={() => <WebtoonList updateDay={"thu"} />} />
                <Tab.Screen name="금" children={() => <WebtoonList updateDay={"fri"} />} />
                <Tab.Screen name="토" children={() => <WebtoonList updateDay={"sat"} />} />
                <Tab.Screen name="일" children={() => <WebtoonList updateDay={"sun"} />} />
                <Tab.Screen name="완결" children={() => <WebtoonList updateDay={"finished"} />} />
            </Tab.Navigator>
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    platformList: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: PLATFORM_SIZE,
        backgroundColor: '#fff',
    },
    categoryList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: WINDOW_HEIGHT * 0.05,
        gap: 3,
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});
export default HomePage;
