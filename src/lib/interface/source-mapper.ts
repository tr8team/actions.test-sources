import { Output } from "../output";

interface SourceMapper<T> {
  map(name: string, url: string, input: T): Output;
}

export { SourceMapper };
