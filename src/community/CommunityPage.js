import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components';

const MyButton = styled.TouchableOpacity`
  margin: 10px;
`;

const CompassionButton = ({ iconName, color }) => (
    <MyButton>
        <MaterialCommunityIcons name={iconName} size={24} color={color} />
    </MyButton>
);

const CommunityList = ({ data }) => (
    <View style={styles.communityListContainer}>
        <Text>{data}</Text>
        <View style={styles.listSeparator} />
        <View style={styles.buttonContainer}>
            <CompassionButton iconName="account-eye-outline" color="black" />
            <CompassionButton iconName="chat-outline" color="black" />
            <CompassionButton iconName="cards-heart-outline" color="black" />
        </View>
    </View>
);

const CommunityPage = () => {
    const ary = [
        "김지원",
        "이승우",
        "박지민",
        "최수빈",
        "정태영",
        "강은주",
        "윤성민",
        "한지은",
        "임민서",
        "송승현",
    ];

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="커뮤니티 검색"
                    placeholderTextColor="#ffe6"
                />
                <MaterialCommunityIcons name="book-search-outline" size={24} color="black" />
            </View>

            <TouchableOpacity style={styles.createButton}>
                <Text>글 작성</Text>
            </TouchableOpacity>

            <ScrollView>
                {ary.map((data, idx) => (
                    <View key={idx}>
                        <CommunityList data={data} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'gray',
        height: 40,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
    },
    createButton: {
        backgroundColor: '#DDDDDD',
        width: 80,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    communityListContainer: {
        height: 300,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#DDDDDD',
    },
    listSeparator: {
        flex: 1,
        backgroundColor: '#ffe9',
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});

export default CommunityPage;