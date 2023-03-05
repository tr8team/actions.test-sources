import { SourceMapper } from "../interface/source-mapper";
import { VitestResult } from "../sources/vitest-result";
import { Output } from "../output";

class VitestResultMapper implements SourceMapper<VitestResult> {
  map(name: string, url: string, input: VitestResult): Output {
    return {
      name,
      url,
      data: {
        type: "test-result",
        fail: input.numFailedTests,
        pass: input.numPassedTests,
        skip: input.numTotalTests - input.numPassedTests - input.numFailedTests,
      },
    };
  }
}

export { VitestResultMapper };
