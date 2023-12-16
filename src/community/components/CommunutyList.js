import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert ,Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fireStoreDB } from '../../../firebaseConfig';
import { doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';


const CommunityList = ({ date, title, subTitle,id,webtoonTitle,imageURL,webtoonImage,autor,service,webtoonID}) => {

    const navigation = useNavigation();
    const [isIcons, setIsIcons] = useState(false);
    const [count, setCount] = useState("");
    const handleDelete = async () => {
        Alert.alert(
            "게시물 삭제",
            "이 게시물을 정말 삭제하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                { 
                    text: "삭제", 
                    onPress: async () => {
                        await deleteDoc(doc(fireStoreDB, "posts", id));
                        // 여기에 게시물이 삭제된 후의 로직 추가 (예: 상태 업데이트, 목록 새로고침 등)
                    }
                }
            ]
        );
    };

    const handleIcon = async() => {
        // const postRef = doc(fireStoreDB,"posts", );
        // await updateDoc(postRef, {
        //     emotion: increment(1)
        // });
        // console.log(date);
        // setIsIcons(!isIcons);
        // setCount(prevCount => isIcons ? prevCount - 1 : prevCount + 1);
    };

    const handleMove = () => {
        navigation.navigate("DetailedCommunityPage", { title, subTitle ,id,webtoonTitle,imageURL,webtoonImage,autor,service,webtoonID});
    }

    return (
        <View style={styles.communityListContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.title}>{title}</Text>
                <Text>{date}</Text>
            </View>
            <View style={styles.subTitle}>
                <Text style={{color : 'black'}}>{subTitle}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageURL }} style={styles.image} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        handleMove();
                    }}
                >
                    <MaterialCommunityIcons name="chat-outline" size={24} color={"white"} />
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleIcon}>
                        {isIcons ? (
                            <MaterialCommunityIcons name="cards-heart" size={24} color={"black"} />
                        ) : (
                            <MaterialCommunityIcons name="cards-heart-outline" size={24} color={"white"} />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.countText}>{count}</Text>
                </View>
                <TouchableOpacity onPress={handleDelete}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    communityListContainer: {
        padding: 10,
        backgroundColor: '#858585',
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    subTitle: {
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countText: {
        color: 'white',
        marginLeft: 5,
    },
    imageContainer: {
        alignItems: 'center', // 이미지를 중앙에 배치
        marginVertical: 10, // 상하 마진 추가
    },
    image: {
        width: '100%', // 이미지의 너비를 컨테이너에 맞춤
        height: 200, // 적절한 이미지 높이 설정
        resizeMode: 'contain', // 이미지 비율 유지
    },
});

export default CommunityList;