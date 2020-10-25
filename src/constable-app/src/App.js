import './App.css';
import { request } from "@octokit/request";

function App() {
  return (
    <div className="container-fluid">
      <nav className="navbar bg-dark">
        {/* <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy" /> */}
          CONSTABLE
      </nav>
      <div>
        <p className="font-weight-bold py-6">Dashboard</p>
        <p className="font-weight-light py-6">Subtext</p>
      </div>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter GitHub Repository URL" aria-label="Enter GitHub Repository URL" aria-describedby="button-addon2"/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={getInsights}>Search</button>
        </div>
      </div>
    </div>
  );
}

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

function time(timestamp1, timestamp2) {
  var difference = Date.parse(timestamp1) - Date.parse(timestamp2);
  var daysDifference = Math.floor(difference/1000/60/60/24);
  return daysDifference;
}
const getInsights = async function() {
  const owner = "MeghanaVasist"
  const repo = "constable-github-action"

  const repo_data = await request('GET /repos/{owner}/{repo}', {
    owner: owner,
    repo: repo
  })

  const add_del = await request('GET /repos/:owner/:repo/stats/code_frequency', {
    owner: owner,
    repo: repo
  })

  const contributors = await request('GET /repos/:owner/:repo/stats/contributors', {
    owner: owner,
    repo: repo
  })

  const commit_activity = await request('GET /repos/:owner/:repo/stats/commit_activity', {
    owner: owner,
    repo: repo
  })

  const pull_req = await request('GET /repos/:owner/:repo/pulls', {
    owner: owner,
    repo: repo
  })

  const pull_closed = await request('GET /repos/:owner/:repo/pulls?state=closed', {
    owner: owner,
    repo: repo
  })

  const closed_issue = await request('GET /repos/:owner/:repo/issues?state=closed', {
    owner: owner,
    repo: repo
  })

  const open_issue = await request('GET /repos/:owner/:repo/issues', {
    owner: owner,
    repo: repo
  })

  var avg_issue = 0
  closed_issue.data.forEach(element => {
    avg_issue += time(element.closed_at,element.created_at)
  });

  avg_issue = avg_issue/(closed_issue.data.length + open_issue.data.length - pull_req.data.length)

  const result = await request('GET /repos/{owner}/{repo}/contents', {
    owner: owner,
    repo: repo
  })

  var grade_keys = new Array()
  var grade_vals = new Array()
  const files = new Set();
  const reqFiles = new Set(['README.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'LICENSE', 'CITATION.md', '.gitignore'])

  for (let i = 0; i < result.data.length; i++) {
    files.add(result.data[i].name)
  }

  reqFiles.forEach(file => {
    grade_keys.push(file)
    if (files.has(file)) {
      grade_vals.push(1)
    }
    else {
      grade_vals.push(0)
    }

  });

  var PR = 0
  console.log(pull_closed)
  pull_closed.data.forEach(pullRequest => {
    if (pullRequest.merged_at){
      PR += time(pullRequest.merged_at, pullRequest.created_at)
    }
  });
  PR = PR/(pull_req.data.length + pull_closed.data.length)

  var score = grade_vals.reduce(function(a, b){
    return a + b;
  }, 0);

  grade_keys.push("Average PR Closing Time")
  grade_vals.push(Math.round(PR))

  if (PR<10 && PR>0) {
    score += 2
  }

  grade_keys.push("Average Issue Closing time")
  grade_vals.push(Math.round(avg_issue))
  if (avg_issue<10 && avg_issue>0) {
    score += 2
  }

  console.log("Forks", repo_data.data["forks"])
  console.log("Stars", repo_data.data["stargazers_count"])
  console.log("Has Wiki", repo_data.data["has_wiki"])
  console.log("Has Project", repo_data.data["has_projects"])
  console.log("Additions and Deletions", add_del.data)
  console.log("Contributors", contributors.data)
  console.log("Commit Activity", commit_activity.data)
  console.log("Table", grade_keys, grade_vals)
  console.log("Assigned grade is ", calculateGrade(score * 10))
  
}


export default App;
