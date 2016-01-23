import React, {Navigator} from 'react-native';

import NavigationChannel from './NavigationChannel';
import SceneWrapper from './SceneWrapper';

// this is the Route class
// every route passed to the Navigator should extends this.
// The goal of this class is to set up the communication channel between
// the rendered view and the navbar elements.
// it abstracts things and wrap elements in order to have a simple API
//
// because the main problem of the Navigator/NavigationBar API is that is does'nt allow
// to reactively set up nav bar components. And it doesn't allow navbar control from
// the scenes.

var ID = 0;

export default class Route {
  constructor(props) {
    this.navigationChannel = new NavigationChannel();
    this.props = props;

    this.id = ID;

    ID++;
  }

  getProps() {
    return this.props;
  }

  configureScene() {
    return this.SceneConfig || Navigator.SceneConfigs.PushFromRight;
  }

  scene() {
    return this._scene;
  }

  renderScene(opts) {
    return (<SceneWrapper {...opts} key={this.id}>
      <this.SceneComponent {...this.props} ref={(scene) => this._scene = scene} />
    </SceneWrapper>);
  }
}
