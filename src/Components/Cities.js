import React, { Component } from 'react'
import { ObjectManager, withYMaps } from 'react-yandex-maps'
import City from './City'

class Cities extends Component {
  state = { objects: null, ref: null }

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
    this.renderCities(ref, zoom);
  }

  handleResize = () => {
    const { ref } = this.state;
    const { zoom } = this.props;
    this.renderCities(ref, zoom);
  }

  shouldComponentUpdate({ zoom }, { ref }) {
    if (this.props.zoom !== zoom) {
      this.renderCities(ref, zoom);
    }
    return true;
  }

  renderCities = (ref, zoom) => {
    if (this._isMounted) {
      const { cities } = this.props;
      const map = ref.getMap();
      const objects = cities.map(pin => {
        const { city, channels, lat, len } = pin;
        const projection = map.options.get('projection');
        const center = map.converter.globalToPage(projection.toGlobalPixels([lat, len], zoom));
        const props = { city, channels, center };
        return <City key={city} {...props} />;
      });
      this.setState({ objects });
    }
  }

  render() {
    const { objects } = this.state;
    return (
      <>
        <ObjectManager
          objects={{}}
          clusters={{}}
          instanceRef={this.handleRef}
        />
        {objects}
      </>
    );
  }
}

export default withYMaps(Cities, true);
