var data = require('./ASU-2017.json').values;

var total = 0;
var department = {};
var role = {};

for (let row of data) {
    let salary = parseInt(row[4].split(',').join('').substring(1));
    total += salary;

    if (!department[row[3]]) {
        department[row[3]] = {
            total: 0,
            num: 0,
            avg: 0
        };
    }
    department[row[3]].num++;
    department[row[3]].total += salary;
    department[row[3]].avg = department[row[3]].total / department[row[3]].num;

    if (!role[row[2]]) {
        role[row[2]] = {
            total: 0,
            num: 0,
            avg: 0
        };
    }
    role[row[2]].num++;
    role[row[2]].total += salary;
    role[row[2]].avg = role[row[2]].total / role[row[2]].num;
}

// console.log("Total", total.toLocaleString('en-US', {
//     style: 'currency',
//     currency: "USD"
// }));

// console.log("Department", department);
// console.log("Role", role);

var fs = require('fs');


var departmentArr = [];
var roleArr = [];

for (let x in department) {
    let y = department[x];
    y.name = x;
    departmentArr.push(y);
}

departmentArr.sort((a, b) => {
    if (a.total == b.total) {
        return 0;
    }
    if (a.total > b.total) {
        return -1;
    }
    if (a.total < b.total) {
        return 1;
    }
});

for (let x in role) {
    let y = role[x];
    y.name = x;
    roleArr.push(y);
}

roleArr.sort((a, b) => {
    if (a.total == b.total) {
        return 0;
    }
    if (a.total > b.total) {
        return -1;
    }
    if (a.total < b.total) {
        return 1;
    }
});


var trends = {
    total,
    avg: total / data.length,
    department: departmentArr,
    role: roleArr
};
fs.writeFile('./trends.json', JSON.stringify(trends), function (err) {
    if (err) {
        return console.log(err);
    }

    console.log('The file was saved!');
});