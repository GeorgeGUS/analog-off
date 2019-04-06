import React, { Component } from 'react';
import { YMaps, Map, withYMaps } from 'react-yandex-maps';
import Area from './Components/Area';
import Pins from './Components/Pins'
import pins from './data';
import './App.css';
const ConnectedArea = withYMaps(Area, true, ['borders', 'util.bounds', 'util.requireCenterAndZoom']);
const ConnectedPins = withYMaps(Pins, true);

const mapState = {
  center: [58.19421684348514, 32.92976749999997],
  zoom: 8
};

class App extends Component {
  render() {
    return (
      <YMaps>
        <Map state={mapState} width='100vw' height='100vh'>
          <ConnectedArea />
          <ConnectedPins pins={pins} />
        </Map>
      </YMaps>
    );
  }
}

export default App;
