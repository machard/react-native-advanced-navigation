import React, {Text, Component} from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';
import NavigationSetting from '../../navigation/NavigationSetting';

import {onboardingstep2, TabStackRoute, nextpagestep1, bindingexample, biglist, nextpagestepsimple} from '../../routes';

import style from './Step1.style';

import store from '../../store';

export default class OnBoardingStep1 extends Component {
  static contextTypes = {
    navigators: React.PropTypes.array.isRequired,
    menubar: React.PropTypes.object.isRequired
  };

  render() {
    return (<NavigationSetting
      navBar={false}
      style={style.container}
    >
      <Text style={style.intro}>
        You can choose different classic app
        architectures.
      </Text>
      <Text style={style.intro}>
        They all start with an onboarding.
      </Text>
      <Button
        label={"With side Menu"}
        onPress={() => {
          store.set('menubar', true);
          store.set('tabbar', false);
          _.last(this.context.navigators).push(onboardingstep2);
        }}
        style={style.button}
      />
      <Button
        label={"With Tab bar"}
        onPress={() => {
          store.set('tabbar', true);
          store.set('menubar', false);
          _.last(this.context.navigators).push(onboardingstep2);
        }}
        style={style.button}
      />
      <Text style={style.intro}>
        This is an example of how you can start directly INTO the app.
      </Text>
      <Button
        label={"Go Deep"}
        onPress={() => {
          store.set('menubar', true);
          store.set('tabbar', false);

          _.last(this.context.navigators).push(new TabStackRoute({
            initialStack: [
              {routes: [nextpagestep1, nextpagestepsimple], name:'Transitions'},
              {routes: [bindingexample], name:'Binding Example'},
              {routes: [biglist], name:'Big Growing List'}
            ],
            initialTab: 0,
            withBar: this.context.menubar
          }));
        }}
        style={style.button}
      />
    </NavigationSetting>);
  }

}
