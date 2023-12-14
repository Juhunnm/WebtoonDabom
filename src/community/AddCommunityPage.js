import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { doc, collection, addDoc } from "firebase/firestore";
import { fireStoreDB } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const AddCommunity = () => {
    const navigation = useNavigation();
    const [newTitle, setNewTitle] = useState("");
    const [newSubTitle, setNewSubTitle] = useState("");

    const addPost = async () => {
        try {
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);
            let dateString = year + '-' + month  + '-' + day;
            console.log(dateString);

            const postsCollection = collection(fireStoreDB, 'posts');
            const docRef = await addDoc(postsCollection, {
                title: newTitle,
                subTitle: newSubTitle,
                date: dateString,
            });
            console.log('저장 완료, 새로운 ID: ', docRef.id);
            navigation.goBack();
        } catch (error) {
            console.error('Error : ', error);
        }
    };

    const handleSaveArray = () => {
        if (newTitle === '' && newSubTitle === '') {
            Alert.alert('내용이없습니다.', '내용을 입력해주세요');
        } else {
            addPost();
            alert('글 작성이 되었습니다.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.TitleInput}>
                <TextInput
                    placeholder="제목을 작성해주세요"
                    placeholderTextColor='white'
                    value={newTitle}
                    onChangeText={(text) => setNewTitle(text)}
                    style={{ flex: 1 }}
                />
            </View>
            <View style={[styles.TitleInput, styles.textInput]}>
                <TextInput
                    placeholder="본문을 작성해주세요"
                    placeholderTextColor='white'
                    value={newSubTitle}
                    onChangeText={(text) => setNewSubTitle(text)}
                    multiline
                    numberOfLines={10}
                    style={{ flex: 1 }}
                />
            </View>
            <TouchableOpacity
                onPress={handleSaveArray}
                style={styles.button}
            >
                <Text style={{ color: 'white' }}>글 저장</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    TitleInput: {
        flexDirection: 'row',
        backgroundColor: '#6a6a6a',
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white'
    },
    textInput: {
        height: '50%',
    },
    button: {
        backgroundColor: 'black',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default AddCommunity;