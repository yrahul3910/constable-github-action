const github = require("@actions/github")
const issueChecker = require('../src/issue-checker')

const repository = 'owner/repo'
const date = new Date("September 30, 2019")
const thirtyDaysAgo = new Date("August 31, 2019")
const expectedSearchString = `repo:${repository} is:issue is:closed closed:>${thirtyDaysAgo.toISOString()} closed:<${date.toISOString()}`
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

  it('should build the proper query and return a score of 1', async () => {
    
    octoClient = github.getOctokit('token')
    jest.spyOn(octoClient, "graphql").mockImplementation((query, vars) => {
        expect(query).toBe(issueChecker.query)
        expect(vars).toStrictEqual(expectedVars)

        return new Promise(resolve => {
          resolve({ search: { issueCount: 8 } })
        })
    })

    const score = await issueChecker.check(repository, octoClient)
    expect(score).toBe(1)
  })

  it('should build the proper query and return a score of 0', async () => {
    
    octoClient = github.getOctokit('token')
    jest.spyOn(octoClient, "graphql").mockImplementation((query, vars) => {
        expect(query).toBe(issueChecker.query)
        expect(vars).toStrictEqual(expectedVars)

        return new Promise(resolve => {
          resolve({ search: { issueCount: 0 } })
        })
    })

    const score = await issueChecker.check(repository, octoClient)
    expect(score).toBe(0)
  })

})
