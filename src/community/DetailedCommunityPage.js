import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDocs, collection, addDoc } from "firebase/firestore";
import { auth } from '../../firebaseConfig';
import { fireStoreDB } from '../../firebaseConfig';
import WebViewImage from '../home/components/WebViewImage';
import { Image } from "react-native-expo-image-cache";

const DetailedCommunityPage = ({ route }) => {
  const { title, subTitle, id,webtoonTitle,imageURL,webtoonImage,autor,webtoonID,service } = route.params;

  // 댓글을 저장할 상태를 생성
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  

  // 댓글 작성 함수
  const handleAddComment = async () => {
    // 입력값이 없으면 리턴
    if (!commentInput) return;

    // 현재 로그인 정보 가져오는 코드
    const user = auth.currentUser; // 로그인 안되어 있으면 null반환
    if(!user){
      Alert.alert("로그인을 해주세요.");
      // TODO: 로그인 페이지로 넘어가는 로직 추가필요
      return;
    }
    const displayName = user.displayName; // 현재 로그인 되어 있는 유저 닉네임
    const uid = user.uid; // 현재 로그인 되어 있는 유저 uid

    // Firebase에 댓글 저장
    const commentsCollection = collection(fireStoreDB, `${service}Posts/${webtoonID}/posts/${id}/comments`);
    await addDoc(commentsCollection, { 
      displayName: displayName,
      comment: commentInput,
      uid: uid,
      date: new Date().toLocaleString(),
    });

    setCommentInput(''); // 입력창 초기화
    console.log('댓글 작성 시간:', new Date().toLocaleString()); // 댓글 작성 시간 출력
    fetchComments();
  }


  // 댓글을 불러오는 함수
  const fetchComments = async () => {
    const commentsCollection = collection(fireStoreDB, `${service}Posts/${webtoonID}/posts/${id}/comments`);
    const commentSnap = await getDocs(commentsCollection);
    const comments = commentSnap.docs.map(doc => doc.data().comment);
    setComments(comments);
  }

  useEffect(() => {
    fetchComments(); // 컴포넌트가 마운트될 때 댓글을 불러옵니다
  }, []);

  const renderWebtoonImage = () => {
    //   if (service === 'kakaoPage') {
    //     return <Image source={{ uri: "https:" + webtoonImage }} style={styles.image} />;
    //   } else if (service === 'kakao') {
    //     return <Image source={{ uri: webtoonImage }} style={styles.image} />;
    //   } else if(service ==='naver') {
    //     return <WebViewImage imageURL={webtoonImage} isSearch={true} />
    // }else{
    //   return null;
    // }
    if (service === 'kakaoPage') return (
      <Image
          {...{ uri: "https:" + webtoonImage }}
          style={styles.image}
          onError={(e) => console.log(e)}
      />)
  else if (service === 'kakao') return (
      <Image
          {...{ uri: webtoonImage }}
          style={styles.image}
          onError={(e) => console.log(e)}
      />
  )
  else if(service ==='naver') (<WebViewImage imageURL={webtoonImage} isSearch={true} />)
  else{
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
                <Image source={{ uri: imageURL }} style={styles.image} />
            </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="pound" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, color: 'white' }}>{webtoonTitle}</Text>
        </View>
        <View style ={styles.imageContainerLeft}>
        {renderWebtoonImage()}
          <Text style={styles.autorText}>{autor}</Text>
        </View>
      </ScrollView>
        <View style={styles.chating}>
          {comments.map((comment, index) => (
            <Text style={styles.commentItem} key={index}>{comment}</Text>
          ))}
        </View>
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
    alignItems: 'center', // 이미지를 중앙에 배치
    marginVertical: 10, // 상하 마진 추가
  },
  imageContainerLeft: {
    marginVertical: 10, // 상하 마진 추가
    alignSelf: 'flex-start', // 이미지 컨테이너를 왼쪽으로 정렬
  },
  image: {
    width: 200, // 이미지의 너비 조정 (예: 200)
    height: 200, // 이미지의 높이 설정 (예: 200)
    resizeMode: 'contain', // 이미지 비율 유지
    borderRadius : 10,
  },
  autorText: {
    marginLeft: 10, // 이미지와의 간격
    fontSize: 16, // 텍스트 크기
    color: 'black', // 텍스트 색상
  },
});

export default DetailedCommunityPage;
