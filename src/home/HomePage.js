import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, ScrollView } from 'react-native';
import WebtoonList from './components/WebtoonList';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const WINDOW_HEIGHT = Dimensions.get('window').height;
const PLATFORM_SIZE = WINDOW_HEIGHT * 0.13;


const HomePage = () => {
    const [isNaverChecked, setIsNaverChecked] = useState(true);
    const [isKakaoChecked, setIsKakaoChecked] = useState(true);
    const [isPageChecked, setIsPageChecked] = useState(true);

    const theme = {
        ...DefaultTheme,
        myOwnProperty: true,
        colors: {
            ...DefaultTheme.colors,
            primary: '#585858', // 이거 바꾸면 됨
        },
    };

    const webtoonData = [...Array(21)].map((_, index) => ({
        _id: `temp_id_${index}`, // 임시 ID
        webtoonId: 1000000000 + index, // 임의의 웹툰 ID
        title: `웹툰 ${index + 1}`, // 제목
        author: `작가 ${index + 1}`, // 작가명
        url: `https://m.comic.naver.com/webtoon/list?titleId=318995`, // 임시 URL
        img: `https://picsum.photos/id/${index}/200/200`, // 이미지 URL
        service: index % 3 === 0 ? "naver" : (index % 3 === 1 ? "kakao" : "kakaoPage"), // 서비스 (naver, kakao, kakaoPage 중 하나)
        updateDays: `월`, // 업데이트 요일
        fanCount: Math.floor(Math.random() * 500), // 팬 수 (임의로 생성)
        searchKeyword: `keyword_${index}`, // 검색 키워드
        additional: {
            new: index % 4 === 0, // 새로운 웹툰 여부
            adult: index % 5 === 0, // 성인 웹툰 여부
            rest: index % 6 === 0, // 휴재 여부
            up: index % 7 === 0, // 업데이트 여부
            singularityList: [] // 특이사항 리스트
        }
    }));

    return (
        <View style={styles.container}>
            <View style={styles.platformList}>
                <TouchableOpacity
                    onPress={() => setIsNaverChecked(!isNaverChecked)}>
                    <Image
                        source={require('../../img/naverWebtoonIcon.svg')}
                        style={styles.platformImage}
                    />
                    {!isNaverChecked && (
                        <View style={styles.unselectedOverlay} />
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsKakaoChecked(!isKakaoChecked)}>
                    <Image
                        source={require('../../img/kakaoWebtoonIcon.svg')}
                        style={styles.platformImage}
                    />
                    {!isKakaoChecked && (
                        <View style={styles.unselectedOverlay} />
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsPageChecked(!isPageChecked)}>
                    <Image
                        source={require('../../img/kakaoPageIcon.png')}
                        style={styles.platformImage}
                    />
                    {!isPageChecked && (
                        <View style={styles.unselectedOverlay} />
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ height: WINDOW_HEIGHT * 0.05 }} >
                <ScrollView
                    horizontal={true}
                    style={{ backgroundColor: '#fff' }}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.categoryList}>
                        <Button mode="contained" onPress={() => console.log('Pressed')} theme={theme}>
                            #액션
                        </Button>
                        <Button mode="contained" onPress={() => console.log('Pressed')} theme={theme}>
                            #로맨스
                        </Button>
                        <Button mode="contained" onPress={() => console.log('Pressed')} theme={theme}>
                            #판타지
                        </Button>
                        <Button mode="contained" onPress={() => console.log('Pressed')} theme={theme}>
                            #일상
                        </Button><Button mode="contained" onPress={() => console.log('Pressed')} theme={theme}>
                            #무협
                        </Button>
                        <Button mode="contained" onPress={() => console.log('Pressed')} theme={theme}>
                            #드라마 원작
                        </Button>
                        <Button mode="contained" onPress={() => console.log('Pressed')} theme={theme}>
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
                <Tab.Screen name="월" children={() => <WebtoonList day="월" webtoonData={webtoonData} />} />
                <Tab.Screen name="화" children={() => <WebtoonList day="화" webtoonData={webtoonData}/>} />
                <Tab.Screen name="수" children={() => <WebtoonList day="수" webtoonData={webtoonData}/>} />
                <Tab.Screen name="목" children={() => <WebtoonList day="목" webtoonData={webtoonData}/>} />
                <Tab.Screen name="금" children={() => <WebtoonList day="금" webtoonData={webtoonData}/>} />
                <Tab.Screen name="토" children={() => <WebtoonList day="토" webtoonData={webtoonData}/>} />
                <Tab.Screen name="일" children={() => <WebtoonList day="일" webtoonData={webtoonData}/>} />
                <Tab.Screen name="완결" children={() => <WebtoonList day="완결" webtoonData={webtoonData}/>} />
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
    platformImage: {
        height: PLATFORM_SIZE * 0.8,
        width: PLATFORM_SIZE * 0.8,
        borderRadius: WINDOW_HEIGHT * 0.015,
    },
    unselectedOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: PLATFORM_SIZE * 0.8,
        width: PLATFORM_SIZE * 0.8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: WINDOW_HEIGHT * 0.015,
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
