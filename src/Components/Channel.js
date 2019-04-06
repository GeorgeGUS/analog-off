import React from "react";
const logosPath = `${process.env.PUBLIC_URL}/assets/channels/svg/`;

export default ({ id, scale = 1 }) => {
  const [active, setActive] = React.useState(true);
  const isActive = active ? "on" : "off";
  const style = {
    backgroundImage: `url('${logosPath}${id}.svg')`
  };
  return (
    <div
        className={`channel ${isActive} ${id}`}
        style={style}
        onClick={() => setActive(!active)}
      />
  );
};
