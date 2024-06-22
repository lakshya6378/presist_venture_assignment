// src/components/Pagination.js
import React from 'react';

const Pagination = ({page,onPageChange }) => {
  return (
    <div className="pagination">
     <button onClick={()=>onPageChange(page)}>next</button>
    </div>
  );
};

export default Pagination;
