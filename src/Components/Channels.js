import React from "react";
import Channel from "./Channel";

export default class channels extends React.Component {
  static defaultProps = { radius: 50, center: 300, scale: 1, urls: [] };

  getPositionStyles(n, i) {
    const { radius, center } = this.props;
    if (n < 1) return {};
    const theta = (2 / n) * i * Math.PI;
    const posx = Math.round(radius * Math.sin(theta));
    const posy = Math.round(radius * Math.cos(theta));

    return {
      position: "absolute",
      top: `${center - posy}px`,
      left: `${center + posx}px`
    };
  }

  renderCircleOfChannels() {
    const { channels, scale } = this.props;
    const n = channels.length;
    return channels.map((id, i) => {
      const pos = this.getPositionStyles(n, i);
      return <Channel key={id} id={id} pos={pos} scale={scale} />;
    });
  }

  render() {
    return (
      <div className="channels">
        {this.renderCircleOfChannels()}
      </div>
    );
  }
}
