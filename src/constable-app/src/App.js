import './App.css';
import 'material-design-icons/iconfont/material-icons.css';
import React, { useCallback, useState } from "react";
import { getRepositoryDetails } from './services';
import Loading from './assets/loading';
import CommitHistory from './components/commit-history';
import AddDeleteHistory from './components/add-delete-history';

function App() {

  const initialFormData = Object.freeze({
    ownerName: "",
    repositoryName: ""
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [gradeDataList, setGradeDataList] = useState([]);
  const [isRepositorySet, setIsRepositorySet] = useState(false);
  const [cardData, setCardData] = useState({});
  const [gradedScore, setGradedScore] = useState('');
  const [commitActivityData, setCommitActivityData] = useState([]);
  const [isRepoDetailsLoaded, setIsRepoDetailsLoaded] = useState(false);
  const [additionDeletionData, setAdditionDeletionData] = useState([]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const getRepoDetails = useCallback(async (event) => {
    setIsRepositorySet(true);
    setLoading(true);
    event.preventDefault();
    try {
      const { gradeDataList, gradedScore, commitActivityData, additionDeletionData, cardData } = await getRepositoryDetails(formData.ownerName, formData.repositoryName);
      setGradeDataList(gradeDataList);
      setCardData(cardData);
      setLoading(false);
      setGradedScore(gradedScore);
      setCommitActivityData(commitActivityData);
      setAdditionDeletionData(additionDeletionData);
      setIsRepoDetailsLoaded(true);
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
                  <input className="form-control" onChange={handleChange} name="ownerName" placeholder="Owner username" />
                </div>
              </div>
              <div className="form-group col-md-5">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <span className="material-icons">code</span>
                    </span>
                  </div>
                  <input className="form-control" onChange={handleChange} name="repositoryName" placeholder="Repository name" />
                </div>
              </div>
              <div className="col-auto">
                <button className="btn-action-primary btn" onClick={getRepoDetails}>Get details</button>
              </div>
            </div>
          </form>
        </div>
        {isRepositorySet ? loading ? <Loading width="60px" height="60px" /> : isRepoDetailsLoaded ? <div className="row px-3">
          <div className="col-4">
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

              <div className="card border-0 ml-4 forks-card col-5">
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
                  <h1 className="font-weight-bold">{cardData.contributorCount}</h1>
                </div>

                <div className="card-icon">
                  <i className="material-icons icon-text">group</i>
                </div>
              </div>

              <div className="card border-0 ml-4 contributors-card col-5">
                <div className="card-body p-3 text-white">
                  <h6 className="text-uppercase">Releases</h6>
                  <h1 className="font-weight-bold">{cardData.releaseCount}</h1>
                </div>

                <div className="card-icon">
                  <i className="material-icons icon-text">local_offer</i>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 pl-0">
                <div className="card">
                  <div className="card-header">
                    Code commit trend
                </div>
                  <div className="card-body">
                    <CommitHistory commitActivityData={commitActivityData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 pr-2">
            <div className="card">
              <div className="card-header">
                Featured
              </div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 pl-0">
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
            <div className="card">
              <div className="card-header">
                Grade Calculation
              </div>
              <div className="card-body">
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
        </div> : null : null}
      </div>
    </div>
  );
}

export default App;
