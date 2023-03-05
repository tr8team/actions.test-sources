#!/usr/bin/env bash

if [ "$DEBUG" = "1" ]; then
	set -x
fi

set -euo pipefail

repo="$1"

./scripts/ci/setup-cloudflare-single.sh "$repo" "Unit Test" "Test Report"
./scripts/ci/setup-cloudflare-single.sh "$repo" "Unit Test" "Coverage Report"
./scripts/ci/setup-cloudflare-single.sh "$repo" "Integration Test" "Test Report"
./scripts/ci/setup-cloudflare-single.sh "$repo" "Integration Test" "Coverage Report"
gomplate -d config=./repo.yaml -f ./.github/workflows/cicd.yml --left-delim "{{{" --right-delim "}}}" -o ./.github/workflows/cicd.yml
rm repo.yaml
