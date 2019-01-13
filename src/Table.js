import React from "react";

// table takes sortkey and sorts itself

class Table extends React.Component {
  render() {
    const { items } = this.props;
    console.log(items)
    return (
      <div>{items ? items.map(item => <div key={item.key}>{item.fullName}</div>) : "loading"}</div>
    );
  }
}

export default Table;
