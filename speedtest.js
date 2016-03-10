//Imports
var exec = require('child_process').exec;
var later = require('later');
var fs = require('fs');

//Parse Parameters
var resultsPath = 'results.csv';
var periodInMinutes = 15;

var args = process.argv.splice(process.execArgv.length + 2);
if(args) {
  if(args.count >= 1) {
    resultsPath = args[0];
  }

  if(args.count >= 2) {
    resultsPath = args[1];
  }

  if(args.count > 2) {
    console.log('Usage: node speedtest.js [Results Path] [Delay in minutes]');
    return;
  }
}

//Schedule Speedtests
var schedule = later.parse.text('every ' + periodInMinutes + ' minutes');
var timer = later.setInterval(runSpeedtest, schedule);

//Speedtest Runner
function runSpeedtest() {
    exec('node ' + __dirname + '/node_modules/speed-test/cli.js --json', function(error, stdout, stderr) {
        var json = JSON.parse(stdout);
        var date = new Date();
        var dateString = date.toISOString();
        var timestamp = Math.floor(date.getTime() / 1000);

        var csvLine = dateString + ',' + timestamp + ',' + json.ping + ',' + json.download + ',' + json.upload;
        console.log(csvLine);

        //Append result to file
        fs.appendFile(
          resultsPath,
          csvLine + "\n",
          function(err) {
            if(err) {
              console.log('Error writing to csv file');
            }
          }
        );
    });
}

//Check if file exists
var csvHeader = 'Date,Timestamp,Ping,Download,Upload';
if(!fs.existsSync(resultsPath)) {
  //Write Header
  fs.writeFile(resultsPath, csvHeader + "\n", function(err) {
    if(err) {
      console.log('Error writing to csv file');
      return;
    }

    //Log Header
    console.log(csvHeader);

    //Run initial test
    runSpeedtest();
  });
}
