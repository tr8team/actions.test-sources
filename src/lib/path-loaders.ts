import { Loader } from "./interface/loader";
import { Config, Loaders } from "./input";
import { Output } from "./output";
import { None, Option, Some } from "./core/option";
import { Ok, Result } from "./core/result";
import { Source } from "./interface/file-loader";
import { Validator } from "./interface/validator";
import { SourceMapper } from "./interface/source-mapper";

class PathLoaders<T> implements Loader {
  readonly #json: Source;
  readonly #type: Loaders;
  readonly #validator: Validator<T>;
  readonly #mapper: SourceMapper<T>;

  constructor(
    json: Source,
    type: Loaders,
    validator: Validator<T>,
    mapper: SourceMapper<T>
  ) {
    this.#json = json;
    this.#type = type;
    this.#validator = validator;
    this.#mapper = mapper;
  }

  load({ name, url, path, type }: Config): Result<Option<Output>, Error> {
    if (type === this.#type) {
      return this.#json
        .load(path, Some(this.#validator))
        .map((data) => Some(this.#mapper.map(name, url, data)));
    }
    return Ok(None());
  }
}

export { PathLoaders };
