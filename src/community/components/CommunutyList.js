import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fireStoreDB } from '../../../firebaseConfig';
import { doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import WebViewImage from '../../home/components/WebViewImage';
import { Image } from "react-native-expo-image-cache";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;

const CommunityList = ({ date, title, subTitle, id, webtoonTitle, imageURL, webtoonImage, autor, service, webtoonID, uid, displayName }) => {

    const navigation = useNavigation();
    const [isIcons, setIsIcons] = useState(false);
    const [count, setCount] = useState(0);
    const user = auth.currentUser;

    const dateObject = parseISO(date);

    const timeAgo = formatDistanceToNow(dateObject, { addSuffix: true, locale: ko });


    const handleIcon = async () => {
        setIsIcons(!isIcons);
        setCount(prevCount => isIcons ? prevCount - 1 : prevCount + 1);
    };

    const handleMove = () => {
        navigation.navigate("DetailedCommunityPage", { title, subTitle, id, webtoonTitle, imageURL, webtoonImage, autor, service, webtoonID });
    }

    return (
        <View style={styles.communityListContainer}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, alignItems: 'flex-end' }}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
                <Text style={styles.date}>{timeAgo}</Text>
            </View>
            <View style={styles.subTitle}>
                <Text style={{ color: '#DADADA' }} numberOfLines={5} ellipsizeMode='tail'>{subTitle}</Text>
            </View>


            {imageURL && (
                <View style={styles.imageContainer}>
                    <Image
                        {...{ uri: imageURL }}
                        style={styles.image}
                        onError={(e) => console.log(e)}
                    />
                </View>
            )}
            {webtoonID !== "smallTalks" && (
                <View style={styles.webtoonInfoContainer}>
                    {(() => {
                        if (service === 'kakaoPage') return (
                            <Image
                                {...{ uri: "https:" + webtoonImage }}
                                style={styles.itemImage}
                                onError={(e) => console.log(e)}
                            />)
                        else if (service === 'kakao') return (
                            <Image
                                {...{ uri: webtoonImage }}
                                style={styles.itemImage}
                                onError={(e) => console.log(e)}
                            />
                        )
                        else if (service === 'naver') return (<WebViewImage imageURL={webtoonImage} isCommunity={true} />)

                    })()}

                    <View style={styles.textContainer}>
                        <View style={{ gap: 3 }}>
                            <Text style={styles.itemName}>{webtoonTitle}</Text>
                            <Text style={styles.itemText}>{autor}</Text>
                        </View>

                        <Text style={styles.itemUser}>#{service}</Text>

                    </View>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <View>
                    <Text style={{ color: '#DADADA' }}>{displayName}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={handleMove} >
                        <MaterialCommunityIcons name="chat" size={24} color={"white"} />
                        <Text style={styles.countText}>{count}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={handleIcon}>
                        {isIcons ? (
                            <MaterialCommunityIcons name="cards-heart" size={24} color={"red"} />
                        ) : (
                            <MaterialCommunityIcons name="cards-heart-outline" size={24} color={"white"} />
                        )}
                        <Text style={styles.countText}>{count}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    communityListContainer: {
        padding: 10,
        backgroundColor: '#435585',
        borderRadius: 20,
        marginBottom: 10,
    },
    title: {
        width: '60%',
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
    },
    date: {
        fontSize: 12,
        color: '#DADADA',
    },
    subTitle: {
        marginVertical: 10,
        padding: 10,
        minHeight: 70,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#818FB4',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: '100%',
    },
    countText: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    webtoonInfoContainer: {
        flexDirection: 'row',
        height: WINDOW_HEIGHT * 0.1,
        width: '100%',
        marginBottom: 10,
        padding: 2,
        backgroundColor: '#818FB4',
        borderRadius: WINDOW_HEIGHT * 0.0045,

    },
    itemImage: {
        width: WINDOW_HEIGHT * 0.077 - 4,
        height: WINDOW_HEIGHT * 0.1 - 4,
        borderRadius: WINDOW_HEIGHT * 0.0045,
        backgroundColor: '#F2F2F2'
    },
    textContainer: {
        flex: 1,
        height: '100%',
        padding: 5,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    itemName: {
        width: '90%',
        fontSize: ITEM_SIZE * 0.12,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    itemText: {
        width: '90%',
        fontSize: ITEM_SIZE * 0.09,
        textAlign: 'left',
    },
    itemUser: {
        fontSize: ITEM_SIZE * 0.09,
        alignSelf: 'flex-end',
    },
});

export default CommunityList;