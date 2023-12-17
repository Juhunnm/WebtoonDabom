import React, { useState, useEffect, useContext, useCallback, memo, useRef  } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import WebViewImage from './WebViewImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

import { Image } from "react-native-expo-image-cache";

import { LoadingContext } from '../../loading/LoadingContext';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;

const platFormMappings = {
    'naver': '네이버 웹툰',
    'kakao': '카카오 웹툰',
    'kakaoPage': '카카오 페이지',
};
const convertPlatformToKorean = (platform) => {
    return platFormMappings[platform] || platform;
};

const WebtoonListItem = memo(({ item, onPress }) => {
    // 연재요일 매핑하기
    const koreanPlatforms = convertPlatformToKorean(item.service);
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            {(() => {
                if (item.service === 'kakaoPage') return (
                    <Image
                        {...{ uri: "https:" + item.img }}
                        style={styles.pageImageStyles}
                        onError={(e) => console.log(e)}
                    />)
                else if (item.service === 'kakao') return (
                    <Image
                        {...{ uri: item.img }}
                        style={styles.pageImageStyles}
                        onError={(e) => console.log(e)}
                    />
                )
                else return (<WebViewImage imageURL={item.img} />)
            })()}

            <View style={styles.textContainer}>
                <View style={{ gap: 15 }}>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Text style={styles.itemText}>{item.author}</Text>
                </View>
                
                <Text style={styles.itemUser}>{koreanPlatforms}</Text>
               
            </View>
        </TouchableOpacity>
    );
});

const WebtoonList = ({ updateDay, isNaverChecked, isKakaoChecked, isPageChecked }) => {
    const navigation = useNavigation();
    const [webtoons, setWebtoons] = useState([]);

    // api요청 로딩 끝남 감지
    const { loading } = useContext(LoadingContext);

    const getWebtoonsByCondition = async (update) => {
        try {
            const storedData = await AsyncStorage.getItem('webtoons');
            if (storedData !== null) {
                const webtoons = JSON.parse(storedData).webtoons;

                // 플랫폼 선택에 따라 웹툰 필터링
                const filteredWebtoons = webtoons.filter(webtoon =>
                    webtoon.updateDays.includes(update) &&
                    ((webtoon.service === 'naver' && isNaverChecked) ||
                        (webtoon.service === 'kakao' && isKakaoChecked) ||
                        (webtoon.service === 'kakaoPage' && isPageChecked))
                );

                setWebtoons(filteredWebtoons); // 상태 업데이트
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }

        return [];
    };

    useEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            getWebtoonsByCondition(updateDay);
        });

        const blurUnsubscribe = navigation.addListener('blur', () => {
            setWebtoons([]);
        });

        // 초기 로드 시 데이터 가져오기
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

    const keyExtractor = useCallback((item) => item._id, []);

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
            maxToRenderPerBatch={4}
            windowSize={2}
            removeClippedSubviews={true}
            ListEmptyComponent={renderEmptyComponent}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    item: {
        width: '100%',
        height: ITEM_SIZE,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: '#F8F8F8',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: 10,
    },
    itemImage: {
        width: ITEM_SIZE * 0.7,
        height: ITEM_SIZE * 0.9,
        borderRadius: ITEM_SIZE * 0.03,
        backgroundColor: '#F2F2F2'
    },
    itemName: {
        width: '90%',
        fontSize: ITEM_SIZE * 0.15,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    itemText: {
        width: '90%',
        fontSize: ITEM_SIZE * 0.11,
        textAlign: 'left',
    },
    itemUser: {
        alignSelf: 'flex-end',
    },
    textContainer: {
        flex: 1,
        height: '100%',
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    pageImageStyles: {
        width: ITEM_SIZE * 0.7,
        height: ITEM_SIZE * 0.9,
        backgroundColor: '#E9E9E9',
        borderRadius: ITEM_SIZE * 0.03,
    },
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
