import { describe, it, should, chai } from "vitest";
// @ts-ignore
import helper from "../helper.js";

should();
chai.use(helper);

import { Source } from "../../src/lib/interface/file-loader";
import { anything, instance, mock, when } from "ts-mockito";
import { Validator } from "../../src/lib/interface/validator";
import { SourceMapper } from "../../src/lib/interface/source-mapper";
import { Loader } from "../../src/lib/interface/loader";
import { PathLoaders } from "../../src/lib/path-loaders";
import { Err, Ok, Result } from "../../src/lib/core/result";
import { Output } from "../../src/lib/output";
import { Config, Loaders } from "../../src/lib/input";
import { None, Some } from "../../src/lib/core/option";



type Person = {
  name: string,
  age: number
}

function buildPathLoader<T>(
  type: Loaders,
  sourceResponse: Map<string, Result<T, Error>>,
  mapperResponse: Map<[string, string], Output>
): Loader {
  const sourceMock = mock<Source>();
  const validatorMock = mock<Validator<T>>();
  const mapperMock = mock<SourceMapper<T>>();

  sourceResponse.forEach((v, k) => {
    when(sourceMock.load(k, anything()))
      .thenReturn(v);
  });

  mapperResponse.forEach((v, [name, url]) => {
    when(mapperMock.map(name, url, anything()))
      .thenReturn(v);
  });


  const source = instance(sourceMock);
  const validator = instance(validatorMock);
  const mapper = instance(mapperMock);
  return new PathLoaders(source, type, validator, mapper);
}

describe("PathLoaders", function() {

  describe("type does not match", function() {

    it("should return Ok of None", async function() {
      // arrange
      const loader = buildPathLoader<Person>(
        "vitest-result",
        new Map([]),
        new Map([])
      );
      const subject: Config ={
        name: "Unit Test",
        url: "http://unittest.com",
        path: "some-path",
        type: "vitest-istanbul-coverage",
      }
      const expected = Ok(None());

      // act
      const act = loader.load(subject);

      // assert
      await act.should.be.congruent(expected);

    });

  });

  describe("source successfully loads", function(){
    it("should return Mapped value", async function() {
      // arrange
      const loader = buildPathLoader<Person>(
        "vitest-result",
        new Map([
          ["some-path", Ok({name: "Ernest", age: 25})]
        ]),
        new Map([
          [["Unit Test", "http://unittest.com"], {
            url: "http://unittest.com",
            name: "Uni Test",
            data: {
              type: "documentation",
            }
          }]
        ])
      );
      const subject: Config ={
        name: "Unit Test",
        url: "http://unittest.com",
        path: "some-path",
        type: "vitest-result",
      }
      const expected = Ok(Some({
        url: "http://unittest.com",
        name: "Uni Test",
        data: {
          type: "documentation",
        }
      }));

      // act
      const act = loader.load(subject);

      // assert
      await act.should.be.congruent(expected);
    });
  })

  describe("source fails to load", function() {

    it("should return error", async function() {
      // arrange
      const loader = buildPathLoader<Person>(
        "vitest-result",
        new Map([
          ["some-path", Err<Person, Error>(new Error("boom"))]
        ]),
        new Map([])
      );
      const subject: Config ={
        name: "Unit Test",
        url: "http://unittest.com",
        path: "some-path",
        type: "vitest-result",
      }
      const expected = Err<Person, Error>(new Error("boom"));

      // act
      const act = loader.load(subject);

      // assert
      await act.should.be.congruent(expected);
    });

  });


});
