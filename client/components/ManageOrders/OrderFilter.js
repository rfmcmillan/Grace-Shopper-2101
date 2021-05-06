import React from 'react';

const OrderFilter = (props) => {
  const { status, filterByStatus } = props;
  const statusOptions = ['Created', 'Processing', 'Complete', 'Cancelled'];
  console;
  return (
    <div id="filter">
      <form>
        <select defaultValue="ALL" name="status" onChange={filterByStatus}>
          <option value="ALL">All</option>
          {statusOptions.map((statusOption, idx) => {
            return (
              <option key={idx} value={status}>
                {statusOption}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default OrderFilter;
