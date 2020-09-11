# Contributing to Constable
Hi there! Thanks for taking the time to contribute to our github repo.

The following is a set of guidelines for contributing to our repository which has an implementation of automated code and file review i.e look for the presence of files, correct references, review if releases exist, etc. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

# Code of Conduct
This project and everyone participating in it is governed by our [Code of Conduct](./CODE-OF-CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to ygangwa@ncsu.edu.

# How To Contribute

## Tools

### Editing

Contributing to this repository requires that you use an editor that supports the following tools.

#### [EsLint](https://eslint.org/)

For javascript style. See the `.eslintrc.json` file

#### [EditorConfig](https://EditorConfig.org) 

For things like tabs, spaces, encodings, etc. See the `.editorconfig` file 

### Testing

Testing is important. We utilize `jest` for our unit tests and continually run tests via GitHub actions for pull requests and pushes directly to main. If you open a pull request, you will need to pass the CI tests in order to merge changes.

### The Kanban Board for Constable.

The [Kanban Board](https://github.com/dangoslen/constable-github-action/projects/1) is used for all issues/feature requests. All items that require any code changes should be converted to issues, tagged with the appropriate milestone, and then progress can be tracked using issues.

### Pull Requests

The process described here has several goals:

- Maintain quality
- Fix problems that are important to users
- Engage the community by creating a contributable environment

Please follow these steps to have your contribution reviewed by the maintainers:

1. Include a clear and descriptive title.
2. Include a description of the change.

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Attribution

The Contributing guidelines above are adapted from [Atom][homepage].

[homepage]: https://github.com/atom/atom
