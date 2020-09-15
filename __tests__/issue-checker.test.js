const github = require("@actions/github")
const issueChecker = require('../src/issue-checker')

const owner = "owner"
const repo = "repo"
const date = new Date("September 30, 2019")
const thirtyDaysAgo = new Date("August 31, 2019")
const expectedSearchString = `${owner}/${repo} is:closed is:issue closed:>${thirtyDaysAgo.toISOString()} closed:<${date.toISOString()}`
const expectedVars = {
  search: expectedSearchString
}

describe('the issue-checker', () => {

  afterAll(() => {
    // Restore
    jest.restoreAllMocks()
  })

  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(issueChecker, "currentDate").mockImplementation(() => { 
        return date 
    })
  })

  it('should build the proper query and return a score of 1', () => {
    
    octoClient = github.getOctokit('token')
    jest.spyOn(octoClient, "graphql").mockImplementation((query, vars) => {
        expect(query).toBe(issueChecker.query)
        expect(vars).toStrictEqual(expectedVars)

        return {
            issueCount: 8
        }
    })

    const score = issueChecker.check(repo, owner, octoClient)
    expect(score).toBe(1)
  })

  it('should build the proper query and return a score of 0', () => {
    
    octoClient = github.getOctokit('token')
    jest.spyOn(octoClient, "graphql").mockImplementation((query, vars) => {
        expect(query).toBe(issueChecker.query)
        expect(vars).toStrictEqual(expectedVars)

        return {
            issueCount: 0
        }
    })

    const score = issueChecker.check(repo, owner, octoClient)
    expect(score).toBe(0)
  })

})
