// module화
import DataGenerator from "./dataGenerator.js";
import MainPageEvent from "./main.js";

const dataGenerator = new DataGenerator();
const mainPageEvent = new MainPageEvent();

(async function() {
  await dataGenerator.setup();
  mainPageEvent.eventHandle();
})();
// /module화