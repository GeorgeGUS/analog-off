import React from "react";
const logosPath = `${process.env.PUBLIC_URL}/assets/channels/svg/`;

export default ({ id, title, active }) => {
  // const isActive = active ? "on" : "off";
  const style = {
    backgroundImage: `url('${logosPath}${id}.svg')`
  };
  return (
    <div
      className={`channel ${id} ${active}`}
      style={style}
      aria-label={title}
    />
  );
};
