
import React from 'react';
import PropTypes from 'prop-types';

export default function DataTable(props) {

  const {name, language, author, url, languageColor} = props.item;
  const bcgColor = {backgroundColor: languageColor};

  return (
    <tr className="row">
      <td className="td-no">{props.index + 1}</td>
      <td className="td-language">
        <span className="td-language-dot" style={bcgColor}/>
        {language ? language : '- - - -'}
        </td>
      <td className="td-name">{name}</td>
      <td className="td-author">{author}</td>
      <td className="td-link">
        <a href={url} target="_blank" rel="noopener noreferrer">
        <span role="img" aria-label="link">🔗</span>
        </a>
      </td>
    </tr>
    )
  }

DataTable.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired, 
};

