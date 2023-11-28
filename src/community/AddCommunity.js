import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

const AddCommunity = ({ route }) => {
    const { useerName, setUsetName, setListData } = route.params;
    const [newItem, setNewItem] = useState(""); 

    const handleBackNavigate = () => {
        setListData(prevList => [...prevList, newItem]);
        setUsetName('min');
    };

    return (
        <View>
            <Text>글 세부 작성</Text>
            <Text>{useerName}</Text>
            <TextInput
                placeholder="New Item"
                value={newItem}
                onChangeText={text => setNewItem(text)}
            />
            
            <TouchableOpacity onPress={handleBackNavigate}>
                <Text>글 올리기</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddCommunity;