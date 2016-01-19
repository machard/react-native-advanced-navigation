import {StyleSheet, Dimensions, Navigator} from 'react-native';

const NAVBAR_HEIGHT = Navigator.NavigationBar.Styles.General.TotalNavHeight;

var {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

export default StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottomWidth: 1
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  menuContainer: {
    backgroundColor: 'white',
    height: deviceHeight,
    width: deviceWidth * 2 / 3
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT,
    borderTopWidth: 1
  }
});
