import React from 'react';
import { View, Text, ScrollView, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BORDER_COLOR = '#F8F8F8';
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const FONT_SIZE_TITLE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_TEXT = WINDOW_HEIGHT * 0.019;

const WebtoonList = ({ day, webtoonData }) => {
    return (
        <ScrollView>
            {webtoonData && webtoonData.map((webtoon, index) => (
                <TouchableOpacity key={webtoon._id} style={styles.item}>
                    <Image
                        source={{ uri: webtoon.img }}
                        style={styles.itemImage}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>{webtoon.title}</Text>
                        <Text style={styles.itemText}>{webtoon.author}</Text>
                        <TouchableOpacity style={styles.itemUser}
                            onPress={() => {
                                console.log(webtoon.service+"클릭");
                            }}>
                            <Text>{webtoon.service}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
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
        borderBottomWidth: 1,
        borderColor: BORDER_COLOR,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        padding: 10,
    },
    itemImage: {
        width: ITEM_SIZE * 0.8,
        height: ITEM_SIZE * 0.8,
        borderRadius: ITEM_BORDER_RADIUS,
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
