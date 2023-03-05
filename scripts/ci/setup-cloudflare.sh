#!/usr/bin/env bash

repo="${REPOSITORY}"

if [ "$DEBUG" = "1" ]; then
	set -x
fi

set -euo pipefail

./scripts/ci/setup-cloudflare-single.sh "$repo" "Unit Test" "Test Report"
./scripts/ci/setup-cloudflare-single.sh "$repo" "Unit Test" "Coverage Report"
./scripts/ci/setup-cloudflare-single.sh "$repo" "Integration Test" "Test Report"
./scripts/ci/setup-cloudflare-single.sh "$repo" "Integration Test" "Coverage Report"
gomplate -d config=./repo.yaml -f ./.github/workflows/cicd.yml --left-delim "{{{" --right-delim "}}}" -o ./.github/workflows/cicd.yml
rm repo.yaml
