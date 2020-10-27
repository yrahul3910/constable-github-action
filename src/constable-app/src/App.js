// Library Imports
import 'material-design-icons/iconfont/material-icons.css';
import React, { useCallback, useState } from "react";

// Constable Imports
import './App.css';
import { getRepositoryDetails } from './services';
import Loading from './assets/loading';
import CommitHistory from './components/commit-history';
import AddDeleteHistory from './components/add-delete-history';

function App() {

  const initialFormData = Object.freeze({
    ownerName: "",
    repositoryName: ""
  });

  const [repoMetaData, setRepoMetaData] = useState({});
  const [formData, updateFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [gradeDataList, setGradeDataList] = useState([]);
  const [isRepositorySet, setIsRepositorySet] = useState(false);
  const [cardData, setCardData] = useState({});
  const [gradedScore, setGradedScore] = useState('');
  const [commitActivityData, setCommitActivityData] = useState([]);
  const [isRepoDetailsLoaded, setIsRepoDetailsLoaded] = useState(false);
  const [gradeLink, setGradeLink] = useState('');
  const [additionDeletionData, setAdditionDeletionData] = useState([]);
  const [pulseData, setPulseData] = useState({});

  // Handle updates made to repository details form
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value
    });
  };

  // Fecth all the details of a given GitHub repository
  const getRepoDetails = useCallback(async (event) => {
    setIsRepositorySet(true);
    setLoading(true);

    // To prevent page reload on form submit
    event.preventDefault();

    try {
      const { repoMetaData, gradeDataList, gradedScore, commitActivityData, additionDeletionData, cardData, pulseData } = await getRepositoryDetails(formData.ownerName, formData.repositoryName);
      setRepoMetaData(repoMetaData);
      setGradeDataList(gradeDataList);
      setCardData(cardData);
      setLoading(false);
      setGradedScore(gradedScore);
      setCommitActivityData(commitActivityData);
      setAdditionDeletionData(additionDeletionData);
      setIsRepoDetailsLoaded(true);
      setGradeLink("https://img.shields.io/badge/Constable-".concat(gradedScore, "-green"));
      setPulseData(pulseData);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [formData, setLoading]);

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
        <div className="mt-4 px-0">
          <form>
            <div className="form-row">
              <div className="form-group col-md-5">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <span className="material-icons">person</span>
                    </span>
                  </div>
                  <input className="form-control" onChange={handleChange} name="ownerName" placeholder="Owner username" />
                </div>
              </div>
              <div className="form-group col-md-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <span className="material-icons">code</span>
                    </span>
                  </div>
                  <input className="form-control" onChange={handleChange} name="repositoryName" placeholder="Repository name" />
                </div>
              </div>
              <div className="col">
                <button className="btn-action-primary btn w-100" onClick={getRepoDetails}>Get details</button>
              </div>
            </div>
          </form>
        </div>
        {isRepositorySet ? loading ? <Loading width="60px" height="60px" /> : isRepoDetailsLoaded ?
          <div>
            <div className="page-header d-flex justify-content-between">
              <div>
                <div className="h4 page-title font-weight-bold text-dark">
                  {repoMetaData.name}
                </div>
              </div>
            </div>
            <div className="row px-3 py-2">
              <div className="col-4 pr-4">
                <div className="row mb-2">
                  <div className="card border-0 stars-card col-6">
                    <div className="card-body p-3 text-white">
                      <h6 className="text-uppercase">Stars</h6>
                      <h1 className="font-weight-bold">{cardData.starCount}</h1>
                    </div>
                    <div className="card-icon">
                      <i className="material-icons icon-text">grade</i>
                    </div>
                  </div>
                  <div className="col-1 px-0"></div>
                  <div className="card border-0 forks-card col-5">
                    <div className="card-body p-3 text-white">
                      <h6 className="text-uppercase">Forks</h6>
                      <h1 className="font-weight-bold">{cardData.forkCount}</h1>
                    </div>
                    <div className="card-icon">
                      <i className="material-icons icon-text">call_split</i>
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="card border-0 stars-card col-6">
                    <div className="card-body p-3 text-white">
                      <h6 className="text-uppercase">Contributors</h6>
                      <h1 className="font-weight-bold">{cardData.contributorCount > 99 ? cardData.contributorCount + '+' : cardData.contributorCount}</h1>
                    </div>
                    <div className="card-icon">
                      <i className="material-icons icon-text">group</i>
                    </div>
                  </div>
                  <div className="col-1"></div>
                  <div className="card border-0 contributors-card col-5">
                    <div className="card-body p-3 text-white">
                      <h6 className="text-uppercase">Watchers</h6>
                      <h1 className="font-weight-bold">{cardData.watcherCount}</h1>
                    </div>
                    <div className="card-icon">
                      <i className="material-icons icon-text">local_offer</i>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 px-0">
                    <div className="card">
                      <div className="card-header">
                        Code Commit Trend
                      </div>
                      <div className="card-body">
                        <CommitHistory commitActivityData={commitActivityData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 px-4">
                <div className="row card mb-2">
                  <div className="card-header">
                    Pulse
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="progress mb-2" style={{ height: '0.5rem' }}>
                          <div className="progress-bar bg-success" role="progressbar" style={{ width: (pulseData.openIssueCount * 100 / pulseData.totalIssueCountPercentage) + '%' }} aria-valuemin="0" aria-valuemax="100"></div>
                          <div className="progress-bar" role="progressbar" style={{ width: '0.5%', backgroundColor: '#FFFFFF' }} aria-valuemin="0" aria-valuemax="100"></div>
                          <div className="progress-bar bg-danger" role="progressbar" style={{ width: (pulseData.closedIssueCount * 100 / pulseData.totalIssueCountPercentage) + '%' }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span>{pulseData.totalIssueCount} Active Issues</span>
                      </div>
                      <div className="col">
                        <div className="progress mb-2" style={{ height: '0.5rem' }}>
                          <div className="progress-bar" role="progressbar" style={{ width: pulseData.mergedPRCount + '%', backgroundColor: '#4C00A4' }} aria-valuemin="0" aria-valuemax="100"></div>
                          <div className="progress-bar" role="progressbar" style={{ width: '0.5%', backgroundColor: '#FFFFFF' }} aria-valuemin="0" aria-valuemax="100"></div>
                          <div className="progress-bar" role="progressbar" style={{ width: pulseData.openPRCount + '%', backgroundColor: '#29B59F' }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span>{pulseData.totalPRCount} Active Pull Requests</span>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col text-success text-center font-weight-bolder">
                        <span>Open Issues</span>
                      </div>
                      <div className="col  text-danger text-center font-weight-bolder">
                        <span>Closed Issues</span>
                      </div>
                      <div className="col text-center font-weight-bolder" style={{ color: '#4C00A4' }}>
                        <span>Merged Requests</span>
                      </div>
                      <div className="col text-center font-weight-bolder" style={{ color: '#29B59F' }}>
                        <span>Open Requests</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 px-0">
                    <div className="card">
                      <div className="card-header">
                        Addition Deletion Trend
                      </div>
                      <div className="card-body">
                        < AddDeleteHistory additionDeletionData={additionDeletionData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 pl-2">
                <div className="card mb-2">
                <div className="card-header">
                    Grade Badge
                  </div>
                  <div className="card-body">
                    <img src={gradeLink} />
                    <div>
                      <h6>Copy this link to add it to your README!</h6>
                      <div>
                        {gradeLink}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    Grade Calculation
                  </div>
                  <div className="card-body table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Item</th>
                          <th scope="col">Weight</th>
                          <th scope="col">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gradeDataList.map((file, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{file['name']}</td>
                            <td>{file['weight']}</td>
                            <td>{file['score']}</td>
                          </tr>
                        ))}
                        <tr>
                          <th scope="row">9</th>
                          <th colSpan="2">Final Grade</th>
                          <td><span className="badge badge-pill badge-success">{gradedScore}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> : null : null}
      </div>
    </div>
  );
}

export default App;
