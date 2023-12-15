import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { fireStoreDB } from '../../firebaseConfig';
import { auth } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddCommunity = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();
    const [newTitle, setNewTitle] = useState("");
    const [newSubTitle, setNewSubTitle] = useState("");



    const [emotion, setEmotion] = useState(0);
    const [uid, setUid] = useState('');
    const [displayName, setDisplayName] = useState('');
    // 웹툰 정보
    const [webtoonID, setWebtoonID] = useState('');
    const [webtoonTitle, setWebtoonTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [webtoonImage, setWebtoonImage] = useState('');
    const [webtoonService, setWebtoonService] = useState('');


    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUid(user.uid);
            setDisplayName(user.displayName);
            console.log(uid)
        }
    }, [])


    //image  address
    const [selectImageUrl, setImageUrl] = useState(null);
    //권한 요청
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const uploadImage = async () => {
        // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                return null;
            }
        }
        // 이미지 업로드 기능
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1]
        });
        if (result.canceled) {
            return null; // 이미지 업로드 취소한 경우
        }
        // 이미지 업로드 결과 및 이미지 경로 업데이트
        setImageUrl(result.assets[0].uri);
    };


    const uploadImageToFirebase = async (imageUri) => {
        console.log(imageUri);
        const fileName = `profile_image_${new Date().getTime()}.jpg`;
        console.log('a')
        const storageRef = ref(storage, `profileImages/${fileName}`);
        console.log('b')

        try {
            // 이미지를 Blob 형태로 변환
            console.log('c')
            if (imageUri) {
                console.log("변환시작")
                const response = await fetch(imageUri);
                const blob = await response.blob();
                console.log("변환완료")
                // Blob을 Firebase Storage에 업로드
                await uploadBytesResumable(storageRef, blob);
                console.log("업로드시작")
                // 업로드된 이미지의 URL 가져오기
                const url = await getDownloadURL(storageRef);
                console.log("업로드 완료")
                return url;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;
        }
    };

    // 페이지 실행될 때마다 실행하는 함수
    // 검색페이지에서 넘어왔을때 조건문 처리
    const getWebtoonData = () => {
        if (route.params?.fromScreen === 'SearchPage') {
            const {
                _id,
                title,
                author,
                url,
                img,
                service,
                updateDays,
                fanCount,
                additional,
            } = route.params.item;

            setWebtoonService(service);
            setWebtoonID(_id);
            setWebtoonTitle(title);
            setAuthor(author);
            setWebtoonImage(img);
        } else {
            setWebtoonService("smallTalk");
            setWebtoonID("");
            setWebtoonTitle("");
            setAuthor("");
            setWebtoonImage("");
        }

    }

    useEffect(() => {
        getWebtoonData();
    }, [route.params])

    const firebase = {
        title: newTitle,
        subTitle: newSubTitle,
        webtoonID: webtoonID,
        webtoonImage: webtoonImage,
        webtoonTitle: webtoonTitle,
        autor: author,
        uid: uid,
        displayName: displayName,
        emotion: emotion,
        isDeleted: false,
    }

    const addPost = async () => {
        try {
            const today = new Date();
            const dateString = today.toISOString();
            const firebaseImageUrl = await uploadImageToFirebase(selectImageUrl);

            // 웹툰 선택안했을 시 smallTalk임
            if (webtoonService === 'smallTalk') {
                // 문서 참조를 가져옵니다.
                const postDocRef = doc(fireStoreDB, `${webtoonService}Posts`, 'smallTalkPosts');

                // 새로운 게시물 데이터
                const newPost = {
                    ...firebase,
                    imageURL: firebaseImageUrl,
                    date: dateString,
                };

                // 게시글 작성(배열에 데이터가 추가되는 형식임)
                await updateDoc(postDocRef, {
                    posts: arrayUnion(newPost)
                });

                console.log('게시물 추가 완료');
                navigation.goBack();
            } else {
                // 문서 참조를 가져옵니다.
                const postDocRef = doc(fireStoreDB, `${webtoonService}Posts`, webtoonID);

                // 새로운 게시물 데이터
                const newPost = {
                    ...firebase,
                    imageURL: firebaseImageUrl,
                    date: dateString,
                };

                // Firestore에서 문서가 있는지 확인합니다.
                const docSnap = await getDoc(postDocRef);

                if (docSnap.exists()) {
                    // 문서가 존재하면, 기존 배열에 새 게시물을 추가합니다.
                    await updateDoc(postDocRef, {
                        posts: arrayUnion(newPost)
                    });
                } else {
                    // 문서가 존재하지 않으면, 새 문서를 생성하고 배열로 시작합니다.
                    await setDoc(postDocRef, {
                        posts: [newPost]
                    });
                }

                console.log('게시물 추가 완료');
                navigation.goBack();
            }

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

    const handleSelWebtoon = () => {
        navigation.navigate('SearchPage', { isWrite: true });
    }


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
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={handleSelWebtoon}>
                        <MaterialCommunityIcons name="pound" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 5, color: 'white' }}>{webtoonTitle}</Text>
                    <TouchableOpacity
                        onPress={uploadImage}
                    >
                        <FontAwesome name="image" size={24} color="white" />
                    </TouchableOpacity>
                    <Image
                        source={selectImageUrl ? { uri: selectImageUrl } : require('../../img/DefaultProfile.png')}
                        style={{ height: 100, width: 100 }}
                    />
                </View>
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