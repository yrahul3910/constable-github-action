const query = `
query issuesCheck($owner: String!, $repo: String!, $startDate: String!, $endDate: String!) {
    search(last:100, query:"$owner/$repo is:closed is:issue closed:>$startDate closed:<$endDate", type:ISSUE) {
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
    
    return getIssueCount(repo, owner, startDate, today, octoClient)
  };

const getIssueCount = function (repo, owner, startDate, endDate, octoClient) {
  const variables = {
    repo: repo,
    owner: owner,
    startDate: startDate.toDateString(),
    endDate: endDate.toDateString()
  }

  const response = octoClient.graphql(query, variables);
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
