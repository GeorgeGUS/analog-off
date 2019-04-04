import React, { Component } from 'react';
import { ObjectManager } from 'react-yandex-maps';

export default class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feature: null
    };
  }

  setCenter = (ref) => {
    const { ymaps } = this.props;
    const { feature } = this.state;
    const areaCoords = feature.geometry.coordinates[0];
    const mapBounds = ymaps.util.bounds.fromPoints(areaCoords);
    console.log('ref.geometry', ref)

    // // Находим оптимальный центр и уровень масштабирования карты.
    const map = ref.getMap();
    console.log('map.getType()', map.getType())
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
      .then(function (result) {
        // Устанавливаем карте оптимальный центр и зум.
        map.setCenter(result.center, result.zoom)
        console.log('map', map)
        console.log(result)

        // создаём событие для обновления зума и координат
        // const evt = new Event('updateZoom')
        // window.dispatchEvent(evt)
        console.log('Карта области загружена')
      })
  }

  setCenter2 = ref => {
    // console.log(ref)
    if (this._isMounted) {
      const { ymaps } = this.props;
      const { feature } = this.state;
      const map = ref.getMap();
      console.log('map', map)
      const areaCoords = feature.geometry.coordinates[0];
      const mapBounds = ymaps.util.bounds.fromPoints(areaCoords);
      // console.log('ref.geometry', ref.geometry.getBounds())
      console.log('map size', map.container.getSize())
      console.log('mapBounds', mapBounds)
      const result = ymaps.util.bounds.getCenterAndZoom(
        mapBounds,
        // ref.geometry.getBounds(),
        map.container.getSize()
      );

      // Setting the optimal center and zoom level of the map.
      map.setCenter(result.center, result.zoom);
    }
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
    console.log('componentDidMount');
    this.props.ymaps.borders.load('RU', { quality: 2 })
      .then(geojson => this.createArea(geojson));
  }

  componentWillUnmount() {
    console.log('componentDidUnmount');

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
        instanceRef={ref => ref && this.setCenter(ref)}
      />
    )
  }
}
// instanceRef={ref => ref && this.setCenter(ref)}
