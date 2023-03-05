import { App } from "./lib/main";
import { IoInputRetriever } from "./lib/adapters/io-input-retriever";
import { GithubActionIO } from "./external/github-action-i-o";
import { ZodValidatorAdapter } from "./lib/adapters/zod-validator-adapter";
import { config } from "./lib/input";
import { LoadingService } from "./lib/service";
import { Loader } from "./lib/interface/loader";
import { PathLoaders } from "./lib/path-loaders";
import { JsonFileSource } from "./external/json-file-source";
import { vitestResult } from "./lib/sources/vitest-result";
import { VitestResultMapper } from "./lib/mappers/vitest-result";
import { vitestIstanbulCoverage } from "./lib/sources/vitest-istanbul-coverage";
import { VitestIstanbulCoverageMapper } from "./lib/mappers/vitest-istanbul-coverage";
import os from "os";
import { GithubActionLogger } from "./external/github-action-logger";
import { setFailed } from "@actions/core";
import { stringToOption } from "./lib/util";

const log = new GithubActionLogger();
const validator = new ZodValidatorAdapter(config);
const io = new GithubActionIO();
const input = new IoInputRetriever(io, validator);
const jsonLoader = new JsonFileSource();

// vitest results
const vitestResultValidator = new ZodValidatorAdapter(vitestResult);
const vitestResultMapper = new VitestResultMapper();

// vitest istanbul coverage
const vitestIstanbulCoverageValidator = new ZodValidatorAdapter(
  vitestIstanbulCoverage
);
const vitestIstanbulCoverageMapper = new VitestIstanbulCoverageMapper();

const loaders: Loader[] = [
  new PathLoaders(
    jsonLoader,
    "vitest-result",
    vitestResultValidator,
    vitestResultMapper
  ),
  new PathLoaders(
    jsonLoader,
    "vitest-istanbul-coverage",
    vitestIstanbulCoverageValidator,
    vitestIstanbulCoverageMapper
  ),
];
const service = new LoadingService(loaders);
const app = new App(input, io, service);

await app.run().match({
  none: () => {
    log.info("✅ Successfully extracted metadata");
  },
  some: async (errs) => {
    log.error("❌ Failed to extract metadata");
    for (const err of errs) {
      setFailed(err);
      const messages = await stringToOption(err?.stack).match({
        none: ["❌ No stacktrace found!"],
        some: (stacktrace) => stacktrace.split(os.EOL),
      });
      for (const m of messages) {
        log.error(m);
      }
    }
  },
});
