import {Navigator, Animated} from 'react-native';
// this is a component wrapping the react native nav bar.

// roles:
// handle a nice hide/show animation when transitionning between
// scenes that don't have the same initialNavBar setting

export default class AnimatedNavigationBar extends Animated.createAnimatedComponent(Navigator.NavigationBar) {
  updateProgress(progress, fromIndex, toIndex) {
    this.refs.node.updateProgress(progress, fromIndex, toIndex);
  }
}
