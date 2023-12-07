import React, { useState, useEffect, memo } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import WebViewImage from './components/WebViewImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { Image } from "react-native-expo-image-cache";

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;


const WebtoonListItem = memo(({ item, onPress }) => {
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
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemText}>{item.author}</Text>
                {item.additional.rest && <Text>휴재!</Text>}
                <TouchableOpacity style={styles.itemUser}
                    onPress={() => {
                        console.log(item.additional);
                    }}>
                    <Text>{item.service}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
});



const SearchPage = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();
    const [webtoons, setWebtoons] = useState([]);
    const [filteredWebtoons, setFilteredWebtoons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // 헤더에 TextInput넣기
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TextInput
                    placeholder="웹툰 검색"
                    style={styles.searchInput}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                    placeholderTextColor={"#DADADA"}
                />
            ),
        });
    }, [navigation]);

    // SearchPage로드시 AsyncStorage에서 웹툰 데이터 불러오기
    useEffect(() => {
        const fetchWebtoons = async () => {
            const storedData = await AsyncStorage.getItem('webtoons');
            if (storedData !== null) {
                setWebtoons(JSON.parse(storedData).webtoons);
            }
        };

        fetchWebtoons();
    }, []);

    // Text입력할때마다 값에 맞는 데이터 불러오기
    useEffect(() => {
        if (searchQuery) {
            const filteredData = webtoons.filter(webtoon =>
                webtoon.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredWebtoons(filteredData);
        } else {
            setFilteredWebtoons([]);
        }
    }, [searchQuery, webtoons]);

    const renderItem = ({ item }) => (
        <WebtoonListItem
            item={item}
            onPress={() => {
                navigation.navigate('WebtoonDetailPage', {
                    title: item.title,
                    author: item.author,
                    url: item.url,
                    img: item.img,
                    service: item.service,
                    updateDays: item.updateDays,
                    fanCount: item.fanCount,
                    additional: item.additional,
                });
            }}
        />
    );

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
            data={filteredWebtoons}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            ListEmptyComponent={renderEmptyComponent}
        />
    );
};

const styles = StyleSheet.create({
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
        width: '100%',
        fontSize: ITEM_SIZE * 0.15,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    itemText: {
        width: '100%',
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
        justifyContent: "space-around",
        paddingHorizontal: 10,
    },
    pageImageStyles: {
        width: ITEM_SIZE * 0.7,
        height: ITEM_SIZE * 0.9,
        backgroundColor: '#E9E9E9',
        borderRadius: ITEM_SIZE * 0.03,
    },
    searchInput: {
        flex: 1,
        width: WINDOW_WIDTH * 0.9,
        height: 40,
        fontSize: WINDOW_HEIGHT * 0.025,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        // 추가 스타일
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

export default SearchPage;