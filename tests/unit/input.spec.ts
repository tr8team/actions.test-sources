import { should, it, describe } from "vitest";
should();

import { SafeParseError, SafeParseSuccess, ZodError } from "zod";
import { config, Config } from "../../src/lib/input";


describe("input validator", function() {
  describe("valid object", function(){
    const theory: { subject: any; expected: Config }[] = [
      {
        subject: {
          name: "Test Input",
          url: "https://test.com",
          type: "vitest-result",
          path: "test-results/summary.json",
        },
        expected: {
          name: "Test Input",
          url: "https://test.com",
          type: "vitest-result",
          path: "test-results/summary.json",
        }
      },
      {
        subject: {
          name: "Coverage Input",
          url: "https://test.com/coverage",
          type: "vitest-istanbul-coverage",
          path: "test-results/coverage.json",
        },
        expected: {
          name: "Coverage Input",
          url: "https://test.com/coverage",
          type: "vitest-istanbul-coverage",
          path: "test-results/coverage.json",
        }
      }

    ]

    theory.forEach(({ subject, expected }) => {
      it("should return the validated object and no error object", () => {
        // act
        const act = config.safeParse(subject) as SafeParseSuccess<Config>;
        act.success.should.be.true;
        act.data.should.deep.equal(expected);
      });
    });
  });

  describe("invalid object", function() {
    describe("missing required fields", () => {
      const theory = [
        {
          subject: { name: "Test Input" },
          expected: {
            issues: [
              {
              code: "invalid_type",
              expected: "string",
              received: "undefined",
              path: ["url"],
              message: "Required"
            },
              {
              code: "invalid_union",
              path: ["type"],
              message: "Invalid input",
              unionErrors: [
                new ZodError([
                  {
                    received: undefined,
                    code: "invalid_literal",
                    expected: "vitest-result",
                    path: [
                      "type"
                    ],
                    message: "Invalid literal value, expected \"vitest-result\"",
                  }
                ]),
                new ZodError([
                  {
                    received: undefined,
                    code: "invalid_literal",
                    expected: "vitest-istanbul-coverage",
                    path: [
                      "type"
                    ],
                    message: "Invalid literal value, expected \"vitest-istanbul-coverage\"",
                  }
                ])

              ]
            },
              {
                code: "invalid_type",
                expected: "string",
                message: "Required",
                path: [
                  "path"
                ],
                received: "undefined"
              }
            ], name: "ZodError"
          }
        },
        {
          subject: { name: "Test Input", url: "https://test.com" },
          expected: {

            issues: [
              {
                code: "invalid_union",
                message: "Invalid input",
                path: ["type"],
                unionErrors: [
                  new ZodError([
                    {
                      received: undefined,
                      code: "invalid_literal",
                      expected: "vitest-result",
                      path: [
                        "type"
                      ],
                      message: "Invalid literal value, expected \"vitest-result\"",
                    }
                  ]),
                  new ZodError([
                    {
                      received: undefined,
                      code: "invalid_literal",
                      expected: "vitest-istanbul-coverage",
                      path: [
                        "type"
                      ],
                      message: "Invalid literal value, expected \"vitest-istanbul-coverage\"",
                    }
                  ])

                ]
              },
              {
                code: "invalid_type",
                expected: "string",
                received: "undefined",
                path: ["path"],
                message: "Required"
              }
            ], name: "ZodError"
          }
        }
      ];
      theory.forEach(({ subject, expected }) => {
        it(`for subject ${JSON.stringify(subject)} error should be ${JSON.stringify(expected)}`, () => {
          const act = config.safeParse(subject) as SafeParseError<Config>;
          act.success.should.be.false;
          act.error.issues.should.deep.equal(expected.issues);
        });
      });
    });

    describe("extra fields", () => {
      const theory = [
        {
          subject: {
            name: "Test Input",
            url: "https://test.com",
            extraField: "some value",
            type: "vitest-result",
            path: "some-path",
          },
          expected: {
            "issues": [{
              "code": "unrecognized_keys",
              "keys": ["extraField"],
              "path": [
              ],
              "message": "Unrecognized key(s) in object: 'extraField'"
            }], "name": "ZodError"
          }
        },
        {
          subject: {
            name: "Test Input",
            url: "https://test.com",
            extraField: "some value",
            type: "vitest-istanbul-coverage",
            path: "some-path",
          },
          expected: {
            "issues": [{
              "code": "unrecognized_keys",
              "keys": ["extraField"],
              "path": [
              ],
              "message": "Unrecognized key(s) in object: 'extraField'"
            }], "name": "ZodError"
          }
        }
      ];
      theory.forEach(({ subject, expected }) => {
        it(`for subject ${JSON.stringify(subject)} error should be ${expected}`, () => {
          const act = config.safeParse(subject) as SafeParseError<Config>;
          act.success.should.be.false;
          act.error.issues.should.deep.equal(expected.issues);
        });
      });
    });

    describe("fields with wrong type", () => {
      const theory = [
        {
          subject: {
            name: "Test Input",
            url: "https://test.com",
            type: "vitest-istanbul-coverage",
            path: 5,
          },

          expected: {
            issues: [{
              code: "invalid_type",
              expected: "string",
              message: "Expected string, received number",
              path: [
                "path"
              ],
              received: "number"
            }],
            name: "ZodError"
          }
        },
        {
          subject: {
            name: "Test Input",
            url: false,
            type: "vitest-istanbul-coverage",
            path: "random path",
          },
          expected: {
            issues: [
              {
                code: "invalid_type",
                expected: "string",
                message: "Expected string, received boolean",
                path: ["url"],
                received: "boolean"
              },

            ], "name": "ZodError"
          }
        }
      ];
      theory.forEach(({ subject, expected }) => {
        it(`for subject ${JSON.stringify(subject)} error should be ${expected}`, () => {
          const act = config.safeParse(subject) as SafeParseError<Config>;
          act.success.should.be.false;
          act.error.issues.should.deep.equal(expected.issues);
        });
      });
    });

    describe("fields with invalid values", () => {
      const theory = [
        {
          subject: {
            name: "Test Input",
            url: "https://test.com",
            type: "negatory",
            path: "random path",
          },
          expected: {
            issues: [
              {
                code: "invalid_union",
                message: "Invalid input",
                unionErrors: [
                  new ZodError([
                    {
                      received: "negatory",
                      code: "invalid_literal",
                      expected: "vitest-result",
                      path: [
                        "type"
                      ],
                      message: "Invalid literal value, expected \"vitest-result\"",
                    }
                  ]),
                  new ZodError([
                    {
                      received: "negatory",
                      code: "invalid_literal",
                      expected: "vitest-istanbul-coverage",
                      path: [
                        "type"
                      ],
                      message: "Invalid literal value, expected \"vitest-istanbul-coverage\"",
                    }
                  ])

                ]
                ,
                path: [ "type"]
              }
            ],
            "name": "ZodError"
          }
        },
        {
          subject: {
            name: "Test Input",
            url: "https://test.com",
            type: "vitest-results",
            path: "random path",
          },
          expected: {
            issues: [
              {
                code: "invalid_union",
                message: "Invalid input",
                path: ["type"],
                unionErrors: [
                  new ZodError([
                    {
                      received: "vitest-results",
                      code: "invalid_literal",
                      expected: "vitest-result",
                      path: [
                        "type"
                      ],
                      message: "Invalid literal value, expected \"vitest-result\"",
                    }
                  ]),
                  new ZodError([
                    {
                      received: "vitest-results",
                      code: "invalid_literal",
                      expected: "vitest-istanbul-coverage",
                      path: [
                        "type"
                      ],
                      message: "Invalid literal value, expected \"vitest-istanbul-coverage\"",
                    }
                  ])

                ]
              }
            ], "name": "ZodError"
          }
        }
      ];
      theory.forEach(({ subject, expected }) => {
        it(`for subject ${JSON.stringify(subject)} error should be ${expected}`, () => {
          const act = config.safeParse(subject) as SafeParseError<Config>;
          act.success.should.be.false;
          act.error.issues.should.deep.equal(expected.issues);
        });
      });
    });

    describe("empty object", () => {
      it("should return error if object is empty", () => {
        const ex = [
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["name"],
            message: "Required"
          },
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["url"],
            message: "Required"
          },
          {
            code: "invalid_union",
            message: "Invalid input",
            path: [
              "type"
            ],
            unionErrors: [
              new ZodError([
                {
                  code: "invalid_literal",
                  expected: "vitest-result",
                  path: [
                    "type"
                  ],
                  message: "Invalid literal value, expected \"vitest-result\"",
                  received: undefined,
                }
              ]),
              new ZodError([
                {
                  code: "invalid_literal",
                  expected: "vitest-istanbul-coverage",
                  path: [
                    "type"
                  ],
                  message: "Invalid literal value, expected \"vitest-istanbul-coverage\"",
                  received: undefined,
                }
              ])

            ]

          },
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["path"],
            message: "Required"
          }
        ];
        const act = config.safeParse({}) as SafeParseError<Config>;
        act.success.should.be.false;
        act.error.issues.should.deep.equal(ex);
      });
    });
  });

});
