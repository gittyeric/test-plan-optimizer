# test-plan-optimizer
Given a bunch of boolean conditions and constraints, generates a complete yet minimal test plan

## Example

Consider needing to test a new web page you're building that changes behavior based on being logged in, being admin, or having a premium account, all yes or no conditions.  This script will then generate a 2D matrix of all possible combinations, _except_ those that meet the ignore rules you set.  Rules are useful for keeping the test plan to a minimum.  The current [config.json](config.json) shows the configuration to generate the test plan for this.

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

#### Variables

Any test condition that can be expressed as a true or false value can be used to generate a matrix of test cases.  Add your test conditions into [config.json](config.json) as variables and all combinations of their true or false possibilities will be considered, except rules you ignore...

#### Ignore Rules

You can specify boolean constraints that should never be true in order to minimize the number of test cases generated.  It's good to use as few variables as possible with the most ignoreRules, so that you only get test cases you care to cover.  The [config.json](config.json) contains common-sense examples of removing impossible test conditions.

All rules are a boolean expression of 1 or more variables without the OR operator that will remove rows when their columns match, for example:

A and B and not C (Any matching case should always be ignored)

Becomes an ignore Rule:

{
    "A": true,
    "B": true,
    "C": false
}