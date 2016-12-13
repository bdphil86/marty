var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./marty"], function (require, exports, marty_1) {
    "use strict";
    var TurnOn = 0;
    exports.TurnOn = TurnOn;
    var TurnOff = 1;
    var TurnRed = 2;
    var TurnYellow = 3;
    var TurnGreen = 4;
    var Crash = 5;
    exports.Crash = Crash;
    var Top = (function (_super) {
        __extends(Top, _super);
        function Top() {
            return _super.call(this, marty_1.TOP_STATE_NAME) || this;
        }
        Top.prototype.handle = function (event, payload) {
            switch (event) {
                case Crash:
                    this.crash();
                    return true;
                case TurnOff:
                    console.log("Emitting 'Off' event...");
                    this.transition("Off");
                    return true;
            }
            return false;
        };
        Top.prototype.crash = function () {
            console.log('Looks like someone hit the stoplight!');
            this.emit(TurnOff);
        };
        return Top;
    }(marty_1.State));
    var On = (function (_super) {
        __extends(On, _super);
        function On() {
            var _this = _super.call(this, "On", null, "Red") || this;
            _this._timer = null;
            return _this;
        }
        On.prototype.handle = function (event, payload) {
            var _this = this;
            switch (event) {
                case marty_1.ENTER:
                    console.log("Entering 'On' state...");
                    this._timer = setTimeout(function () {
                        console.log("Emitting 'TurnOff' event...");
                        _this.emit(TurnOff);
                    }, 60000);
                    return true;
                case marty_1.EXIT:
                    console.log("Exiting 'On' state...");
                    clearTimeout(this._timer);
                    return true;
            }
            return false;
        };
        return On;
    }(marty_1.State));
    var Red = (function (_super) {
        __extends(Red, _super);
        function Red() {
            var _this = _super.call(this, "Red", "On") || this;
            _this._timer = null;
            return _this;
        }
        Red.prototype.handle = function (event, payload) {
            var _this = this;
            switch (event) {
                case marty_1.ENTER:
                    console.log("Entering 'Red' state...");
                    this._timer = setTimeout(function () {
                        console.log("Emitting 'TurnGreen' event...");
                        _this.emit(TurnGreen);
                    }, 10000);
                    return true;
                case TurnGreen:
                    console.log("Transitioning to green...");
                    this.transition("Green");
                    return true;
                case marty_1.EXIT:
                    console.log("Exiting 'Red' state...");
                    clearTimeout(this._timer);
                    return true;
            }
            return false;
        };
        return Red;
    }(marty_1.State));
    var Yellow = (function (_super) {
        __extends(Yellow, _super);
        function Yellow() {
            var _this = _super.call(this, "Yellow", "On") || this;
            _this._timer = null;
            return _this;
        }
        Yellow.prototype.handle = function (event, payload) {
            var _this = this;
            switch (event) {
                case marty_1.ENTER:
                    console.log("Entering 'Yellow' state...");
                    this._timer = setTimeout(function () {
                        console.log("Emitting 'TurnRed' event...");
                        _this.handle(TurnRed);
                    }, 5000);
                    return true;
                case TurnRed:
                    console.log("Transitioning to red...");
                    this.transition("Red");
                    return true;
                case marty_1.EXIT:
                    console.log("Exiting 'Yellow' state...");
                    clearTimeout(this._timer);
                    return true;
            }
            return false;
        };
        return Yellow;
    }(marty_1.State));
    var Green = (function (_super) {
        __extends(Green, _super);
        function Green() {
            var _this = _super.call(this, "Green", "On") || this;
            _this._timer = null;
            return _this;
        }
        Green.prototype.handle = function (event, payload) {
            var _this = this;
            switch (event) {
                case marty_1.ENTER:
                    console.log("Entering 'Green' state...");
                    this._timer = setTimeout(function () {
                        console.log("Emitting 'TurnRed' event...");
                        _this.handle(TurnRed);
                    }, 10000);
                    return true;
                case TurnYellow:
                    console.log("Transitioning to 'Yellow' state...");
                    this.transition("Yellow");
                    return true;
                case TurnRed:
                    console.log("Oops!  Can't turn red before turning yellow!");
                    console.log("Emitting 'TurnYellow' event...");
                    this.handle(TurnYellow);
                    return true;
                case marty_1.EXIT:
                    console.log("Exiting 'Green' state...");
                    clearTimeout(this._timer);
                    return true;
            }
            return false;
        };
        return Green;
    }(marty_1.State));
    var Off = (function (_super) {
        __extends(Off, _super);
        function Off() {
            return _super.call(this, "Off") || this;
        }
        Off.prototype.handle = function (event, payload) {
            switch (event) {
                case marty_1.ENTER:
                    console.log("Entering 'Off' state...");
                    return true;
                case TurnOn:
                    console.log("Transitioning to on...");
                    this.transition("On");
                    return true;
                case TurnOff:
                    console.log("I am already off.");
                    return true;
                case marty_1.EXIT:
                    console.log("Exiting 'Off' state...");
                    return true;
            }
            return false;
        };
        return Off;
    }(marty_1.State));
    var StoplightStateMachine = (function (_super) {
        __extends(StoplightStateMachine, _super);
        function StoplightStateMachine() {
            var _this = _super.call(this, 1, new Top(), "Off") || this;
            _this._on = new On();
            _this._red = new Red();
            _this._yellow = new Yellow();
            _this._green = new Green();
            _this._off = new Off();
            _this.registerStates(_this._on, _this._red, _this._yellow, _this._green, _this._off);
            _this.registerEvents(TurnOn, TurnOff, TurnRed, TurnYellow, TurnGreen, Crash);
            return _this;
        }
        return StoplightStateMachine;
    }(marty_1.StateMachine));
    exports.StoplightStateMachine = StoplightStateMachine;
});
