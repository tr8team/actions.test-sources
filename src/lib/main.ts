import { Option } from "./core/option";
import { InputRetriever } from "./interface/input-retriever";
import { ActionIO } from "./interface/io";
import { ILoadingService } from "./service";

class App {
  #retriever: InputRetriever;
  #io: ActionIO;
  #service: ILoadingService;

  run(): Option<Error[]> {
    return this.#retriever
      .retrieve()
      .mapErr((e) => [e])
      .andThen((config) => this.#service.load(config))
      .run((output) => {
        this.#io.setObject("data", output);
      })
      .err();
  }

  constructor(
    retriever: InputRetriever,
    io: ActionIO,
    service: ILoadingService
  ) {
    this.#retriever = retriever;
    this.#io = io;
    this.#service = service;
  }
}

export { App };
