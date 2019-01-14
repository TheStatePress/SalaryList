import * as React from "react";
import {
  take,
  sort,
  prop,
  ascend,
  descend,
  toUpper,
  pipe,
  toString
} from "ramda";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";

import { Row } from "./App";
import TableRow from "./TableRow";
// import sortBy from "ramda/es/sortBy";

// table takes sortkey and sorts itself
type Props = {
  items: [Row];
};

type State = {
  sortKey: string;
  sortDirection: number;
};

const getCurrencyString = (n: number) => {
  return `$${n.toLocaleString()}`;
};

const getSortButton = (
  sortKey,
  currentSortKey,
  currentSortDirection,
  onClick
) => (
  <input
    type="button"
    onClick={() => onClick(sortKey)}
    value={`${sortKey}${
      sortKey == currentSortKey ? (currentSortDirection > 0 ? " ▲" : " ▼") : ""
    }`}
  />
);

class SalaryTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "firstName",
      sortDirection: 1
    };
    this._sortBy = this._sortBy.bind(this);
  }
  _sortBy(key: string) {
    const sortKey = key;
    let { sortDirection } = this.state;
    if (sortKey === this.state.sortKey) {
      sortDirection *= -1;
    }
    this.setState({
      sortKey,
      sortDirection
    });
  }
  _getSortedList(): Row[] {
    const { items } = this.props;
    const { sortKey, sortDirection } = this.state;
    const dir = sortDirection > 0 ? ascend : descend;
    return take(
      100,
      sort(
        dir(
          pipe(
            prop(sortKey),
            val => (typeof val == "number" ? val : toUpper(val))
          )
        ),
        items
      )
    );
  }
  render() {
    const { items } = this.props;
    const { sortKey, sortDirection } = this.state;
    const visible = items && items;
    return items ? (
      <div style={{ flex: "auto" }}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={visible.length}
              rowGetter={({ index }) => visible[index]}
            >
              <Column
                flexShrink={0}
                label="First Name"
                dataKey="firstName"
                width={100}
              />
              <Column
                flexShrink={0}
                label="Last Name"
                dataKey="lastName"
                width={100}
              />
              <Column
                flexGrow={1}
                label="Job Description"
                dataKey="jobDescription"
                width={300}
              />
              <Column
                flexShrink={0}
                label="Salary"
                dataKey="salary"
                width={100}
                cellDataGetter={({ dataKey, rowData }) =>
                  getCurrencyString(rowData[dataKey])
                }
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    ) : (
      "loading row data"
    );
    // return (
    //   <div className="sortable-table">
    //     <div>
    //       {getSortButton("firstName", sortKey, sortDirection, this._sortBy)}
    //       {getSortButton("lastName", sortKey, sortDirection, this._sortBy)}
    //       {getSortButton("salary", sortKey, sortDirection, this._sortBy)}
    //     </div>
    //     {items
    //       ? this._getSortedList().map(item => (
    //           <TableRow key={item.key} row={item} />
    //         ))
    //       : "loading"}
    //   </div>
    // );
  }
}

export default SalaryTable;
