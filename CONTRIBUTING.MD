# Contributing to NTUCourses

We would love for you to contribute to NTUCourses and help make it even better than it is today! As a contributer, here are the guidelines we would like you to follow:

- [Code of Conduct](#)
- [Question or Problem?](#)
- [Issues and Bugs](#)
- [Feature Requests](#)
- [Submission Guidelines](#)
- [Coding Rules](#)
- [Commit Message Guidelines](#)

## Code of Conduct

Help us keep NTUCourses open and inclusive. Please read and follow our [Code of Conduct](#).

## Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#) to our [GitHub Repository](#). Even better, you can [submit a Pull Request](#) with a fix.

## Missing a Feature?

You can _request_ a new feature by [submitting an issue](#) to our GitHub Repository. If you would like to _implement_ a new feature, please consider the size of the change in order to determine the right steps to proceed:
- For a __Major Feature__, first open an issue and outline your proposal so that it can be discussed. This process allows us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
- __Small Features__ can be crafted and directly [submitted as a Pull Request](#).

## Submission Guidelines

### Submitting as Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we require that you provide a minimal reproduction. Having a minimal reproducible scenario gives us a wealth of important information without going back and forth to you with additional questions.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

We require a minimal reproduction to save maintainers' time and ultimately be able to fix more bugs. Often, developers find coding problems themselves while preparing a minimal reproduction. We understand that sometimes it might be hard to extract essential bits of code from a larger codebase but we really need to isolate the problem before we can fix it.

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you, we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by selecting from our [new issue templates](#) and filling out the issue template.

### Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:
1. Search [GitHub](#) for an open or closed PR that relates to your submission. You don't want to duplicate existing efforts.
2. Be sure that an issue describes the problem you're fixing, or document the design for the feature you'd like to add. Discussing the design upfront helps to ensure that we're ready to accept your work.
3. Fork the alanwuha/ntucourses repo.
4. Make your changes in a new git branch:
```
git checkout -b my-fix-branch master
```
5. Create your patch, _including appropriate test cases__.
6. Follow our [Coding Rules](#).
7. Run the full NTUCourses test suite, as described in the [developer documentation](#), and ensure that all tests pass.
8. Commit your changes using a descriptive commit message that follows our [commit message conventions](#). Adherence to these conventions is necessary because release notes are automatically generated from these messages.
```
git commit -a
```
Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.
9. Push your branch to GitHub:
```
git push origin my-fix-branch
```
10. In GitHub, send a pull request to `ntucourses:master`.
If we ask for changes via code reviews then:
- Make the required updates.
- Re-run the NTUCourses test suits to ensure tests are still passing.
- Rebase your branch and force push to your GitHub repository (this will update your Pull Request):
```
git rebase master -i
git push -f
```
That's it! Thank you for your contribution!

__After your pull request is merged__

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:
- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:
```
git push origin --delete my-fix-branch
```
- Check out the master branch:
```
git checkout master -f
```
- Delete the local branch:
```
git branch -D my-fix-branch
```
- Update your master with the latest upstream version:
```
git pull --ff upstream master
```

## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:
- All features or bug fixes __must be tested__ by one or more specs (unit-tests).
- All public API methods __must be documented__.
- We follow [Google's JavaScript Style Guide](#) and [Google's Python Style Guide](#), but wrap all code at __100 characters__.
  An automated formatter is available, see [DEVELOPER.md](#).

## Commit Message Format

_This specification is inspired and supersedes the [AngularJS commit message format](#)._

We have very precise rules over how our Git commit messages must be formatted. This format leads to __easier to read commit history__.

Each commit message consists of a __header__, a __body__, and a __footer__.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The `header` is mandatory and must conform to the [Commit Message Header](#) format.

The `body` is mandatory for all commits except for those of scope "docs". When the body is required it must be at least 20 characters long.

The `footer` is optional.

Any line of the commit message cannot be longer than 100 characters.

__Commit Message Header__

```
<type>: <short summary>
  |             |
  |             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  | 
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|style|test
```

The `<type>` and `<summary>` fields are mandatory.

__Type__

Must be one of the following:
- __build__: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- __ci__: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- __docs__: Documentation only changes
- __feat__: A new feature
- __fix__: A bug fix
- __perf__: A code change that improves performance
- __refactor__: A code change that neither fixes a bug nor adds a feature
- __test__: Adding missing tests or correcting existing tests

__Summary__

Use the summary field to provide a succint description of the change:
- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- not dot (.) at the end

__Commit Message Body__

Just as in the summary, use the imperative, present tense: "fix" not "fixed" nor "fixes".

Explain the motivation for the change in the commit message body. This commit message should explain _why_ you are making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.

__Commit Message Footer__

The footer can contain information about breaking changes and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to.

```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

Breaking Change section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

### Revert commits

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.

The content of the commit message body should contain:
- information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`,
- a clear description of the reason for reverting the commit message.
