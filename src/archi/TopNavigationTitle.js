import React, {Text, Component} from 'react-native';

// basic nav bar title

export default class NavigationTitle extends Component {
  static propTypes = {
    label: React.PropTypes.string
  };

  render() {
    return (<Text>{this.props.label}</Text>);
  }
}
