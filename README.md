# test-plan-optimizer
Given many test conditions and rules between them, generates a complete yet minimal test plan

## Motivating Example

Consider needing to test a new web page you're building that changes behavior based on being logged in, being admin, or having a premium account, all yes or no conditions.  This script will then generate a 2D matrix of all possible combinations, _except_ those that meet the ignore rules you set.  Here we don't care about the test case of not being logged in and being admin, since this is impossible; you need to be logged in to be an admin.  Rules like these are useful for keeping the test plan to a minimum.  The current [config.json](config.json) shows the configuration to generate the test plan for this example using common-sense rules to bring 8 (2^3) raw test cases down to just [4 cases](example-test-plan.csv) that are actually possible.

## Installation

You'll need a modern Node.js runtime installed.  I'm using version 8.

Clone this repository

```git clone https://github.com/gittyeric/test-plan-optimizer.git```
```cd test-plan-optimizer```

Then install the Node.js NPM dependencies:

```npm install```

## Usage

Run:

```node generate-csv.js```

to generate test-plan.csv, a complete test plan except for impossible cases like a non-logged in user also being an admin.  Change config.json to generate your own minimal but thorough test plan.

## Docs

### Variables

Any test condition that can be expressed as yes or no can be used to generate a matrix of test cases.  Add your test conditions into [config.json](config.json) as variables and all combinations of their Yes or No possibilities will be considered, except rules you ignore...

### Ignore Rules

You can specify rules that can never be true in order to minimize the number of test cases generated.  It's good to use as few variables as possible with the most ignoreRules, so that you only get test cases you care to cover.  The [config.json](config.json) contains common-sense examples of removing impossible test conditions.

All rules are an expression of 1 or more variable values that must all match the test case in order to trigger ignoring.  Take for example a logical rule between variables A, B and C:

A and B and not C (Any matching case should always be ignored)

Becomes an ignore Rule:

{
    "A": true,
    "B": true,
    "C": false
}

Note that if the rule doesn't mention other variables like "D", then "D" can be any value and the test case will still not be generated.
