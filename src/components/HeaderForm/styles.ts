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
    paddingTop: getStatusBarHeight() + 42,
    paddingBottom: getStatusBarHeight(),
    marginBottom: 24
  },

  form: {
    width: '100%',
    padding: 24,
    flex: 1
  },

  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },

  button: {
    zIndex: 100
  }
});
