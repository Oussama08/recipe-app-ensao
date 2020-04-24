import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.scss';

export default class Input extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    setFocus: PropTypes.bool.isRequired,
    onKeyPress: PropTypes.func,
    validationErrorMessage: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  componentDidMount() {
    if (this.props.setFocus) {
      this.inputElement.current.focus();
    }
  }
  render() {
    let inputClasses = classes['input'];
    if (this.props.validationErrorMessage) {
      inputClasses = [classes['input'], classes['validation']].join(' ');
    }
    return (
      <>
        <input
          ref={this.inputElement}
          type="text"
          title={this.props.title}
          style={this.props.style}
          className={inputClasses}
          placeholder={this.props.placeholder}
          onChange={this.props.handleOnChange}
          value={this.props.value}
          onKeyPress={this.props.onKeyPress && this.props.onKeyPress}
        />
      </>
    );
  }
}
