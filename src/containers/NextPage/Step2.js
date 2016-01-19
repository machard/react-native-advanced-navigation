import React, {Text, Component} from 'react-native';
import _ from 'lodash';

import NavigationSetting from '../../navigation/NavigationSetting';
import Button from '../../components/Button';

import style from './Step2.style';

export default class Step2 extends Component {
  static propTypes = {
    navBar: React.PropTypes.bool,
    topBar: React.PropTypes.bool
  };

  static contextTypes = {
    menuActions: React.PropTypes.object.isRequired,
    navigators: React.PropTypes.array.isRequired,
    setNavBars: React.PropTypes.array.isRequired
  };

  static defaultProps = {
    topBar: true,
    navBar: true
  };

  render() {
    var ns = {
      titleLabel: 'Next page',
      style: [style.container],
      leftAction: () => _.last(this.context.navigators).pop(),
      leftLabel: '<',
      navBar: this.props.topBar,
      onWillFocus: () => _.last(this.context.setNavBars)(this.props.navBar),
      onWillBlur: () => _.last(this.context.setNavBars)(true)
    };

    if (!this.props.topBar)
      ns.style.push(style.bottomPadding);

    return (<NavigationSetting
      {...ns}
      waitForFocus
    >
      <Text style={style.text}>
        Yeahh
      </Text>
      {!this.props.topBar && <Button
        label="Back"
        onPress={() => _.last(this.context.navigators).pop()}
        style={style.button}
      />}
    </NavigationSetting>);
  }

}
