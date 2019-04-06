import React, { Component } from 'react'
import { ObjectManager } from 'react-yandex-maps'
import Channels from './Channels'
// import pinImage from '../assets/logos/ch_1.png'

export default class Pins extends Component {
  state = { channels: null }
  getPinsObject() {
    const { pins } = this.props;
    const features = pins.map(pin => ({
      type: 'Feature',
      id: pin.city,
      geometry: {
        type: 'Point',
        coordinates: [pin.lat, pin.len]
      },
      options: {
        // iconLayout: 'default#image',
        // iconImageHref: pinImage,
      },
      properties: {
        hintContent: pin.city
      }
    }));

    return {
      type: 'FeatureCollection',
      features
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  renderPinChannels = (ref) => {
    const { pins } = this.props;
    console.log('pins ref', ref)
    const map = ref.getMap();
    const channels = pins.map(pin => {
      const { city, channels, lat, len } = pin;
      console.log(city)
      const projection = map.options.get('projection');
      const center = map.converter.globalToPage(projection.toGlobalPixels([lat, len], map.getZoom()));
      return <Channels key={city} city={city} channels={channels} center={center} scale={0.5} />;
    });
    if (this._isMounted) {
      this.setState({ channels })
    }
  }

  render() {
    const { channels } = this.state;
    return (
      <div>
        {channels}
        <ObjectManager
          objects={{
            preset: 'islands#circleDotIcon',
            iconColor: '#3c3'
          }}
          clusters={{}}
          features={this.getPinsObject()}
          instanceRef={this.renderPinChannels}
        />
      </div>
    );
  }
}
