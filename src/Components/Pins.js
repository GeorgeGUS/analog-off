import React, { Component } from 'react'
import { ObjectManager, withYMaps } from 'react-yandex-maps'
import Channels from './Channels'

class Pins extends Component {
  static defaultProps = { pinScaleRatio: 8 }
  state = { channels: null, ref: null }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.handleResize);
  }

  handleRef = (ref) => {
    this.setState({ ref });
    const { zoom } = this.props;
    this.renderPinChannels(ref, zoom);
  }

  handleResize = () => {
    const { ref } = this.state;
    const { zoom } = this.props;
    this.renderPinChannels(ref, zoom);
  }

  shouldComponentUpdate({ zoom }, { ref }) {
    if (this.props.zoom !== zoom) {
      this.renderPinChannels(ref, zoom);
    }
    return true;
  }

  renderPinChannels = (ref, zoom) => {
    if (this._isMounted) {
      const { pins, pinScaleRatio } = this.props;
      const map = ref.getMap();
      const channels = pins.map(pin => {
        const { city, channels, lat, len } = pin;
        const projection = map.options.get('projection');
        const center = map.converter.globalToPage(projection.toGlobalPixels([lat, len], zoom));
        const scale = zoom / pinScaleRatio;
        const props = { city, channels, center, scale };
        return <Channels key={city} {...props} />;
      });
      this.setState({ channels });
    }
  }

  render() {
    const { channels } = this.state;
    return (
      <>
        <ObjectManager
          objects={{}}
          clusters={{}}
          instanceRef={this.handleRef}
        />
        {channels}
      </>
    );
  }
}

export default withYMaps(Pins, true);
