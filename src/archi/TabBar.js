import React, {Animated, View, Component} from 'react-native';

import Button from '../components/Button';

export default class TabBar extends Component {
  static propTypes = {
    navState: React.PropTypes.shape({
      routeStack: React.PropTypes.arrayOf(React.PropTypes.object),
      presentedIndex: React.PropTypes.number
    }),
    navigator: React.PropTypes.object,
    nextPresentedIndex: React.PropTypes.number,
    style: Animated.View.propTypes.style
  };

  render() {
    // it relies on navigator as it has all views mounted
    // transitionning between them is supposed to be faster
    return (<Animated.View
      style={[this.props.style, {flex: 1, flexDirection: 'row'}]}
    >
      {this.props.navState.routeStack.map((route, i) => (<Button
        key={i}
        label={route.tabName()}
        onPress={() => {
          this.props.navigator.jumpTo(route);
        }}
        style={{
          flex: 1,
          margin: 0,
          backgroundColor: i === this.props.nextPresentedIndex ? '#FFFFEE' : 'white'
        }}
      />))}
    </Animated.View>);
  }

}
