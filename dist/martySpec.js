/// <reference path="../typings/globals/jasmine/index.d.ts" />
define(["require", "exports", "./stoplight"], function (require, exports, stoplight_1) {
    "use strict";
    describe('stoplight.ts', function () {
        it('contains a definition for "StoplightStateMachine".', function () {
            expect(stoplight_1.StoplightStateMachine).toBeDefined();
        });
    });
    describe('StoplightStateMachine', function () {
        it('can be instantiated.', function () {
            var testObject = new stoplight_1.StoplightStateMachine();
            expect(testObject).toBeDefined();
        });
    });
});
