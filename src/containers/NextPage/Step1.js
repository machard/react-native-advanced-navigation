import React, {Text, Component} from 'react-native';
import _ from 'lodash';

import NavigationSetting from '../../navigation/NavigationSetting';
import Button from '../../components/Button';

import style from './Step1.style';

import store from '../../store';

import {biglist, BigListDetailRoute, nextpagestepsimple, nextpagestepsimplehidingtopbar, nextpagestepwithoutbottom, nextpagestepwithoutbottomhidingtopbar} from '../../routes';

export default class Step1 extends Component {

  static contextTypes = {
    menuActions: React.PropTypes.object.isRequired,
    navigators: React.PropTypes.array.isRequired,
    setTabs: React.PropTypes.array.isRequired,
    setTabStacks: React.PropTypes.array.isRequired
  };

  render() {
    var ns = {
      titleLabel: 'Bars/scenes transitions',
      style: [style.container]
    };

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
        This tab shows you scenes and bars animations during transitions
      </Text>
      <Button
        label="Back to start"
        onPress={() => _.first(this.context.navigators).popToTop()}
        style={style.button}
      />
      <Button
        label="Simple"
        onPress={() => _.last(this.context.navigators).push(nextpagestepsimple)}
        style={style.button}
      />
      <Button
        label="Hiding top bar"
        onPress={() => _.last(this.context.navigators).push(nextpagestepsimplehidingtopbar)}
        style={style.button}
      />

      <Button
        label="Go to BigList row #1"
        onPress={() => {
          _.last(this.context.setTabStacks)(2, [biglist, new BigListDetailRoute({row: 1})]);
          _.last(this.context.setTabs)(2);
        }}
        style={style.button}
      />

      {store.get('tabbar') && <Button
        label="Hiding bottom bar"
        onPress={() => _.last(this.context.navigators).push(nextpagestepwithoutbottom)}
        style={style.button}
      />}

      {store.get('tabbar') && <Button
        label="Hiding all bars"
        onPress={() => _.last(this.context.navigators).push(nextpagestepwithoutbottomhidingtopbar)}
        style={style.button}
      />}
    </NavigationSetting>);
  }

}
