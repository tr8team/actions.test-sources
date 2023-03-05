import { chai, describe, it, should } from "vitest";

// @ts-ignore
import helper from "../../helper.js";
import { InputRetriever } from "../../../src/lib/interface/input-retriever";
import { ActionIO } from "../../../src/lib/interface/io";
import { anything, instance, mock, when } from "ts-mockito";
import { Validator } from "../../../src/lib/interface/validator";
import { IoInputRetriever } from "../../../src/lib/adapters/io-input-retriever";
import { Config } from "../../../src/lib/input.js";
import { Err, Ok, Result } from "../../../src/lib/core/result";

should();
chai.use(helper);

function buildMockRetriever(
  ioResponses: Map<string, string>,
  validatorResponse: Result<Config, Error>,
): InputRetriever {
  const ioMock = mock<ActionIO>();
  const validatorMock = mock<Validator<Config>>();

  ioResponses.forEach((v,k) => {
    when(ioMock.get(k)).thenReturn(v);
  })
  when(validatorMock.parse(anything())).thenReturn(validatorResponse);

  const io = instance(ioMock);
  const validator = instance(validatorMock);

  return new IoInputRetriever(io, validator);
}

describe("IoInputRetriever", function() {

  describe("retrieve", function() {
    it("should return config if everything is ok", async function() {

      // arrange
      const retriever = buildMockRetriever(
        new Map([
          ["name","Unit Test"],
          ["url","https://google.com"],
          ["type","vitest-result"],
          ["path","some-path"],
        ]),
        Ok({
          type: "vitest-result",
          path: "some-path",
          name: "Unit Test",
          url: "https://google.com",
        })
      );
      const expected = {
        type: "vitest-result",
        path: "some-path",
        name: "Unit Test",
        url: "https://google.com",
      }

      // act
      const act = retriever.retrieve();
      await act.should.be.okOf(expected);

    });


    it("should return error if any input is empty", async function() {
      // arrange
      const retriever = buildMockRetriever(
        new Map([
          ["name",""],
          ["url","https://google.com"],
          ["type","vitest-result"],
          ["path","some-path"],
        ]),
        Ok({
          type: "vitest-result",
          path: "some-path",
          name: "Unit Test",
          url: "https://google.com",
        })
      );
      const expected = "missing input 'name'"

      // act
      const act = retriever.retrieve();
      await act.should.have.errErrorMessage(expected);
    });


    it("should return error if any validator returns error", async function() {
      // arrange
      const retriever = buildMockRetriever(
        new Map([
          ["name","Hello"],
          ["url","https://google.com"],
          ["type","vitest-result"],
          ["path","some-path"],
        ]),
        Err(new Error("boom!"))
      );
      const expected = "boom!"

      // act
      const act = retriever.retrieve();
      await act.should.have.errErrorMessage(expected);
    });



  });


});
