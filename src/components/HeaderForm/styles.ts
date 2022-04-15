import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#00A88E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight(),
    paddingBottom: getStatusBarHeight(),
    marginBottom: 24
  },

  form: {
    width: '100%',
    padding: 24,
    flex: 1
  },

  title: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    zIndex: 100
  }
});
