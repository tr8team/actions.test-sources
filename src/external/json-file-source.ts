import { Source } from "../lib/interface/file-loader";
import { Validator } from "../lib/interface/validator";
import { Err, Ok, Result } from "../lib/core/result";
import { Option } from "../lib/core/option";
import { catchToResult, parseJSON } from "../lib/util";
import * as fs from "fs";

class JsonFileSource implements Source {
  load<T>(key: string, validator: Option<Validator<T>>): Result<T, Error> {
    try {
      const raw = fs.readFileSync(key, "utf-8");
      return parseJSON(raw).andThen((j) =>
        validator.asResult({
          none: () => Ok(j) as Result<T, Error>,
          some: (v) => v.parse(j),
        })
      );
    } catch (e) {
      return Err(catchToResult(e));
    }
  }
}

export { JsonFileSource };
