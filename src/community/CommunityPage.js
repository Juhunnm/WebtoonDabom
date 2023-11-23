import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styled from 'styled-components';

const MyButton = styled.TouchableOpacity`
    margin : 10px;
`
const CompassionButton = () => (
    <View style={{
        flexDirection: 'row',
    }}>
        <MyButton>
            <MaterialCommunityIcons name="account-eye-outline" size={24} color="black" />
        </MyButton>
        <MyButton>
            <MaterialCommunityIcons name="chat-outline" size={24} color="black" />
        </MyButton>
        <MyButton>
            <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" />
        </MyButton>
    </View>
)
const CommunityList = ({ data }) => (
    <View style={{
        height: 300,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#DDDDDD'
    }}>
        <Text>{data}</Text>
        <View style={{
            flex: 1,
            backgroundColor: '#ffe9',
            margin: 10,
        }}
        />

        <CompassionButton style={{ flex: 3 }} />
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
        <View style={{
            margin: 10
        }}>
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: 'gray', 
                height: 40, 
                marginBottom: 10, 
                paddingLeft: 10,
                paddingRight :10,
                }}>
                <TextInput
                    style={{ flex: 1, color: '#fff' }}
                    placeholder='커뮤니티 검색'
                    placeholderTextColor='#ffe6'
                />
                <MaterialCommunityIcons name="book-search-outline" size={24} color="black" />
            </View>
            
            <TouchableOpacity style={{
                backgroundColor: '#DDDDDD',
                width: 80,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',

            }}>
                <Text>글 작성</Text>
            </TouchableOpacity>
            <ScrollView>
                {ary.map((data, idx) => (
                    <View key={idx} style={{
                    }}>
                        <CommunityList data={data} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default CommunityPage;