const query = `
query issuesCheck($owner: String!, $repo: String!, $currentDate: String!, $oldDate: String!) {
    search(last:100, query:"$owner/$repo is:closed is:issue closed:>$oldDate closed:<$currentDate", type:ISSUE) {
      issueCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }   
`

const check = function (repoOwner, repoName, octoClient) {
    const today = this.currentDate()
    let oldDate = new Date(today.toDateString())
    oldDate.setDate(oldDate.getDate() - 30)
    
    const variables = {
        owner: repoOwner,
        repo: repoName,
        currentDate: today.toDateString(),
        oldDate: oldDate.toDateString()
    }

    const response = octoClient.graphql(query, variables);
    return response.issueCount
  };

const currentDate = function () {
  return new Date();
};

module.exports = {
  query: query,
  check: check,
  currentDate: currentDate
}
