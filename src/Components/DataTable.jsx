
import React from 'react';
import PropTypes from 'prop-types';
import DataTabelRow from './DataTableRow'

export default function DataTable(props) {

  const {data, isDataLoading} = props;

  return (<div>
  {data.length === 0
    && !isDataLoading
    && <h2>Sorry, no data available for this language or date range, try again later</h2>}
  <table>
    <thead>
      <tr>
        <th>
          No.
        </th>
        <th>
          Language
        </th>
        <th>
          Repo Name
        </th>
        <th>
          Author
        </th>
      </tr>
    </thead>
    <tbody>
    {!isDataLoading 
      && data.length !== 0
      && data.map((el, index) => <DataTabelRow 
        key={`${el.name} ${el.description}`} 
        item={el} 
        index={index}
        />)
      }
      {isDataLoading && <tr><th colSpan="4">LOADNIG</th></tr>}
    </tbody>
  </table>
</div>)
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  isDataLoading: PropTypes.bool.isRequired, 
};

