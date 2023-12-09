import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const CommunityList = ({ title, subTitle }) => {
    const navigation = useNavigation();
    return (
        <View
            style={styles.communityListContainer}>

            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
            <View style={styles.listSeparator}>
                <Text>{subTitle}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('DetailedPage');
                    }}
                >
                    <MaterialCommunityIcons name="chat-outline" size={24} color={"white"} />

                </TouchableOpacity>
                <MaterialCommunityIcons name="cards-heart-outline" size={24} color={"white"} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    communityListContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#6a6a6a',
        borderRadius: 10,
        margin: 10,
    },
    listSeparator: {
        backgroundColor: '#bdbebd',
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
});

export default CommunityList;