import { describe, it, should, chai } from "vitest";
// @ts-ignore
import helper from "../../helper.js";
import { VitestResultMapper } from "../../../src/lib/mappers/vitest-result";

should();
chai.use(helper);

describe("VitestResultMapper", function() {

  const mapper = new VitestResultMapper();

  describe("map", function() {

    const theory = [
      {
        subject: {
          name: "Hello",
          url: "https://hello.com",
          input: {
            numFailedTests: 15,
            numPassedTests: 20,
            numTotalTests: 35
          }
        },
        expected: {
          name: "Hello",
          url: "https://hello.com",
          data: {
            type: "test-result",
            fail: 15,
            pass: 20,
            skip: 0
          }
        }
      },
      {
        subject: {
          name: "Hello2",
          url: "https://hello2.com",
          input: {
            numFailedTests: 0,
            numPassedTests: 20,
            numTotalTests: 40
          }
        },
        expected: {
          name: "Hello2",
          url: "https://hello2.com",
          data: {
            type: "test-result",
            fail: 0,
            pass: 20,
            skip: 20
          }
        }
      },
      {
        subject: {
          name: "Hello3",
          url: "https://hello3.com",
          input: {
            numFailedTests: 0,
            numPassedTests: 0,
            numTotalTests: 0
          }
        },
        expected: {
          name: "Hello3",
          url: "https://hello3.com",
          data: {
            type: "test-result",
            fail: 0,
            pass: 0,
            skip: 0
          }
        }
      },
      {
        subject: {
          name: "Hello4",
          url: "https://hello4.com",
          input: {
            numFailedTests: 100,
            numPassedTests: 0,
            numTotalTests: 120
          }
        },
        expected: {
          name: "Hello4",
          url: "https://hello4.com",
          data: {
            type: "test-result",
            fail: 100,
            pass: 0,
            skip: 20
          }
        }
      }
    ];

    theory.forEach(({
                      subject: {
                        name,
                        url,
                        input
                      }, expected
                    }) => {

      it("should map VitestResult to Output", function() {
        const act = mapper.map(name,url,input);
        act.should.deep.equal(expected);
      });

    });

  });

});
