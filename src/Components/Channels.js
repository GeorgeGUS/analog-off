import React from "react";
import Channel from "./Channel";

export default class channels extends React.Component {
  static defaultProps = { radius: 50, center: 300, scale: 1, urls: [] };

  getPositionStyles(n, i) {
    const { radius, scale, center: [x, y] } = this.props;
    if (n < 1) return {};
    const theta = (2 / n) * i * Math.PI;
    const r = radius * scale;
    const posx = r * Math.sin(theta);
    const posy = r * Math.cos(theta);

    return {
      position: "absolute",
      top: `${y - posy}px`,
      left: `${x + posx}px`
    };
  }

  renderCircleOfChannels() {
    const { channels, city, scale } = this.props;
    const n = channels.length;
    return channels.map(({ id }, i) => {
      const pos = this.getPositionStyles(n, i);
      return <Channel key={`${city}_${id}`} id={id} pos={pos} scale={scale} />;
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
