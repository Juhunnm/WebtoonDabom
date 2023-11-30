import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ThemePro = { // 임시 색상 
    background: '#363062',
    element_1: '#435585',
    element_2: '#818FB4',
    button: '#F5E8C7',
    text: '#ffff',
};

const AddCommunity = ({ route }) => {
    const {setListData } = route.params;
    const [newTitle, setNewTitle] = useState(""); // 본문 글
    const [newSubTitle,setNewSubTitle] = useState("");// 내용 글

    const handleSaveArray = () => {
        setListData((prev) => [...prev, {title :newTitle ,subTitle : newSubTitle}]);
        alert("글 작성이 되었습니다.");
    };

    return (
        <View style={styles.main}>

            <View style={styles.TitleInput}>
                <TextInput
                    placeholder="제목을 작성해주세요"
                    value={newTitle}
                    onChangeText={(text) => setNewTitle(text)}
                    style={{ color : 'white',flex: 1 }}
                />
            </View>
            <View style={[styles.TitleInput, { height: '50%' }]}>
                <TextInput
                    placeholder="본문을 작성해주세요"
                    value={newSubTitle}
                    onChangeText={(text) => setNewSubTitle(text)}
                    style={{ color : 'white',flex: 1 }}
                />
            </View>
            <TouchableOpacity onPress={handleSaveArray} style={styles.button}>
                <Text style={{ color: 'white' }}>글 저장</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: ThemePro.background,
        padding: 20,

    },
    TitleInput: {
        flexDirection: 'row',
        backgroundColor: ThemePro.element_1,
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    button: {
        backgroundColor: ThemePro.element_2,
        marginTop : 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default AddCommunity;
