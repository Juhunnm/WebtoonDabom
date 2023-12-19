import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WebtoonListItem from './WebtoonListItem';
import { LoadingContext } from '../../loading/LoadingContext';

import { useNavigation } from '@react-navigation/native';



const WebtoonList = ({ updateDay, isNaverChecked, isKakaoChecked, isPageChecked }) => {
    const navigation = useNavigation();

    const [webtoons, setWebtoons] = useState([]);

    const { loading } = useContext(LoadingContext);

    const getWebtoonsByCondition = async (update) => {
        try {
            const storedData = await AsyncStorage.getItem('webtoons');
            if (storedData !== null) {
                const webtoons = JSON.parse(storedData).webtoons;

                const filteredWebtoons = webtoons.filter(webtoon =>
                    webtoon.updateDays.includes(update) &&
                    ((webtoon.service === 'naver' && isNaverChecked) ||
                        (webtoon.service === 'kakao' && isKakaoChecked) ||
                        (webtoon.service === 'kakaoPage' && isPageChecked))
                );

                setWebtoons(filteredWebtoons);
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }

        return [];
    };

    useEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            getWebtoonsByCondition(updateDay);
        }); // 페이지 포커스 되면 요일에 맞는 데이터 가져오기

        const blurUnsubscribe = navigation.addListener('blur', () => {
            setWebtoons([]);
        }); // 페이지 나가면 렌더링 됐던 데이터 없애기

        // 즉 요일을 넘기면 blur -> focus순으로 실행됨

        // 로딩이 끝나면 데이터 들고오기
        if (!loading) {
            getWebtoonsByCondition(updateDay);
        }

        return () => {
            focusUnsubscribe();
            blurUnsubscribe();
        };
    }, [loading, updateDay, isNaverChecked, isKakaoChecked, isPageChecked]);


    const renderItem = useCallback(({ item }) =>
        <WebtoonListItem
            item={item}
            onPress={() => {
                navigation.navigate('WebtoonDetailPage', item);
            }}
        />, []
    );

    const keyExtractor = useCallback((item) => item._id ,[]);

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                웹툰 정보가 없습니다.
            </Text>
        </View>
    );

    return (
        <FlatList
            style={{ backgroundColor: '#fff' }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={webtoons}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            initialNumToRender={4}
            maxToRenderPerBatch={2}
            windowSize={2}
            removeClippedSubviews={true}
            ListEmptyComponent={renderEmptyComponent}
        />
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        color: '#888888',
    },
});

export default WebtoonList;
