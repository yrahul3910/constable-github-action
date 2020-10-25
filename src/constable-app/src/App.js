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


const getInsights = async function() {
  const repo_data = await request('GET /repos/{owner}/{repo}', {
    owner: 'varsha5595',
    repo: 'constable-github-action'
  })
  const add_del = await request('GET /repos/:owner/:repo/stats/code_frequency', {
    owner: 'varsha5595',
    repo: 'constable-github-action'
  })
  const total_commits = await request('GET /repos/:owner/:repo/stats/participation', {
    owner: 'varsha5595',
    repo: 'constable-github-action'
  })
  const contributors = await request('GET /repos/:owner/:repo/stats/contributors', {
    owner: 'varsha5595',
    repo: 'constable-github-action'
  })
  const commit_activity = await request('GET /repos/:owner/:repo/stats/commit_activity', {
    owner: 'varsha5595',
    repo: 'constable-github-action'
  })
  const pull_req = await request('GET /repos/:owner/:repo/pulls', {
    owner: 'MeghanaVasist',
    repo: 'constable-github-action'
  })

  console.log("Repo data")
  console.log(repo_data)

  console.log("Additions and Deletions")
  console.log(add_del)

  console.log("Total commits over 52 weeks")
  console.log(total_commits)

  console.log("Contributors")
  console.log(contributors)

  console.log("Commit Activity")
  console.log(commit_activity)

  const result = await request('GET /repos/{owner}/{repo}/contents', {
    owner: 'dangoslen',
    repo: 'constable-github-action'
  })
  
  const files = new Set();
  for (let i = 0; i < result.data.length; i++) {
    files.add(result.data[i].name)
  }
  const dic = new Map()
  const reqFiles = new Set(['README.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'LICENSE', 'CITATION.md', '.gitignore'])
  reqFiles.forEach(file => {
    if (files.has(file)) {
      dic[file] = 1
    }
    else {
      dic[file] = 0
    }

  });
  console.log(dic)
  console.log("Pull requests")
  console.log(pull_req)
}


export default App;
