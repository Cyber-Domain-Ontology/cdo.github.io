---
title: Development of CDO Ontologies
---

This page houses practices followed for development of CDO ontologies.  It is the result of needs identified over the early years of CDO ontologies' socialization and software review processes.  Before the 1.0.0 release of the CDO ontologies, it is likely practices on this page will continue to adapt as workflows are refined.

# Ontology Committee 

The CDO ontologies are community developed and governed. This section describes the requirements to support contributions by community members, e.g., the various committees that exist, becoming a member of a committee, submitting Change Proposals, the voting procedures that apply, and more.

## Voting procedures

### CP Requirements 
A Change Proposal (CP) describes requirements and competencies that are deemed necessary by any member to include in an ontology. To submit a CP it suffices to create either a [UCO Issue](https://github.com/ucoProject/UCO/issues/new/choose) or a [CASE Issue](https://github.com/casework/CASE/issues/new/choose), select the ***Change Request*** form and specify your request accordingly. The Ontology Committee chair or coordinator will process your request and will, in close collaboration with you, clarify any questions that may rise and/or complete it with additional information when deemed necessary. For instance, in processing your request it will be determined whether the CP falls within the scope of the CASE or the UCO ontology and will move it to the appropriate git space, if necessary.

#### Posting and Scheduling
The Ontology Committee Coordinator notifies the Ontology Committee of the meeting at which the CP will be initially reviewed. The Ontology Committee Chair and Coordinator determine the date of the initial review, allowing a minimum of ten days between the posting of the CP and the Ontology Committee meeting, in order to allow time for members to review the proposal prior to the meeting.

#### CP Requirements Review
The purpose of the requirements review is to evaluate whether the CDO Community has a need for the competencies proposed in the CP and should engage resources to address it. 

The Coordinator shall provide a listing of CPs to be considered at the next Ontology Committee meeting, including linked access to the submitted CP forms and any supporting materials, along with the mechanism for providing review comments.

Ontology Committee members shall review CPs prior to the committee meeting. Written comments should be submitted not later than twenty-four hours before the meeting. At the option of the Ontology Committee Chair, new comments may be contributed at the meeting during the discussion, if there is time. The Chair may request one or more individual Ontology Committee members to analyze a submitted CP and prepare a report on the impact of its requested changes to the CDO ontology and/or to recommend the priority of its requirements.

At the meeting, the Ontology Committee Chair (or their designate) shall brief each scheduled CP to the Ontology Committee, including a summary of any comments received during the review period. (CP submitters should coordinate with the Ontology Chair if they wish to brief their own CP.) During the meeting, the Ontology Committee should evaluate each CP for need, relevance, urgency, coherence, alternative Community positions, the feasibility of proposed changes, and the scope of the proposed competencies.


#### CP Requirements Vote

The Ontology Committee shall vote to decide whether the briefed CP proposes changes that are required by the CASE standard. Voting shall conform to the requirements described in the **...**

*--> PB: Does the following still hold?*
> **...** CASE Community Bylaws, clause 8.3 (Article VIII, Section C).

*--> PB: If not, shall we include that part of the bylaws here?*

The voting options for a CP Requirements Review are: “Yes”, “No” and “Abstain”. Positive voting outcomes shall proceed as described in the CP Solutions section. If the Requirements Review results in a negative vote, then the Coordinator shall report the decision to the submitter(s), and the outcome and the reason for non-approval are recorded on the CP, which is then closed.

The Chair may postpone a vote in cases where the Chair or other Committee members want additional information written into the submitted proposal, requiring more time. Reasons to postpone should only be reasons pertaining to refinement of the proposal, or for lack of a present quorum of voting members. The Chair may request more information from submitters or may assign other Ontology Committee members to further evaluate a request. In those cases, the Requirements Review is extended to the next meeting of the Ontology Committee. Postponement of a vote is reported to the original submitter(s) by the Coordinator.

Where a vote is required, the the responsible CDO Ontology Committee (CASE OC or UCO OC) will vote to accept or reject, meaning that if the changes or products adhere to ...

*--> PB: Does the following still hold? Do we need to merge the Bylaws?*
> ... Article III principles ...

... and if 60% or more of the appointed voting committee members, or their self-appointed proxies, vote in the affirmative, then the measure is passed.

*--> PB: I suggest to move the following to (any of) the Bylaws* 
> Voting Limits and Committee Composition: no committee chairperson shall appoint more than one voting member representing any single employer. Additional employees representing the same employer may serve as non-voting members of the same committee. Three or more employers must be represented on each technical committee.


Following the Ontology Committee meeting at which the requirements vote is taken, the Coordinator shall update the status of the considered CP in the Ontology Committee collaboration workspace. The Coordinator shall report to stakeholders any CP that was not approved, with the reason for non-approval. This includes reporting postponed requests.


### CP Solutions 

*--> PB: to be done*

# Review checklists

Github repositories for CDO ontology development use the following checklist templates for coordinating the issue's progression with the respective ontology committee.  To enable Github progress-tracking (based on checkbox counts), these templates are inlined as edits into the initial Issue or Pull Request description, as an [edit](https://docs.github.com/en/communities/moderating-comments-and-conversations/tracking-changes-in-a-comment) by OC Chair or Coordinator.

Due to a display issue with website font colors, the checklists are presented in the `CONTRIBUTE.md` file in the website's source repository, [here](https://github.com/Cyber-Domain-Ontology/cdo.github.io/blob/main/CONTRIBUTE.md#review-checklists).


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
