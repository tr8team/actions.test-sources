import { chai, describe, it, should } from "vitest";
// @ts-ignore
import helper from "../../helper.js";
import { Validator } from "../../../src/lib/interface/validator";
import { ZodValidatorAdapter } from "../../../src/lib/adapters/zod-validator-adapter";
import { ZodError } from "zod";
import { vitestIstanbulCoverage, VitestIstanbulCoverage } from "../../../src/lib/sources/vitest-istanbul-coverage";

should();
chai.use(helper);

describe("vitest result validator", function() {

  const validator: Validator<VitestIstanbulCoverage> = new ZodValidatorAdapter(vitestIstanbulCoverage);

  describe("valid objects", function() {
    const theory: { subject: any, expected: VitestIstanbulCoverage }[] = [
      {
        subject: {
          total: {
            "lines": {
              "total": 13,
              "covered": 13,
              "skipped": 0,
              "pct": 100
            },
            "statements": {
              "total": 13,
              "covered": 13,
              "skipped": 0,
              "pct": 100
            },
            "functions": {
              "total": 12,
              "covered": 12,
              "skipped": 0,
              "pct": 100
            },
            "branches": {
              "total": 0,
              "covered": 0,
              "skipped": 0,
              "pct": 100
            },
            "branchesTrue": {
              "total": 0,
              "covered": 0,
              "skipped": 0,
              "pct": "Unknown"
            }
          },
          "/Users/ernest/Workspace/ops/test-sources/src/external/github-action-i-o.ts": {
            "lines": {
              "total": 8,
              "covered": 8,
              "skipped": 0,
              "pct": 100
            },
            "functions": {
              "total": 7,
              "covered": 7,
              "skipped": 0,
              "pct": 100
            },
            "statements": {
              "total": 8,
              "covered": 8,
              "skipped": 0,
              "pct": 100
            },
            "branches": {
              "total": 0,
              "covered": 0,
              "skipped": 0,
              "pct": 100
            }
          },
          "/Users/ernest/Workspace/ops/test-sources/src/external/github-action-logger.ts": {
            "lines": {
              "total": 5,
              "covered": 5,
              "skipped": 0,
              "pct": 100
            },
            "functions": {
              "total": 5,
              "covered": 5,
              "skipped": 0,
              "pct": 100
            },
            "statements": {
              "total": 5,
              "covered": 5,
              "skipped": 0,
              "pct": 100
            },
            "branches": {
              "total": 0,
              "covered": 0,
              "skipped": 0,
              "pct": 100
            }
          }
        },
        expected: {
          total: {
            lines: {
              pct: 100,
            },
            statements: {
              pct: 100,
            },
            functions: {
              pct: 100,
            },
            branches: {
              pct: 100,
            }
          }
        }
      },
      {
        subject: {
          total: {
            lines: {
              pct: 90,
            },
            statements: {
              pct: 95.5,
            },
            functions: {
              pct: 70.2,
            },
            branches: {
              pct: 100,
            }
          }
        },
        expected: {
          total: {
            lines: {
              pct: 90,
            },
            statements: {
              pct: 95.5,
            },
            functions: {
              pct: 70.2,
            },
            branches: {
              pct: 100,
            }
          }
        }
      },
      {
        subject: {
          total: {
            lines: {
              pct: 11.1,
            },
            statements: {
              pct: 22.2,
            },
            functions: {
              pct: 33.3,
            },
            branches: {
              pct: 55.5,
            },
            extraLOL: false,
          },
          extraLOL: "string"
        },
        expected: {
          total: {
            lines: {
              pct: 11.1,
            },
            statements: {
              pct: 22.2,
            },
            functions: {
              pct: 33.3,
            },
            branches: {
              pct: 55.5,
            },
          },
        }
      }
    ];
    theory.forEach(({ subject, expected }) => {
      it("should return validated object", async function() {
        // act
        const act = validator.parse(subject);
        await act.should.be.okOf(expected);
      });
    });


  });


  describe("invalid objects", function() {

    describe("invalid values", function() {

      const theory: {name: string, subject: any, expected: ZodError}[] = [
        {
          name: "below 0",
          subject: {
            total: {
              lines: {
                pct: -5,
              },
              statements: {
                pct: 100,
              },
              functions: {
                pct: 100,
              },
              branches: {
                pct: 100,
              }
            }
          },
          expected: new ZodError([
            {
              "code": "too_small",
              "minimum": 0,
              "type": "number",
              "inclusive": true,
              "exact": false,
              "message": "Number must be greater than or equal to 0",
              "path": [
                "total",
                "lines",
                "pct"
              ]
            }
          ]),
        },
        {
          name: "above 100",
          subject: {
            total: {
              lines: {
                pct: 50,
              },
              statements: {
                pct: 120,
              },
              functions: {
                pct: 100,
              },
              branches: {
                pct: 100,
              }
            }
          },
          expected: new ZodError([
            {
              "code": "too_big",
              "maximum": 100,
              "type": "number",
              "inclusive": true,
              "exact": false,
              "message": "Number must be less than or equal to 100",
              "path": [
                "total",
                "statements",
                "pct"
              ]
            }
          ]),
        },
      ]

      theory.forEach(({name, subject, expected}) => {
        it(`should fail if any of the values are ${name}`, async function() {
          const act = validator.parse(subject);
          await act.should.be.errOf(expected);
        });
      });

    });

    describe("missing values", function() {
      const theory: {name: string, subject: any, expected: ZodError}[] = [
        {
          name: "lines",
          subject: {
            total: {
              lines: {
              },
              statements: {
                pct: 95.5,
              },
              functions: {
                pct: 70.2,
              },
              branches: {
                pct: 100,
              }
            }
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                "total",
                "lines",
                "pct"
              ],
              "message": "Required"
            }
          ]),
        },
        {
          name: "statements",
          subject: {
            total: {
              lines: {
                pct: 40,
              },
              functions: {
                pct: 70.2,
              },
              branches: {
                pct: 100,
              }
            }
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "object",
              "received": "undefined",
              "path": [
                "total",
                "statements"
              ],
              "message": "Required"
            }
          ]),
        },
        {
          name: "functions",
          subject: {
            total: {
              lines: {
                pct: 90,
              },
              statements: {
                pct: 95.5,
              },
              functions: {
              },
              branches: {
                pct: 100,
              }
            }
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                "total",
                "functions",
                "pct"
              ],
              "message": "Required"
            }
          ]),
        },
        {
          name: "total",
          subject: {
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "object",
              "received": "undefined",
              "path": [
                "total"
              ],
              "message": "Required"
            }
          ]),
        },
      ]

      theory.forEach(({name, subject, expected}) => {
        it(`should fail if '${name}' is missing`, async function() {
          const act = validator.parse(subject);
          await act.should.be.errOf(expected);
        });
      });


    });

    describe("incorrect type", function() {
      const theory: {subject: any, expected: ZodError}[] = [
        {
          subject: {
            total: {
              lines: {
                pct: false,
              },
              statements: {
                pct: 100,
              },
              functions: {
                pct: 100,
              },
              branches: {
                pct: 100,
              }
            },

          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "boolean",
              "path": [
                "total",
                "lines",
                "pct"
              ],
              "message": "Expected number, received boolean"
            }
          ]),
        },
        {
          subject: {
            total: {
              lines: {
                pct: 100,
              },
              statements: {
                pct: "100",
              },
              functions: {
                pct: 100,
              },
              branches: {
                pct: 100,
              }
            },

          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "string",
              "path": [
                "total",
                "statements",
                "pct"
              ],
              "message": "Expected number, received string"
            }
          ]),
        },
        {
          subject: {
            total: {
              lines: {
                pct: 100,
              },
              statements: {
                pct: 100,
              },
              functions: {
                pct: [1,2,3],
              },
              branches: {
                pct: 100,
              }
            },

          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "array",
              "path": [
                "total",
                "functions",
                "pct"
              ],
              "message": "Expected number, received array"
            }
          ]),
        },
        {
          subject: {
            total: {
              lines: {
                pct: 100,
              },
              statements: {
                pct: 100,
              },
              functions: {
                pct: 100,
              },
              branches: {
                pct: new Date(),
              }
            },

          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "date",
              "path": [
                "total",
                "branches",
                "pct"
              ],
              "message": "Expected number, received date"
            }
          ]),
        },
      ]

      theory.forEach(({subject, expected}) => {
        it(`should fail if any field's type is incorrect`, async function() {
          const act = validator.parse(subject);
          await act.should.be.errOf(expected);
        });
      });
    });
  });
});
