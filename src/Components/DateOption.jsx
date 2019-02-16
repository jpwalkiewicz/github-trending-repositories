
import React from 'react';
import PropTypes from 'prop-types';

export default function DateOption(props) {

  return (
  <div className="input-wrapper">
    <input 
      type="radio" 
      name="dateRange" 
      value={props.value} 
      id={props.value} 
      onChange={props.onChange}
      checked={props.dateRange === props.value ? 'checked' : ''}
      className="date-select"
    />
    <label htmlFor={props.value} className="date-select-label">{props.value}</label>
  </div> )
}

DateOption.propTypes = {
  onChange: PropTypes.func.isRequired,
  dateRange: PropTypes.any.isRequired, 
  value: PropTypes.string.isRequired,
};

