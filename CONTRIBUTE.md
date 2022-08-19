## Testing website edits locally

The following script can take a fresh Ubuntu VM and get a local copy of the website running. The `bundle exec` call at the end reports the URL to use, typically http://localhost:4000/.

```bash
#!/bin/bash

# This software was developed at the National Institute of Standards
# and Technology by employees of the Federal Government in the course
# of their official duties. Pursuant to title 17 Section 105 of the
# United States Code this software is not subject to copyright
# protection and is in the public domain. NIST assumes no
# responsibility whatsoever for its use by other parties, and makes
# no guarantees, expressed or implied, about its quality,
# reliability, or any other characteristic.
#
# We would appreciate acknowledgement if the software is used.

# This script will clone the CASE website repository under ~/local/src,
# if not already cloned there, and execute a local Jekyll build of the
# website for testing in a browser.
# This script has been tested in an Ubuntu environment.

set -x
set -e
set -u

# Guarantee website-essential packages installed.
# dpkg tip for confirming package installation via:
#   https://stackoverflow.com/a/1298103
run_install=no
dpkg -s git \
  || run_install=yes
dpkg -s jekyll \
  || run_install=yes
dpkg -s zlib1g-dev \
  || run_install=yes
if [ "xyes" == "x${run_install}" ]; then
  sudo apt install \
    --yes \
    git \
    jekyll \
    zlib1g-dev
fi

mkdir -p ${HOME}/local/src
pushd ${HOME}/local/src
  if [ ! -d cdo.github.io ]; then
    git clone \
      https://github.com/Cyber-Domain-Ontology/cdo.github.io.git
  fi

  pushd cdo.github.io
    bundle --version \
      || sudo gem install bundler:2.0.2

    bundle install \
      --path vendor/bundle

    # Serve built website.
    # Via:
    #   https://help.github.com/en/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll
    bundle exec jekyll serve
  popd #cdo.github.io
popd #${HOME}/local/src
```


## Review checklists

These checklists are documented on the [Development of CDO Ontologies page](https://cyberdomainontology.org/ontology/development/#review-checklists).  Due to a display issue with website font colors, they are presented here.


### Issue progress

```markdown
# Coordination

- Tracking in Jira ticket [TODO](#TODO-link)
<!--
Include in administrative review how well the competencies demonstrate the requirements.
-->
- [ ] Administrative review completed, proposal announced to Ontology Committees (OCs) on TODO-date
- [ ] Requirements to be discussed in OC meeting, date TBD
<!--
If this is deemed a "Fast-track" proposal, delete the above line and Requirements Review vote line.
-->
- [ ] Requirements Review vote has not occurred
<!--
One of these lines can be swapped in when ready:
- [ ] Requirements Review vote is open until TODO-datetime
- [x] Requirements Review vote occurred, passing, on TODO-date
- [x] Requirements Review vote occurred, not passing and not planned to revisit, on TODO-date
In event of the latter, delete the remainder of the list.
-->
- [ ] *Requirements development phase completed.*
- [ ] Solution announced to OCs on TODO-date
- [ ] Solutions Approval to be discussed in OC meeting, date TBD
- [ ] Solutions Approval vote has not occurred
<!--
One of these lines can be swapped in when ready:
- [ ] Solutions Approval vote is open until TODO-datetime
- [x] Solutions Approval vote occurred, passing, on TODO-date
- [x] Solutions Approval vote occurred, not passing, on TODO-date
In event of the latter, delete the remainder of the list.
-->
- [ ] *Solutions development phase completed.*
- [ ] [Implementation](#TODO-link-to-resolved-PR) merged into `develop`
<!--
This line can be swapped in when ready:
-->
- [ ] Milestone linked
- [ ] Documentation logged in pending release page
```


### Pull request review

To be inlined into the initial Pull Request description, as an edit by OC Chair or Coordinator:

```markdown
Review steps taken:

- Tracking in Jira ticket [TODO](#TODO-link) (if no Issue is associated)
- [ ] Pull request is against correct branch
- [ ] CI passes in (CASE/UCO) feature branch
- [ ] CI passes in (CASE/UCO) current unstable branch ([merge-commit](#TODO-commit))
- [ ] Impact on SHACL validation [reviewed](#TODO-commit) for CASE-Examples
- [ ] Impact on SHACL validation [remediated](#TODO-commit) for CASE-Examples <!--In primary or feature branch, no ...validation-unstable.ttl files show negative impact from PR.-->
- [ ] Impact on SHACL validation [reviewed](#TODO-commit) for casework.github.io
- [ ] Impact on SHACL validation [remediated](#TODO-commit) for casework.github.io <!--In primary or feature branch, no ...validation-unstable.ttl files show negative impact from PR.-->
- [ ] Solutions Approval vote logged on corresponding Issue <!-- Non-applicable for PRs functioning under bugfix worflow -->
```
