import React, {Text, ListView, View, Component, TouchableOpacity} from 'react-native';
import _ from 'lodash';

import NavigationSetting from '../../navigation/NavigationSetting';

import style from './List.style';

import store from '../../store';

import {BigListDetailRoute} from '../../routes';

var DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class List extends Component {

  static contextTypes = {
    menuActions: React.PropTypes.object.isRequired,
    navigators: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      ds: DS.cloneWithRows([0]),
      rows: 1,
      nb: 0,
      toggle: false
    };
  }

  componentWillUnmount() {
    this.stopGrow();
  }

  stopGrow() {
    clearInterval(this.growInterval);
    this.setState({toggle: false});
    delete this.growInterval;
  }

  toggleGrow() {
    if (this.growInterval)
      return this.stopGrow();

    this.setState({toggle: true});

    this.growInterval = setInterval(() => {
      var rows = this.state.rows < 100 ? this.state.rows + 1 : 1;
      this.setState({
        ds: this.state.ds.cloneWithRows(_.shuffle(_.range(0, rows))),
        rows: rows
      });
    }, 300);
  }

  renderRow(row) {
    return (<TouchableOpacity
      onPress={() => {
        _.last(this.context.navigators).push(new BigListDetailRoute({row}));
      }}
    >
      <View style={style.row}>
        <Text style={style.text}>Row number {row}</Text>
      </View>
    </TouchableOpacity>);
  }

  onFocus() {
    var NB_ITEMS_IN_SCREEN = 12;
    // workaround blank lines...
    if (this.refs.listView && this.state.ds.getRowCount() < NB_ITEMS_IN_SCREEN)
      this.setState({nb: this.state.nb + 1});
    else if (this.refs.listView) {
      let listViewScrollView = this.refs.listView.getScrollResponder();
      listViewScrollView.scrollTo(this.refs.listView.scrollProperties.offset - 1);
      listViewScrollView.scrollTo(this.refs.listView.scrollProperties.offset + 1);
    }

  }

  render() {
    var ns = {
      titleLabel: 'BigList',
      style: [style.container]
    };

    if (!this.state.noButton) {
      ns.rightAction = () => this.toggleGrow();
      ns.rightLabel = this.state.toggle ? 'Grow Off' : 'Grow On';
    }

    if (store.get('menubar')) {
      ns.leftAction = () => this.context.menuActions.open();
      ns.leftLabel = 'Menu';
    } else
      ns.style.push(style.bottomPadding);

    return (<NavigationSetting
      {...ns}
      onFocus={() => this.onFocus()}
      waitForFocus
    >
      <Text>{this.state.rows} rows. Notice how the rendering is suspended
      during the menu and page transition animations to keep it smooth</Text>
      <ListView
        dataSource={this.state.ds}
        initialListSize={10}
        key={this.state.nb}
        pageSize={10}
        ref="listView"
        removeClippedSubviews
        renderRow={(row) => this.renderRow(row)}
        style={style.innerContainer}
      />
    </NavigationSetting>);
  }

}
