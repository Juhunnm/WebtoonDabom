import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fireStoreDB } from '../../../firebaseConfig';
import { doc, collection, getDocs,updateDoc, increment } from 'firebase/firestore';

const CommunityList = ({ date, title, subTitle,id }) => {

    const navigation = useNavigation();
    const [isIcons, setIsIcons] = useState(false);
    const [count, setCount] = useState("");

    const handleIcon = async() => {
        const postRef = doc(fireStoreDB,"posts", id);
        await updateDoc(postRef, {
            emotion: increment(1)
        });
        console.log(date);
        setIsIcons(!isIcons);
        setCount(prevCount => isIcons ? prevCount - 1 : prevCount + 1);
    };

    const handleMove = () => {
        navigation.navigate("DetailedCommunityPage", { title, subTitle ,id});
    }

    return (
        <View style={styles.communityListContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.title}>{title}</Text>
                <Text>{date}</Text>
            </View>
            <View style={styles.subTitle}>
                <Text
                    style={{color : 'black'}}
                >{subTitle}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        handleMove();
                    }}
                >
                    <MaterialCommunityIcons name="chat-outline" size={24} color={"white"} />
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleIcon}>
                        {isIcons ? (
                            <MaterialCommunityIcons name="cards-heart" size={24} color={"black"} />
                        ) : (
                            <MaterialCommunityIcons name="cards-heart-outline" size={24} color={"white"} />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.countText}>{count}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    communityListContainer: {
        padding: 10,
        backgroundColor: '#858585',
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    subTitle: {
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countText: {
        color: 'white',
        marginLeft: 5,
    },
});

export default CommunityList;