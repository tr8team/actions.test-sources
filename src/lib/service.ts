import { Config } from "./input";
import { Err, Ok, Res, Result } from "./core/result";
import { Output } from "./output";
import { Loader } from "./interface/loader";

interface ILoadingService {
  load(i: Config): Result<Output, Error[]>;
}

class LoadingService implements ILoadingService {
  #loaders: Loader[];

  constructor(loaders: Loader[]) {
    this.#loaders = loaders;
  }

  load(config: Config): Result<Output, Error[]> {
    const results = Res.all(...this.#loaders.map((l) => l.load(config)));
    return results
      .map((o) => o.map((oo) => oo.native()))
      .andThen(async (output) => {
        const all = await Promise.all(output);
        const left: Output[] = all.filter((x) => x != null) as Output[];
        if (left.length > 1) {
          return Err([
            new Error(`More than 1 loaders matched: ${config.type}`),
          ]);
        } else if (left.length < 1) {
          return Err([new Error(`No loaders matched: ${config.type}`)]);
        } else {
          return Ok(left[0]);
        }
      });
  }
}

export { LoadingService };
export type { ILoadingService };
