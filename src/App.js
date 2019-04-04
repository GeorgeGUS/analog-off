import React, { Component } from 'react';
import { YMaps, Map, withYMaps } from 'react-yandex-maps';
import cities from './data';
import Area from './Components/Area';
import './App.css';
const ConnectedArea = withYMaps(Area, true, ['borders', 'util.bounds', 'util.requireCenterAndZoom']);

const mapState = {
  center: [58.19421684348514, 32.92976749999997],
  zoom: 8
};

class App extends Component {
  render() {
    return (
      <YMaps query={{ lang: 'ru_RU' }}>
        <Map defaultState={mapState} width='100vw' height='100vh'>
          <ConnectedArea />
        </Map>
      </YMaps>
    );
  }
}

export default App;
