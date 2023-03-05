import { Result } from "../core/result";
import { Config } from "../input";

interface InputRetriever {
  retrieve(): Result<Config, Error>;
}

export { InputRetriever };
