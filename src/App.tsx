import * as React from "react";
import axios from "axios";
import {
  map,
  assoc,
  prop,
  filter,
  includes,
  join,
  indexBy,
  values
} from "ramda";
import Select from "react-select";
import urljoin from "url-join";
import "./app.scss";

import SalaryTable from "./SalaryTable";

const YEARS = ["2012", "2013", "2014", "2015", "2016", "2017", "2018"];
const YEAR_TEMPLATE = year => urljoin(process.env.YEAR_URL, `ASU-${year}.json`);

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

const theme = (theme) => ({
  ...theme,
  colors: {
  ...theme.colors,
    primary25: '#eedde0',
    primary: '#830920',
  },
})

const urlparams = new URLSearchParams(window.location.search);
const isEmbedded = urlparams.get("embed");
const isFullscreen = urlparams.get("full");

class App extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: "2018",
      filterString: "",
      years: {}
    };
    this._getYear = this._getYear.bind(this);
    this._handleFilter = this._handleFilter.bind(this);
    this._handleYearSelect = this._handleYearSelect.bind(this);
    this._getFilteredYear = this._getFilteredYear.bind(this);
  }
  async _getYear(year) {
    console.log(YEAR_TEMPLATE(year));
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
          join(" ", [
            row.firstName,
            row.lastName,
            row.jobDescription
          ]).toLowerCase()
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
    this._getYear(2018);
  }
  render() {
    const { selectedYear } = this.state;
    const options = getOptions(YEARS);
    return (
      <div
        style={{
          flex: "auto",
          display: "flex",
          flexDirection: "column"
        }}
      >
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
            theme={theme}
            value={options[selectedYear]}
          />
        </form>
        <SalaryTable items={this._getFilteredYear()} />
        <div
          style={{
            display: "flex",
            padding: "8px",
            justifyContent: "space-between"
          }}
        >
          <span
            style={{ fontSize: "10px", marginRight: "10px", display: "block" }}
          >
            Created for{" "}
            <a target="_blank" href="http://www.statepress.com/">
              The State Press
            </a>{" "}
            by{" "}
            <a target="_blank" href="https://github.com/James-Quigley">
              James Quigley
            </a>{" "}
            and{" "}
            <a target="_blank" href="https://github.com/chuckdries">
              Chuck Dries
            </a>
            . Original data acquired by Reilly Kneedler.
          </span>
          <span style={{ minWidth: "100px", display: "block" }}>
            {Boolean(isEmbedded) ? (
              <a
                href={urljoin(process.env.SALARYLIST_URL, "?full=true")}
                target="_blank"
              >
                view fullscreen
              </a>
            ) : (
              ""
            )}
            {Boolean(isFullscreen) ? (
              <a href="#" onClick={() => close()}>
                close fullscreen
              </a>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    );
  }
}

export default App;
