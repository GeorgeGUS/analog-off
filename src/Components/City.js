import React from "react";
import Channel from "./Channel";

const renderFlagIcon = (active) => {
  const color = active === 'on' ? '#6f0' : '#f30';
  return <svg className="city__flag" width="25" height="35" viewBox="0 0 250 350" xmlns="http://www.w3.org/2000/svg"><g stroke="#000"><path d="m42 327v-291" fill="none" strokeLinecap="round" strokeWidth="21" /><path d="m49 50c70 30 104 28 178 2-21 42-21 74 0 116-72 25-101 25-178 0z" fill={color} strokeLinejoin="round" strokeWidth="10" /></g></svg>;
}

const useStateWithLocalStorage = (localStorageKey, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

const switchState = {
  on: 'off',
  off: 'on'
}

export default ({ city, channels, scale, center: [x, y] }) => {
  const [active, setActive] = useStateWithLocalStorage(city, 'on');

  const onCityClick = () => setActive(switchState[active]);

  const pos = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    transform: `translate(-50%, -50%) scale(${scale})`,
  }

  return (
    <div key={city} className="city" style={pos} onClick={onCityClick}>
      {renderFlagIcon(active)}
      <p className="city__title">{city}</p>
      <div className="channels">
        {channels.map((ch) => (
          <Channel key={`${city}_${ch.id}`} {...ch} active={active} />
        ))}
      </div>
    </div>
  );
}
