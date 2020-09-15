const core = require('@actions/core');
const github = require('@actions/github')
const fs = require('fs');

const issueChecker = require('./src/issue-checker')

const readme_maxPoints = 2;
const contributions_maxPoints = 1;
const conduct_maxPoints = 1;
const license_maxPoints = 1;
const gitignore_maxPoints = 1;
const citations_maxPoints = 1;


var total_score = 0;
const testFolder = '.';

//most @actions toolkit packages have async methods
async function run() {
  try {
    fs.readdirSync(testFolder).forEach(file => {
      
      if(file == 'README.md'){
        total_score = total_score+2;
      }
      if(file == 'CONTRIBUTING.md'){
        total_score = total_score+1;
      }
      if(file == 'CODE-OF-CONDUCT.md'){
        total_score = total_score+1;
      }
      if(file == 'LICENSE'){
        total_score = total_score+1;
      }
      if(file == 'CITATION.md'){
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
function grade(score) {
  let grade = 'F'
  if(score >= 95){
    grade = 'A+'
  }
  if(score >= 90 && score <= 94){
    grade = 'A'
  }
  if(score >=85 && score <= 89){
    grade = 'B+'
  }
  if(score >=80 && score <= 84){
    grade = 'B'
  }
  if(score >=75 && score <= 79){
    grade = 'C+'
  }
  if(score >=70 && score <= 74){
    grade = 'C'
  }
  if(score >=65 && score <= 69){
    grade = 'D+'
  }
  if(score >=60 && score <= 64){
    grade = 'D'
  }
  return grade
}

// Check Files
await run()

// Check for issues
// Must be passed in via the GITHUB_TOKEN
const token = process.env.GITHUB_TOKEN
const octoClient = github.getOctokit(token)
const payload = github.context.payload

let repo = payload.repository
let owner = payload.owner

const issueScore = issueChecker.check(repo, owner, octoClient)

const score = (total_score/8)*100;

core.log(`Score for this repo =  ` + score);
core.setOutput('score', score)

const grade = grade(score);
core.setOutput('grade', grade)

