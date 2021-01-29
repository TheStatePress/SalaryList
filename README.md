# The State Press Salary Database

This repo contains a client for searching, sorting, and browsing the salaries of ASU employess, a set of scripts to format the data, and the data itself.

## Adding years  

To add another year of data, you'll need to complete these steps:

0. If the input file is an excel .xls or .xlsx, go into excel and save it as a CSV
1. Use the included script to convert the CSV to JSON
2. Tell the client that a new year exists by editing the YEARS array on App.tsx line  19
3. Compile the client
4. Push it to github

The converter script and the client compiler both require you to have [Node](https://nodejs.org/en/) installed on your computer. The scripts were written for Node 10, but newer version should work just fine.

You'll also need to be familiar with how to use your computer's command line shell. If you're on a mac, there's an app called `terminal`, if you're on a PC, it's called `cmd`.

The existing safeembed on the website should continue to work after you follow the steps above.

### Detailed step by step:

#### 0. Setup
- Install [Yarn 1](https://classic.yarnpkg.com)
- Run `yarn` in your command line to install our dependencies
#### 1. Convert CSV to JSON
1. Put the CSV file in the format specified by the comment at the top of `csv-to-json.js` into the `data-csv` folder and name it `2019.csv` (or whatever else)
2. Change the `YEAR` variable on line 18 of `csv-to-json.js`
3. Run `node csv-to-json.js` to generate a new JSON file
#### 2. Tell the client that a new year exists
1. Add the year to the `YEARS` array on line 19 of App.tsx
2. Change the default `selectedYear` on line 66 of App.tsx
#### 3. Compile the new code and push it to github
0. Run `yarn` to install our dependencies
1. Run `yarn start` to test your changes and make sure the new year appears in the list and works
2. Run `yarn build`, which will place some files in the dist folder.
3. Use git to push the changes to master. The website will run whatever code is in the `dist` folder on master.

## Developing the client

The client is written in Typescript with React 16. I tried to use the accepted best practices at the time I wrote it. You'll need [Yarn 1](https://classic.yarnpkg.com).

`yarn` will install its dependencies  
`yarn start` will start the development server  
`yarn build` will build the static files for deployment

## Embedding  

Place the following in any webpage (a `safeembed` in CEO at the time of writing, but future CMSes may be different)

```html
<iframe src="https://thestatepress.github.io/SalaryList/dist/index.html?embed=true" frameborder="0" width="100%" height="400"></iframe>
```

## Help me! (a note from Chuck)

If something breaks, please don't hesitate to email me. I'm the original author of this code and I'm always happy to help out my friends at The State Press.  
chuck@chuckdries.com
