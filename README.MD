# Test Source

Adapter Module to extract different type of test result, coverage
result source into standardized data format for Test Tracker to use.

# Get Started

```yaml
name: Example Workflow
on: push
jobs:
  Test:
    runs-on: ubuntu-latest
    steps:
      # change this
      - name: Extract-Test
        id: sample
        uses: tr8team/test-source
        with:
          name: "Unit Test"
          url: https://coverage-site.pages.dev
          type: "vitest-result"
          path: "./path/to/result.json"
```

<!-- prettier-ignore-start -->
<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| --- | --- | --- | --- |
| name | Name and unique identifier of this report | `true` |  |
| url | URL to the actual report | `true` |  |
| type | Type of report. Accepts 'vitest-result' and 'vitest-istanbul-coverage' | `true` |  |
| path | Path to find the report metadata | `true` |  |
<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| --- | --- |
| data | Standard metadata format to be consumed downstream |
<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.
<!-- action-docs-runs -->

<!-- prettier-ignore-end -->

# Contributing

To contribute, please look at [Contributing](./Contributing.md)

# Author

- [Ernest (ESD)](mailto:ernest@tr8.io)
