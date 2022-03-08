/*******************
 * Author: Chuck Dries <chuck@chuckdries.com>
 *
 * The salary list client expects salary data to be JSON in a specific shape
 * that we defined. This script will convert a CSV to that specific JSON format.
 *
 * It expects the following columns, in this order, with exactly one header row.
 * The names of the columns are ignored, thus the requirement on ordering.
 *   - Calendar Year: number (ignored but must be present)
 *   - Full Name: string
 *   - Job Description: string
 *   - Department Description: string
 *   - Salary: number
 *   - FTE: number (ignored but must be present)
 */

// const parse = require('csv-parse');
const YEAR = "2021";
const INPUT_FILE = `./data-csv/${YEAR}.csv`;
const OUTPUT_FILE = `./data-json/ASU-${YEAR}.json`;

const parse = require("csv-parse/lib/sync");
const fs = require("fs");
const R = require("ramda");

const input = fs.readFileSync(INPUT_FILE);
const raw = parse(input);
const data = R.map(rowArray => {
  // EDIT THIS FUNCTION DOWN HERE
  const splitName = rowArray[1].split(',');
  const firstName = splitName[1].trim();
  const lastName = splitName[0];
  if (splitName.length !== 2) {
    console.log('Unusual name: this person\'s name may parse incorrectly', splitName)
    console.dir({
      firstName,
      lastName
    })
  }
  const row = {
    firstName,
    lastName,
    jobDescription: rowArray[2],
    departmentDescription: rowArray[3],
    salary: parseInt(rowArray[4]),
  };
  return {
    ...row,
    key: row.firstName + " " + row.lastName + row.jobDescription + row.departmentDescription
  };
  // STOP EDITING
}, raw.slice(1));

console.log('First 5 items:', data.slice(0, 5));
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data));
