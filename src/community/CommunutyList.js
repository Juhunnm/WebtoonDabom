import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ThemePro = { // 임시 색상 
    background: '#363062',
    element_1: '#435585',
    element_2: '#818FB4',
    button: '#F5E8C7',
    text: '#ffff',
};

const CommunityList = ({ title, subTitle }) => {
    return (
        <View style={styles.communityListContainer}>
            <Text style={{ color: 'white' }}>{title}</Text>
            <View style={styles.listSeparator} >
                <Text style={{ color: 'white' }}>{subTitle}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <MaterialCommunityIcons name="account-eye-outline" size={24} color="white" />
                <MaterialCommunityIcons name="chat-outline" size={24} color="white" />
                <MaterialCommunityIcons name="cards-heart-outline" size={24} color="white" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    communityListContainer: {
        height: 300,
        marginTop: 10,
        padding: 10,
        backgroundColor: ThemePro.element_1,
    },
    listSeparator: {
        flex: 1,
        backgroundColor: ThemePro.element_2,
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});

export default CommunityList;