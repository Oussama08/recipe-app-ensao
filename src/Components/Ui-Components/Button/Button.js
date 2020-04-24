import React from 'react';
import classes from './Button.module.scss';
export const Button = props => (
  <button className={classes[props.button__Type]} onClick={props.handleOnClick}>
    {props.children}
  </button>
);
