var fs = require('fs');
var optimizer = require ('./index');

function processConfig() {
    var jsonConfig = fs.readFileSync('./config.json', {flag: 'r'});
    var config = JSON.parse(jsonConfig);
    var testPlanCSV = optimizer.generateTestPlanCSV(config.variables, config.ignoreRules);
    console.log(testPlanCSV);
    fs.writeFileSync('./test-plan.csv', testPlanCSV);
};

processConfig();