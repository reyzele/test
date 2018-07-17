import { createOverlay } from './common/overlay';
import { init } from './common/Init'

const overlayTemplate = document.querySelector("#overlayTemplate").innerHTML;
const overlay = createOverlay(overlayTemplate);

init();

export { overlay };