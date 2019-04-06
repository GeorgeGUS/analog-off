import React from "react";
import Channel from "./Channel";

export default class Channels extends React.Component {
  static defaultProps = { radius: 25, center: [0, 0], scale: 1 };

  state = { isActive: true }

  setFlagState = () => {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  }

  renderFlagIcon = () => {
    const { isActive } = this.state;
    const color = isActive ? '#6f0' : '#f30';
    return <svg className="city__flag" width="25" height="35" viewBox="0 0 250 350" onClick={this.setFlagState} xmlns="http://www.w3.org/2000/svg"><g stroke="#000"><path d="m42 327v-291" fill="none" strokeLinecap="round" strokeWidth="21" /><path d="m49 50c70 30 104 28 178 2-21 42-21 74 0 116-72 25-101 25-178 0z" fill={color} strokeLinejoin="round" strokeWidth="10" /></g></svg>;
  }

  getCirclePosition(n, i) {
    const { radius, scale } = this.props;
    const theta = (2 / n) * i * Math.PI;
    const r = radius * scale;
    const posx = Math.round(r * Math.sin(theta));
    const posy = Math.round(-r * Math.cos(theta));
    return {
      position: "absolute",
      left: `${posx}px`,
      top: `${posy}px`,
    };
  }

  renderChannels() {
    const { channels, city } = this.props;
    return channels.map(({ id }) => (
      <Channel key={`${city}_${id}`} id={id} />
    ));
  }

  render() {
    const { city, scale, center: [x, y] } = this.props;
    const pos = {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
    }
    const zoom = {
      transform: `scale(${scale})`,
      transformOrigin: 'top center'
    }
    return (
      <div key={city} className="city" style={pos}>
        {this.renderFlagIcon()}
        <b className="city__title">{city}</b>
        <div className="channels" style={zoom}>
          {this.renderChannels()}
        </div>
      </div>
    );
  }
}
