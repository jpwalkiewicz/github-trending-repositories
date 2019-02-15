
import React from 'react';
import PropTypes from 'prop-types';

export default function DataTable(props) {

  const {name, language, author, languageColor} = props.item;
  const bcgColor = {backgroundColor: languageColor};

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td style={bcgColor}>{language ? language : '----'}</td>
      <td>{name}</td>
      <td>{author}</td>
    </tr>
    )
  }

DataTable.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired, 
};

