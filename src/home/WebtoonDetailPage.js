import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Dimensions,
    Linking,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    Alert,
} from 'react-native'
import WebViewImage from './components/WebViewImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunityList from '../community/components/CommunutyList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { auth } from '../../firebaseConfig';

import { fireStoreDB } from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

import { useNavigation } from '@react-navigation/native';

import { Image } from "react-native-expo-image-cache";

import AntDesign from 'react-native-vector-icons/AntDesign';

const WINDOW_HEIGHT = Dimensions.get("window").height;

// 전체적인 요소 사이즈
const ITEM_SIZE = WINDOW_HEIGHT * 0.17;
// 헤더 텍스트 사이즈 (작품정보, 커뮤니티)
const TEXT_HEADER = WINDOW_HEIGHT * 0.025;
// 글작성 버튼 크기
const WRITE_BUTTON_SIZE = WINDOW_HEIGHT * 0.085;

// 연재요일 한국어로 바꿔주는 맵
const dayMappings = {
    'mon': '월요일',
    'tue': '화요일',
    'wed': '수요일',
    'thu': '목요일',
    'fri': '금요일',
    'sat': '토요일',
    'sun': '일요일',
    'finished': '완결',
};
const convertDaysToKorean = (days) => {
    return days.map(day => dayMappings[day] || day);
};


const WebtoonDetailPage = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();
    const user = auth.currentUser;
    // 웹툰 데이터 구조 분해
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

    // 연재요일 매핑하기
    const koreanUpdateDays = convertDaysToKorean(updateDays);
    // 즐겨찾기 상태
    const [isBookMark, setIsBookMark] = useState(false);

    // 페이지 들어왔을 때 즐겨찾기 되어있는 웹툰인지 확인하는 함수
    const initializeBookmark = async () => {
        try {
            const bookmarks = await AsyncStorage.getItem('bookMark');
            if (bookmarks) {
                const bookmarkArray = JSON.parse(bookmarks);
                if (bookmarkArray.some(webtoon => webtoon._id === _id)) {
                    setIsBookMark(true);
                } else {
                    console.log("즐겨찾기 안됨: " + title);
                }
            }
        } catch (error) {
            console.error('AsyncStorage error:', error);
        }
    };

    const handleLoginAsk = () => {
        Alert.alert(
            "로그인 안됨",
            "로그인을 하러 가시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "이동",
                    onPress: () => {
                        navigation.navigate('Home', {
                            screen: '프로필',
                        });
                    }
                }
            ]
        );
    };

    const handleAddList = () => {
        if (user) {
            navigation.navigate('AddCommunityPage', {
                item: route.params,
                fromScreen: 'SearchPage'
            });
        } else {
            handleLoginAsk();
        }
    }

    // 현재 웹툰이 즐찾이 되어있는지 확인
    useEffect(() => {
        initializeBookmark();
        fetchDocs();
    }, []);


    // 즐찾 추가하기 or 제거하기
    const handleBookmark = async () => {
        try {
            const bookmarks = await AsyncStorage.getItem('bookMark');
            let bookmarkArray = bookmarks ? JSON.parse(bookmarks) : [];

            if (!isBookMark) {
                bookmarkArray = [...bookmarkArray, route.params];
            } else {
                bookmarkArray = bookmarkArray.filter(webtoon => webtoon._id !== _id);
            }
            setIsBookMark(!isBookMark);

            await AsyncStorage.setItem('bookMark', JSON.stringify(bookmarkArray));
        } catch (error) {
            console.error('AsyncStorage error:', error);
        }
    };

    // url로 웹 링크 연결
    const handleGoWebtoon = () => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }


    const [posts, setPosts] = useState([]); // 커뮤니티 게시글 데이터

    // 커뮤니티 게시글 정보 가져오기
    const fetchDocs = async () => {
        try {
            // 웹툰별 posts 컬렉션 참조 생성
            const postsCollectionRef = collection(fireStoreDB, `${service}Posts/${_id}/posts`);

            // posts 컬렉션의 문서들을 가져옴
            const querySnapshot = await getDocs(postsCollectionRef);

            // 문서 데이터를 배열로 변환
            const fetchedPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (fetchedPosts.length > 0) {
                setPosts(fetchedPosts);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error("Error fetching posts: ", error);
            setPosts([]);
        }
    };

    // 위로 스크롤 하면 로딩 스피너 나타나고 게시글 데이터 다시 불러옴
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchDocs().then(() => setRefreshing(false));
    }, []);



    const renderItem = ({ item }) => (
        <CommunityList {...item} />
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                커뮤니티 정보가 없습니다.
            </Text>
        </View>
    );

    const renderHeader = () => (
        <View>
            <View style={styles.itemLayout}>
                {/* 플랫폼 별로 이미지 제공 방식이 다르기 때문에 조건문으로 처리 */}
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
                    else return (<WebViewImage imageURL={img} isDetail={true} />)
                })()}
                <View style={styles.itemContent}>
                    <View style={{ gap: 15 }}>
                        <Text style={styles.itemName}>{title}</Text>
                        <Text style={styles.itemDetail}>{author}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookMarkButton}
                        onPress={handleBookmark}>
                        {/* 즐찾 여부에 따른 버튼 아이콘 변화 */}
                        {isBookMark ? <AntDesign name="star" size={ITEM_SIZE * 0.12} color={'#000'} /> : <AntDesign name="staro" size={ITEM_SIZE * 0.12} color={'#000'} />}
                        <Text style={{ fontSize: ITEM_SIZE * 0.12, fontWeight: 'bold', color: '#000' }}>즐겨찾기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.webtoonInfoContainer}>
                <View style={styles.webtoonInfo}>
                    <Text style={styles.webtoonInfoText}># {koreanUpdateDays.join(', ')} 연재</Text>
                </View>
                <View style={styles.webtoonInfo}>
                    <Text style={styles.webtoonInfoText}>
                        # 약 {fanCount}{(() => {
                            if (service === 'naver') return '만명 팬 보유'
                            else if (service === 'kakao') return '만 좋아요'
                            else if (service === 'kakaoPage') return '만 조회수'
                        })()}</Text>
                </View>
                <View style={styles.webtoonInfo}>
                    <Text style={styles.webtoonInfoText}># {service}</Text>
                </View>
                {additional.adult &&
                    <View style={styles.webtoonInfo}>
                        <Text style={styles.webtoonInfoText}># 성인웹툰</Text>
                    </View>}
            </View>
            <TouchableOpacity style={styles.webtoonButton}
                onPress={handleGoWebtoon}>
                <Text style={styles.webtoonButtonText}>웹툰 보러가기</Text>
            </TouchableOpacity>
            <View style={{ marginVertical: 15 }}>
                <Text style={{ fontSize: TEXT_HEADER, fontWeight: 'bold' }}>커뮤니티</Text>
            </View>
        </View>

    );
    return (
        <View style={styles.container}>

            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.date}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyComponent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <TouchableOpacity style={styles.createButton} onPress={handleAddList}>
                <MaterialIcons name="edit" size={WRITE_BUTTON_SIZE*0.45} color={'white'}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 10,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        color: '#888888',
    },
    createButton: {
        backgroundColor: '#007bff',
        width: WRITE_BUTTON_SIZE,
        height: WRITE_BUTTON_SIZE,
        borderRadius: WRITE_BUTTON_SIZE/2,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
});

export default WebtoonDetailPage
