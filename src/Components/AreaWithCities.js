import React, { Component } from 'react';
import { ObjectManager, withYMaps } from 'react-yandex-maps';
import Cities from './Cities'

class AreaWithCities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: null,
      map: null,
      zoom: null,
      scale: null,
    };
    this.NovOblIndex = 32;
    this.baseHeight = 990; // area height on Full HD screen with margins
    this.scaleRate = 0.95;
    this.areaProps = {
      margin: [80, 10, 10, 10],
      preciseZoom: true
    };
  }

  handleRef = (ref) => {
    const map = ref.getMap();
    this.setState({ map });
    this.setCenter(map);
  }

  handleResize = () => {
    const { map } = this.state;
    if (map) {
      this.setCenter(map);
    }
  }

  initiateArea = async () => {
    const geojson = await this.props.ymaps.borders.load('RU', { quality: 2 })
    const area = await geojson.features[this.NovOblIndex];
    area.id = area.properties.iso3166;
    area.options = {
      strokeWidth: 4,
      strokeColor: '#ff4500',
      strokeOpacity: 0.6,
      fillColor: '#ffd530',
      fillOpacity: 0.4,
      openHintOnHover: false
    }
    const { ymaps } = this.props;
    this.setState({ area });
    const areaCoords = area.geometry.coordinates[0];
    this._areaBounds = ymaps.util.bounds.fromPoints(areaCoords);
  }

  setCenter = async (map) => {
    const { ymaps } = this.props;
    const { center, zoom } = await ymaps.util
      .requireCenterAndZoom(
        map.getType(),
        this._areaBounds,
        map.container.getSize(),
        this.areaProps
      )
    map.setCenter(center, zoom);
    const scale = this.getScale(this._areaBounds, zoom);
    this.setState({ zoom, scale });
  }

  getScale = (bounds, zoom) => {
    const { ymaps } = this.props;
    const pixelBounds = ymaps.util.bounds.toGlobalPixelBounds(bounds, zoom);
    const [, areaHeight] = ymaps.util.pixelBounds.getSize(pixelBounds);
    return (areaHeight / this.baseHeight * this.scaleRate).toFixed(3);
  }

  componentDidMount() {
    this.initiateArea();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  renderArea() {
    const { area } = this.state;
    return area && (
      <ObjectManager
        objects={{}} clusters={{}}
        features={area}
        instanceRef={this.handleRef}
      />
    )
  }

  renderCities() {
    const { cities } = this.props;
    const { map, zoom, scale } = this.state;
    const props = { cities, map, zoom, scale };
    return map && <Cities {...props} />;
  }

  render() {
    return (
      <>
        {this.renderArea()}
        {this.renderCities()}
      </>
    )
  }
}
export default withYMaps(AreaWithCities, true,
  ['borders', 'util.bounds', 'util.requireCenterAndZoom', 'util.pixelBounds']);
