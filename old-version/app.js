var data = require('./ASU-2017.json').values;

var updated = [];

for (let row of data) {
	let x = row;

	let money = x[4].toLocaleString('en-US', {
		style: 'currency',
		currency: "USD"
	});
	x[0] = x[0] + "";
	x[4] = money.substring(0, money.length - 3);
	x[5] = x[5] + "";
	updated.push(x);
}

var fs = require('fs');
fs.writeFile('./parsed.json', JSON.stringify(updated), function (err) {
	if (err) {
		return console.log(err);
	}

	console.log('The file was saved!');
});