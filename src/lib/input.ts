import { array, literal, object, string, union, z } from "zod";

const loaders = union([
  literal("vitest-result"),
  literal("vitest-istanbul-coverage"),
]);

const config = object({
  name: string(),
  url: string(),
  type: loaders,
  path: string(),
}).strict();

const input = array(config);

type Loaders = z.infer<typeof loaders>;
type Config = z.infer<typeof config>;

export { loaders, input, config };

export type { Loaders, Config };
