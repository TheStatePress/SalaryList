import * as React from "react";
import { take } from 'ramda';
import { Row } from './App';

// table takes sortkey and sorts itself
type Props = {
  items: [Row]
}

class Table extends React.Component<Props, any> {
  render() {
    const { items } = this.props;
    const visible = items && take(100, items);
    return (
      <div>{items ? visible.map(item => <div key={item.key}>{item.firstName} {item.lastName}</div>) : "loading"}</div>
      // <div>{items ? items.length : 'loading'}</div>
    );
  }
}

export default Table;
