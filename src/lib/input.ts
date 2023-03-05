import { array, literal, object, string, union, z } from "zod";

const loaders = union([
  literal("vitest-result"),
  literal("vitest-istanbul-coverage"),
]);

const configElement = object({
  name: string(),
  url: string(),
  type: loaders,
  path: string(),
}).strict();

const input = array(configElement);

type Loaders = z.infer<typeof loaders>;
type ConfigElement = z.infer<typeof configElement>;
type Config = z.infer<typeof input>;

export { loaders, input, configElement };

export type { Loaders, ConfigElement, Config };
