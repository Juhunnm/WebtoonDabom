import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import WebViewImage from './WebViewImage';

import { Image } from "react-native-expo-image-cache";

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

const WebtoonListItem = ({ item, onPress }) => {
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

                <Text style={styles.itemService}>{koreanPlatforms}</Text>

            </View>
        </TouchableOpacity>
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
    itemService: {
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
});

export default WebtoonListItem;