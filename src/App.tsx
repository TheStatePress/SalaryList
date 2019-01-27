import * as React from "react";
import axios from "axios";
import {
  map,
  reduce,
  addIndex,
  assoc,
  prop,
  filter,
  includes,
  join,
  indexBy,
  values
} from "ramda";
import Select from "react-select";
import { createSelector } from "reselect";
import "./app.scss";

import SalaryTable from "./SalaryTable";

const YEARS = ["2012", "2013", "2014", "2015", "2016", "2017", "2018"];
const YEAR_TEMPLATE = year => `${process.env.YEAR_URL}ASU-${year}.json`;

export type Row = {
  firstName: string;
  lastName: string;
  jobDescription: string;
  departmentDescription: string;
  salary: number;
  key: string;
};

type State = {
  selectedYear: string;
  filterString: string;
  years: { [year: string]: [Row] };
};

const getOptions = (years: string[]) =>
  indexBy(
    prop("value"),
    map(
      option => ({
        value: option,
        label: option
      }),
      years
    )
  );

class App extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: "2018",
      filterString: "",
      years: {}
    };
    // this._getData = this._getData.bind(this);
    this._getYear = this._getYear.bind(this);
    this._handleFilter = this._handleFilter.bind(this);
    this._handleYearSelect = this._handleYearSelect.bind(this);
    this._getFilteredYear = this._getFilteredYear.bind(this);
  }
  async _getYear(year) {
    console.log(YEAR_TEMPLATE(year));
    console.log(process.env.YEAR_URL)
    const { data } = await axios.get(YEAR_TEMPLATE(year));
    this.setState({
      years: assoc(`ASU_${year}`, data, this.state.years)
    });
  }
  _getFilteredYear() {
    const { years, selectedYear } = this.state;
    const filterString = this.state.filterString.toLowerCase();
    const year = years[`ASU_${selectedYear}`];
    if (!year) {
      this._getYear(selectedYear);
      return null;
    }
    return filter(
      row =>
        includes(
          filterString,
          join(" ", [row.firstName, row.lastName, row.jobDescription]).toLowerCase()
        ),
      year
    ) as [Row];
  }
  _handleFilter(event: any) {
    this.setState({
      filterString: (event.target as any).value.toLowerCase()
    });
  }
  _handleYearSelect(option: { value: string }) {
    this.setState({
      selectedYear: option.value
    });
  }

  componentDidMount() {
    // this._getData();
    this._getYear(2018);
  }
  render() {
    const { selectedYear } = this.state;
    // const year = years[selectedYear];
    const options = getOptions(YEARS);
    return (
      <div style={{ flex: 'auto', display: 'flex', flexDirection: 'column' }}>
        <form className="flex p1">
          <input
            className="filter-input"
            type="text"
            placeholder="search for someone"
            onChange={this._handleFilter}
            value={this.state.filterString}
          />
          <Select
            className="select"
            isSearchable={false}
            onChange={this._handleYearSelect}
            options={values(options)}
            value={options[selectedYear]}
          />
        </form>
        <SalaryTable items={this._getFilteredYear()} />
      </div>
    );
  }
}

export default App;
