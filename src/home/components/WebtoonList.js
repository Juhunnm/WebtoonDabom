import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    ScrollView, 
    Image, 
    Dimensions, 
    StyleSheet, 
    TouchableOpacity } from 'react-native';
import WebViewImage from './WebViewImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;



const WebtoonList = ({ updateDay }) => {
    const navigation = useNavigation();
    const [webtoons, setWebtoons] = useState([]);


    const getWebtoonsByCondition = async (update) => {
        try {
          const storedData = await AsyncStorage.getItem('webtoons');
          if (storedData !== null) {
            const webtoons = JSON.parse(storedData).webtoons;
      
            // 조건에 맞는 웹툰 필터링
            const filteredWebtoons = webtoons.filter(webtoon => 
              webtoon.updateDays.includes(update));
      
            setWebtoons(filteredWebtoons); // 상태 업데이트
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      
        return [];
      };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getWebtoonsByCondition(updateDay);
        });

        getWebtoonsByCondition(updateDay);

        return unsubscribe;
    }, [navigation, updateDay])

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item._id} style={styles.item}>
            {(()=>{
                if(item.service === 'kakaoPage') return (<Image style={styles.pageImageStyles} source={{ uri: "https:"+item.img }}/>)
                else return (<WebViewImage imageURL={item.img}/>)
            })()}
            
            <View style={styles.textContainer}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemText}>{item.author}</Text>
                <TouchableOpacity style={styles.itemUser}
                    onPress={() => {
                        console.log(item.img + " 클릭");
                    }}>
                    <Text>{item.service}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={webtoons}
            renderItem={renderItem}
            keyExtractor={item => item._id}
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
        borderTopWidth: 1,
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
        borderRadius: ITEM_SIZE * 0.03,
    },
});

export default WebtoonList;
