import React from "react";
import Channel from "./Components/Channel";

export default ({ urls }) => (
  <div className="channels__column">
    {urls.map(src => (
      <Channel key={src} src={src} scale={2} />
    ))}
  </div>
);
