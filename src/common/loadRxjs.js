import Rx from 'rxjs';
global.Rx = Rx;

import * as $ from 'jquery';
window.$ = $;
window.jQuery = $;
global.jQuery = $;

console.log("jQuery loaded", jQuery);