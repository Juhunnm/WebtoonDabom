import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import CommunityList from './components/CommunutyList';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { fireStoreDB } from '../../firebaseConfig';

// 테마 색상 정의
const ThemePro = {
    background: '#363062',
    element_1: '#435585',
    element_2: '#818FB4',
    button: '#F5E8C7',
    text: '#ffff',
};

const CommunityPage = () => {
    const navigation = useNavigation();
    const [listData, setListData] = useState([]); // 글 목록 데이터 상태
    const [searchList, setSearchList] = useState(''); // 검색어 상태

    // 파이어베이스에서 데이터를 불러오는 함수
    const fetchListData = async () => {
        try {
            // 'posts' 컬렉션에서 데이터 가져오기
            const querySnapshot = await getDocs(collection(fireStoreDB, 'posts'));
            
            // 가져온 데이터를 배열로 변환하여 상태 업데이트
            const data = querySnapshot.docs.map((doc) => doc.data());
            setListData(data);
        } catch (error) {
            console.error('Error : ', error);
        }
    };

    // 컴포넌트가 마운트될 때 데이터 불러오기
    useEffect(() => {
        fetchListData();
    });

    // 글 작성 페이지로 이동하는 함수
    const handleAddList = () => {
        navigation.navigate('AddCommunityPage');
    };

    // 검색어에 맞는 글 목록 필터링
    const filteredList = listData.filter(
        (data) => data.title.toLowerCase().includes(searchList.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* 검색 바 */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="커뮤니티 검색"
                    placeholderTextColor="#ffff"
                    value={searchList}
                    onChangeText={(text) => setSearchList(text)}
                />
                <FontAwesome name="search" size={24} color="black" />
            </View>

            {/* 글 목록 출력 */}
            <ScrollView>
                {filteredList.map((data, idx) => (
                    <View key={idx}>
                        <CommunityList title={data.title} subTitle={data.subTitle} />
                    </View>
                ))}
            </ScrollView>
            

            {/* 글 작성 버튼 */}
            <TouchableOpacity style={styles.createButton} onPress={handleAddList}>
                <Text>글 작성</Text>
            </TouchableOpacity>
        </View>
    );
};

// 스타일 정의
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        position: 'relative',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#bdbebd',
        height: 50,
        margin : 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
    },
    createButton: {
        backgroundColor: '#d3d3d3',
        width: 80,
        height: 60,
        borderRadius: 10,
        borderWidth: 2, 
        borderColor: 'black', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', 
        top: 80,
        right: 10, 
    },
});

export default CommunityPage;
