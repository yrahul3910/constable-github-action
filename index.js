const core = require('@actions/core');
const wait = require('./wait');
const readme_maxPoints = 2;
    const contributions_maxPoints = 1;
    const conduct_maxPoints = 1;
    const license_maxPoints = 1;
    const gitignore_maxPoints = 1;
    const citations_maxPoints = 1;
    let total_score = 0;
    const testFolder = '.';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
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
        // console.log(1);
        // console.log(file);
      });
    });
    console.log(`total_score =  ` + total_score);

// most @actions toolkit packages have async methods
// async function run() {
//   try {
//     const readme_maxPoints = 2;
//     const contributions_maxPoints = 1;
//     const conduct_maxPoints = 1;
//     const license_maxPoints = 1;
//     const gitignore_maxPoints = 1;
//     const citations_maxPoints = 1;
//     let total_score = 0;
//     const testFolder = '.';
//     const fs = require('fs');

//     fs.readdir(testFolder, (err, files) => {
//       files.forEach(file => {
//         if(file == 'README.md'){
//           total_score = total_score+2;
//         }
//         if(file == 'CONTRIBUTING.md'){
//           total_score = total_score+1;
//         }
//         if(file == 'CODE-OF-CONDUCT.md'){
//           total_score = total_score+1;
//         }
//         if(file == 'LICENSE'){
//           total_score = total_score+1;
//         }
//         if(file == 'CITATION.md'){
//           total_score = total_score+1;
//         }
//         // console.log(1);
//         // console.log(file);
//       });
//     });
//     console.log(`total_score =  ` + total_score);
    
//   } catch (error) {
//     core.setFailed(error.message);
//   }
// }

// run();
