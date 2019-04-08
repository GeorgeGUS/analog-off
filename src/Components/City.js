import React from "react";
import Channel from "./Channel";

export default class City extends React.Component {
  static defaultProps = { radius: 25, center: [0, 0], baseWidth: 1920 };

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

  render() {
    const { city, channels, baseWidth, center: [x, y] } = this.props;
    const scale = window.innerWidth / baseWidth;
    const pos = {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      transform: `translate(-50%, -50%) scale(${scale})`,
    }
    return (
      <div key={city} className="city" style={pos}>
        {this.renderFlagIcon()}
        <p className="city__title">{city}</p>
        <div className="channels">
          {channels.map((ch) => (
            <Channel key={`${city}_${ch.id}`} {...ch} />
          ))}
        </div>
      </div>
    );
  }
}
