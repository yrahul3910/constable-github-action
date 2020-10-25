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

  const getRepoDetails = async function(event) {
    event.preventDefault();
    console.log("Making request")
    console.log(formData);
    const response = await request('GET /repos/{owner}/{repo}', {
      owner: formData.ownerName,
      repo: formData.repositoryName
    })
    console.log(response)
  
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
