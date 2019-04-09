import React, { Component } from 'react';
import { ObjectManager, withYMaps } from 'react-yandex-maps';

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feature: null,
      ref: null
    };
    this.NovOblIndex = 32;
  }

  handleRef = (ref) => {
    this.setState({ ref });
    this.setCenter(ref);
  }

  handleResize = () => {
    const { ref } = this.state;
    this.setCenter(ref);
  }

  setCenter = (ref) => {
    const map = ref.getMap();
    const { ymaps, updateZoom } = this.props;
    const { feature } = this.state;
    const areaCoords = feature.geometry.coordinates[0];
    const mapBounds = ymaps.util.bounds.fromPoints(areaCoords);
    ymaps.util
      .requireCenterAndZoom(
        map.getType(),
        mapBounds,
        map.container.getSize(),
        {
          margin: [80, 10, 10, 10],
          preciseZoom: true
        }
      )
      .then(result => {
        map.setCenter(result.center, result.zoom);
        updateZoom(result.zoom);
      });
  }

  createArea = (geojson) => {
    const feature = geojson.features[this.NovOblIndex];
    feature.id = feature.properties.iso3166;
    feature.options = {
      strokeWidth: 4,
      strokeColor: '#ff4500',
      strokeOpacity: 0.6,
      fillColor: '#ffd530',// ffd530
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
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { feature } = this.state;
    return feature && (
      <ObjectManager
        objects={{}} clusters={{}}
        features={feature}
        instanceRef={this.handleRef}
      />
    )
  }
}
export default withYMaps(Area, true, ['borders', 'util.bounds', 'util.requireCenterAndZoom']);

