import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    padding: 0,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  container: {
    flexDirection: 'row'
  },
  left: {
    alignSelf: 'flex-start'
  },
  right: {
    alignSelf: 'flex-end'
  }
});
