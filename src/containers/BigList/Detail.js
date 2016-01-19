import React, {Text, Component} from 'react-native';
import _ from 'lodash';

import NavigationSetting from '../../navigation/NavigationSetting';

import style from './Detail.style';

import store from '../../store';

export default class Detail extends Component {
  static propTypes = {
    row: React.PropTypes.number.isRequired
  };

  static contextTypes = {
    navigators: React.PropTypes.array.isRequired
  };

  render() {
    var ns = {
      titleLabel: 'Row ' + this.props.row,
      style: [style.container],
      leftAction: () => _.last(this.context.navigators).pop(),
      leftLabel: '<'
    };

    if (!store.get('menubar'))
      ns.style.push(style.bottomPadding);

    return (<NavigationSetting
      {...ns}
      waitForFocus
    >
      <Text style={style.text}>
        Row {this.props.row} details !
      </Text>
    </NavigationSetting>);
  }

}
