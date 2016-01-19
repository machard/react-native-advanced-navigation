import React, {Animated, View, InteractionManager, Component} from 'react-native';
import _ from 'lodash';

import Progress from './Progress';

var operational = false;

export default class BarProxyReceiver extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    onMounted: React.PropTypes.func,
    onUnmounted: React.PropTypes.func,
    style: View.propTypes.style,
    transitionValues: React.PropTypes.func
  };

  static defaultProps = {
    onMounted() {},
    onUnmounted() {}
  };

  state = {
    key: 0,
    props: {}
  };

  componentWillMount() {
    this.pl = Progress.addListener('progress', (progress, fromIndex, toIndex, navigator) =>
     this.updateProgress(progress, fromIndex, toIndex, navigator)
    );
  }

  componentWillUnmount() {
    this.pl.remove();
  }

  mounted = 0;

  setProps(props, nextRoute, navigator) {
    if (!this.initTransition)
      this.curRoute = this.nextRoute;

    this.nextRoute = nextRoute;

    if (this.curRoute)
      this.initTransition = true;

    //console.log(this.props.id, 'nextRoute', nextRoute);

    var state = {
      props: {
        ...props,
        nextPresentedIndex: navigator.getCurrentRoutes().indexOf(nextRoute)
      }
    };

    if (!this.navigator !== navigator)
      state.key = this.state.key + 1;

    if (!this.state.style && this.props.transitionValues) {
      var progress;
      if (operational)
        // 0 car si 0 au final on veut du zero, et si on veut du 1 ce sera animé
        progress = 0;
      else if (!operational)
        // tel qu'on veut à la fin
        progress = this.navBarStatus(this.nextRoute) ? 1 : 0;

      state.style = _.mapValues(
        this.props.transitionValues(progress),
        (value) => new Animated.Value(value)
      );
    }

    state.display = !!this.props.transitionValues || this.navBarStatus(this.nextRoute);

    this.setState(state);

    requestAnimationFrame(() => {
      operational = true;
    });

    this.navigator = navigator;
  }

  navBarStatus(route) {
    return !!route && route.navigationChannel.get('navBar') !== false;
  }

  mount(level) {
    this.mounted = this.mounted + 1;
    this.level = level > (this.level || 0) ? level : this.level;
    this.props.onMounted();
  }

  unmount() {
    this.mounted = this.mounted - 1;
    if (!this.mounted) {
      this.curRoute = this.nextRoute;
      this.nextRoute = null;
      if (!this.props.transitionValues)
        this.forceUpdate();
      InteractionManager.runAfterInteractions(() => {
        this.props.onUnmounted();
        this.forceUpdate();
      });
    }
  }

  updateProgress(progress, fromIndex, toIndex, navigator) {
    this.initTransition = false;

    if (this.props.transitionValues && this.state.style)
      _.each(
        this.props.transitionValues(this.navBarStatus(this.nextRoute) ? progress : (1 - progress)),
        (value, key) => {
          if (this.state.style[key].__getValue() !== this.props.transitionValues(this.navBarStatus(this.nextRoute) ? 1 : 0)[key])
            this.state.style[key].setValue(value);
        }
      );

    if (this.navigator !== navigator)
      return;

    if (this.refs.bar && this.refs.bar.updateProgress)
      this.refs.bar.updateProgress(progress, fromIndex, toIndex);
  }

  handleWillFocus(route) {
    if (this.refs.bar && this.refs.bar.handleWillFocus)
      this.refs.bar.handleWillFocus(route);
  }

  render() {
    if (!this.mounted || !this.state.display)
      return null;

    var style = [this.props.style, this.state.style];

    return React.cloneElement(this.props.children,
      Object.assign(
        {...this.props},
        {...this.state.props},
        {
          ref: 'bar',
          key: this.state.key,
          style
        }));
  }

}
