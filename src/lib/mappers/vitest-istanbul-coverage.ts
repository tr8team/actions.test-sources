import { SourceMapper } from "../interface/source-mapper";
import { Output } from "../output";
import { VitestIstanbulCoverage } from "../sources/vitest-istanbul-coverage";

class VitestIstanbulCoverageMapper
  implements SourceMapper<VitestIstanbulCoverage>
{
  map(name: string, url: string, input: VitestIstanbulCoverage): Output {
    return {
      name,
      url,
      data: {
        type: "test-coverage",
        function: input.total.functions.pct,
        branch: input.total.branches.pct,
        line: input.total.lines.pct,
        statement: input.total.statements.pct,
      },
    };
  }
}

export { VitestIstanbulCoverageMapper };
