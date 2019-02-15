
import React from 'react';
import PropTypes from 'prop-types';

export default function LanguageOptions(props) {
  
  const isListReady = Object.keys(props.languagesList).length > 0;

  return ( <select onChange={props.onChange} value={props.selectedLanguage}>
    <optgroup>
      <option value='' key="All">All</option>
    </optgroup>
    <optgroup label="Popular">
    {isListReady && props.languagesList.popular.map(lang => 
        <option value={lang.urlParam} key={lang.name}>{lang.name}</option>)}
    </optgroup>
    <optgroup label="Other">
    {isListReady && props.languagesList.all.map(lang => 
        <option value={lang.urlParam} key={lang.name}>{lang.name}</option>)}
    </optgroup>
  </select>)
}

LanguageOptions.propTypes = {
  onChange: PropTypes.any.isRequired,
  selectedLanguage: PropTypes.string.isRequired, 
  languagesList: PropTypes.any.isRequired,
};

