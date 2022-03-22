import { DiContainer } from "./DiContainer";
import { InstanceBuilder } from "./InstanceBuilder";

const diContainer = new DiContainer();

const builder = new InstanceBuilder(diContainer);


(async () =>{
  await builder.execute();
  diContainer.debug();

  const test = diContainer.get('@fake2_application.handler').class;

  test.handle();
})();


