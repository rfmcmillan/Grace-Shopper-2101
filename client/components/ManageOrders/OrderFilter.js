import React from 'react';

const OrderFilter = (props) => {
  const { status, filterByStatus, reset } = props;
  const statusOptions = ['Created', 'Processing', 'Complete', 'Cancelled'];

  return (
    <div id="filter">
      <form onSubmit={reset}>
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
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default OrderFilter;
