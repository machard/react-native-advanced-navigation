import React, {Component} from 'react-native';

import Navigator from '../navigation/Navigator';
import BarProxy from '../navigation/BarProxy';

import {onboardingstep1} from '../routes';

import style from './App.style';

export default class App extends Component {

  static contextTypes = {
    topbar: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    this.initialRoute = onboardingstep1;
  }

  render() {
    return (<Navigator
      backgroundStyle={style.container}
      initialRoute={this.initialRoute}
      navigationBar={<BarProxy bar={this.context.topbar} />}
      ref={(navigator) => this._nav = navigator && navigator.navigator()}
    />);
  }

}
