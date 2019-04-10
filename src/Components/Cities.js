import React from 'react'
import City from './City'

export default ({ cities, map, zoom, scale }) => {
  return cities.map(({ city, channels, lat, len }) => {
    const projection = map.options.get('projection');
    const globalCoords = projection.toGlobalPixels([lat, len], zoom);
    const center = map.converter.globalToPage(globalCoords);
    const props = { city, channels, center, scale };
    return <City key={city} {...props} />;
  });
}
