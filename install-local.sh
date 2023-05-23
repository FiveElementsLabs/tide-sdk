#!/usr/bin/env bash

# Remove existing tarball if it exists
rm ./testing/tide-sdk-*.tgz

# Build the new tarball
cd sdk && yarn && yarn build && yarn pack

# Move the tarball to the testing dir
mv tide-sdk-*.tgz ../testing

# Install the local version of the package
cd ../testing && yarn

