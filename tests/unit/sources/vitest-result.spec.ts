import { describe, it, should, chai } from "vitest";
// @ts-ignore
import helper from "../../helper.js";
should();
chai.use(helper);

import { vitestResult, VitestResult } from "../../../src/lib/sources/vitest-result";
import { Validator } from "../../../src/lib/interface/validator";
import { ZodValidatorAdapter } from "../../../src/lib/adapters/zod-validator-adapter";
import { ZodError } from "zod";

describe("vitest result validator", function() {

  const validator: Validator<VitestResult> = new ZodValidatorAdapter(vitestResult);

  describe("valid objects", function() {
    const theory: { subject: any, expected: VitestResult }[] = [
      {
        subject: {
          numTotalTests: 35,
          numPassedTests: 20,
          numFailedTests: 15
        },
        expected: {
          numTotalTests: 35,
          numPassedTests: 20,
          numFailedTests: 15
        }
      },
      {
        subject: {
          numTotalTests: 0,
          numPassedTests: 0,
          numFailedTests: 0
        },
        expected: {
          numTotalTests: 0,
          numPassedTests: 0,
          numFailedTests: 0
        }
      },
      {
        subject: {
          numTotalTests: 50,
          numPassedTests: 50,
          numFailedTests: 0,
          extraField: [1, 2, 3, 4, 5]
        },
        expected: {
          numTotalTests: 50,
          numPassedTests: 50,
          numFailedTests: 0
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
          name: "float",
          subject: {
            umTotalTests: 35,
            numPassedTests: 20.25,
            numFailedTests: 15
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                "numTotalTests"
              ],
              "message": "Required"
            },
            {
              "code": "invalid_type",
              "expected": "integer",
              "received": "float",
              "message": "Expected integer, received float",
              "path": [
                "numPassedTests"
              ]
            }
          ]),
        },
        {
          name: "negative",
          subject: {
            numTotalTests: -35,
            numPassedTests: 20,
            numFailedTests: 15
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
                "numTotalTests"
              ]
            },
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
          name: "numPassedTests",
          subject: {
            numTotalTests: 35,
            numFailedTests: 15
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                "numPassedTests"
              ],
              "message": "Required"
            }
          ]),
        },
        {
          name: "numFailedTests",
          subject: {
            numTotalTests: 35,
            numPassedTests: 20,
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                "numFailedTests"
              ],
              "message": "Required"
            }
          ]),
        },
        {
          name: "numTotalTests",
          subject: {
            numPassedTests: 20,
            numFailedTests: 15
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                "numTotalTests"
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
            numTotalTests: 35,
            numFailedTests: 15,
            numPassedTests: false,
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "boolean",
              "path": [
                "numPassedTests"
              ],
              "message": "Expected number, received boolean"
            }
          ]),
        },
        {
          subject: {
            numTotalTests: 35,
            numFailedTests: "hello",
            numPassedTests: 20,
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "string",
              "path": [
                "numFailedTests"
              ],
              "message": "Expected number, received string"
            }
          ]),
        },
        {
          subject: {
            numTotalTests: [1,2,3],
            numFailedTests: 15,
            numPassedTests: 25,
          },
          expected: new ZodError([
            {
              "code": "invalid_type",
              "expected": "number",
              "received": "array",
              "path": [
                "numTotalTests"
              ],
              "message": "Expected number, received array"
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
