import React, { Component } from 'react'
import { ObjectManager, withYMaps } from 'react-yandex-maps'
import Channels from './Channels'
// import pinImage from '../assets/logos/ch_1.png'

class Pins extends Component {
  state = { channels: null, ref: null }

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

  handleRef = (ref) => {
    this.setState({ ref });
    const { zoom } = this.props;
    this.renderPinChannels(ref, zoom);
  }

  shouldComponentUpdate({ zoom }) {
    if (this.props.zoom !== zoom) {
      this.renderPinChannels(this.state.ref, zoom);
    }
    return true;
  }

  renderPinChannels = (ref, zoom) => {
    if (this._isMounted) {
      const { pins } = this.props;
      const map = ref.getMap();
      const channels = pins.map(pin => {
        const { city, channels, lat, len } = pin;
        const projection = map.options.get('projection');
        const center = map.converter.globalToPage(projection.toGlobalPixels([lat, len], zoom));
        const scale = zoom / 8;
        const props = { city, channels, center, scale };
        return <Channels key={city} {...props} />;
      });
      this.setState({ channels });
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
          instanceRef={this.handleRef}
        />
      </div>
    );
  }
}

export default withYMaps(Pins, true);
