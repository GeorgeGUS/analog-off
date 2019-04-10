import React, { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import AreaWithCities from './Components/AreaWithCities';
import cities from './data';
class App extends Component {
  state = {
    center: [58.19421684348514, 32.92976749999997],
    zoom: 8
  }

  handleRef = (ref) => {
    ref.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom']);
  }

  render() {
    return (
      <YMaps>
        <h1 className="title">
          Объекты аналогового вещания Новгородского ОРТПЦ
        </h1>
        <Map state={this.state}
          options={{ avoidFractionalZoom: false }}
          instanceRef={this.handleRef}
          width='100vw' height='100vh'>
          <AreaWithCities cities={cities} />
        </Map>
      </YMaps>
    );
  }
}

export default App;
