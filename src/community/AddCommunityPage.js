import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { doc, collection, getDoc, updateDoc, setDoc, addDoc } from "firebase/firestore";
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

    const [selectImageUrl, setImageUrl] = useState(null);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const uploadImage = async () => {
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                return null;
            }
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1]
        });
        if (result.canceled) {
            return null;
        }
        setImageUrl(result.assets[0].uri);
    };
    const uploadImageToFirebase = async (imageUri) => {
        console.log(imageUri);
        const fileName = `profile_image_${new Date().getTime()}.jpg`;
        const storageRef = ref(storage, `profileImages/${fileName}`);
        try {
            if (imageUri) {
                console.log("변환시작")
                const response = await fetch(imageUri);
                const blob = await response.blob();
                console.log("변환완료")
                await uploadBytesResumable(storageRef, blob);
                console.log("업로드시작")
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
            setWebtoonID("smallTalks");
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
        service: webtoonService,
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

            const webtoonDocRef = doc(fireStoreDB, `${webtoonService}Posts`, webtoonID);
            await setDoc(webtoonDocRef, {
                webtoonTitle: webtoonTitle
            });




            const postsCollection = collection(fireStoreDB, `${webtoonService}Posts/${webtoonID}/posts`);

            const docRef = await addDoc(postsCollection, {
                ...firebase,
                imageURL: firebaseImageUrl,
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
                <View style={styles.upload}>
                    <View style={styles.iconTextRow}>
                        <TouchableOpacity onPress={handleSelWebtoon} style={styles.iconTextContainer}>
                            <MaterialCommunityIcons name="pound" size={24} color="white" />
                            <Text style={styles.iconText}>리뷰할 웹툰 선택</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginLeft: 5, color: 'white' }}>{webtoonTitle}</Text>
                    <TouchableOpacity
                        onPress={uploadImage}
                    >
                        <FontAwesome name="image" size={24} color="white" />
                    </TouchableOpacity>
                    {selectImageUrl &&
                        <Image
                            source={{ uri: selectImageUrl }}
                            style={{ height: 100, width: 100 }}
                        />}
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
        backgroundColor: '#435585',
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        color: 'white'
    },
    textInput: {
        height: '50%',
        width: '100%',
        flexDirection: 'column',
    },
    button: {
        backgroundColor: '#818FB4',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    upload: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',

    },
    iconTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        marginLeft: 5,
        color: 'white',
    },
});

export default AddCommunity;