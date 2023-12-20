import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDocs, collection, addDoc } from "firebase/firestore";
import { auth } from '../../firebaseConfig';
import { fireStoreDB } from '../../firebaseConfig';
import WebViewImage from '../home/components/WebViewImage';
import { Image } from "react-native-expo-image-cache";

const DetailedCommunityPage = ({ route }) => {
  const { title, subTitle, id, webtoonTitle, imageURL, webtoonImage, autor, webtoonID, service } = route.params;
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = async () => {
    if (!commentInput) return;

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("로그인을 해주세요.");
      return;
    }
    const displayName = user.displayName;
    const uid = user.uid;

    const commentsCollection = collection(fireStoreDB, `${service}Posts/${webtoonID}/posts/${id}/comments`);
    await addDoc(commentsCollection, {
      displayName: displayName,
      comment: commentInput,
      uid: uid,
      date: new Date().toLocaleString(),
    });

    setCommentInput('');
    console.log('댓글 작성 시간:', new Date().toLocaleString());
    fetchComments();
  }


  const fetchComments = async () => {
    const commentsCollection = collection(fireStoreDB, `${service}Posts/${webtoonID}/posts/${id}/comments`);
    const commentSnap = await getDocs(commentsCollection);
    const comments = commentSnap.docs.map(doc => doc.data().comment);
    setComments(comments);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  const renderWebtoonImage = () => {
    if (service === 'kakaoPage') {
      return (
        <Image
          {...{ uri: `https:${webtoonImage}` }}
          style={styles.image}
          onError={(e) => console.log(e)}
        />
      );
    } else if (service === 'kakao') {
      return (
        <Image
          {...{ uri: webtoonImage }}
          style={styles.image}
          onError={(e) => console.log(e)}
        />
      );
    } else if (service === 'naver') {
      return <WebViewImage imageURL={webtoonImage} isDetail={true} />;
    } else {
      return null;
    }
  }
  return (
    <View style={styles.main}>
      <ScrollView style={styles.communityContainer}>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, color: 'white' }} >{title}</Text>
        </View>
        <View style={styles.subTitle}>
          <Text>{subTitle}</Text>
        </View>
        <View style={styles.imageContainerCenter}>
          <Image {...{ uri: imageURL }} style={styles.image} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="pound" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, color: 'white' }}>{webtoonTitle}</Text>
        </View>
        <View style={styles.imageContainerLeft}>
          {renderWebtoonImage()}
          <Text style={styles.autorText}>{autor}</Text>
        </View>
        <View style={styles.chating}>
          {comments.map((comment, index) => (
            <Text style={styles.commentItem} key={index}>{comment}</Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          onChangeText={text => setCommentInput(text)}
          value={commentInput}
          placeholder="댓글을 입력해주세요"
        />
        <Button title="댓글 작성" onPress={handleAddComment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#435585',
    padding: 20,
    justifyContent: 'space-between',
  },
  communityContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#435585',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    backgroundColor: '#818FB4',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  chating: {
    flex: 0.5
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  commentItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  imageContainerCenter: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imageContainerLeft: {
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  autorText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default DetailedCommunityPage;
