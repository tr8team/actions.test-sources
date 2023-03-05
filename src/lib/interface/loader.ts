import { ConfigElement } from "../input";
import { Output } from "../output";
import { Result } from "../core/result";
import { Option } from "../core/option";

interface Loader {
  load(path: ConfigElement): Result<Option<Output>, Error>;
}

export { Loader };
