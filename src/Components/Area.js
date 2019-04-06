import React, { Component } from 'react';
import { ObjectManager, withYMaps } from 'react-yandex-maps';

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feature: null
    };
  }

  setCenter = (ref) => {
    const { ymaps, updateZoom } = this.props;
    const { feature } = this.state;
    const areaCoords = feature.geometry.coordinates[0];
    const mapBounds = ymaps.util.bounds.fromPoints(areaCoords);
    const map = ref.getMap();
    ymaps.util
      .requireCenterAndZoom(
        map.getType(),
        mapBounds,
        map.container.getSize(),
        {
          margin: 5,
          preciseZoom: true
        }
      )
      .then(result => {
        map.setCenter(result.center, result.zoom);
        updateZoom(result.zoom);
      });
  }

  createArea = (geojson) => {
    const NOV_OBL_INDEX = 32;
    const feature = geojson.features[NOV_OBL_INDEX];

    feature.id = feature.properties.iso3166;
    feature.options = {
      strokeWidth: 4,
      strokeColor: '#ff4500',
      strokeOpacity: 0.6,
      fillColor: '#ffd530',
      fillOpacity: 0.4,
      openHintOnHover: false
    }

    if (this._isMounted) {
      this.setState({ feature });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.ymaps.borders.load('RU', { quality: 2 })
      .then(geojson => this.createArea(geojson));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { feature } = this.state;
    if (feature == null) {
      return <p>Loading area...</p>;
    }

    return (
      <ObjectManager
        objects={{}} clusters={{}}
        features={feature}
        instanceRef={this.setCenter}
      />
    )
  }
}
export default withYMaps(Area, true, ['borders', 'util.bounds', 'util.requireCenterAndZoom']);

