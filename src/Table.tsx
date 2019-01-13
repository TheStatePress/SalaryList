import * as React from "react";
import { take, sort, prop, ascend, descend, toUpper, pipe } from "ramda";

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
      sortKey == currentSortKey ? (currentSortDirection > 0 ? " ^" : " v") : ""
    }`}
  />
);

class Table extends React.Component<Props, State> {
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
            toUpper
          )
        ),
        items
      )
    );
  }
  render() {
    const { items } = this.props;
    const { sortKey, sortDirection } = this.state;
    const visible = items && take(100, items);
    return (
      <div className="sortable-table">
        <div>
          {getSortButton("firstName", sortKey, sortDirection, this._sortBy)}
          {getSortButton("lastName", sortKey, sortDirection, this._sortBy)}
        </div>
        {this.state.sortDirection} {this.state.sortKey}
        {items
          ? this._getSortedList().map(item => (
              <TableRow key={item.key} row={item} />
            ))
          : "loading"}
      </div>
    );
  }
}

export default Table;
