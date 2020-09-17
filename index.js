const core = require('@actions/core');
const wait = require('./wait');
var readme_present = 0;
var contributions_present = 0;
var conduct_present = 0;
var license_present = 0;
var gitignore_present = 0;
var citations_present = 0;


var total_score = 0;
const testFolder = '.';
const fs = require('fs');



  //most @actions toolkit packages have async methods
  async function run() {
    try {
      fs.readdirSync(testFolder).forEach(file => {
        
        if(file == 'README.md'){
          readme_present = 1;
          total_score = total_score+1;
        }
        if(file == 'CONTRIBUTING.md'){
          contributions_present = 1;
          total_score = total_score+1;
        }
        if(file == 'CODE-OF-CONDUCT.md'){
          conduct_present = 1;
          total_score = total_score+1;
        }
        if(file == 'LICENSE'){
          license_present = 1;
          total_score = total_score+1;
        }
        if(file == 'CITATION.md'){
          citations_present = 1;
          total_score = total_score+1;
        }
        if(file == '.gitignore'){
          gitignore_present = 1;
          total_score = total_score+1;
        }
      });
      
    } catch (error) {
      core.setFailed(error.message);
    }
  }

  run();
  var score = (total_score/7)*100;
  console.log(`Score for this repo =  ` + score);

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

if(score >= 95){
  console.log("Grade: A+");
}

if(score >=90 && score <= 94){
  console.log("Grade: A");
}
if(score >=85 && score <= 89){
  console.log("Grade: B+");
}
if(score >=80 && score <= 84){
  console.log("Grade: B");
}
if(score >=75 && score <= 79){
  console.log("Grade: C+");
}
if(score >=70 && score <= 74){
  console.log("Grade: C");
}
if(score >=65 && score <= 69){
  console.log("Grade: D+");
}
if(score >=60 && score <= 64){
  console.log("Grade: D");
}
if(score <= 59){
  console.log("Grade: Redo");
}
