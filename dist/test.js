define(["require", "exports", "./stoplight.js"], function (require, exports, stoplight_js_1) {
    "use strict";
    var testObject = new stoplight_js_1.StoplightStateMachine();
    testObject.initialize();
    testObject.handle(stoplight_js_1.TurnOn);
    // A random crash will happen some time between [12, 45] seconds.
    setTimeout(function () {
        testObject.handle(stoplight_js_1.Crash);
    }, Math.random() * (45000 - 12000) + 12000);
});
