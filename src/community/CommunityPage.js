import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';

import { auth } from '../../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';

import { LoadingContext } from '../loading/LoadingContext';
import LoadingSpinner from '../loading/LoadingSpinner';

import { fireStoreDB } from '../../firebaseConfig';
import CommunityList from './components/CommunutyList';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const CommunityPage = () => {
    const navigation = useNavigation();
    const [listData, setListData] = useState([]);
    const [searchList, setSearchList] = useState('');
    const [selectedService, setSelectedService] = useState('All');

    const { loading } = useContext(LoadingContext);
    const { spinner } = useContext(LoadingContext);

    const firebaseList = async () => {
        try {
            spinner.start();
            let allPosts = [];
            if (selectedService === 'All') {
                // 게시글 전부 가져오는 코든데 최적화가 무조건 필요함
                // 현재 방식은 잡담 다가져오고, 네이버 다가져오고, 카카오 ... 방식임
                // 효율이 미친듯이 떨어짐
                // 플랫폼별로 한개씩 게시글을 들고오고 스크롤 끝까지 내리면 또 한개씩 들고오는 방식 괜찮아보임
                const services = ['smallTalk', 'naver', 'kakao', 'kakaoPage'];

                for (const service of services) {
                    const querySnapshot = await getDocs(collection(fireStoreDB, `${service}Posts`));
                    for (const doc of querySnapshot.docs) {
                        const postsCollectionRef = collection(fireStoreDB, `${service}Posts/${doc.id}/posts`);
                        const postsSnapshot = await getDocs(postsCollectionRef);
                        postsSnapshot.forEach(postDoc => {
                            allPosts.push({ id: postDoc.id, ...postDoc.data() });
                        });
                    }
                }
            } else {
                // 물론 여기도 플랫폼에서 데이터 긁어올때 7개 정도씩 긁어오고 스크롤 끝까지 내렸을때
                // 추가로 들고오도록 수정필요할것 같음
                const servicePostsCollectionRef = collection(fireStoreDB, `${selectedService}Posts`);
                const querySnapshot = await getDocs(servicePostsCollectionRef);
                // 이 반복문 문법은 
                // 파이썬의 for 변수 in 리스트: 과 같음
                for (const doc of querySnapshot.docs) {
                    const postsCollectionRef = collection(fireStoreDB, `${selectedService}Posts/${doc.id}/posts`);
                    const postsSnapshot = await getDocs(postsCollectionRef);
                    postsSnapshot.forEach(postDoc => {
                        allPosts.push({ id: postDoc.id, ...postDoc.data() });
                    });
                }
            }

            // 게시글을 date 필드를 기준으로 내림차순 정렬
            allPosts.sort((a, b) => b.date.localeCompare(a.date));
            //찾아봐야겠다
            console.log(`데이터: `, allPosts);
            setListData(allPosts);
        } catch (error) {
            console.error('Error : ', error);
        } finally {
            spinner.stop();
        }
    };

    useEffect(() => {
        firebaseList();
    }, [selectedService]);

    handleAddList = () => {
        const user = auth.currentUser; // 로그인 안되어 있으면 null반환
        if (!user) {
            Alert.alert("로그인을 해주세요.");// TODO: 로그인 페이지로 넘어가는 로직 추가필요
            return;
        }
        navigation.navigate('AddCommunityPage');
    };

    const handleServiceSelect = (service) => {
        // 기본으로 #ALL이 선택되고 이미 선택된 버튼 다시 누르면
        // 아무런 기능도 없도록 구현
        if (selectedService !== service) {
            setSelectedService(service);
        }
    };

    // FlatList의 윗부분에 표시될 부분
    // 해시태그 지정하는 부분임
    const renderHeader = () => (
        <View style={styles.serviceButtonContainer} >
            <ScrollView
                horizontal={true}//가로슬라이드
                style={{ backgroundColor: '#fff' }}
                showsHorizontalScrollIndicator={false}>
                {/* 스크롤바 없앰 */}
                <View style={styles.categoryList}>
                    {['All', 'smallTalk', 'naver', 'kakao', 'kakaoPage'].map((service) => (
                        <TouchableOpacity
                            key={service}
                            style={[
                                styles.serviceButton,
                                selectedService === service && styles.selectedServiceButton,
                            ]}
                            onPress={() => handleServiceSelect(service)}
                        >
                            <Text style={styles.serviceButtonText}>#{service.toUpperCase()}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>

    );
    // FlatList가 비어있을때 표시할 내용
    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                커뮤니티 정보가 없습니다.
            </Text>
        </View>
    );

    // const filteredList = listData.filter(
    //     item => item.posts.title.toLowerCase().includes(searchList.toLowerCase())
    // );

    return (
        <>
            {loading && <LoadingSpinner />}
            <View style={styles.container}>
                {/* <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="커뮤니티 검색"
                    placeholderTextColor="#ffff"
                    value={searchList}
                    onChangeText={(text) => setSearchList(text)}
                />
                <FontAwesome name="search" size={24} color="black" />
            </View> */}

                <FlatList
                    style={{ backgroundColor: '#fff' }}
                    contentContainerStyle={{ flexGrow: 1 }}//화면을 꽉차게
                    data={listData}//map함수
                    ListHeaderComponent={renderHeader}
                    // 위에다가 렌더링
                    renderItem={({ item }) => <CommunityList {...item} />}
                    // 
                    keyExtractor={item => item.date}
                    // 키값을 줌
                    initialNumToRender={4}
                    //맨처음 시작할때 4개 실행먼저
                    maxToRenderPerBatch={4}
                    //화면에 띄울 갯수
                    windowSize={2}
                    //화면 밖에 얼마큼 렌더링할껀가
                    removeClippedSubviews={true}
                    //flase를 주면 지우지 않는다.
                    ListEmptyComponent={renderEmptyComponent}
                //아무것도 없을때는
                />
                {/* 글쓰기 버튼 */}
                <TouchableOpacity style={styles.createButton} onPress={handleAddList}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>+</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#bdbebd',
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
    },
    serviceButtonContainer: {
        backgroundColor: '#fff',
        height: WINDOW_HEIGHT * 0.05,
    },
    serviceButton: {
        backgroundColor: '#818FB4',
        padding: 10,
        borderRadius: '100%',
    },
    selectedServiceButton: {
        backgroundColor: '#363062',
    },
    serviceButtonText: {
        color: 'white',
    },
    createButton: {
        backgroundColor: '#363062',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
    categoryList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: WINDOW_HEIGHT * 0.05,
        gap: 3,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        color: '#888888',
    },
});

export default CommunityPage;
