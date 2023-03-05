import { InputRetriever } from "../interface/input-retriever";
import { Config } from "../input";
import { Result } from "../core/result";
import { ActionIO } from "../interface/io";
import { stringToOption } from "../util";
import { Validator } from "../interface/validator";

class IoInputRetriever implements InputRetriever {
  constructor(io: ActionIO, validator: Validator<Config>) {
    this.#io = io;
    this.#validator = validator;
  }

  readonly #io: ActionIO;
  readonly #validator: Validator<Config>;

  retrieve(): Result<Config, Error> {
    const name = stringToOption(this.#io.get("name")).asOk(
      new Error("missing input 'name'")
    );
    const url = stringToOption(this.#io.get("url")).asOk(
      new Error("missing input 'url'")
    );
    const type = stringToOption(this.#io.get("type")).asOk(
      new Error("missing input 'type'")
    );
    const path = stringToOption(this.#io.get("path")).asOk(
      new Error("missing input 'path'")
    );

    return name.andThen((n) =>
      type.andThen((t) =>
        url.andThen((u) =>
          path.andThen((p) =>
            this.#validator.parse({
              name: n,
              url: u,
              type: t,
              path: p,
            })
          )
        )
      )
    );
  }
}

export { IoInputRetriever };
