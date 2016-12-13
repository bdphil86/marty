/// <reference path="../typings/globals/jasmine/index.d.ts" />

"use strict";

import { State, StateMachine, ENTER, EXIT } from "./marty";
import { StoplightStateMachine } from "./stoplight";

describe('stoplight.ts', () => {

    it ('contains a definition for "StoplightStateMachine".', () => {
        expect(StoplightStateMachine).toBeDefined();
    });

});

describe('StoplightStateMachine', () => {

    it ('can be instantiated.', () => {
        let testObject: StoplightStateMachine = new StoplightStateMachine();

        expect(testObject).toBeDefined();
    });
    
});