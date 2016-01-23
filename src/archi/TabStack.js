import React, {Component} from 'react-native';
import EventEmitter from 'EventEmitter';
import _ from 'lodash';

import Navigator from '../navigation/Navigator';
import NavigationSetting from '../navigation/NavigationSetting';
import Route from '../navigation/Route';
import BarProxy from '../navigation/BarProxy';

import style from './TabStack.style';

class Tab extends Component {
  static propTypes = {
    ee: React.PropTypes.object.isRequired,
    stack: React.PropTypes.array.isRequired
  };

  static contextTypes = {
    topbar: React.PropTypes.object.isRequired,
    resetStacks: React.PropTypes.array,
    setNavBars: React.PropTypes.array
  };

  static childContextTypes = {
    resetStacks: React.PropTypes.array.isRequired,
    setNavBars: React.PropTypes.array.isRequired
  };

  state = {
    navbar: true
  };

  getChildContext() {
    return {
      setNavBars: (this.context.setNavBars || []).concat((navbar) => {
        this.setState({navbar});
      }),
      resetStacks: (this.context.resetStacks || []).concat((stack) => {
        this.resetStack(stack);
      })
    };
  }

  componentWillMount() {
    this.eeListener = this.props.ee.addListener('resetStack', (stack) => this.resetStack(stack));
  }

  componentWillUnmount() {
    this.eeListener.remove();
  }

  resetStack(stack) {
    this._nav.immediatelyResetRouteStack(stack);
  }

  render() {
    return (<NavigationSetting
      navBar={this.state.navbar}
      style={style.container}
    >
      <Navigator
        backgroundStyle={style.container}
        initialRoute={_.last(this.props.stack)}
        initialRouteStack={this.props.stack}
        navigationBar={<BarProxy bar={this.context.topbar} />}
        ref={(navigator) => this._nav = navigator && navigator.navigator()}
      />
    </NavigationSetting>);
  }
}

class TabRoute extends Route {
  constructor(props, name, ee) {
    super({...props, ee});

    this.name = name;
    this.ee = ee;
  }

  SceneComponent = Tab;

  SceneConfig = {
    ...Navigator.SceneConfigs.FadeAndroid,
    defaultTransitionVelocity: 10000,
    gestures: {}
  };

  tabName() {
    return this.name;
  }

  emit(event, data) {
    this.ee.emit(event, data);
  }
};

export default class TabStack extends Component {
  static propTypes = {
    extraActions: React.PropTypes.array,
    initialStack: React.PropTypes.array.isRequired,
    initialTab: React.PropTypes.object,
    onFocus: React.PropTypes.func,
    onWillFocus: React.PropTypes.func,
    withBar: React.PropTypes.object
  };

  static contextTypes = {
    setTabs: React.PropTypes.array,
    setTabStacks: React.PropTypes.array
  };

  static childContextTypes = {
    setTabs: React.PropTypes.array.isRequired,
    setTabStacks: React.PropTypes.array.isRequired
  };

  getChildContext() {
    return {
      setTabs: (this.context.setTabs || []).concat((tab) => {
        this.setTab(tab);
      }),
      setTabStacks: (this.context.setTabStacks || []).concat((tab, stack) => {
        this.setTabStack(tab, stack);
      })
    };
  }

  componentWillMount() {
    this.initialStack = [...this.props.initialStack];
    this.stack = _.map(this.initialStack, (route) => new TabRoute({
      stack: route.routes
    }, route.name, new EventEmitter()));
    this.initialTabIndex = this.getTabFromRoute(this.props.initialTab);
  }

  getTabFromRoute(route) {
    if (!route)
      return 0;

    return _.findIndex(this.initialStack, ({routes}) => routes[0] === route);
  }

  setTab(tabFirstRoute) {
    var tab = this.getTabFromRoute(tabFirstRoute);
    this._nav.jumpTo(this.stack[tab]);
  }

  setTabStack(stack) {
    var tab = this.getTabFromRoute(stack[0]);
    this.stack[tab].emit('resetStack', stack);
  }

  render() {
    return (
      <NavigationSetting
        onFocus={this.props.onFocus}
        onWillFocus={this.props.onWillFocus}
        style={style.container}
      >
        <Navigator
          backgroundStyle={style.container}
          initialRoute={this.stack[this.initialTabIndex]}
          initialRouteStack={this.stack}
          navigationBar={this.props.withBar && <BarProxy
            bar={this.props.withBar}
            extraActions={this.props.extraActions}
          />}
          ref={(navigator) => this._nav = navigator && navigator.navigator()}
        />
      </NavigationSetting>
    );
  }

}
