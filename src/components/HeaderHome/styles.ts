import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#00A88E',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight(),
    paddingBottom: getStatusBarHeight()
  },

  avatar: {
    width: 56,
    height: 56,
    // borderColor: '#FFFFFF',
    // borderWidth: 2,
    borderRadius: 4
  },

  user: {
    flex: 1,
    marginLeft: 12
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 13
  },

  button: {
    height: 56,
    width: 56,
    borderRadius: 4,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
