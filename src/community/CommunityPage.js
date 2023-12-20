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
                const servicePostsCollectionRef = collection(fireStoreDB, `${selectedService}Posts`);
                const querySnapshot = await getDocs(servicePostsCollectionRef);
                for (const doc of querySnapshot.docs) {
                    const postsCollectionRef = collection(fireStoreDB, `${selectedService}Posts/${doc.id}/posts`);
                    const postsSnapshot = await getDocs(postsCollectionRef);
                    postsSnapshot.forEach(postDoc => {
                        allPosts.push({ id: postDoc.id, ...postDoc.data() });
                    });
                }
            }


            allPosts.sort((a, b) => b.date.localeCompare(a.date));
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
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("로그인을 해주세요.");
            return;
        }
        navigation.navigate('AddCommunityPage');
    };

    const handleServiceSelect = (service) => {
        if (selectedService !== service) {
            setSelectedService(service);
        }
    };


    const renderHeader = () => (
        <View style={styles.serviceButtonContainer} >
            <ScrollView
                horizontal={true}
                style={{ backgroundColor: '#fff' }}
                showsHorizontalScrollIndicator={false}>
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

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                커뮤니티 정보가 없습니다.
            </Text>
        </View>
    );


    return (
        <>
            {loading && <LoadingSpinner />}
            <View style={styles.container}>

                <FlatList
                    style={{ backgroundColor: '#fff' }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={listData}
                    ListHeaderComponent={renderHeader}
                    renderItem={({ item }) => <CommunityList {...item} />}
                    keyExtractor={item => item.date}
                    initialNumToRender={4}
                    maxToRenderPerBatch={4}
                    windowSize={2}
                    removeClippedSubviews={true}
                    ListEmptyComponent={renderEmptyComponent}
                />
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
