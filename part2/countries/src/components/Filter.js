import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
    return (
        <div>
            Find Countries <input value={filter} onChange={onFilterChange} />
        </div>
    )
}

export default Filter;