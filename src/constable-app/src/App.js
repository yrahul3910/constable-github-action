import './App.css';
import React from 'react';
import { request } from "@octokit/request";
import 'material-design-icons/iconfont/material-icons.css';

function App() {

  const initialFormData = Object.freeze({
    ownerName: "",
    repositoryName: ""
  });

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value
    });
  };

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
  const getRepoDetails = async function(event) {
    event.preventDefault();
    const owner = formData.ownerName
    const repo = formData.repositoryName
  
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

  return (
    <div className="container-fluid p-0">
      <div className="p-4">
        <div className="page-header d-flex justify-content-between">
          <div>
            <div className="h4 page-title font-weight-bold text-dark">
              Constable Dashboard
            </div>
            <h6 className="page-subtitle small text-muted font-weight-bolder">
              Analyse how contributable a GitHub Repository is! 
            </h6>
          </div>
        </div>
        <div className="col-9 mt-4 px-0">
          <form>
            <div className="form-row">
              <div className="form-group col-md-5">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <span className="material-icons">person</span>
                    </span>
                  </div>
                  <input className="form-control" onChange={handleChange} name="ownerName" placeholder="Owner username"/>
                </div>
              </div>
              <div className="form-group col-md-5">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <span className="material-icons">code</span>
                    </span>
                  </div>
                  <input className="form-control" onChange={handleChange} name="repositoryName" placeholder="Repository name"/>
                </div>
              </div>
              <div className="col-auto">
                <button className="btn-action-primary btn" onClick={getRepoDetails}>Get details</button>
              </div>
            </div>
          </form>
        </div>
        <div className="row px-3">
          <div className="col-4">
            <div className="row mb-2">
              <div className="card border-0 stars-card col-5">
                <div className="card-body p-3 text-white">
                    <h6 className="text-uppercase">Stars</h6>
                    <h1 className="font-weight-bold">5</h1>
                </div>

                <div className="card-icon">
                    <i className="material-icons icon-text">grade</i>
                </div>
              </div>

              <div className="card border-0 mx-2 forks-card col-5">
                <div className="card-body p-3 text-white">
                    <h6 className="text-uppercase">Forks</h6>
                    <h1 className="font-weight-bold">8</h1>
                </div>

                <div className="card-icon">
                    <i className="material-icons icon-text">call_split</i>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="card border-0 stars-card col-5">
                <div className="card-body p-3 text-white">
                    <h6 className="text-uppercase">Contributors</h6>
                    <h1 className="font-weight-bold">10</h1>
                </div>

                <div className="card-icon">
                    <i className="material-icons icon-text">group</i>
                </div>
              </div>

              <div className="card border-0 mx-2 contributors-card col-5">
                <div className="card-body p-3 text-white">
                    <h6 className="text-uppercase">Releases</h6>
                    <h1 className="font-weight-bold">2</h1>
                </div>

                <div className="card-icon">
                    <i className="material-icons icon-text">local_offer</i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
