import React, { useState, useEffect } from 'react';
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

    // 임시 요일 배열(실제 데이터에서는 필요없음)
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일", "완결"];

    // 임시 웹툰 데이터
    const webtoonData = [...Array(10)].map((_, index) => ({
        _id: `temp_id_${index}`, // 임시 ID
        webtoonId: 1000000000 + index, // 임의의 웹툰 ID
        title: `웹툰 ${index + 1}`, // 제목
        author: `작가 ${index + 1}`, // 작가명
        url: `https://m.comic.naver.com/webtoon/list?titleId=318995`, // 임시 URL
        img: `https://picsum.photos/id/${index}/200/200`, // 이미지 URL
        service: index % 3 === 0 ? "naver" : (index % 3 === 1 ? "kakao" : "kakaoPage"), // 서비스 (naver, kakao, kakaoPage 중 하나)
        updateDays: daysOfWeek[index % daysOfWeek.length], 
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

    // 요일별 웹툰 데이터 나누기
    const filterDataForDay = (day) => {
        return webtoonData.filter(item => item.updateDays === day);
    };

    const [mondayData, setMondayData] = useState([]);
    const [tuesdayData, setTuesdayData] = useState([]);
    const [wednesdayData, setWednesdayData] = useState([]);
    const [thursdayData, setThursdayData] = useState([]);
    const [fridayData, setFridayData] = useState([]);
    const [saturdayData, setSaturdayData] = useState([]);
    const [sundayData, setsundayData] = useState([]);
    const [finishedData, setFinishedData] = useState([]);

    useEffect(() => {
        setMondayData(filterDataForDay("월"));
        setTuesdayData(filterDataForDay("화"));
        setWednesdayData(filterDataForDay("수"));
        setThursdayData(filterDataForDay("목"));
        setFridayData(filterDataForDay("금"));
        setSaturdayData(filterDataForDay("토"));
        setsundayData(filterDataForDay("일"));
        setFinishedData(filterDataForDay("완결"));
    }, []);

    useEffect(() => {
        if (mondayData.length > 0 && 
            tuesdayData.length > 0 && 
            wednesdayData.length > 0 && 
            thursdayData.length > 0 && 
            fridayData.length > 0 && 
            saturdayData.length > 0 && 
            sundayData.length > 0 &&
            finishedData.length> 0) {
            console.log("모든 요일 데이터 로딩 완료");
        }
    }, [mondayData, tuesdayData, wednesdayData, thursdayData, fridayData, saturdayData, sundayData, finishedData]);

    return (
        <View style={styles.container}>
            <View style={styles.platformList}>
                <TouchableOpacity
                    onPress={() => setNaverChecked(!isNaverChecked)}>
                    <Image
                        source={require('../../img/naverWebtoonIcon.svg')}
                        style={styles.platformImage}
                    />
                    {!isNaverChecked && (
                        <View style={styles.unselectedOverlay} />
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setKakaoChecked(!isKakaoChecked)}>
                    <Image
                        source={require('../../img/kakaoWebtoonIcon.svg')}
                        style={styles.platformImage}
                    />
                    {!isKakaoChecked && (
                        <View style={styles.unselectedOverlay} />
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPageChecked(!isPageChecked)}>
                    <Image
                        source={require('../../img/kakaoPageIcon.png')}
                        style={styles.platformImage}
                    />
                    {!isPageChecked && (
                        <View style={styles.unselectedOverlay} />
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setLejinChecked(!isLejinChecked)}>
                    <Image
                        source={require('../../img/lejinIcon.svg')}
                        style={styles.platformImage}
                    />
                    {!isLejinChecked && (
                        <View style={styles.unselectedOverlay} />
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#fff', height: WINDOW_HEIGHT * 0.05, paddingHorizontal: 5 }} >
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
                <Tab.Screen name="월" children={() => <WebtoonList day="월" initialData={mondayData} />} />
                <Tab.Screen name="화" children={() => <WebtoonList day="화" initialData={tuesdayData}/>} />
                <Tab.Screen name="수" children={() => <WebtoonList day="수" initialData={wednesdayData}/>} />
                <Tab.Screen name="목" children={() => <WebtoonList day="목" initialData={thursdayData}/>} />
                <Tab.Screen name="금" children={() => <WebtoonList day="금" initialData={fridayData}/>} />
                <Tab.Screen name="토" children={() => <WebtoonList day="토" initialData={saturdayData}/>} />
                <Tab.Screen name="일" children={() => <WebtoonList day="일" initialData={sundayData}/>} />
                <Tab.Screen name="완결" children={() => <WebtoonList day="완결" initialData={finishedData}/>} />
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
        borderRadius: PLATFORM_SIZE * 0.1,
    },
    unselectedOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: PLATFORM_SIZE * 0.8,
        width: PLATFORM_SIZE * 0.8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: PLATFORM_SIZE * 0.1,
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
