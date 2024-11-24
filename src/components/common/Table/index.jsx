import "./table.css";
import React from "react";

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage funded</th>
          <th>Amount pledged</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item["s.no"]}>
            <td>{item["s.no"]}</td>
            <td>{item["percentage.funded"]}</td>
            <td>{item["amt.pledged"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
