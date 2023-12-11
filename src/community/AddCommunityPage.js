import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { doc, collection, addDoc } from "firebase/firestore";
import { fireStoreDB } from '../../firebaseConfig';

const AddCommunity = () => {
    const [newTitle, setNewTitle] = useState("");
    const [newSubTitle, setNewSubTitle] = useState("");

    const addPost = async () => {
        try {
            const postsCollection = collection(fireStoreDB, 'posts');
            await addDoc(postsCollection, {
                title: newTitle,
                subTitle: newSubTitle,
            });
            console.log('저장 완료');
        } catch (error) {
            console.error('Error : ', error);
        }
    };

    const handleSaveArray = () => {
        addPost();
        alert('글 작성이 되었습니다.');
    };

    return (
        <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.TitleInput}>
                <TextInput
                    placeholder="제목을 작성해주세요"
                    placeholderTextColor = 'white'
                    value={newTitle}
                    onChangeText={(text) => setNewTitle(text)}
                    style={{ flex: 1 }}
                />
            </View>
            <View style={[styles.TitleInput, styles.textInput]}>
                <TextInput
                    placeholder="본문을 작성해주세요"
                    placeholderTextColor = 'white'
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
        color : 'white'
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