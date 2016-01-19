import {StyleSheet, Navigator} from 'react-native';

const NAVBAR_HEIGHT = Navigator.NavigationBar.Styles.General.TotalNavHeight;

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: NAVBAR_HEIGHT,
    justifyContent: 'center'
  },
  bottomPadding: {
    paddingBottom: NAVBAR_HEIGHT
  },
  button: {
    margin: 10
  },
  text: {
    margin: 10,
    textAlign: 'center'
  }
});
