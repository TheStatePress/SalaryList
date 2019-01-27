# The State Press Salary Database

This repo contains a client for searching, sorting, and browsing the salaries of ASU employess, a set of scripts to format the data, and the data itself.

## Adding years  

To add another year of data, you'll need to complete three steps:

0. If the input file is an excel .xls or .xlsx, go into excel and save it as a CSV
1. Use the included script to convert the CSV to JSON
2. Tell the client that a new year exists
3. Compile the client
4. Push it to github

The converter script and the client compiler both require you to have [Node](https://nodejs.org/en/) installed on your computer. The scripts were written for Node 10, but newer version should work just fine.

You'll also need to be familiar with how to use your computer's command line shell. If you're on a mac, there's an app called `terminal`, if you're on a PC, it's called `cmd`.

The existing safeembed on the website should continue to work after you follow the steps above.

### 1. Convert CSV to JSON
### 2. Tell the client that a new year exists

## Developing the client

The client is written in Javascript with React 16. I tried to use the accepted best practices at the time I wrote it. You'll need [Yarn](https://yarnpkg.com).

`yarn` will install its dependencies
`yarn start` will start the development server  
`yarn build` will build the static files for deployment

## Embedding  

```html
<iframe src="http://218d62f6.ngrok.io?embed=true" frameborder="0" width="100%" height="400"></iframe>
```

## Help me! (a note from Chuck)

If something breaks, please don't hesitate to email me. I'm the original author of this code and I'm always happy to help out my friends at The State Press.  
chuck@chuckdries.com