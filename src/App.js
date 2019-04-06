import React, { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import Area from './Components/Area';
import Pins from './Components/Pins'
import pins from './data';
import './App.css';

class App extends Component {
  state = {
    center: [58.19421684348514, 32.92976749999997],
    zoom: 8
  }

  updateZoom = (zoom) => {
    this.setState({ zoom });
  }

  handleRef = (ref) => {
    ref.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom']);
  }

  render() {
    const { zoom } = this.state;
    return (
      <YMaps>
        <Map state={this.state}
          options={{ avoidFractionalZoom: false }}
          instanceRef={this.handleRef}
          width='100vw' height='100vh'>
          <Area updateZoom={this.updateZoom} />
          <Pins pins={pins} zoom={zoom} />
        </Map>
      </YMaps>
    );
  }
}

export default App;
