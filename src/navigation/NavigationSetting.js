import React, {View, Component, InteractionManager} from 'react-native';
import EventEmitter from 'EventEmitter';
import _ from 'lodash';

import StaticContainer from './StaticContainer';


// this is the component that is used by scenes to configure the navbar
// buttons and title
// it basically listen to properties changed
// and fire events in the navigationChannel.

var NSE = new EventEmitter();

const propTypes = {
  children: React.PropTypes.node,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onWillBlur: React.PropTypes.func,
  onWillFocus: React.PropTypes.func,
  updateOnWillFocus: React.PropTypes.bool,
  waitForFocus: React.PropTypes.bool,
  style: View.propTypes.style
};

export default class NavigationSetting extends Component {
  static propTypes = propTypes;

  static contextTypes = {
    navigationChannels: React.PropTypes.array.isRequired,
    onBlurRegistrations: React.PropTypes.array.isRequired,
    onFocusRegistrations: React.PropTypes.array.isRequired,
    onWillBlurRegistrations: React.PropTypes.array.isRequired,
    onWillFocusRegistrations: React.PropTypes.array.isRequired
  };

  static defaultProps = {
    onBlur: () => {},
    onFocus: () => {},
    onWillBlur: () => {},
    onWillFocus: () => {},
    updateOnWillFocus: false,
    waitForFocus: false
  };

  constructor(props) {
    super(props);

    this.state = {
      display: !props.waitForFocus
    };
  }

  componentWillMount() {
    this.NSEListener = NSE.addListener('stopUpdates', (stopUpdates) =>
      this.setState({stopUpdates})
    );

    this.listeners = [
      _.last(this.context.onFocusRegistrations)(() => {
        this.isFocused = true;
        this.setState({isFocused: true, display: true});
        this.props.onFocus();
      }),
      _.last(this.context.onWillFocusRegistrations)(() => {
        this.isFocused = false;
        this.props.onWillFocus();

        if (!this.props.updateOnWillFocus)
          return this.setState({isFocused: false});

        this.setState({isFocused: true});

        InteractionManager.runAfterInteractions(() => {
          requestAnimationFrame(() => {
            if (!this.mounted)
              return;

            this.setState({isFocused: this.isFocused});
          });
        });

      }),
      _.last(this.context.onBlurRegistrations)(() => {
        this.isFocused = false;
        this.setState({isFocused: false});
        this.props.onBlur();
      }),
      _.last(this.context.onWillBlurRegistrations)(() => {
        this.isFocused = false;
        this.setState({isFocused: false});
        this.props.onWillBlur();
      })
    ];

    this.channel = _.last(this.context.navigationChannels);

    this.updateNavigationChannel(this.props);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    this.updateNavigationChannel(nextProps);
  }

  componentWillUnmount() {
    this.mounted = false;
    _.each(this.listeners, l => l.remove());
    this.NSEListener.remove();
    this.channel.reset();
  }

  static stopUpdates(b) {
    NSE.emit('stopUpdates', b);
  };

  updateNavigationChannel(props) {
    _.each(props, (value, key) => {
      if (propTypes[key])
        return;
      this.channel.set(key, value);
    });

    _.each(this.props, (value, key) => {
      if (propTypes[key])
        return;
      if (_.isUndefined(props[key]))
        this.channel.set(key, undefined);
    });
  }

  render() {
    return (<StaticContainer shouldUpdate={this.state.isFocused && !this.state.stopUpdates}>
      <View style={this.props.style}>
        {this.state.display && this.props.children}
      </View>
    </StaticContainer>);
  }
}
