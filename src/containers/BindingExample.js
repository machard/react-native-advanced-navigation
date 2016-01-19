import React, {Text, Component} from 'react-native';

import NavigationSetting from '../navigation/NavigationSetting';
import Button from '../components/Button';

import style from './BindingExample.style';

import store from '../store';

const TITLES = ['Binding Example', 'Title', 'Kikou !'];
const BUTTONS = ['Button', 'SUPER', 'Yeah'];

export default class BindingExample extends Component {

  static contextTypes = {
    menuActions: React.PropTypes.object.isRequired
  };

  state = {
    titleI: 0,
    buttonI: 0,
    clicked: 1,
    disabled: false,
    noButton: false
  };

  titleI = 0;
  buttonI = 0;

  render() {
    var ns = {
      titleLabel: TITLES[this.state.titleI],
      style: [style.container]
    };

    if (!this.state.noButton) {
      ns.rightAction = () => this.setState({
        clicked: this.state.clicked + 1
      });
      ns.rightLabel = BUTTONS[this.state.buttonI];
      ns.rightDisabled = this.state.disabled;
    }

    if (store.get('menubar')) {
      ns.leftAction = () => this.context.menuActions.open();
      ns.leftLabel = 'Menu';
    } else
      ns.style.push(style.bottomPadding);

    return (<NavigationSetting
      {...ns}
      waitForFocus
    >
      <Text style={style.text}>
        This tab shows you scene / navigationBar bindings
      </Text>
      <Text style={style.text}>right button clicked {this.state.clicked} times !</Text>
      <Button
        label="change title label"
        onPress={() => this.setState({titleI: (this.state.titleI + 1) % TITLES.length})}
        style={style.button}
      />
      {!this.state.noButton && <Button
        label="change button label"
        onPress={() => this.setState({buttonI: (this.state.buttonI + 1) % BUTTONS.length})}
        style={style.button}
      />}
      {!this.state.noButton && <Button
        label={(this.state.disabled ? 'enable' : 'disable') + ' button'}
        onPress={() => this.setState({disabled: !this.state.disabled})}
        style={style.button}
      />}
      <Button
        label={(this.state.noButton ? 'show' : 'hide') + ' button'}
        onPress={() => this.setState({noButton: !this.state.noButton})}
        style={style.button}
      />
    </NavigationSetting>);
  }

}
