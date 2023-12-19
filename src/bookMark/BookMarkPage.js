import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import WebtoonListItem from '../home/components/WebtoonListItem';

const BookMarkPage = () => {
  const navigation = useNavigation();
  const [bookmarkedWebtoons, setBookmarkedWebtoons] = useState([]); // 즐겨찾기 웹툰 목록

  // AsyncStorage에서 즐겨찾기 되어있는 웹툰 데이터 들고오는 함수
  const loadBookmarkedWebtoons = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookMark');
      console.log(storedBookmarks);
      if (storedBookmarks !== null) {
        setBookmarkedWebtoons(JSON.parse(storedBookmarks));
        console.log("즐겨찾기 데이터 불러옴.");
      } else {
        console.log("즐겨찾기 데이터 없음");
      }
    } catch (error) {
      console.error('Error retrieving bookmarks:', error);
    }
  };


  // 페이지 포커스 될 때마다 즐찾 웹툰 불러오기
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadBookmarkedWebtoons();
    });

    return unsubscribe;
  }, [navigation])

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
      <Text style={styles.emptyText}>즐겨찾기한 웹툰이 없습니다.</Text>
    </View>
  );

  return (
    <FlatList
      style={{ backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      data={bookmarkedWebtoons}
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

export default BookMarkPage;