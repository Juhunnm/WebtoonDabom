import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Dimensions,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebtoonListItem from './components/WebtoonListItem';

import { useNavigation } from '@react-navigation/native';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;


const SearchPage = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();
    const [webtoons, setWebtoons] = useState([]);
    const [filteredWebtoons, setFilteredWebtoons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TextInput
                    placeholder="웹툰 제목, 작가 이름 검색"
                    style={styles.searchInput}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                    placeholderTextColor={"#DADADA"}
                />
            ),
        });
    }, [navigation]);


    useEffect(() => {
        const fetchWebtoons = async () => {
            const storedData = await AsyncStorage.getItem('webtoons');
            if (storedData !== null) {
                setWebtoons(JSON.parse(storedData).webtoons);
            }
        };

        fetchWebtoons();
    }, []);


    useEffect(() => {
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filteredData = webtoons.filter(webtoon =>
                webtoon.title.toLowerCase().includes(lowerCaseQuery) ||
                (webtoon.author && webtoon.author.toLowerCase().includes(lowerCaseQuery))
            );
            setFilteredWebtoons(filteredData);
        } else {
            setFilteredWebtoons([]);
        }
    }, [searchQuery, webtoons]);

    const renderItem = useCallback(({ item }) =>
        <WebtoonListItem
            item={item}
            onPress={() => {
                if (route.params.isWrite) {
                    navigation.navigate('AddCommunityPage', {
                        item: item,
                        fromScreen: 'SearchPage'
                    });
                } else {
                    navigation.navigate('WebtoonDetailPage', item);
                }
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
            data={filteredWebtoons}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            initialNumToRender={6}
            maxToRenderPerBatch={2}
            windowSize={2}
            removeClippedSubviews={true}
            ListEmptyComponent={renderEmptyComponent}
        />
    );
};

const styles = StyleSheet.create({
    searchInput: {
        flex: 1,
        width: WINDOW_WIDTH * 0.9,
        height: 40,
        fontSize: WINDOW_HEIGHT * 0.025,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
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