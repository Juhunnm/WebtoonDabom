import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import CommunityList from './CommunutyList';
import { useNavigation } from '@react-navigation/native';


const ThemePro = { // 임시 색상 
    background: '#363062',
    element_1: '#435585',
    element_2: '#818FB4',
    button: '#F5E8C7',
    text: '#ffff',
};

const CommunityPage = () => {

    const navigation = useNavigation();

    const [useerName,setUsetName] = useState('juhun') // 로그인한 유저 이름
    const [listData,setListData] = useState([ //임시 리스트 데이터
        "김지원",
    ])
    
    const handleAddList = () => {
        navigation.navigate('AddCommunity', { useerName, setUsetName, setListData });
    }
    //상세보기 페이지 추가(댓글 기능을 위해서 스택)
    //로그인했을 떄는 볼 수만 있도록
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="커뮤니티 검색"
                    placeholderTextColor="#ffff"
                />
                {/* 웹툰 이름만 검색한 결과만 나오도록 렌더링 하도록 */}
                <MaterialCommunityIcons name="book-search-outline" size={24} color="black" />
            </View>

            <TouchableOpacity 
                style={styles.createButton}
                onPress={handleAddList}
            >
                <Text>글 작성{useerName}</Text>
            </TouchableOpacity>

            <ScrollView>
                {listData.map((data, idx) => (
                    <View key={idx}>
                        <CommunityList data={data} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
//신의 탑의 웹툰을 보았으면 그것을 보았다는 것을 알려주고 별점을 넣을 수 있도록 할 수 있도록 (사진 대신 웹툰의 메인 페이지, 별점 기능 추가하면 좋을꺼같다.)
const styles = StyleSheet.create({
    container: {
        backgroundColor: ThemePro.background
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'gray',
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
    },
    createButton: {
        backgroundColor: ThemePro.button,
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

export default CommunityPage;