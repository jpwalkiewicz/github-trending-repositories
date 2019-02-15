
import React from 'react';
import PropTypes from 'prop-types';

export default function DateOption(props) {

  return (
  <div>
    <input 
      type="radio" 
      name="dateRange" 
      value={props.value} 
      id={props.value} 
      onChange={(e) => props.dateRangeChange(e)}
      checked={props.dateRange === props.value ? 'checked' : ''}
    />
    <label htmlFor={props.value}>{props.value}</label><br/>
       
  </div> )
}

DateOption.propTypes = {
  onChange: PropTypes.func.isRequired,
  dateRange: PropTypes.any.isRequired, 
  value: PropTypes.string.isRequired,
};

