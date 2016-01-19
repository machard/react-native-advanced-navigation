import React, {View, Component} from 'react-native';
import _ from 'lodash';

import Button from '../components/Button';

import style from './TopNavigationButton.style';

// basic navbar button component

export default class TopNavigationButton extends Component {
  static propTypes = {
    action: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.array
    ]),
    disabled: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array
    ]),
    label: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    type: React.PropTypes.string
  };

  render() {
    if (!this.props.label)
      return null;

    var labels = _.isArray(this.props.label) ? this.props.label : [this.props.label];
    var actions = _.isArray(this.props.action) ? this.props.action : [this.props.action];
    var disableds = _.isArray(this.props.disabled) ? this.props.disabled : [this.props.disabled];

    return (<View style={style.container}>
      {_.map(labels, (label, index) => {
        return (<Button
          disabled={disableds[index]}
          key={index}
          label={labels[index]}
          onPress={actions[index]}
          style={[style.button, style[this.props.type]]}
        />);
      })}
    </View>);
  }
}
