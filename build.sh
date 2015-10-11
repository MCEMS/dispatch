#!/bin/bash

GH_REPO="@github.com/MCEMS/dispatch.git"
FULL_REPO="https://$GH_TOKEN$GH_REPO"

npm install -g gulp
npm install -g bower
bower install
gulp build

cd dist
git init
git config user.name "Travis CI"
git config user.email "travis@bergems.org"
git add .
git commit -m "Travis CI Deploy"
git push --force --quiet $FULL_REPO master:gh-pages
