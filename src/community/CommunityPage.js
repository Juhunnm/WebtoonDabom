import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { fireStoreDB } from '../../firebaseConfig';
import CommunityList from './components/CommunutyList';

const CommunityPage = () => {
    const navigation = useNavigation();
    const [listData, setListData] = useState([]);
    const [searchList, setSearchList] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const firebaseList = async () => {
        try {
            if (selectedService) {
                const query = collection(fireStoreDB, `posts/${selectedService}/posts`);
                const querySnapshot = await getDocs(query);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListData(data);
            } else {
                const services = ['naver', 'kakaoPage', 'page']; 
                let allData = [];
                for (const service of services) {
                    const query = collection(fireStoreDB, `posts/${service}/posts`);
                    const querySnapshot = await getDocs(query);
                    const data = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    allData = allData.concat(data);
                }
                setListData(allData);
            }
        } catch (error) {
            console.error('Error : ', error);
        }
    };
    
    useEffect(() => {
        firebaseList();
    }, [selectedService]);

    const handleAddList = () => {
        navigation.navigate('AddCommunityPage');
    };

    const handleServiceSelect = (service) => {
        setSelectedService(prevService => prevService === service ? '' : service);
    };
    
    const filteredList = listData.filter(
        item => item.title.toLowerCase().includes(searchList.toLowerCase())
    );

    return (
        <View style={styles.container}>
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

            <View style={styles.serviceButtonContainer}>
                {['naver', 'kakaoPage', 'page'].map((service) => (
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

            <ScrollView>
                {filteredList.map((data, idx) => (
                    <CommunityList key={idx} {...data} />
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.createButton} onPress={handleAddList}>
                <Text>글 작성</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        position: 'relative',
        padding: 10,
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    serviceButton: {
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 5,
    },
    selectedServiceButton: {
        backgroundColor: '#a3a3a3',
    },
    serviceButtonText: {
        color: 'white',
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
