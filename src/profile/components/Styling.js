import { StyleSheet,Dimensions } from 'react-native';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const ITEM_SIZE = WINDOW_HEIGHT * 0.18;

export const styles = StyleSheet.create({

    mainScreen: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      
      
    },
    topScreen: {
      flex: 3,
      justifyContent: 'flex-start',
      
    },
    bottomScreen: {
      flex: 1,
      justifyContent: 'flex-end',
      
    },
    header: {
      fontSize: WINDOW_HEIGHT * 0.05,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      fontSize: ITEM_SIZE * 0.11,
      height: WINDOW_HEIGHT * 0.06,
      width: WINDOW_WIDTH * 0.93,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',  
      borderRadius: 5,
      marginBottom: 10, 
      paddingHorizontal: WINDOW_WIDTH * 0.02,
    },

    error: {
      marginBottom: 20,
      color: 'red',
    },
    link: {
      fontSize: WINDOW_HEIGHT * 0.02,
      color: '#333',
      marginBottom: 20,
    },
    label: {
      fontSize: WINDOW_HEIGHT * 0.017, 
      marginBottom: 10,
    },
    button:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#282C34', // Google blue color
      paddingHorizontal: WINDOW_WIDTH * 0.02,
      borderRadius:5,
      opacity: 0.7,
      width: WINDOW_WIDTH * 0.83,
      height: WINDOW_HEIGHT * 0.06,
    },
    buttonText: { 
      color: 'white', 
      fontSize: WINDOW_HEIGHT * 0.02,
      fontWeight: 'bold', 
    },
    sameLine: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10,
      
    },
    verticalLine: {
      height: '20%',
      width: 2, // Adjust the width of the line as needed
      backgroundColor: '#aaa', // Adjust the color of the line as needed
      verticalAlign: 'middle',
      marginHorizontal: 20,
    },
    mainBox: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      width: WINDOW_WIDTH * 0.95,
      marginBottom: 10,
  },
  imageBox: {
      width: '100%',
      height: WINDOW_HEIGHT * 0.32,
      justifyContent: 'center',
      alignItems: 'center',
  },
  userInfoBox: {
      flexDirection: 'row',
      width: '100%',
      height: WINDOW_HEIGHT * 0.1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      

  },
  alignLeft:{
      alignSelf: 'flex-start',
      padding: 20,
      fontSize: ITEM_SIZE * 0.12,
      color: '#3e3e42',
  },
  alignRight:{
      alignSelf: 'flex-end',
      padding: 20,
      fontSize: ITEM_SIZE * 0.12,
      color: '#000',
  },
  leftbox:{
      width: '30%',
      height: WINDOW_HEIGHT * 0.1,
  },
  rightbox:{
      width: '70%',
      height: WINDOW_HEIGHT * 0.1,
  },
  image: {
      width: ITEM_SIZE * 0.8,
      height: ITEM_SIZE * 0.8,
      borderRadius:100,
  },

uploadBox: {
  height: ITEM_SIZE * 0.35,
  width: ITEM_SIZE * 2.5,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 3,
  borderColor: '#323842',
  borderWidth: 4, 
  borderRadius: 5, 
  backgroundColor: '#D4D8DF',
  opacity: 0.7,
},
  uploadButton: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadIcon: {
    marginRight: 10,
  },
  profileEdit: {
    // maker an overlay to make the edit icon on the profile image
    position: 'absolute',
    width: '28%',
    height: '45%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  profileEditIcon: {
    
  },
  profileEditIconBox: {
    width: WINDOW_WIDTH * 0.07,
    height: WINDOW_HEIGHT * 0.035,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 3,


  },
  logout: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
    padding: 70,
    alignSelf: 'center',
    
  },
  
});