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
*([Link](#testing-prereleases))*

The CDO ontology Git repositories (including [CASE's ontology repository](https://github.com/casework/CASE/) and [UCO's](https://github.com/ucoProject/UCO/)) follow the ["Git-flow"](#branching-cdo-git-flow) branching model.  There is additional consideration put into processing the `develop` and feature branches:

* `develop` - This is the branch where all proposals that have undergone committee review and affirmative votes have been merged, and are effectively staged for the upcoming release.
* Feature branches - these other branches split off of `develop`, and undergo revisions as committee input and test results are processed.

Part of the testing process for the ontology is assessing impact of proposals, across tooling and existing example data.  To assist with this review, CASE provides "Prerelease" ontology builds, available here:

* [https://caseontology.org/ontology/CASE-develop.ttl](https://caseontology.org/ontology/CASE-develop.ttl)
* [https://caseontology.org/ontology/CASE-unstable.ttl](https://caseontology.org/ontology/CASE-unstable.ttl)

These are monolithic and syntax-normalized builds of the CASE and UCO ontologies.  Their states are used to review each of the CASE examples, and their validation [SHACL](https://www.w3.org/TR/shacl/) results are stored as files alongside the examples' source materials.  For instance, here are the current validation results for the [website's Asgard example](https://caseontology.org/examples/asgard/):

* [Versus the current release](https://github.com/casework/casework.github.io/blob/master/examples/asgard/asgard_validation.ttl)
* [Versus the develop state](https://github.com/casework/casework.github.io/blob/master/examples/asgard/asgard_validation-develop.ttl)
* [Versus the unstable state](https://github.com/casework/casework.github.io/blob/master/examples/asgard/asgard_validation-unstable.ttl)

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
*([Link](#profiles))*

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


<a id="shapes" style="padding-top: 5em;"></a>
# Shapes
*([Link](#shapes))*

Among the objectives within CDO repositories are interchange, and semantic interoperability, of data.  One of the steps in establishing semantic interoperability is having clear syntactic rules of usage of various ontologies' predicates.

Within CDO, ontologies make extensive use of [SHACL](https://www.w3.org/TR/shacl/) to simultaneously define concepts and their requirements of usage within graphs.  Many other ontologies exist based on [OWL](https://www.w3.org/TR/2012/REC-owl2-primer-20121211/), which provides a language for knowledge expansion, but fewer mechanisms than SHACL for data validation.  Some invalid data can be recognized with OWL, such as declaring an individual to be a member of two disjoint classes (which translates to a logical inconsistency that the Empty Set has something in it).  But certain requirements can't be tested with OWL due to its "Open world" model, such as minimal cardinality of a property unrelated to other classes or properties: if an individual is specified by OWL to have a certain property used exactly once (such as a `ex:Screw` having exactly one integer `ex:threadCount` value), and the graph doesn't have it, OWL assumes the value exists, but just isn't specified.  SHACL considers this a data error.  OWL doesn't consider 0 distinct specified values a data error, but does consider 2 distinct values to be a data error.

Other ontologies encoded in OWL often provide exploration and coverage of concepts that are not in the scope of CDO outside of specific applications, or that might be close enough to fulfilling a CDO core need that the ontology is considered for adoption by one of the CDO ontologies.  CDO applications wishing to use that external ontology often still have a desire or requirement to provide data validation capabilities, which might not be directly available if the external ontology does not provide a "closed world" rule set.  Worse, if there is an error in the OWL syntax provided by the external ontology---even one inconsequential to most of the model---OWL ontology validators have the potential to fixate on that error and possibly obscure errors that are more directly relevant to end users among their knowledge graphs' nodes.

To bridge potential understanding gaps, and to better understand external ontologies, CDO provides SHACL shapes for external ontologies when they fit some need anywhere within the CDO ecosystem.  SHACL shapes are provided as a set of repositories on GitHub, each scoped to a particular external ontology.  Because SHACL can provide validation rules for any RDF, the shapes are not necessarily limited to OWL ontologies - shapes are provided for the OWL language itself, having been started for [UCO Issue 406](https://github.com/ucoProject/UCO/issues/406); and some shapes have been explored for non-OWL RDF schemata, having been started in [CASE-Corpora](https://github.com/casework/CASE-Corpora/tree/main/shapes).

The shape repositories can be found on GitHub or on the [CDO Project Release Flow](https://cyberdomainontology.org/resources/project_release_flow.html) diagram, searching for "`-Shapes-`".


## Practices

The shape repositories follow these practices:

* Each repository is conceptually scoped to one RDF-based data model.
* The RDF Schema or OWL Ontology that is the repository's focus is version-controlled in a form normalized like other CDO ontologies, under the repository's `/dependencies` directory.
   - The method of how the file came to be there is also version-controlled, and will typically be by reformatting a file from a Git submodule, or by downloading from its ontology-serving IRI.
   - The reasons for tracking a copy of the file include, but are not limited to:
      * Reducing the syntaxes needed for CDO users (CDO's graphs are managed in Turtle and JSON-LD);
      * "Pinning" an external ontology version throughout CDO;
      * Addressing issues with intermittent resource unavailability due to networked resource outage;
      * Addressing syntax issues in either the concrete serialization language or OWL concept usage, which if not addressed prevent consumption of the ontology in OWL-focused tooling.  When these occur, a new `owl:versionIRI` specialized to the CDO shapes repository is inlined, with a note that the file is different from its authoriative version, is non-authoritative, and is being provided with this IRI only until the fix is addressed by the authoritative versions' maintainers.
* The shapes graph is reviewed with unit test processes, and exercised in Continuous Integration against a graph of exemplar individuals.
* The shapes repository will follow either ["Continuous-release" branching](#branching-cdo-continuous) or ["Git-flow" branching](#branching-cdo-git-flow) as described in this document, according to its known usages and/or any received requests.
   - If the shapes repository follows "Git-flow" branching, [SEMVER versioning](https://semver.org/) is used.  Decisions on release schedules for SEMVER-major releases will allow for feedback from known adopters.
      * For example, the shapes repository specific to reviewing OWL ontology syntax will have SEMVER-major releases decided by the UCO Ontology Committee, due to its [original implementation](https://github.com/ucoProject/UCO/issues/406) having been part of UCO 1.0.0.
   - If the shapes repository follows "Continuous-release" branching, users are encouraged to track the repository with a Git submodule and encode some kind of referential-freshness review mechanism, such as in the scheduled `check-supply-chain-submodules` target in [CASE-Corpora's root Makefile](https://github.com/casework/CASE-Corpora/blob/main/Makefile).

The shape graphs follow the below practices.

* The external ontology is imported with `owl:imports`.
   - This is to catch when a knowledge base imports two potentially conflicting versions of the same ontology, using OWL's import rules (referring to OWL 2 Syntax sections [3.1](https://www.w3.org/TR/owl2-syntax/#Ontology_IRI_and_Version_IRI) and [3.3](https://www.w3.org/TR/owl2-syntax/#Versioning_of_OWL_2_Ontologies)).
* OWL property domains and ranges using `rdfs:domain` and `rdfs:range` are turned into SHACL constraints that raise `sh:Violation`-severity validation results when not satisfied by input graphs.
   - For applications that perform OWL and/or RDFS expansion of input graphs before running SHACL validation, this should mean the domain and range statements should not raise a SHACL violation.
   - RDF property domain and range specifications are adpated the same as OWL properties, when using `rdfs:domain` and `rdfs:range`.
   - RDF property domain-like and range-like specifications (those using something like `domainIncludes` and `rangeIncludes`) are adapted like OWL properties, except they will raise `sh:Info`-severity validation results.  This is because expansion (/inference) semantics are not currently known to be defined outside of usage of `rdfs:domain` and `rdfs:range`, so a gentler notice is given instead to encourage review of whether the flagged graph-individuals should carry the suggested type assertion.
* Shape graphs are not known to be compatible, and make no claims of compatibility, with usage of `owl:sameAs`.
* `owl:FunctionalProperty`s and `owl:InverseFunctionalProperty`s are turned into class-independent SHACL maximum-count-one constraints.
* `owl:Restriction`s using `owl:allValuesFrom` are turned into class-specific SHACL constraints.
* `owl:Restriction`s using `owl:maxCardinality` or `owl:maxQualifiedCardinality` are turned into class-specific SHACL maximum-count constraints.
* `owl:Restriction`s using `owl:someValuesFrom`, `owl:minCardinality`, or `owl:minQualifiedCardinality` are ignored.
   - While OWL's open world assumption allows for a node to be expected to exist, raising a SHACL result when one is not found is likely to be more harm than help.  To quell that result, a node would need to be invented, and there are too-possible scenarios where that would not be appropriate because one might be found later in a workflow, and would then need to be de-conflicted with the invented node.  (This also pertains to the shapes graphs not attempting compatibility with `owl:sameAs`.)  For `owl:DatatypeProperty`s, this is further stymied by OWL lacking an explicit "Null" or "Not yet known" literal-value that could be used as a stand-in value.


## Notes

At this time, no programmatic support is provided to convert an OWL ontology into a SHACL graph.  Some procedures are known to be algorithmically specifiable---for instance, most of the above list is likely scriptable.  However, at least one community member's experience has found defining SHACL shapes to be a beneficial exercise in actively reading ontologies, as well as finding challenges in defining rules pertaining to some OWL constructs.

Last, the shape graphs have a goal of not needing to be provided by CDO.  Data validation is a significant, general need in workflows.  Those best suited to provide validation rulesets for an ontology are the maintainers of that ontology.  Should a non-CDO ontology maintainer become interested in adopting and incorporating a CDO shapes graph and/or test suite into their software, CDO welcomes this opportunity for exchange and transfer of knowledge.
