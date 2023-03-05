import { describe, it, should, chai } from "vitest";
// @ts-ignore
import helper from "../../helper.js";
import { VitestIstanbulCoverageMapper } from "../../../src/lib/mappers/vitest-istanbul-coverage";

should();
chai.use(helper);

describe("VitestResultMapper", function() {

  const mapper = new VitestIstanbulCoverageMapper();

  describe("map", function() {

    const theory = [
      {
        subject: {
          name: "Hello",
          url: "https://hello.com",
          input: {
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
        expected: {
          name: "Hello",
          url: "https://hello.com",
          data: {
            type: "test-coverage",
            function: 100,
            branch: 100,
            line: 100,
            statement: 100
          }
        }
      },
      {
        subject: {
          name: "Hello2",
          url: "https://hello2.com",
          input: {
            total: {
              lines: {
                pct: 0,
              },
              statements: {
                pct: 0,
              },
              functions: {
                pct: 0,
              },
              branches: {
                pct: 0,
              }
            }
          }
        },
        expected: {
          name: "Hello2",
          url: "https://hello2.com",
          data: {
            type: "test-coverage",
            function: 0,
            branch: 0,
            line: 0,
            statement: 0
          }
        }
      },
      {
        subject: {
          name: "Hello3",
          url: "https://hello3.com",
          input: {
            total: {
              lines: {
                pct: 50,
              },
              statements: {
                pct: 25.5,
              },
              functions: {
                pct: 67,
              },
              branches: {
                pct: 92.5,
              }
            }
          }
        },
        expected: {
          name: "Hello3",
          url: "https://hello3.com",
          data: {
            type: "test-coverage",
            function: 67,
            branch: 92.5,
            line: 50,
            statement: 25.5,
          }
        }
      },
      {
        subject: {
          name: "Hello4",
          url: "https://hello4.com",
          input: {
            total: {
              lines: {
                pct: 100,
              },
              statements: {
                pct: 88,
              },
              functions: {
                pct: 88,
              },
              branches: {
                pct: 88,
              }
            }
          }
        },
        expected: {
          name: "Hello4",
          url: "https://hello4.com",
          data: {
            type: "test-coverage",
            function: 88,
            branch:88,
            line: 100,
            statement: 88,
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
