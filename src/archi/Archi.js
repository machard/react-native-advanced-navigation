import React, {StatusBarIOS, View, Component, Navigator} from 'react-native';

import SideMenu from './SideMenu';
import TopNavigationBar from './TopNavigationBar';
import MenuBar from './MenuBar';
import TabBar from './TabBar';
import TopNavigationButton from './TopNavigationButton';
import TopNavigationTitle from './TopNavigationTitle';

import NavigationSetting from '../navigation/NavigationSetting';
import ChannelResponder from '../navigation/ChannelResponder';
import BarProxyReceiver from '../navigation/BarProxyReceiver';

const NAVBAR_HEIGHT = Navigator.NavigationBar.Styles.General.TotalNavHeight;

import style from './Archi.style';

export default class Archi extends Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  static childContextTypes = {
    menubar: React.PropTypes.object,
    tabbar: React.PropTypes.object,
    topbar: React.PropTypes.object
  };

  state = {};

  getChildContext() {
    return {
      menubar: this.state.menubar,
      tabbar: this.state.tabbar,
      topbar: this.state.topbar
    };
  }

  componentDidMount() {
    if (StatusBarIOS) StatusBarIOS.setStyle('default', false);
  }

  render() {
    return (<SideMenu
      disableGestures={!this.state.enableMenuGestures}
      menu={<BarProxyReceiver
        id="menubar"
        onMounted={() => {
          this.setState({enableMenuGestures: true});
        }}
        onUnmounted={() => this.setState({enableMenuGestures: false})}
        ref={(menubar) => {
          if (!this.state.menubar)
            this.setState({menubar});
        }}
        style={style.menuContainer}
        transitionValues={(progress) => ({
          opacity: (this.state.enableMenuGestures && progress === 1) ? 1 : 0
        })}
      >
        <MenuBar />
      </BarProxyReceiver>}
      onChange={() => NavigationSetting.stopUpdates(true)}
      onChangeEnd={() => NavigationSetting.stopUpdates(false)}
      ref="menu"
      touchToClose
    >
      <View style={style.container}>
        {this.state.menubar && this.state.topbar && this.state.tabbar && this.props.children}
        <BarProxyReceiver
          id="tabbar"
          ref={(tabbar) => {
            if (!this.state.tabbar)
              this.setState({tabbar});
          }}
          style={style.tabBar}
          transitionValues={(progress) => ({
            bottom: -NAVBAR_HEIGHT * (1 - progress)
          })}
        >
          <TabBar />
        </BarProxyReceiver>
        <BarProxyReceiver
          id="topbar"
          ref={(topbar) => {
            if (!this.state.topbar)
              this.setState({topbar});
          }}
          style={style.navBar}
          transitionValues={(progress) => ({
            top: -NAVBAR_HEIGHT * (1 - progress)
          })}
        >
          <TopNavigationBar
            routeMapper={{
              Title: (route, navigator) => (<ChannelResponder
                  properties={{
                    titleLabel: 'label'
                  }}
                  route={route}
                >
                  <TopNavigationTitle />
                </ChannelResponder>),
              LeftButton: (route, navigator) => (<ChannelResponder
                  properties={{
                    leftLabel: 'label',
                    leftAction: 'action',
                    leftDisabled: 'disabled',
                    type: 'left'
                  }}
                  route={route}
                >
                  <TopNavigationButton />
                </ChannelResponder>),
              RightButton: (route, navigator) => (<ChannelResponder
                  properties={{
                    rightLabel: 'label',
                    rightAction: 'action',
                    rightDisabled: 'disabled',
                    type: 'right'
                  }}
                  route={route}
                >
                  <TopNavigationButton />
                </ChannelResponder>)
            }}
          />
        </BarProxyReceiver>
      </View>
    </SideMenu>);
  }

}
