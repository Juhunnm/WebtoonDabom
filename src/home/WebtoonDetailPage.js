import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import WebViewImage from './components/WebViewImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from "react-native-expo-image-cache";

import AntDesign from 'react-native-vector-icons/AntDesign';

const WINDOW_HEIGHT = Dimensions.get("window").height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;

const TEXT_HEADER = WINDOW_HEIGHT * 0.025;


const WebtoonDetailPage = ({ navigation: { navigate }, route }) => {
    const {
        _id,
        title,
        author,
        url,
        img,
        service,
        updateDays,
        fanCount,
        additional,
    } = route.params;

    const [isBookMark, setIsBookMark] = useState(false);

    const initializeBookmark = async () => {
        try {
            const bookmarks = await AsyncStorage.getItem('bookMark');
            if (bookmarks) {
                const bookmarkArray = JSON.parse(bookmarks);
                if (bookmarkArray.some(webtoon => webtoon._id === _id)) {
                    console.log("즐겨찾기 되어있는 웹툰: "+title);
                    setIsBookMark(true);
                }else{
                    console.log("즐겨찾기 안됨: "+title);
                }
            } else{
                console.log("즐겨찾기 되어있는 웹툰이 하나도 없음");
            }
        } catch (error) {
            console.error('AsyncStorage error:', error);
        }
    };

    // 현재 웹툰이 즐찾이 되어있는지 확인
    useEffect(() => {
        initializeBookmark();
    }, []);


    // 즐찾 추가하기 or 제거하기
    const handleBookmark = async () => {
        try {
            const bookmarks = await AsyncStorage.getItem('bookMark');
            let bookmarkArray = bookmarks ? JSON.parse(bookmarks) : [];

            if (!isBookMark) {
                bookmarkArray = [...bookmarkArray, route.params];
                console.log("즐겨찾기 추가: "+title);
            } else {
                bookmarkArray = bookmarkArray.filter(webtoon => webtoon._id !== _id);
                console.log("즐겨찾기 제거: "+title);
            }
            console.log('즐찾 버튼 클릭')
            setIsBookMark(!isBookMark);

            await AsyncStorage.setItem('bookMark', JSON.stringify(bookmarkArray));
        } catch (error) {
            console.error('AsyncStorage error:', error);
        }
    };

    const test = async() => {
        try {
            const bookmarks = await AsyncStorage.getItem('bookMark');
            let bookmarkArray = bookmarks ? JSON.parse(bookmarks) : [];

            console.log(bookmarkArray);
        } catch (error) {
            console.error('AsyncStorage error:', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemLayout}>
                {(() => {
                    if (service === 'kakaoPage') return (
                        <Image
                            {...{ uri: "https:" + img }}
                            style={styles.itemImage}
                            onError={(e) => console.log(e)}
                        />)
                    else if (service === 'kakao') return (
                        <Image
                            {...{ uri: img }}
                            style={styles.itemImage}
                            onError={(e) => console.log(e)}
                        />
                    )
                    else return (<WebViewImage imageURL={img} isSearch={true} />)
                })()}
                <View style={styles.itemContent}>
                    <View style={{ gap: 15 }}>
                        <Text style={styles.itemName}>{title}</Text>
                        <Text style={styles.itemDetail}>{author}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookMarkButton}
                        onPress={() => {
                            handleBookmark();
                        }}>
                        {isBookMark ? <AntDesign name="star" size={ITEM_SIZE * 0.12} color={'#000'}/>: <AntDesign name="staro" size={ITEM_SIZE * 0.12} color={'#000'} />}
                        <Text style={{ fontSize: ITEM_SIZE * 0.12, fontWeight: 'bold', color: '#000' }}>즐겨찾기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <Text style={{ fontSize: TEXT_HEADER, fontWeight: 'bold' }}>작품정보</Text>
            <View style={styles.webtoonInfoContainer}>
                <View style={styles.webtoonInfo}>
                    <Text style={styles.webtoonInfoText}># {updateDays}연재</Text>
                </View>
                <View style={styles.webtoonInfo}>
                    <Text style={styles.webtoonInfoText}># 약 {fanCount}{service === 'naver' ? '만명 팬 보유' : '만 조회수'}</Text>
                </View>
                <View style={styles.webtoonInfo}>
                    <Text style={styles.webtoonInfoText}># {service}</Text>
                </View>
                {additional.adult &&
                    <View style={styles.webtoonInfo}>
                        <Text style={styles.webtoonInfoText}># 성인웹툰</Text>
                    </View>}
                {additional.rest &&
                    <View style={styles.webtoonInfo}>
                        <Text style={styles.webtoonInfoText}># 휴재</Text></View>}
            </View>
            <TouchableOpacity style={styles.webtoonButton}
                onPress={test}>
                <Text style={styles.webtoonButtonText}>웹툰 보러가기</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: TEXT_HEADER, fontWeight: 'bold', marginTop: 15 }}>커뮤니티</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    itemLayout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#fff",
        overflow: "hidden",
        marginBottom: 10,
    },
    itemImage: {
        width: ITEM_SIZE,
        height: ITEM_SIZE * 1.3,
        borderRadius: ITEM_SIZE * 0.045,
        backgroundColor: '#F2F2F2'
    },
    itemContent: {
        flex: 1,
        paddingLeft: 10,
        height: ITEM_SIZE * 1.3,
        justifyContent: "space-between",
    },
    itemName: {
        fontSize: ITEM_SIZE * 0.2,
        fontWeight: "bold",
    },
    itemDetail: {
        fontSize: ITEM_SIZE * 0.12,
    },
    webtoonInfo: {
        fontSize: ITEM_SIZE * 0.12,
        padding: ITEM_SIZE * 0.08,
        backgroundColor: '#E8E8E8',
        borderRadius: 5,
        marginTop: 5,
        marginRight: 5,
    },
    webtoonInfoText: {
        fontSize: ITEM_SIZE * 0.1,
        color: '#585858'
    },
    webtoonInfoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    webtoonButton: {
        width: '100%',
        backgroundColor: '#007bff',
        padding: ITEM_SIZE * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        marginVertical: 10,
    },
    webtoonButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: ITEM_SIZE * 0.12
    },
    bookMarkButton: {
        padding: ITEM_SIZE * 0.1,
        flexDirection: 'row',
        borderRadius: '100%',
        gap: 5,
        alignSelf: 'flex-end',
        backgroundColor: "#fbe300",
        alignItems: "center",
        justifyContent: "center",

    },
});

export default WebtoonDetailPage
