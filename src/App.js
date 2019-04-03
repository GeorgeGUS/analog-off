import React, { Component } from 'react';
import { YMaps, Map, Placemark, ObjectManager, Polygon, withYMaps } from 'react-yandex-maps';
import cities, { feature } from './data';
import Area from './Components/Area';
import LengthPrinter from './Components/LengthPrinter';
import './App.css';
// 'borders', 'util'
const ConnectedArea = withYMaps(Area, true, ['borders', 'util.bounds', 'util.requireCenterAndZoom']);

const mapState = {
  center: [58.19421684348514, 32.92976749999997],
  zoom: 8
};

class App extends Component {
  render() {
    return (
      <YMaps query={{ apikey: '0b330c29-cd4f-4776-8638-e6036aadca55', lang: 'ru_RU' }}>
        <Map defaultState={mapState} width='100vw' height='100vh'>
          <ConnectedArea />
          <Placemark defaultGeometry={mapState.center} />
        </Map>
      </YMaps>
    );
  }
}

export default App;
