import React from "react";

export default ({ id, pos, scale = 1 }) => {
  const [active, setActive] = React.useState(true);
  const isActive = active ? "on" : "off";
  const style = {
    transform: `scale(${scale})`,
    backgroundImage: `url(./src/assets/logos/${id}.png)`
  };
  return (
    <div className="channel" style={pos}>
      <div
        className={`channel-logo ${isActive}`}
        style={style}
        onClick={() => setActive(!active)}
      />
    </div>
  );
};
