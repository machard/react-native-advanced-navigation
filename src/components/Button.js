import React, {View, TouchableOpacity, Text, Component} from 'react-native';

import style from './Button.style';

// basic button component

export default class Button extends Component {
  static propTypes = {
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    labelStyle: Text.propTypes.style,
    onPress: React.PropTypes.func,
    style: View.propTypes.style
  };

  render() {
    var Container = this.props.disabled ? View : TouchableOpacity;

    return (<Container
      onPress={this.props.onPress}
      style={[style.button, this.props.style, {opacity: this.props.disabled ? 0.3 : 1}]}
    >
      <Text style={[style.label, this.props.labelStyle]}>{this.props.label}</Text>
    </Container>);
  }
}
