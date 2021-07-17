import React, { useState } from "react";
import { RangeSlider } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";

let timer;
function Slide(props) {
  const [value, setValue] = useState(props.value || [0, 20000]);
  const [min, max] = [0, 200000];

  return (
    <div style={{ position: "relative", marginTop: "10px" }}>
      <RangeSlider
        defaultValue={props.value || [0, 20000]}
        min={min}
        max={max}
        step={1000}
        onChange={(newValue) => {
          setValue(newValue);
          clearTimeout(timer);
          timer = setTimeout(() => {
            props.onChange(newValue);
          }, 200);
        }}
      />
      <span
        style={{
          fontSize: "10px",
          position: "absolute",
          bottom: "150%",
          left: "0",
        }}
      >
        INR {min}
      </span>
      <span
        style={{
          fontSize: "12px",
          position: "absolute",
          bottom: "150%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {value[0] / 1000}K - {value[1] / 1000}K
      </span>
      <span
        style={{
          fontSize: "10px",
          position: "absolute",
          bottom: "150%",
          right: "0",
        }}
      >
        INR {max}
      </span>
    </div>
  );
}

export default Slide;
