function cleanData(data) {
    data = JSON.parse(data);
    salaryDat = data.values;
    salaryDat.splice(0, 1); //remove the first result, which specifies the header row.
    salaryDat = salaryDat.map(function(employee) {
        /** Employee object, also has property domRef which is assigned at render time */
        return {
            name: employee[1].split(",")[1] + " " + employee[1].split(",")[0],
            job: employee[2],
            dept: employee[3],
            current: employee[4]
        }
    });
    return salaryDat;
}

function loadData() {
    var apiKey = "AIzaSyCAsoi605bfwoyZOdTMIQ4_5MZ396HyFpw";
    var years = ["2012", "2013", "2014", "2015", "2016"];
    var urls = ["https://sheets.googleapis.com/v4/spreadsheets/1U_Mu3x0Zwa5NI8tPFMtWa9qUIXY_qD4m9qYfrsxyrOw/values/", "UA url", "https://sheets.googleapis.com/v4/spreadsheets/1j0ke-xDtLPnsY6wRSHNsuIFU7KWlpnDZbbFP9q_D2U8/values/"];
    var data = [];
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 5; j++){
            var newUrl = urls[i] + "'" + years[j] + "'" + "?key=" + apiKey;
            makeReq(i, j, newUrl, data);
        }
    }
    return data;
}

function makeReq(i, j, url, data){
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function() {
        if (this.status == 200 && this.readyState == 4) {
            data[(i*5)+j] = cleanData(req.responseText);
        } else { //TODO: errored promises do not contain a statustext. Look into why
            data[(i*5)+j] = {};
        }
        if (i == 2 && j == 4){
            console.log(data);
            renderList(data[14]);
        }
    }
    req.send();
}
