const github = require("@actions/github")
const issueChecker = require('../src/issue-checker')

const owner = "owner"
const repo = "repo"
const date = new Date("September 30, 2019")
const thirtyDaysAgo = new Date("August 31, 2019")

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

  it('should build the proper query', () => {
    
    const expectedVars = {
        repo: repo,
        owner: owner,
        endDate: date.toDateString(),
        startDate: thirtyDaysAgo.toDateString(),
    }

    octoClient = github.getOctokit('token')
    jest.spyOn(octoClient, "graphql").mockImplementation((query, vars) => {
        expect(query).toBe(issueChecker.query)
        expect(vars).toStrictEqual(expectedVars)

        return {
            issueCount: 8
        }
    })

    const issueCount = issueChecker.check(repo, owner, octoClient)
    expect(issueCount).toBe(8)
  })

})
