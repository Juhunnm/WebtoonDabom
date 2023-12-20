import { StyleSheet, Dimensions } from 'react-native';
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
  midScreen: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomScreen: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',

  },
  header: {
    fontSize: WINDOW_HEIGHT * 0.05,
    fontWeight: 'bold',
    marginBottom: WINDOW_HEIGHT * 0.05,
  },
  input: {
    fontSize: ITEM_SIZE * 0.11,
    height: WINDOW_HEIGHT * 0.06,
    width: WINDOW_WIDTH * 0.93,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: WINDOW_WIDTH * 0.02,
  },

  error: {
    marginBottom: 20,
    color: 'red',
  },
  link: {
    fontSize: WINDOW_HEIGHT * 0.019,
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: WINDOW_HEIGHT * 0.017,
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282C34', // Google blue color
    paddingHorizontal: WINDOW_WIDTH * 0.02,
    borderRadius: 5,
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
    height: WINDOW_HEIGHT * 0.02,
    width: 2, // Adjust the width of the line as needed
    backgroundColor: '#aaa', // Adjust the color of the line as needed
    verticalAlign: 'middle',
    marginHorizontal: 20,
  },
  mainBox: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: '#F8F8F8',
    width: WINDOW_WIDTH * 0.98,
    borderTopWidth: 1,
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
    borderWidth: 1,
    borderColor: '#F8F8F8',


  },
  alignLeft: {

    alignSelf: 'flex-start',
    padding: 20,
    fontSize: ITEM_SIZE * 0.13,
    color: '#5e5e5e',

  },
  alignRight: {
    alignSelf: 'flex-end',
    padding: 20,
    fontSize: ITEM_SIZE * 0.13,
    color: '#0e0e0e',
  },
  leftbox: {
    width: '30%',
    height: WINDOW_HEIGHT * 0.1,
  },
  rightbox: {
    width: '70%',
    height: WINDOW_HEIGHT * 0.1,
  },
  image: {
    width: ITEM_SIZE * 0.8,
    height: ITEM_SIZE * 0.8,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#F1F1F1',

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
    borderColor: '#E1E1E1',
    borderWidth: 3,


  },
  logout: {
    fontSize: WINDOW_HEIGHT * 0.018,
    fontWeight: 'bold',
    color: 'gray',
    padding: 70,
    alignSelf: 'center',

  },
  LoginScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  LoginScreenInputBox: {
    width: 300,
    marginTop: 10,
  },
  LoginScreenButtonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 10,
  },



});