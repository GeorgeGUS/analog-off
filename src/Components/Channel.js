import React from "react";

export default ({ src, scale = 1 }) => {
  const [active, setActive] = React.useState(true);
  const isOff = active ? "on" : "off";
  const style = {
    width: `${40 * scale}px`,
    height: `${30 * scale}px`,
    backgroundImage: `url(${src})`
  };
  return (
    <div
      className={`channel-logo ${isOff}`}
      style={style}
      onClick={() => setActive(!active)}
    />
  );
};
