import { number, object, z } from "zod";

const vitestIstanbulCoverage = object({
  total: object({
    lines: object({
      pct: number().min(0).max(100),
    }).required(),
    statements: object({
      pct: number().min(0).max(100),
    }).required(),
    functions: object({
      pct: number().min(0).max(100),
    }).required(),
    branches: object({
      pct: number().min(0).max(100),
    }).required(),
  }).required(),
}).required();

type VitestIstanbulCoverage = z.infer<typeof vitestIstanbulCoverage>;

export { vitestIstanbulCoverage };
export type { VitestIstanbulCoverage };
