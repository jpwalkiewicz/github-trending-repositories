
import React from 'react';
import PropTypes from 'prop-types';
import DataTabelRow from './DataTableRow';
import DotLoader from './DotLoader';


export default function DataTable(props) {

  const {data, isDataLoading} = props;

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr className="data-table-head">
            <th>
              No.
            </th>
            <th>
              Language
            </th>
            <th>
              Repository Name
            </th>
            <th>
              Author
            </th>
            <th>
              Link
            </th>
          </tr>
        </thead>
        <tbody className="data-table-body">
        {!isDataLoading 
          && data.length !== 0
          && data.map((el, index) => <DataTabelRow 
            key={`${el.name} ${el.description}`} 
            item={el} 
            index={index}
            />)
          }
          {isDataLoading && <tr className="row">
              <th colSpan="5"> 
               <DotLoader />
              </th>
          </tr>}
            {data.length === 0
              && !isDataLoading
              && <tr className="row">
                <th colSpan="5"> 
                  <h2>
                      Sorry, no data available for this language or date range, try again later
                      </h2>
                  </th>
            </tr>}
        </tbody>
      </table>
    </div>)
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  isDataLoading: PropTypes.bool.isRequired, 
};

