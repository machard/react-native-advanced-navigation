import React, {Animated, View, Component} from 'react-native';

import Button from '../components/Button';

export default class MenuBar extends Component {
  static propTypes = {
    navState: React.PropTypes.shape({
      routeStack: React.PropTypes.arrayOf(React.PropTypes.object),
      presentedIndex: React.PropTypes.number
    }),
    navigator: React.PropTypes.object,
    nextPresentedIndex: React.PropTypes.number,
    style: Animated.View.propTypes.style
  };

  static contextTypes = {
    menuActions: React.PropTypes.object.isRequired
  };

  render() {
    return (<Animated.View
      style={[this.props.style, {flex: 1}]}
    >
      {this.props.navState.routeStack.map((route, i) => (
        <Button
          key={i}
          label={route.tabName()}
          onPress={() => {
            this.props.navigator.jumpTo(route);
            this.context.menuActions.close();
          }}
          style={{
            margin: 10,
            backgroundColor: i === this.props.nextPresentedIndex ? '#FFFFEE' : 'white'
          }}
        />))}
    </Animated.View>);
  }

}
