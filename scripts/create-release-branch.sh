#! /usr/bin/env bash

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
RELEASE_BRANCH="release/$(date "+%Y%m%d-%H%M%S")"

if [[ "$CURRENT_BRANCH" != "develop" ]]; then
    >&2 echo "You are not on 'develop' branch. Active branch: $CURRENT_BRANCH"
    exit 1
fi

# Make sure we are up-to-date in local
git pull origin

# Create the release branch
echo "Creating and pushing new release branch: $RELEASE_BRANCH"
git checkout -b "$RELEASE_BRANCH"
git push --set-upstream origin "$RELEASE_BRANCH"

# Go back to develop branch
git checkout develop

# If the user has Github CLI installed and configured, create the PR for them :)
if ! command -v gh &> /dev/null
then
    echo "'gh' CLI not found, can't create PR for you, sorry :("
    exit 0
fi

gh pr create --base main --title "$RELEASE_BRANCH" --fill --head "$RELEASE_BRANCH"