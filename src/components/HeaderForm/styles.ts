import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  header: {
    // height: 178,
    width: '100%',
    backgroundColor: '#00A88E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    // padding: 24,
    paddingTop: getStatusBarHeight(),
    paddingBottom: getStatusBarHeight()
    // marginBottom: 24
  },
  form: {
    width: '100%',
    padding: 24,
    flex: 1
  },
  title: {
    fontSize: 20,
    color: '#3D434D',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginLeft: -32
  },
  button: {
    zIndex: 100
  }
});
