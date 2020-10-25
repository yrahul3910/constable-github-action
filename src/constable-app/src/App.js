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
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={getRepoDetails}>Search</button>
        </div>
      </div>
    </div>
  );
}

const getRepoDetails = async function() {
  console.log("Making request")
  const response = await request('GET /repos/{owner}/{repo}', {
    owner: 'varsha5595',
    repo: 'constable-github-action'
  })
  console.log(response)

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
}


export default App;
