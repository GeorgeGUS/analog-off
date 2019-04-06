import React from "react";
const logosPath = process.env.PUBLIC_URL + '/assets/logos/';

export default ({ id, pos, scale = 1 }) => {
  const [active, setActive] = React.useState(true);
  const isActive = active ? "on" : "off";
  const style = {
    '--scale': scale,
    backgroundImage: `url('${logosPath}${id}.png')`
  };
  return (
    <div className="channel" style={pos}>
      <div
        className={`channel__logo ${isActive} ${id}`}
        style={style}
        onClick={() => setActive(!active)}
      />
    </div>
  );
};
