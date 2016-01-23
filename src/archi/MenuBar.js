import React, {Animated, View, Component, ScrollView} from 'react-native';

import Button from '../components/Button';

export default class MenuBar extends Component {
  static propTypes = {
    extraActions: React.PropTypes.array,
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
      <ScrollView style={{flex: 1}}>
        {this.props.navState.routeStack.map((route, i) => (
          <Button
            key={i}
            label={route.tabName()}
            onPress={() => {
              this.props.navigator.jumpTo(route);
              // give time to eventuel onWillFocus render to happen
              requestAnimationFrame(() =>
                this.context.menuActions.close()
              );
            }}
            style={{
              margin: 10,
              backgroundColor: i === this.props.nextPresentedIndex ? '#FFFFEE' : 'white'
            }}
          />))}
        {this.props.extraActions && this.props.extraActions.map((action, i) => (
          <Button
            key={i}
            label={action.name}
            onPress={action.action}
            style={{
              margin: 10
            }}
          />))}
      </ScrollView>
    </Animated.View>);
  }

}
