import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 178,
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
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 8
  },

  user: {
    flex: 1,
    marginLeft: 12
  },

  title: {
    color: '#FFF',
    fontSize: 20
  },

  subtitle: {
    color: '#FFF',
    fontSize: 13
  },

  button: {
    height: 56,
    width: 56,
    borderRadius: 8,
    borderColor: '#E3E3E3',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
