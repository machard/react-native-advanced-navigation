import React, {Component} from 'react-native';
import EventEmitter from 'EventEmitter';
import _ from 'lodash';

// the role is only to remove events listeners when a scene is removed
// from the navigator stack

export default class SceneWrapper extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    currentRoutes: React.PropTypes.array.isRequired,
    navigationChannels: React.PropTypes.array.isRequired,
    navigators: React.PropTypes.array.isRequired
  };

  static contextTypes = {
    onFocusRegistrations: React.PropTypes.array
  };

  static childContextTypes = {
    currentRoutes: React.PropTypes.array.isRequired,
    navigationChannels: React.PropTypes.array.isRequired,
    navigators: React.PropTypes.array.isRequired,
    onBlurRegistrations: React.PropTypes.array.isRequired,
    onFocusRegistrations: React.PropTypes.array.isRequired,
    onWillBlurRegistrations: React.PropTypes.array.isRequired,
    onWillFocusRegistrations: React.PropTypes.array.isRequired
  };

  getChildContext() {
    var _this = this;

    return {
      currentRoutes: this.props.currentRoutes,
      navigationChannels: this.props.navigationChannels,
      navigators: this.props.navigators,
      onFocusRegistrations: (this.context.onFocusRegistrations || []).concat([(handler) => {
        return _this.sceneEmitter.addListener('onFocus', handler);
      }]),
      onWillFocusRegistrations: (this.context.onWillFocusRegistrations || []).concat([(handler) => {
        return _this.sceneEmitter.addListener('onWillFocus', handler);
      }]),
      onBlurRegistrations: (this.context.onBlurRegistrations || []).concat([(handler) => {
        return _this.sceneEmitter.addListener('onBlur', handler);
      }]),
      onWillBlurRegistrations: (this.context.onWillBlurRegistrations || []).concat([(handler) => {
        return _this.sceneEmitter.addListener('onWillBlur', handler);
      }])
    };
  }

  sceneEmitter = new EventEmitter();
  state = {};

  // didfocus event here should be replaced
  // by a special customedidfocus
  // so that each navigator can have it's own way to determine something is focus.
  // for example waiting a side menu anim to be over or some like that..

  componentWillMount() {
    this.listeners = _.map(this.props.navigators, navigator =>
      navigator.navigationContext.addListener('didcustomfocus', () => this.onDidFocus())
    );

    this.listeners = this.listeners.concat(_.map(this.props.navigators, navigator =>
      navigator.navigationContext.addListener('willcustomfocus', () => this.onWillFocus())
    ));
  }

  componentWillUnmount() {
    _.each(this.listeners, listener => listener.remove());
  }

  _onFocus(onFocus, onBlur, checkProperty, stateVariable) {
    var isFocused = _.every(this.props.navigators, (navigator, i) =>
      navigator.nextRoute === this.props.currentRoutes[i] && !navigator[checkProperty]
    );

    if (isFocused && !this[stateVariable]) {
      this.sceneEmitter.emit(onFocus);
      this.isFocused = false;
      this[stateVariable] = true;
    } else if (!isFocused && this[stateVariable]) {
      this.sceneEmitter.emit(onBlur);
      this[stateVariable] = false;
    }
  }

  onDidFocus() {
    this._onFocus('onFocus', 'onBlur', 'isCurrentlyFocusing', 'isFocused');
  }

  onWillFocus() {
    this._onFocus('onWillFocus', 'onWillBlur', 'isCurrentlyWillFocusing', 'isWillFocus');
  }

  render() {
    return this.props.children;
  }
}
