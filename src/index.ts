import { DiContainer } from "./DiContainer";
import { InstanceBuilder } from "./InstanceBuilder";

const diContainer = new DiContainer();

const builder = new InstanceBuilder(diContainer);

(async () =>{
  await builder.execute();
  diContainer.debug();
})();


