import {StyleSheet, Navigator} from 'react-native';

const NAVBAR_HEIGHT = Navigator.NavigationBar.Styles.General.TotalNavHeight;


export default StyleSheet.create({
  container: {
    paddingTop: NAVBAR_HEIGHT,
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10
  },
  text: {
    flex: 1
  }
});
