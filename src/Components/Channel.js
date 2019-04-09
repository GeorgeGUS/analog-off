import React from "react";
const logosPath = `${process.env.PUBLIC_URL}/assets/channels/svg/`;

export default ({ id, title, active = true }) => {
  const isActive = active ? "on" : "off";
  const style = {
    backgroundImage: `url('${logosPath}${id}.svg')`
  };
  return (
    <div
      className={`channel ${id} ${isActive}`}
      style={style}
      aria-label={title}
    />
  );
};
