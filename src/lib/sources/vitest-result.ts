import { number, object, z } from "zod";

const vitestResult = object({
  numTotalTests: number().min(0).int(),
  numPassedTests: number().min(0).int(),
  numFailedTests: number().min(0).int(),
}).required();

type VitestResult = z.infer<typeof vitestResult>;

export { vitestResult };
export type { VitestResult };
