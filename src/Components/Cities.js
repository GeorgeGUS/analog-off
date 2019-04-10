import React, { Component } from 'react'
import City from './City'

export default class Cities extends Component {
  render() {
    const { cities, map, zoom, scale } = this.props;
    return cities.map(({ city, channels, lat, len }) => {
      const projection = map.options.get('projection');
      const globalCoords = projection.toGlobalPixels([lat, len], zoom);
      const center = map.converter.globalToPage(globalCoords);
      const props = { city, channels, center, scale };
      return <City key={city} {...props} />;
    });
  }
}
