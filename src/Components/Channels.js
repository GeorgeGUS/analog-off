import React from "react";
import Channel from "./Channel";

export default class channels extends React.Component {
  static defaultProps = { radius: 25, center: 300, scale: 1 };

  getPositionStyles(n, i) {
    const { radius, scale, center: [x, y] } = this.props;
    const theta = (2 / n) * i * Math.PI;
    const r = radius * scale;
    const posx = Math.round(x + r * Math.sin(theta));
    const posy = Math.round(y - r * Math.cos(theta));
    return {
      position: "absolute",
      left: `${posx}px`,
      top: `${posy}px`,
    };
  }

  renderCircleOfChannels() {
    const { channels, city, scale } = this.props;
    const n = channels.length;
    return channels.map(({ id }, i) => {
      const pos = this.getPositionStyles(n, i);
      const props = { id, pos, scale };
      return <Channel key={`${city}_${id}`} {...props} />;
    });
  }

  render() {
    const id = this.props.city;
    return (
      <div key={id} className="channels">
        {this.renderCircleOfChannels()}
      </div>
    );
  }
}
