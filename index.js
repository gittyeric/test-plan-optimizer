var gray = require('gray-code');

function constraintMatches(row, ignoreRule, varToIndex) {
    const variables = Object.keys(ignoreRule);
    for (var v = 0; v < variables.length; v++) {
        var variable = variables[v];
        var index = varToIndex[variable];
        var columnBool = row[index] == 1 ? true : false;
        if (columnBool !== ignoreRule[variable]) {
            return false;
        }
    }
    return true;
}

function constraintsMatch(row, ignoreRules, varToIndex) {
    for (var c=0; c < ignoreRules.length; c++) {
        var constraint = ignoreRules[c];
        if (constraintMatches(row, constraint, varToIndex)) {
            return true;
        }
    }
    return false;
}

function variablesToIndicies(variables) {
    varsToIndex = {};
    for (var v = 0; v < variables.length; v++) {
        varsToIndex[variables[v]] = v;
    }
    return varsToIndex;
}

function generateTestPlan(variables, ignoreRules) {
    var varToIndex = variablesToIndicies(variables);

    var map = gray(variables.length);
    var filtered = [];
    for (var r = 0; r < map.length; r++) {
        var row = map[r];
        if (!constraintsMatch(row, ignoreRules, varToIndex)) {
            filtered.push(row);
        }
    }
    return filtered;
}

function planRowToCSV(index, row) {
    var csvRow = [index+1]; // Test Case # Column
    for (var r = 0; r < row.length; r++) {
        csvRow.push(row[r] ? 'Yes' : 'No');
    }
    csvRow.push(''); // Test Passes column
    return csvRow;
}

function testPlanToCSV(variables, testPlan) {
    var header = ['Test Case #', ...variables, 'Test Passes'];
    var csv = [header];
    for (var i = 0; i < testPlan.length; i++) {
        csv.push(planRowToCSV(i, testPlan[i]));
    }

    var csvStr = '';
    for (var i = 0; i < csv.length; i++) {
        csvStr += csv[i].join(',') + '\n';
    }
    return csvStr;
}

function generateTestPlanCSV(variables, ignoreRules) {
    var testPlan = generateTestPlan(variables, ignoreRules);
    return testPlanToCSV(variables, testPlan);
}

module.exports = {
    generateTestPlan: generateTestPlan,
    generateTestPlanCSV: generateTestPlanCSV
};
