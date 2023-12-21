import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoadingContext } from '../loading/LoadingContext';
import LoadingSpinner from '../loading/LoadingSpinner';

import WebtoonList from './components/WebtoonList';

import PlatformButton from './components/PlatformButton';

const Tab = createMaterialTopTabNavigator();
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PLATFORM_SIZE = WINDOW_HEIGHT * 0.13;

const getTodayTabName = () => {
    const dayOfWeek = new Date().getDay();
    const dayNameMap = ['일', '월', '화', '수', '목', '금', '토'];
    return dayNameMap[dayOfWeek];
};


const HomePage = () => {
    const { loading } = useContext(LoadingContext);
    const { spinner } = useContext(LoadingContext);

    const initialTabName = getTodayTabName();

    const [isNaverChecked, setNaverChecked] = useState(true);
    const [isKakaoChecked, setKakaoChecked] = useState(false);
    const [isPageChecked, setPageChecked] = useState(false);
    const [isLejinChecked, setLejinChecked] = useState(false);

    const fetchWebtoonData = async (apiUrl) => {
        try {
            spinner.start();
            const storedData = await AsyncStorage.getItem('webtoons');

            if (storedData !== null) {
                console.log("AsyncStorage에서 데이터를 불러왔습니다.");
                return;
            }

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            await AsyncStorage.setItem('webtoons', JSON.stringify(data));
        } catch (e) {
            console.error(`An error occurred: ${e.message}`);
            return null;
        } finally {
            spinner.stop();
        }
    };


    const apiUrl = "https://korea-webtoon-api.herokuapp.com/?perPage=6847"

    useEffect(() => {
        fetchWebtoonData(apiUrl);
    }, [])



    return (
        <View style={styles.container}>
            {loading && <LoadingSpinner />}
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
                    onPress={() => {
                        if (!isLejinChecked) {
                            Alert.alert("레진코믹스는 준비중입니다.")
                        }
                        setLejinChecked(!isLejinChecked)
                    }}
                    image={require('../../img/lejinIcon.svg')}
                />
            </View>

            <Tab.Navigator
                initialRouteName={initialTabName}
                screenOptions={{
                    lazy: true,
                }}
            >
                <Tab.Screen name="월" children={() => <WebtoonList updateDay={"mon"}
                    isNaverChecked={isNaverChecked} isKakaoChecked={isKakaoChecked} isPageChecked={isPageChecked} />} />
                <Tab.Screen name="화" children={() => <WebtoonList updateDay={"tue"}
                    isNaverChecked={isNaverChecked} isKakaoChecked={isKakaoChecked} isPageChecked={isPageChecked} />} />
                <Tab.Screen name="수" children={() => <WebtoonList updateDay={"wed"}
                    isNaverChecked={isNaverChecked} isKakaoChecked={isKakaoChecked} isPageChecked={isPageChecked} />} />
                <Tab.Screen name="목" children={() => <WebtoonList updateDay={"thu"}
                    isNaverChecked={isNaverChecked} isKakaoChecked={isKakaoChecked} isPageChecked={isPageChecked} />} />
                <Tab.Screen name="금" children={() => <WebtoonList updateDay={"fri"}
                    isNaverChecked={isNaverChecked} isKakaoChecked={isKakaoChecked} isPageChecked={isPageChecked} />} />
                <Tab.Screen name="토" children={() => <WebtoonList updateDay={"sat"}
                    isNaverChecked={isNaverChecked} isKakaoChecked={isKakaoChecked} isPageChecked={isPageChecked} />} />
                <Tab.Screen name="일" children={() => <WebtoonList updateDay={"sun"}
                    isNaverChecked={isNaverChecked} isKakaoChecked={isKakaoChecked} isPageChecked={isPageChecked} />} />
                <Tab.Screen name="완결" children={() => <WebtoonList updateDay={"finished"}
                    isNaverChecked={isNaverChecked} isKakaoChecked={isKakaoChecked} isPageChecked={isPageChecked} />} />
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
