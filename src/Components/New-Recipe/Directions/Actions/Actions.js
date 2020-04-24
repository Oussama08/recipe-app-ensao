import React from 'react';
import PropTypes from 'prop-types';

import classes from './Actions.module.scss';
function Actions(props) {
  let saveDirectionsClasses = 'fas fa-save';
  if (props.validationErrorElements.saveDirections) {
    saveDirectionsClasses = ['fas fa-save', classes['save__validation']].join(
      ' '
    );
  }
  return (
    <>
      <div className={classes['actions']}>
        <button
          className={classes['new']}
          title="Next Direction!"
          onClick={props.newDirection}
        >
          <i className="fas fa-plus" />
        </button>
        <button
          title="Save Direction!"
          className={classes['save']}
          onClick={props.saveDirections}
        >
          <i className={saveDirectionsClasses} />
        </button>
      </div>
    </>
  );
}

Actions.propTypes = {
  newDirection: PropTypes.func.isRequired,
  saveDirections: PropTypes.func.isRequired,
  validationErrorElements: PropTypes.object.isRequired
};

export default Actions;
