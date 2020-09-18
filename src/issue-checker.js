const core = require('@actions/core');

const query = `
query issuesCheck($search: String!) {
    search(last:100, query:$search, type:ISSUE) {
      issueCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }   
`

const check = function (repository, octoClient) {
    const today = this.currentDate()
    let startDate = new Date(today.toDateString())
    startDate.setDate(startDate.getDate() - 30)
    
    const issues = getIssueCount(repository, startDate, today, octoClient)
    if (issues >= 1) {
      return 1
    }
    return 0
  };

const getIssueCount = function (repository, startDate, endDate, octoClient) {
  const searchString = `repo:${repository} is:issue is:closed closed:>${startDate.toISOString()} closed:<${endDate.toISOString()}`
  core.info(`Issue search is ${searchString}`)
  const response = octoClient.graphql(query, {
   search: searchString
  });
  return response.issueCount
}

const currentDate = function () {
  return new Date();
};

module.exports = {
  query: query,
  check: check,
  currentDate: currentDate
}
