import * as React from "react";
import { prepend, join } from "ramda";

import { Row } from "./App";

type Props = {
  row: Row;
};

const getCurrencyString = (n: number) => {
  return `$${n.toLocaleString()}`;
};

const TableRow = ({ row }: Props) => (
  <div className="table-row">
    <span>
      {row.firstName} {row.lastName} |{" "}
    </span>
    <span>{row.jobDescription} | </span>
    <span>{row.departmentDescription} | </span>
    <span>{getCurrencyString(row.salary)}</span>
  </div>
);

export default TableRow;
