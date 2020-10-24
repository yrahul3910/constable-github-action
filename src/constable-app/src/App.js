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

}

export default App;
