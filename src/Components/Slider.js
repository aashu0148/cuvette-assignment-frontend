import React from "react";
import { RangeSlider } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";

let timer;
function Slide(props) {
  return (
    <RangeSlider
      defaultValue={props.value || [0, 20000]}
      min={0}
      max={200000}
      step={1000}
      onChange={(newValue) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          props.onChange(newValue);
        }, 200);
      }}
    />
  );
}

export default Slide;
