import React from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import WebViewImage from './components/WebViewImage';

import { Image } from "react-native-expo-image-cache";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;


const WebtoonDetailPage = ({ navigation: { navigate }, route }) => {
    const {
        title,
        author,
        url,
        img,
        service,
        updateDays,
        fanCount,
        additional,
    } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.itemLayout}>
            {(() => {
                if (service === 'kakaoPage') return (
                <Image
                    {...{uri: "https:" + img }}
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
                else return (<WebViewImage imageURL={img} isSearch={true}/>)
            })()}
                <View style={styles.itemContent}>
                    <Text style={styles.itemName}>{title}</Text>
                    <Text style={styles.itemDetail}>{author}</Text>
                    <Text style={styles.itemDetail}>업로드 요일: {updateDays}</Text>
                    <Text style={styles.itemDetail}>팬수: {fanCount}</Text>
                    <Text style={styles.itemDetail}>플랫폼: {service}</Text>
                </View>
            </View>
            

            <Text>url: {url}</Text>
            <Text>신규 여부: {additional.new ? 'O':'X'}</Text>
            <Text>성인 여부: {additional.adult ? 'O':'X'}</Text>
            <Text>휴재 여부: {additional.rest ? 'O':'X'}</Text>
            <Text>신규 회차 업로드 여부: {additional.up ? 'O':'X'}</Text>
            <TouchableOpacity
            style={{marginTop: 30}}
                onPress={()=>{
                    console.log(additional.new);
                }}
            ><Text>테스트버튼</Text></TouchableOpacity>
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
        marginBottom: 15,
    },
    itemImage: {
        width: ITEM_SIZE,
        height: ITEM_SIZE * 1.3,
        borderRadius: ITEM_SIZE * 0.045,
        backgroundColor: '#F2F2F2'
    },
    itemContent: {
        flex: 1,
        paddingHorizontal: 10,
        height: ITEM_SIZE * 1.3,
        justifyContent: "space-around",
    },
    itemName: {
        fontSize: ITEM_SIZE * 0.2,
        fontWeight: "bold",
    },
    itemDetail: {
        fontSize: ITEM_SIZE * 0.12,
    },
});

export default WebtoonDetailPage
