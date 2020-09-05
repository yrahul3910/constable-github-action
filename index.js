const core = require('@actions/core');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    // const ms = core.getInput('milliseconds');
    // core.info(`Waiting ${ms} milliseconds ...`);

    // core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    // await wait(parseInt(ms));
    // core.info((new Date()).toTimeString());

    // core.setOutput('time', new Date().toTimeString());

    //------------------------------------------------------------------------------------------------------    
    const readme_maxPoints = 2;
    const contributions_maxPoints = 1;
    const conduct_maxPoints = 1;
    const license_maxPoints = 1;
    const gitignore_maxPoints = 1;
    const citations_maxPoints = 1;

    const octokit = require('.')()
    octokit.repos.getContent({
      owner: 'octokit',
      repo: 'rest.js',
      path: 'examples/getContent.js'
    })
    .then(result => {
      // content will be base64 encoded
      const content = Buffer.from(result.data.content, 'base64').toString()
      console.log(content)
    })    


  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
