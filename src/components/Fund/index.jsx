import React, { useMemo, useState } from "react";
import data from "../../data/frontend-assignment.json";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import "./fund.css";

let PageSize = 5;

const Fund = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="Fund_Wrapper">
      <Table data={currentTableData} />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Fund;
