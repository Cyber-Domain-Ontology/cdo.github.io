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
  if [ ! -d casework.github.io ]; then
    git clone \
      https://github.com/casework/casework.github.io.git
  fi

  pushd casework.github.io
    bundle --version \
      || sudo gem install bundler:2.0.2

    bundle install \
      --path vendor/bundle

    # Serve built website.
    # Via:
    #   https://help.github.com/en/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll
    bundle exec jekyll serve
  popd #casework.github.io
popd #${HOME}/local/src
```
