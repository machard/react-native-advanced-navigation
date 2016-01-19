import React from 'react-native';
import App from './containers/App';
import Archi from './archi/Archi';

export default class Root extends React.Component {

  render() {
    return (
      <Archi>
        <App />
      </Archi>
    );
  }

};
