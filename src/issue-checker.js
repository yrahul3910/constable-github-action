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

const check = function (repo, owner, octoClient) {
    const today = this.currentDate()
    let startDate = new Date(today.toDateString())
    startDate.setDate(startDate.getDate() - 30)
    
    const issues = getIssueCount(repo, owner, startDate, today, octoClient)
    if (issues >= 1) {
      return 1
    }
    return 0
  };

const getIssueCount = function (repo, owner, startDate, endDate, octoClient) {
  const searchString = `${owner}/${repo} is:closed is:issue closed:>${startDate.toISOString()} closed:<${endDate.toISOString()}`
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
