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
import { AutoSizer, Column, Table, SortDirectionType } from "react-virtualized";
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
  sortDirection: SortDirectionType;
};

const getCurrencyString = (n: number) => {
  return `$${n.toLocaleString()}`;
};

// const getSortButton = (
//   sortKey,
//   currentSortKey,
//   currentSortDirection,
//   onClick
// ) => (
//   <input
//     type="button"
//     onClick={() => onClick(sortKey)}
//     value={`${sortKey}${
//       sortKey == currentSortKey ? (currentSortDirection > 0 ? " ▲" : " ▼") : ""
//     }`}
//   />
// );

class SalaryTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "firstName",
      sortDirection: "ASC"
    };
    this._sortBy = this._sortBy.bind(this);
    this._headerRenderer = this._headerRenderer.bind(this);
  }
  _headerRenderer({ dataKey, label, sortBy, sortDirection }) {
    return (
      <input
        type="button"
        onClick={() => this._sortBy(dataKey)}
        value={`${label}${
          dataKey == sortBy ? (sortDirection === 'ASC' ? " ▲" : " ▼") : ""
        }`}
      />
    );
  }
  _sortBy(key: string) {
    const sortKey = key;
    let { sortDirection } = this.state;
    if (sortKey === this.state.sortKey) {
      sortDirection = sortDirection === "ASC" ? "DESC" : "ASC";
    }
    this.setState({
      sortKey,
      sortDirection
    });
  }
  _getSortedList(): Row[] {
    const { items } = this.props;
    const { sortKey, sortDirection } = this.state;
    const dir = sortDirection === "ASC" ? ascend : descend;
    console.log(sortDirection, dir);
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
    console.log(sortDirection, sortKey);
    const visible = items;
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
              sortBy={sortKey}
              sortDirection={sortDirection}
            >
              <Column
                flexShrink={0}
                headerRenderer={this._headerRenderer}
                label="First Name"
                dataKey="firstName"
                width={150}
              />
              <Column
                flexShrink={0}
                headerRenderer={this._headerRenderer}
                label="Last Name"
                dataKey="lastName"
                width={100}
              />
              <Column
                flexGrow={1}
                headerRenderer={this._headerRenderer}
                label="Job Description"
                dataKey="jobDescription"
                width={300}
              />
              <Column
                flexShrink={0}
                headerRenderer={this._headerRenderer}
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
