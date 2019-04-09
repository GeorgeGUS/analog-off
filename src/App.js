import React, { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import Area from './Components/Area';
import Cities from './Components/Cities'
import cities from './data';
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
        <h1 className="title">
          Объекты аналогового вещания Новгородского ОРТПЦ
        </h1>
        <Map state={this.state}
          options={{ avoidFractionalZoom: false }}
          instanceRef={this.handleRef}
          width='100vw' height='100vh'>
          <Area updateZoom={this.updateZoom} />
          <Cities cities={cities} zoom={zoom} />
        </Map>
      </YMaps>
    );
  }
}

export default App;
