import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
// import { Image } from 'expo-image';
import WebViewImage from './WebViewImage';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;

const WebtoonList = ({ initialData }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity key={item._id} style={styles.item}>
            <WebViewImage imageURL={item.img}/>
            <View style={styles.textContainer}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemText}>{item.author}</Text>
                <TouchableOpacity style={styles.itemUser}
                    onPress={() => {
                        console.log(item.service + " 클릭");
                    }}>
                    <Text>{item.service}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={initialData}
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
});

export default WebtoonList;
