import { DiContainer } from "./DiContainer";

const diContainer = new DiContainer();

(async () =>{
  await diContainer.init();
  diContainer.debug();
  const test = diContainer.get('@fake2_application.handler').class;

  test.handle();
})();


