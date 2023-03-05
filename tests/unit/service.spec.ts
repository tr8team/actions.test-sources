import { describe, it, should, chai } from "vitest";
// @ts-ignore
import helper from "../helper.js";
import { ILoadingService, LoadingService } from "../../src/lib/service";
import { Output } from "../../src/lib/output";
import { None, Option, Some } from "../../src/lib/core/option";
import { Err, Ok, Result } from "../../src/lib/core/result";
import { anything, instance, mock, when } from "ts-mockito";
import { Loader } from "../../src/lib/interface/loader";
import { Config } from "../../src/lib/input.js";
should()
chai.use(helper);

function buildMock(
  loaderResponses: Result<Option<Output>, Error>[]
): ILoadingService {

  const loaders = loaderResponses
    .map(x => {
      const m = mock<Loader>();
      when(m.load(anything())).thenReturn(x);
      return instance(m);
    });
  return new LoadingService(loaders);
}


describe("LoadingService", function() {

  describe("load", function() {

    const config: Config = {
      name: "Sample",
      url: "sample.com",
      path: "hello",
      type: "vitest-result"
    };

    it("should fail if any 1 loader fails", async function() {
      // arrange
      const subj = buildMock([
        Ok(None()),
        Err(new Error("boom 1 error")),
        Ok(None()),
        Ok(Some({
          name: "Sample",
          url: "sample.com",
          data: {
            type: "documentation"
          }
        })),
        Ok(None()),
        Ok(None())
      ]);
      const expected = Err([
        new Error("boom 1 error")
      ]);

      // act
      const act = subj.load(config);

      // assert
      await act.should.be.congruent(expected);

    });

    it("should fail if more than 1 loader fails", async function() {
      // arrange
      const subj = buildMock([
        Ok(None()),
        Err(new Error("boom 1 error")),
        Ok(None()),
        Ok(Some({
          name: "Sample",
          url: "sample.com",
          data: {
            type: "documentation"
          }
        })),
        Ok(None()),
        Err(new Error("boom 2 error")),
        Ok(None())
      ]);
      const expected = Err([
        new Error("boom 1 error"),
        new Error("boom 2 error"),
      ]);

      // act
      const act = subj.load(config);

      // assert
      await act.should.be.congruent(expected);
    });

    it("should fail if there are no loaders", async function() {
      // arrange
      const subj = buildMock([
      ]);
      const expected = Err([
        new Error(`No loaders matched: vitest-result`),
      ]);

      // act
      const act = subj.load(config);

      // assert
      await act.should.be.congruent(expected);
    });

    it("should fail if more than 1 loaders matched", async function() {
      // arrange
      const subj = buildMock([
        Ok(None()),
        Ok(Some({
          name: "Sample",
          url: "sample.com",
          data: {
            type: "documentation"
          }
        })),
        Ok(None()),
        Ok(Some({
          name: "Sample",
          url: "sample.com",
          data: {
            type: "documentation"
          }
        })),
        Ok(None())
      ]);
      const expected = Err([
        new Error(`More than 1 loaders matched: vitest-result`),
      ]);

      // act
      const act = subj.load(config);

      // assert
      await act.should.be.congruent(expected);
    });

    it("should fail if no loaders match", async function() {
// arrange
      const subj = buildMock([
        Ok(None()),
        Ok(None()),
        Ok(None()),
        Ok(None()),
        Ok(None())
      ]);
      const expected = Err([
        new Error(`No loaders matched: vitest-result`),
      ]);

      // act
      const act = subj.load(config);

      // assert
      await act.should.be.congruent(expected);
    });

    it("should return output if exactly 1 loader matched and no loaders failed", async function() {
      // arrange
      const subj = buildMock([
        Ok(None()),
        Ok(None()),
        Ok(Some({
          name: "Sample",
          url: "sample.com",
          data: {
            type: "documentation"
          }
        })),
        Ok(None()),
        Ok(None())
      ]);
      const expected = Ok({
        name: "Sample",
        url: "sample.com",
        data: {
          type: "documentation"
        }
      });

      // act
      const act = subj.load(config);

      // assert
      await act.should.be.congruent(expected);
    });
  });


});
