---
title: Development of CDO Ontologies
---

This page houses practices followed for development of CDO ontologies.  It is the result of needs identified over the early years of CDO ontologies' socialization and software review processes.  Before the 1.0.0 release of the CDO ontologies, it is likely practices on this page will continue to adapt as workflows are refined.


<a id="review-checklists" style="padding-top: 5em;"></a>
# Review checklists
*([Link](#review-checklists))*

GitHub repositories for CDO ontology development use the following checklist templates for coordinating the issue's progression with the respective ontology committee.  To enable GitHub progress-tracking (based on checkbox counts), these templates are inlined as edits into the initial Issue or Pull Request description, as an [edit](https://docs.github.com/en/communities/moderating-comments-and-conversations/tracking-changes-in-a-comment) by OC Chair or Coordinator.

Due to a display issue with website font colors, the checklists are presented in the `CONTRIBUTE.md` file in the website's source repository, [here](https://github.com/Cyber-Domain-Ontology/cdo.github.io/blob/main/CONTRIBUTE.md#review-checklists).


# Branching

GitHub repositories in CDO follow two branching practices:


<a id="branching-cdo-git-flow" style="padding-top: 5em;"></a>
## "Git-flow" branching
*([Link](#branching-cdo-git-flow))*

The "Git-flow" branching model used by CDO is based on the [description](https://nvie.com/posts/a-successful-git-branching-model/) by Vincent Driessen, dated 2010-01-05.  Repositories following this branch model generally expect most development to be done in "Feature" branches, branching off of `develop`.  The "Primary" branch (typically named `master` or `main`) designates releases with tags and the GitHub release-list interface.

In this branching model, pull requests should target the `develop` branch, not the primary branch. 

The head of the primary branch is typically the current release.  There may be some non-release commits made on the primary branch due to needing to program components of GitHub interface elements.


<a id="branching-cdo-continuous" style="padding-top: 5em;"></a>
## "Continous-release" branching
*([Link](#branching-cdo-continuous))*

This branching model is used for repositories that do not designate releases.  The head of the primary branch (`master` or `main`) is the "Current release."

In this branching model, pull requests should target the primary branch.


# Testing


<a id="testing-prereleases" style="padding-top: 5em;"></a>
## Testing prereleases

The CDO ontology Git repositories (including [CASE's ontology repository](https://github.com/casework/CASE/) and [UCO's](https://github.com/ucoProject/UCO/)) follow the ["Git-flow"](#branching-cdo-git-flow) branching model.  There is additional consideration put into processing the `develop` and feature branches:

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

(The `-Archive` repositories are not "GitHub forks", in order to prevent interface confusion from Pull Requests.  They do, however, share the `master` and `develop` branch histories.)

What makes the `unstable` branch worth its own archive repository is *the branch will not guarantee preservation of its own Git history*.  Feature branches split off of `develop`, but do not have a single stable joining point in the ontology development repository where all of their effects can be considered in aggregate.  Yet, it is important to discover when in-flight proposals might conflict with one another, and sometimes this is only visible when considering all at once.  Meanwhile, the order in which these branches are tested might not be the order in which they are voted upon and accepted into `develop` by the committee.

The `unstable` branch will be reset to `develop`, by the Ontology Committee Chair, Coordinator, or Product Manager, with some left-undefined frequency.  To ensure access to prior states of the `unstable` branch, the `-Archive` repository will maintain named branches at the time of reset, e.g. [`archive/unstable-2022-04-01`](https://github.com/casework/CASE-Archive/tree/archive/unstable-2022-04-01).  (This can benefit users who test by using [Git submodules](https://git-scm.com/docs/git-submodule) and/or [Git Bisect](https://git-scm.com/docs/git-bisect), rather than website downloads.  The [CASE-Examples repository](https://github.com/casework/CASE-Examples/) and CASE website both track with submodules.)

To summarize, if a developer wishes to test against some "Prerelease" state:

* The `CASE-develop.ttl` file includes every proposal accepted for the next release.
   - Branches merged into the `develop` branch today are **not guaranteed** to be merged in tomorrow.  However, so far, merge reversions have been rare.
* The `CASE-unstable.ttl` file includes proposals accepted, and some (possibly all) proposals proposed, for the next release(s).
   - Branches merged into the `unstable` branch today are **not guaranteed** to be merged in tomorrow.
* These ontology builds can be downloaded from the website if one's development follows a "Nightly build" practice.
* These ontology builds can be "frozen" by tracking the [website repository](https://github.com/casework/casework.github.io/) as a Git submodule.


<a id="profiles" style="padding-top: 5em;"></a>
# Profiles

The ontologies within CDO, including UCO, are designed as "mid-level" domain ontologies, generally but not entirely scoped within the cyber domain.  A "mid-level" ontology is distinct from ["top-level" (aka "foundational" or "upper") ontologies](https://en.wikipedia.org/wiki/Upper_ontology).  The rationale for being "mid-level" has been to avoid excluding other potential ontological alignments that exist as independent efforts modeling other domains, such as [provenance](https://www.w3.org/TR/prov-o/).  Because top-level ontologies are generally not compatible with one another ("Foundational" typically being a distinct status within a knowledge model), to adopt one top-level ontology potentially declines interoperability with another and all adopters of the other.  Similarly, other ontologies that do not consider themselves "top-level" are not necessarily compatible with any "top-level" ontology that might be adopted.

CDO ontologies have need of adopting existing efforts in other domains, especially when there is a demonstrated need for something that is adjacent to the cyber domain, such as photographing physical objects.  UCO can provide description of the camera; CASE, the photograph-subject's relevance to an investigation; but, neither CASE nor UCO have, say, the class of [Motorcycle](https://schema.org/Motorcycle)s as photograph-subject in their scope, nor the photograph's location being "near" [this particular conceptualization of the Washington Monument](https://www.geonames.org/4141033/).

UCO can explore alignment between, say, `uco-location:Location` and [GeoNames' `Feature`](https://www.geonames.org/ontology#Feature), but should not do so at the expense of other geospatial representations, such as [GeoSPARQL 1.1's `Feature`](https://github.com/opengeospatial/ogc-geosparql/blob/master/1.1/geo.ttl#L946), or [BFO 2.0's `spatial region`](https://github.com/BFO-ontology/BFO/blob/v2019-08-26/releases/2.0/bfo.owl#L499).  To explore alignment, CDO ontologies are using "Profile" repositories on Github.

Profiles serve three use cases, which have different strategic objectives:

* A **top-level** profile - The objective is grounding, finding inconsistencies in CDO's ontology or between different groundings.
* An **adopting** profile - The objective is improving quality of existing CDO usage; improving interoperability; and improving development efficiency for the CDO community.
* A **mimicking** profile - The objective is as with the **adopting** profile use case, except for a difference in conclusion.  The other ontology in a mimicking case would not be imported, e.g., due to finding something disagreeable with CDO needs, whether in knowledge model (such as being an RDFS model incompatible with OWL), or maintenance (such as being abandoned).  The experiential re-use still improves development efficiency for CDO.

Though the objectives for each of these use cases differ significantly, the overall implementation method remains consistent for the three, except for the mimicking profile declining to relate UCO to the external ontology with subclassing.

Each "Profile" repository follows this pattern:

* The repository tracks its corresponding CDO ontology, and some external ontology, as Git submodules.
* A new ontology is defined that imports the CDO ontology and the external ontology.
* The new ontology declares the CDO concept as a subclass of the external concept.
   - For example, in the UCO Profile for BFO, `uco-role:Role` would be a subclass of [BFO 2.0's `role`](https://github.com/BFO-ontology/BFO/blob/v2019-08-26/releases/2.0/bfo.owl#L974), and `uco-identity:Person` would be a subclass of BFO 2.0's `material entity` (per the example of "[a human being](https://github.com/BFO-ontology/BFO/blob/v2019-08-26/releases/2.0/bfo.owl#L1379)").
* As CDO classes are aligned with external classes, certain relationships between classes or properties are inherited.
   - For example, with the noted BFO-based subclassings of `uco-role:Role` and `uco-identity:Person`, UCO's `Role` and `Person` are disjoint classes due to the class hierarchy in BFO.  (In BFO, this ultimately comes from the [disjointedness](https://github.com/BFO-ontology/BFO/blob/v2019-08-26/releases/2.0/bfo.owl#L436) of `independent continuant` and `specifically dependent continuant`.)  Importing the disjointedness relationship between `Role` and `Person` back into UCO brings UCO a step closer to aligning with use cases involving BFO, without inducing a commitment to UCO adopting BFO.

These repositories can be brought together to review how well current examples adhere to the profiles' ontological alignments, whether by confirming graph-individuals' disjointedness through RDFS expansion, or through a consistency review through OWL-DL expansion.  (A Github repository attempting this is currently under development.)  Bringing these profiles together is one reason the CDO class is a subclass of the external class, rather than an equivalent class.  One of the objectives is to explore whether multiple profiles reveal an inconsistency in unrelated ontologies, when exercised in a CDO example.  (The other reason equivalent-class designations are avoided is to avoid inappropriate scope-expansions of CDO rules within adopters' knowledge graphs, such as individuals under UCO hierarchies generally being [urged to end with UUIDs](https://github.com/ucoProject/UCO/blob/1.0.0/ontology/uco/core/core.ttl#L429).)

These repositories are each designated as "Exploratory".  Their contents are neither official, versioned beyond Git commit mechanisms, nor subject to Ontology Committee workflows for revisions.  They are expected to change as modeling needs are demonstrated through new class, property, and example development.  Those wishing to adopt a Profile are encouraged to do so using a Git submodule.  Contributions or requests for alignment explorations are welcome.
