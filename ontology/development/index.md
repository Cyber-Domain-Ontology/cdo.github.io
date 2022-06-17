---
title: Development of CDO Ontologies
---

This page houses practices followed for development of CDO ontologies.  It is the result of needs identified over the early years of CDO ontologies' socialization and software review processes.  Before the 1.0.0 release of the CDO ontologies, it is likely practices on this page will continue to adapt as workflows are refined.


# Review checklists

Github repositories for CDO ontology development use the following checklist templates for coordinating the issue's progression with the respective ontology committee.  To enable Github progress-tracking (based on checkbox counts), these templates are inlined as edits into the initial Issue or Pull Request description, as an [edit](https://docs.github.com/en/communities/moderating-comments-and-conversations/tracking-changes-in-a-comment) by OC Chair or Coordinator.

Due to a display issue with website font colors, the checklists are presented in the `CONTRIBUTE.md` file in the website's source repository, [here](https://github.com/Cyber-Domain-Ontology/cdo.github.io/blob/main/CONTRIBUTE.md#review-checklists).


# Branching

Github repositories in CDO follow two branching practices:


<a id="branching-cdo-git-flow" style="padding-top: 4em;"></a>
## "Git-flow" branching
*([Link](#branching-cdo-git-flow))*

The "Git-flow" branching model used by CDO is based on the [description](https://nvie.com/posts/a-successful-git-branching-model/) by Vincent Driessen, dated 2010-01-05.  Repositories following this branch model generally expect most development to be done in "Feature" branches, branching off of `develop`.  The "Primary" branch (typically named `master` or `main`) designates releases with tags and the Github release-list interface.

In this branching model, pull requests should target the `develop` branch, not the primary branch. 

The head of the primary branch is typically the current release.  There may be some non-release commits made on the primary branch due to needing to program components of Github interface elements.


<a id="branching-cdo-continuous" style="padding-top: 4em;"></a>
## "Continous-release" branching
*([Link](#branching-cdo-continuous))*

This branching model is used for repositories that do not designate releases.  The head of the primary branch (`master` or `main`) is the "Current release."

In this branching model, pull requests should target the primary branch.


# Testing


<a id="testing-prereleases" style="padding-top: 3em;"></a>
## Testing prereleases


CDO ontology Git repositories (e.g. [CASE's ontology repository](https://github.com/casework/CASE/) and [UCO's](https://github.com/ucoProject/UCO/)) follow the "Git Flow" branching model outlined on [this page](https://nvie.com/posts/a-successful-git-branching-model/).  That branching model identifies some points of varying degrees of stability, named as branches:

* `master` - This is the branch that receives tags for the current release of the ontology.
   - Note that due to some needs to program the interface provided by Github, especially Issue and Pull Request templates, some non-release commits are made against the `master` branch without triggering a tagged release.
* `develop` - This is the branch where all proposals that have undergone committee review and affirmative votes have been merged, and are effectively staged for the upcoming release.
* Feature branches - these other branches split off of `develop`, and undergo revisions as committee input and test results are processed.

Part of the testing process for the ontology is assessing impact of proposals, across tooling and existing example data.  To assist with this review, CASE provides "Prerelease" ontology builds, available here:

* [https://caseontology.org/ontology/CASE-develop.ttl](https://caseontology.org/ontology/CASE-develop.ttl)
* [https://caseontology.org/ontology/CASE-unstable.ttl](https://caseontology.org/ontology/CASE-unstable.ttl)

These are monolithic and syntax-normalized builds of the CASE and UCO ontologies.  Their states are used to review each of the CASE examples, and their validation SHACL results are stored as files alongside the examples' source materials.  For instance, here are the current validation results for the [website's Asgard example](https://caseontology.org/examples/asgard/):

* [Versus the current release](https://github.com/casework/casework.github.io/blob/master/examples/asgard/src/asgard_validation.ttl)
* [Versus the develop state](https://github.com/casework/casework.github.io/blob/master/examples/asgard/src/asgard_validation-develop.ttl)
* [Versus the unstable state](https://github.com/casework/casework.github.io/blob/master/examples/asgard/src/asgard_validation-unstable.ttl)

`CASE-develop.ttl` is built according to `develop` branch states of CASE and UCO, and thus incorporates all of the proposals that are committee-approved and staged for the next release.  `CASE-unstable.ttl` follows an implementation practice that is, well, unstable: Most, or all, proposals under consideration are merged into one branch, before committee review or approvals that would see the proposals merged into `develop`.

CDO ontologies maintain a `-Archive` Git repository ([CASE's](https://github.com/casework/CASE-Archive/), [UCO's](https://github.com/ucoProject/UCO-Archive/)), whose primary functions are these:

1. Serve an `unstable` branch that represents every proposal under committee consideration.
2. Store an archive of every prior state of the `unstable` branch.

(The `-Archive` repositories are not "Github forks", in order to prevent interface confusion from Pull Requests.  They do, however, share the `master` and `develop` branch histories.)

What makes the `unstable` branch worth its own archive repository is *the branch will not guarantee preservation of its own Git history*.  Feature branches split off of `develop`, but do not have a single stable joining point in the ontology development repository where all of their effects can be considered in aggregate.  Yet, it is important to discover when in-flight proposals might conflict with one another, and sometimes this is only visible when considering all at once.  Meanwhile, the order in which these branches are tested might not be the order in which they are voted upon and accepted into `develop` by the committee.

The `unstable` branch will be reset to `develop`, by the Ontology Committee Chair, Coordinator, or Product Manager, with some left-undefined frequency.  To ensure access to prior states of the `unstable` branch, the `-Archive` repository will maintain named branches at the time of reset, e.g. [`archive/unstable-2022-04-01`](https://github.com/casework/CASE-Archive/tree/archive/unstable-2022-04-01).  (This can benefit users who test by using [Git submodules](https://git-scm.com/docs/git-submodule) and/or [Git Bisect](https://git-scm.com/docs/git-bisect), rather than website downloads.  The [CASE-Examples repository](https://github.com/casework/CASE-Examples/) and CASE website both track with submodules.)

To summarize, if a developer wishes to test against some "Prerelease" state:

* The `CASE-develop.ttl` file includes every proposal accepted for the next release.
   - Branches merged into the `develop` branch today are **not guaranteed** to be merged in tomorrow.  However, so far, merge reversions have been rare.
* The `CASE-unstable.ttl` file includes proposals accepted, and some (possibly all) proposals proposed, for the next release(s).
   - Branches merged into the `unstable` branch today are **not guaranteed** to be merged in tomorrow.
* These ontology builds can be downloaded from the website if one's development follows a "Nightly build" practice.
* These ontology builds can be "frozen" by tracking the [website repository](https://github.com/casework/casework.github.io/) as a Git submodule.
