import React, {Component} from 'react-native';

import Progress from './Progress';

import _ from 'lodash';

function shallowEqual(objA, objB) {
  if (objA === objB)
    return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null)
    return false;

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length)
    return false;

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++)
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]])
      return false;

  return true;
}

export default class BarProxy extends Component {
  static propTypes = {
    bar: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object
  };

  static contextTypes = {
    currentRoutes: React.PropTypes.array,
    navigators: React.PropTypes.array
  };

  componentWillMount() {

    this.focusListeners = (this.context.navigators || []).map((navigator, i) =>
      navigator.navigationContext.addListener('willfocus', (e) => {
        this.nextRoutes[i] = e.target.currentRoute;

        this.setNavProps(this.props);
      })
    );

    this.props.navigator.navigationContext.
      addListener('willfocus', (e) => {
        this.nextRoute = e.target.currentRoute;
        this.setNavProps(this.props);
      });


  }

  componentDidMount() {
    this.mount();
    // to wait for navigator.nextRoute to be set
    setImmediate(() => {
      if ((this.context.navigators || []).length < this.props.bar.level)
        return;

      this.nextRoutes = (this.context.navigators || []).map(navigator =>
        navigator.nextRoute
      );

      this.nextRoute = this.props.navigator.nextRoute;

      this.setNavProps(this.props);
    });
  }

  componentWillReceiveProps(props) {
    if (shallowEqual(this.props, props))
      return;

    this.setNavProps(props);
  }

  componentWillUnmount() {
    _.each(this.focusListeners, listener => listener.remove());
  }

  immediatelyRefresh() {}

  mount() {
    if (this.mounted)
      return;
    this.props.bar.mount((this.context.navigators || []).length);
    this.mounted = true;
  }

  unmount() {
    if (!this.mounted)
      return;
    this.props.bar.unmount();
    this.mounted = false;
  }

  setNavProps(props, i) {

    var eligible = _.every(this.context.currentRoutes, (route, i) => {
      return route === this.nextRoutes[i];
    });

    if (!eligible)
      return this.unmount();
    else
      this.mount();

    this.props.bar.setProps(props, this.nextRoute, this.props.navigator);
  }

  updateProgress(progress, fromIndex, toIndex) {
    Progress.emit('progress', progress, fromIndex, toIndex, this.props.navigator);
  }

  handleWillFocus(route) {
    this.props.bar.handleWillFocus(route);
  }

  render() {
    return null;
  }

}
