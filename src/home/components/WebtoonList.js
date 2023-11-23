import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';


const WINDOW_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;
const FONT_SIZE_TITLE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_TEXT = WINDOW_HEIGHT * 0.019;

const WebtoonList = ({ day, initialData }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (initialData) {
            setData(initialData);
        }
    }, [initialData]);

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item._id} style={styles.item}>
            <Image
                source={{ 
                    uri: "https://kr-a.kakaopagecdn.com/P/C/3093/c1/2x/b973723c-39bb-4d69-b614-1b07ba82e2f6.png"
                }}
                style={styles.itemImage}
            />
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
            data={data}
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
        alignItems: 'flex-start',
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
        fontSize: FONT_SIZE_TITLE,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    itemText: {
        width: '100%',
        fontSize: FONT_SIZE_TEXT,
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
