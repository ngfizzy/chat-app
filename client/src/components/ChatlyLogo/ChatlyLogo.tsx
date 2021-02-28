import React, { FC } from "react";

import "./ChatlyLogo.css";

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface Props {
  size?: Sizes
}

const sizes: Record<Sizes, string> = {
  xs: '.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem'
};

export const ChatlyLogo: FC<Props> = ({size}) =>  (
  <span 
    className=" font-weight-bold font-italic border NavBrand ChatlyLogo"
    style={{ fontSize: sizes && sizes[size || 'sm']}}
  >  
    Chatly
  </span>
);
