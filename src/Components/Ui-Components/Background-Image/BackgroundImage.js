import React from 'react';
import PropTypes from 'prop-types';
import classes from './BackgroundImage.module.scss';
export const BackgroundImage = props => {
  return (
    <>
      <img
        className={classes.background}
        style={props.cssStyles}
        src={props.url}
        alt={props.name}
      />
    </>
  );
};

BackgroundImage.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
