import { chai, describe, it, should } from "vitest";
import { JsonFileSource } from "../../src/external/json-file-source";
import { number, object, string, z, ZodError } from "zod";
import { ZodValidatorAdapter } from "../../src/lib/adapters/zod-validator-adapter";
import { None, Some } from "../../src/lib/core/option";
// @ts-ignore
import helper from "../helper.js";
import { Err, Ok } from "../../src/lib/core/result";

chai.use(helper);
should();

const person = object({
  name: string(),
  age: number()
});

type Person = z.infer<typeof person>

const personValidator = new ZodValidatorAdapter(person);

describe("JsonFileSource", function() {

  const jsonFileSource = new JsonFileSource();
  describe("with validator", function() {
    it("should return error if its not a valid JSON", async function() {
      // arrange
      const input = "./tests/integration/artifacts/json-file-source/not-json.json";
      const expected = "Unexpected token < in JSON at position 0";
      // act
      const act = jsonFileSource.load<Person>(input, Some(personValidator));

      // assert
      await act.should.have.errErrorMessage(expected);
    });
    it("should return error if the validator fails", async function() {
      // arrange
      const input = "./tests/integration/artifacts/json-file-source/invalid.json";
      const expected = Err(new ZodError([
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "number",
          "path": [
            "name"
          ],
          "message": "Expected string, received number"
        },
        {
          "code": "invalid_type",
          "expected": "number",
          "received": "undefined",
          "path": [
            "age"
          ],
          "message": "Required"
        }
      ]));

      // act
      const act = jsonFileSource.load<Person>(input, Some(personValidator));

      // assert
      await act.should.be.congruent(expected);
    });
    it("should return error file does not exist", async function() {
      // arrange
      const input = "./tests/integration/artifacts/json-file-source/non-exist.json";
      const expected = "ENOENT: no such file or directory, open './tests/integration/artifacts/json-file-source/non-exist.json'";

      // act
      const act = jsonFileSource.load<Person>(input, Some(personValidator));

      // assert
      await act.should.have.errErrorMessage(expected);
    });
    it("should return object if its a valid object", async function() {
      // arrange
      const input = "./tests/integration/artifacts/json-file-source/valid.json";
      const expected = Ok({
        name: "Ernest",
        age: 17
      });

      // act
      const act = jsonFileSource.load<Person>(input, Some(personValidator));

      // assert
      await act.should.be.congruent(expected);
    });
  });

  describe("without validator", function() {
    it("should return error if its not a valid JSON", async function() {
      // arrange
      const input = "./tests/integration/artifacts/json-file-source/not-json.json";
      const expected = "Unexpected token < in JSON at position 0";
      // act
      const act = jsonFileSource.load<Person>(input, None());

      // assert
      await act.should.have.errErrorMessage(expected);
    });
    it("should return object if its a valid object", async function() {
      // arrange
      const input = "./tests/integration/artifacts/json-file-source/valid.json";
      const expected = Ok({
        name: "Ernest",
        age: 17,
        fruits: ["apple", "orange"],
      });

      // act
      const act = jsonFileSource.load<Person>(input, None());

      // assert
      await act.should.be.congruent(expected);
    });
    it("should return error file does not exist", async function() {
      // arrange
      const input = "./tests/integration/artifacts/json-file-source/non-exist.json";
      const expected = "ENOENT: no such file or directory, open './tests/integration/artifacts/json-file-source/non-exist.json'";

      // act
      const act = jsonFileSource.load<Person>(input, None());

      // assert
      await act.should.have.errErrorMessage(expected);
    });
  });

});
