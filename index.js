const core = require('@actions/core');
const github = require('@actions/github')
const fs = require('fs');
const table = require('markdown-table')
const issueChecker = require('./src/issue-checker')

var readme_present = 0;
var contributions_present = 0;
var conduct_present = 0;
var license_present = 0;
var gitignore_present = 0;
var citations_present = 0;


var total_score = 0;
const testFolder = '.';

//most @actions toolkit packages have async methods
async function run() {
  try {
    fs.readdirSync(testFolder).forEach(file => {
      if(file == 'README.md') {
        readme_present = 1;
        total_score = total_score+1;
      }
      if(file == 'CONTRIBUTING.md') {
        contributions_present = 1;
        total_score = total_score+1;
      }
      if(file == 'CODE-OF-CONDUCT.md') {
        conduct_present = 1;
        total_score = total_score+1;
      }
      if(file == 'LICENSE') {
        license_present = 1;
        total_score = total_score+1;
      }
      if(file == 'CITATION.md') {
        citations_present = 1;
        total_score = total_score+1;
      }
      if(file == '.gitignore') {
        gitignore_present = 1;
        total_score = total_score+1;
      }
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

/*
Grades Range:
A+ : 95+
A  : 90-94
B+ : 85-89
B  : 80-84
C+ : 75-79
C  : 70-74
D+ : 65-69
D  : 60-64
Redo: 0-59
*/
function calculateGrade(score) {
  let grade = 'F'
  if(score >= 95) {
    grade = 'A+'
  }
  if(score >= 90 && score <= 94) {
    grade = 'A'
  }
  if(score >=85 && score <= 89) {
    grade = 'B+'
  }
  if(score >=80 && score <= 84) {
    grade = 'B'
  }
  if(score >=75 && score <= 79) {
    grade = 'C+'
  }
  if(score >=70 && score <= 74) {
    grade = 'C'
  }
  if(score >=65 && score <= 69) {
    grade = 'D+'
  }
  if(score >=60 && score <= 64) {
    grade = 'D'
  }
  return grade
}

// Check Files
run()

// Check for issues
// Must be passed in via the GITHUB_TOKEN
const token = process.env.GITHUB_TOKEN
const octoClient = github.getOctokit(token)
const repo = github.context.repo

const repository = `${repo.owner}/${repo.repo}`
let issue_score = 0
async function issueCheck() {
  issue_score = await issueChecker.check(repository, octoClient)
  total_score+=issue_score
}

issueCheck()

const score = (total_score/8)*100;
core.info(`Score for this repo =  ` + score);
core.setOutput('score', score)

const grade = calculateGrade(score);
core.info(`Grade for this repo =  ` + grade);
core.setOutput('grade', grade)
  
var report = table([
  ['Item', 'Weight', 'Score'],
  ['README.md','1', readme_present],
  ['CONTRIBUTING.md','1', contributions_present],
  ['CODE-OF-CONDUCT.md','1', conduct_present],
  ['LICENSE.md','1', license_present],
  ['CITATION.md','1', citations_present],
  ['.gitignore','1', gitignore_present],
  ['issues closed (last 30 days)', '1', issue_score],
  ['**Total Score**', `**${total_score}**`, `**${score}**`]
]);
console.log(report)
core.setOutput('report', report)
