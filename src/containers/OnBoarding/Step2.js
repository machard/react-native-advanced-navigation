import React, {Text, Component} from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';
import NavigationSetting from '../../navigation/NavigationSetting';

import {TabStackRoute, nextpagestep1, bindingexample, biglist} from '../../routes';

import style from './Step2.style';

import store from '../../store';

export default class OnBoardingStep2 extends Component {
  static contextTypes = {
    navigators: React.PropTypes.array.isRequired,
    menubar: React.PropTypes.object.isRequired,
    tabbar: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    var bar;

    if (store.get('menubar'))
      bar = this.context.menubar;
    else if (store.get('tabbar'))
      bar = this.context.tabbar;

    this.tabRoute = new TabStackRoute({
      initialStack: [
        {routes: [nextpagestep1], name:'Transitions'},
        {routes: [bindingexample], name:'Binding Example'},
        {routes: [biglist], name:'Big Growing List'}
      ],
      withBar: bar
    });
  }

  render() {
    return (<NavigationSetting
      navBar={false}
      style={style.container}
    >
      <Text style={style.intro}>
        This is the onboarding last step
      </Text>
      <Button
        label={"Ok !"}
        onPress={() => {
          _.last(this.context.navigators).push(this.tabRoute);
        }}
        style={style.button}
      />
    </NavigationSetting>);
  }

}
