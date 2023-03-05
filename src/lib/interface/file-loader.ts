import { Result } from "../core/result";
import { Validator } from "./validator";
import { Option } from "../core/option";

interface Source {
  load<T>(key: string, validator: Option<Validator<T>>): Result<T, Error>;
}

export { Source };
