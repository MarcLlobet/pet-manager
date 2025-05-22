import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const Logo = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 49 49">
    <g fill={props.fill}>
      <path
        id="palm"
        d="M39,37c2,3,3,5,3,7c0,4-3,5-6,5c-2,0-3,0-5-1c0,0-2-2-6-1c-4,0-6,1-6,1c-3,1-4,1-5,1c-4,0-6-2-6-5c0-2,1-4,3-7c0,0,4-6,7-9c2-2,6-2,6-2h1v0c0,0,4,0,6,2C35,31,39,37,39,37z"
      />
      <path id="finger1" d="M10,31c3-1,3-6,1-10S5,14,2,15S-1,21,1,25C3,30,7,32,10,31z " />
      <path id="finger2" d="M17,21c4,0,7-5,7-10S21,0,17,0S10,5,10,10S13,21,17,21z" />
      <path id="finger3" d="M32,21c4,0,7-5,7-10S36,0,32,0s-7,5-7,10C25,16,28,21,32,21z " />
      <path id="finger4" d="M46,16c-3-1-7,1-8,5s-1,9,1,10c3,1,7-1,8-5S49,17,46,16z" />
    </g>
  </SvgIcon>
);
