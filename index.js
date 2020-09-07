const core = require('@actions/core');
const CanvasJS = require('canvasjs');
const wait = require('./wait');
const readme_maxPoints = 2;
const contributions_maxPoints = 1;
const conduct_maxPoints = 1;
const license_maxPoints = 1;
const gitignore_maxPoints = 1;
const citations_maxPoints = 1;


var total_score = 0;
const testFolder = '.';
const fs = require('fs');



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

  run();
  console.log(`Score for this repo =  ` + (total_score/7)*100);