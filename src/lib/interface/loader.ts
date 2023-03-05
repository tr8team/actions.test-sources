import { Config } from "../input";
import { Output } from "../output";
import { Result } from "../core/result";
import { Option } from "../core/option";

interface Loader {
  load(path: Config): Result<Option<Output>, Error>;
}

export { Loader };
