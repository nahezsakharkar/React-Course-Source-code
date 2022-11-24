import { useState } from "react";

const withTooltip = (Component) => {
  return function WithTooltip(props) {
    const [toolTip, setToolTip] = useState(false);

    const mouseOver = () => {
      setToolTip(true);
    };

    const mouseOut = () => {
      setToolTip(false);
    };

    return (
      <div onMouseOver={mouseOver} onMouseOut={mouseOut}>
        <Component {...props} toolTip={toolTip} />
      </div>
    );
  };
};

export default withTooltip;
