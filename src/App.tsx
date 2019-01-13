import * as React from "react";
import axios from "axios";
import { map, reduce, addIndex, assoc, prop, filter, includes } from "ramda";
import { createSelector } from "reselect";

import Table from "./Table";

const YEARS = ["2012", "2013", "2014", "2015", "2016", "2017", "2018"];
const YEAR_TEMPLATE = year =>
  // `https://thestatepress.github.io/SalaryList/ASU-${year}.json`;
  `http://localhost:8080/ASU-${year}.json`;

// const getYears = prop('years');
// const getYear = createSelector(
//   (_, year) => year,
//   getYears,
//   prop
// );
// const getSelectedYear = createSelector(
//   (state) => state,
//   (_, selectedYear) => selectedYear,
//   getYear
// );
// const getFilterString = prop('filterString');
// const getFilteredYear = createSelector(
//   getSelectedYear,
//   getFilterString,
//   (filterString, year) => filter(includes(filterString), year)
// );

const getFilteredYear = state => {
  const { years, selectedYear } = state;
  if (!years) {
    return null;
  }
  const year = years[`ASU_${selectedYear}`];
  const filterString = state.filterString.toLowerCase();
  return filter(row => includes(filterString, row.fullName.toLowerCase()), year);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: "2018",
      filterString: "",
      years: null
    };
    this._getData = this._getData.bind(this);
    this._getYear = this._getYear.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }
  async _getYear(year) {
    const { data } = await axios.get(YEAR_TEMPLATE(year));
    return data;
  }
  async _getData() {
  //   const yearList = await Promise.all(map(this._getYear, YEARS));
  //   const yearMap = addIndex(reduce)(
  //     (acc, elem, i) => {
  //       const newItem = assoc(`ASU_${YEARS[i]}`, elem.values, acc);
  //       debugger;
  //       return newItem;
  //     },
  //     {},
  //     yearList
  //   );
    // console.log(yearMap);
    // debugger;
    const yearMap = {
      "ASU_2018": await this._getYear(2018)
    }
    this.setState({
      years: yearMap
    });
  }
  _handleChange(event) {
    this.setState({ filterString: event.target.value });
  }

  componentDidMount() {
    this._getData();
  }
  render() {
    // const { years } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="search for someone"
          onChange={this._handleChange}
          value={this.state.filterString}
        />
        <Table items={getFilteredYear(this.state)} />
      </div>
    );
  }
}

export default App;
