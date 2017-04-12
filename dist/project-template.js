/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 600);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , core      = __webpack_require__(35)
  , hide      = __webpack_require__(17)
  , redefine  = __webpack_require__(18)
  , ctx       = __webpack_require__(36)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (immutable) */ __webpack_exports__["a"] = scheduleMicroTask;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _global; });
/* harmony export (immutable) */ __webpack_exports__["l"] = getTypeNameForDebugging;
/* harmony export (immutable) */ __webpack_exports__["b"] = isPresent;
/* harmony export (immutable) */ __webpack_exports__["k"] = isBlank;
/* unused harmony export isStrictStringMap */
/* harmony export (immutable) */ __webpack_exports__["c"] = stringify;
/* unused harmony export NumberWrapper */
/* harmony export (immutable) */ __webpack_exports__["j"] = looseIdentical;
/* harmony export (immutable) */ __webpack_exports__["d"] = isJsObject;
/* harmony export (immutable) */ __webpack_exports__["f"] = print;
/* harmony export (immutable) */ __webpack_exports__["g"] = warn;
/* unused harmony export setValueOnPath */
/* harmony export (immutable) */ __webpack_exports__["e"] = getSymbolIterator;
/* harmony export (immutable) */ __webpack_exports__["i"] = isPrimitive;
/* unused harmony export escapeRegExp */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */ globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = (self);
    }
    else {
        globalScope = (global);
    }
}
else {
    globalScope = (window);
}
/**
 * @param {?} fn
 * @return {?}
 */
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var /** @type {?} */ _global = globalScope;

/**
 * @param {?} type
 * @return {?}
 */
function getTypeNameForDebugging(type) {
    return type['name'] || typeof type;
}
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
/**
 * @param {?} obj
 * @return {?}
 */
function isPresent(obj) {
    return obj != null;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isBlank(obj) {
    return obj == null;
}
var /** @type {?} */ STRING_MAP_PROTO = Object.getPrototypeOf({});
/**
 * @param {?} obj
 * @return {?}
 */
function isStrictStringMap(obj) {
    return typeof obj === 'object' && obj !== null && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
}
/**
 * @param {?} token
 * @return {?}
 */
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token == null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return "" + token.overriddenName;
    }
    if (token.name) {
        return "" + token.name;
    }
    var /** @type {?} */ res = token.toString();
    var /** @type {?} */ newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
var NumberWrapper = (function () {
    function NumberWrapper() {
    }
    /**
     * @param {?} text
     * @return {?}
     */
    NumberWrapper.parseIntAutoRadix = function (text) {
        var /** @type {?} */ result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
    return NumberWrapper;
}());
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
/**
 * @param {?} o
 * @return {?}
 */
function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
/**
 * @param {?} obj
 * @return {?}
 */
function print(obj) {
    // tslint:disable-next-line:no-console
    console.log(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
function warn(obj) {
    console.warn(obj);
}
/**
 * @param {?} global
 * @param {?} path
 * @param {?} value
 * @return {?}
 */
function setValueOnPath(global, path, value) {
    var /** @type {?} */ parts = path.split('.');
    var /** @type {?} */ obj = global;
    while (parts.length > 1) {
        var /** @type {?} */ name_1 = parts.shift();
        if (obj.hasOwnProperty(name_1) && obj[name_1] != null) {
            obj = obj[name_1];
        }
        else {
            obj = obj[name_1] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}
var /** @type {?} */ _symbolIterator = null;
/**
 * @return {?}
 */
function getSymbolIterator() {
    if (!_symbolIterator) {
        if (((globalScope)).Symbol && Symbol.iterator) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var /** @type {?} */ keys = Object.getOwnPropertyNames(Map.prototype);
            for (var /** @type {?} */ i = 0; i < keys.length; ++i) {
                var /** @type {?} */ key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    ((Map)).prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPrimitive(obj) {
    return !isJsObject(obj);
}
/**
 * @param {?} s
 * @return {?}
 */
function escapeRegExp(s) {
    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
//# sourceMappingURL=lang.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(39)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_core__ = __webpack_require__(206);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createPlatform", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "assertPlatform", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "destroyPlatform", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getPlatform", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "enableProdMode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isDevMode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createPlatformFactory", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NgProbeToken", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "APP_ID", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PACKAGE_ROOT_URL", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PLATFORM_INITIALIZER", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "APP_BOOTSTRAP_LISTENER", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "APP_INITIALIZER", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationInitStatus", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DebugElement", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DebugNode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "asNativeElements", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getDebugNode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Testability", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestabilityRegistry", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["v"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setTestabilityGetter", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["w"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TRANSLATIONS", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["x"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TRANSLATIONS_FORMAT", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LOCALE_ID", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["z"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationModule", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["A"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "wtfCreateScope", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["B"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "wtfLeave", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["C"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "wtfStartTimeRange", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["D"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "wtfEndTimeRange", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["E"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Type", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["F"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["G"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorHandler", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["H"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationTransitionEvent", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["I"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationPlayer", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["J"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationStyles", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["K"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationKeyframe", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["L"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Sanitizer", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["M"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SecurityContext", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["N"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ANALYZE_FOR_ENTRY_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["O"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["P"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContentChild", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["Q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContentChildren", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["R"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["S"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ViewChild", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["T"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ViewChildren", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["U"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["V"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Directive", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["W"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HostBinding", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["X"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HostListener", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["Y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["Z"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Output", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_0"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Pipe", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_1"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AfterContentChecked", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_2"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AfterContentInit", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_3"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AfterViewChecked", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_4"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AfterViewInit", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_5"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DoCheck", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_6"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OnChanges", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_7"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OnDestroy", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_8"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OnInit", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_9"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CUSTOM_ELEMENTS_SCHEMA", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_10"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NO_ERRORS_SCHEMA", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_11"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NgModule", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_12"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ViewEncapsulation", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_13"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_14"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_15"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Class", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_16"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "forwardRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_17"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "resolveForwardRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_18"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Injector", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_19"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ReflectiveInjector", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_20"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ResolvedReflectiveFactory", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_21"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ReflectiveKey", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_22"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OpaqueToken", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_23"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Inject", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_24"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Optional", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_25"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Injectable", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_26"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Self", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_27"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SkipSelf", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_28"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Host", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_29"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NgZone", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_30"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RenderComponentType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_31"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_32"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RootRenderer", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_33"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "COMPILER_OPTIONS", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_34"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Compiler", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_35"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CompilerFactory", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_36"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleWithComponentFactories", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_37"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentFactory", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_38"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_39"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentFactoryResolver", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_40"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ElementRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_41"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NgModuleFactory", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_42"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NgModuleRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_43"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NgModuleFactoryLoader", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_44"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getModuleFactory", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_45"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "QueryList", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_46"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SystemJsNgModuleLoader", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_47"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SystemJsNgModuleLoaderConfig", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_48"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_49"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ViewContainerRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_50"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "EmbeddedViewRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_51"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ViewRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_52"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeDetectionStrategy", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_53"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeDetectorRef", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_54"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionChangeRecord", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_55"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultIterableDiffer", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_56"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IterableDiffers", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_57"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "KeyValueChangeRecord", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_58"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "KeyValueDiffers", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_59"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleChange", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_60"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WrappedValue", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_61"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "platformCore", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_62"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "__core_private__", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_63"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AUTO_STYLE", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_64"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationEntryMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_65"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationStateMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_66"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationStateDeclarationMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_67"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationStateTransitionMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_68"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_69"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationKeyframesSequenceMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_70"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationStyleMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_71"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationAnimateMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_72"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationWithStepsMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_73"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationSequenceMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_74"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationGroupMetadata", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_75"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_76"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "group", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_77"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sequence", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_78"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "style", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_79"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_80"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_81"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "transition", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_82"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "trigger", function() { return __WEBPACK_IMPORTED_MODULE_0__src_core__["_83"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the core package.
 */

//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(111)('wks')
  , uid        = __webpack_require__(55)
  , Symbol     = __webpack_require__(4).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(3)
  , IE8_DOM_DEFINE = __webpack_require__(233)
  , toPrimitive    = __webpack_require__(30)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di_metadata__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__di_metadata__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__di_metadata__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__di_metadata__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_0__di_metadata__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_0__di_metadata__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_0__di_metadata__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di_forward_ref__ = __webpack_require__(79);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__di_forward_ref__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__di_forward_ref__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__di_injector__ = __webpack_require__(40);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__di_injector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__di_reflective_injector__ = __webpack_require__(209);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__di_reflective_injector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__di_reflective_provider__ = __webpack_require__(82);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__di_reflective_provider__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__di_reflective_key__ = __webpack_require__(81);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__di_reflective_key__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__di_opaque_token__ = __webpack_require__(80);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__di_opaque_token__["a"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */







//# sourceMappingURL=di.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(46)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9)
  , createDesc = __webpack_require__(45);
module.exports = __webpack_require__(8) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , hide      = __webpack_require__(17)
  , has       = __webpack_require__(14)
  , SRC       = __webpack_require__(55)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(35).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(5)
  , defined = __webpack_require__(24)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(92)
  , defined = __webpack_require__(24);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(93)
  , createDesc     = __webpack_require__(45)
  , toIObject      = __webpack_require__(20)
  , toPrimitive    = __webpack_require__(30)
  , has            = __webpack_require__(14)
  , IE8_DOM_DEFINE = __webpack_require__(233)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(14)
  , toObject    = __webpack_require__(13)
  , IE_PROTO    = __webpack_require__(177)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(36)
  , IObject  = __webpack_require__(92)
  , toObject = __webpack_require__(13)
  , toLength = __webpack_require__(11)
  , asc      = __webpack_require__(304);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(35)
  , fails   = __webpack_require__(5);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_decorators__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Inject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Optional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Injectable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Self; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SkipSelf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Host; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Inject decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Inject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_decorators__["b" /* makeParamDecorator */])('Inject', [['token', undefined]]);
/**
 * Optional decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Optional = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_decorators__["b" /* makeParamDecorator */])('Optional', []);
/**
 * Injectable decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Injectable = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_decorators__["a" /* makeDecorator */])('Injectable', []));
/**
 * Self decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Self = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_decorators__["b" /* makeParamDecorator */])('Self', []);
/**
 * SkipSelf decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ SkipSelf = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_decorators__["b" /* makeParamDecorator */])('SkipSelf', []);
/**
 * Host decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Host = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_decorators__["b" /* makeParamDecorator */])('Host', []);
//# sourceMappingURL=metadata.js.map

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["c"] = Class;
/* harmony export (immutable) */ __webpack_exports__["a"] = makeDecorator;
/* harmony export (immutable) */ __webpack_exports__["b"] = makeParamDecorator;
/* harmony export (immutable) */ __webpack_exports__["d"] = makePropDecorator;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var /** @type {?} */ _nextClassId = 0;
var /** @type {?} */ Reflect = __WEBPACK_IMPORTED_MODULE_0__facade_lang__["h" /* global */].Reflect;
/**
 * @param {?} annotation
 * @return {?}
 */
function extractAnnotation(annotation) {
    if (typeof annotation === 'function' && annotation.hasOwnProperty('annotation')) {
        // it is a decorator, extract annotation
        annotation = annotation.annotation;
    }
    return annotation;
}
/**
 * @param {?} fnOrArray
 * @param {?} key
 * @return {?}
 */
function applyParams(fnOrArray, key) {
    if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function ||
        fnOrArray === Number || fnOrArray === Array) {
        throw new Error("Can not use native " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(fnOrArray) + " as constructor");
    }
    if (typeof fnOrArray === 'function') {
        return fnOrArray;
    }
    if (Array.isArray(fnOrArray)) {
        var /** @type {?} */ annotations = fnOrArray;
        var /** @type {?} */ annoLength = annotations.length - 1;
        var /** @type {?} */ fn = fnOrArray[annoLength];
        if (typeof fn !== 'function') {
            throw new Error("Last position of Class method array must be Function in key " + key + " was '" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(fn) + "'");
        }
        if (annoLength != fn.length) {
            throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(fn));
        }
        var /** @type {?} */ paramsAnnotations = [];
        for (var /** @type {?} */ i = 0, /** @type {?} */ ii = annotations.length - 1; i < ii; i++) {
            var /** @type {?} */ paramAnnotations = [];
            paramsAnnotations.push(paramAnnotations);
            var /** @type {?} */ annotation = annotations[i];
            if (Array.isArray(annotation)) {
                for (var /** @type {?} */ j = 0; j < annotation.length; j++) {
                    paramAnnotations.push(extractAnnotation(annotation[j]));
                }
            }
            else if (typeof annotation === 'function') {
                paramAnnotations.push(extractAnnotation(annotation));
            }
            else {
                paramAnnotations.push(annotation);
            }
        }
        Reflect.defineMetadata('parameters', paramsAnnotations, fn);
        return fn;
    }
    throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(fnOrArray) + "'");
}
/**
 * Provides a way for expressing ES6 classes with parameter annotations in ES5.
 *
 * ## Basic Example
 *
 * ```
 * var Greeter = ng.Class({
 *   constructor: function(name) {
 *     this.name = name;
 *   },
 *
 *   greet: function() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class Greeter {
 *   constructor(name) {
 *     this.name = name;
 *   }
 *
 *   greet() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * }
 * ```
 *
 * or equivalent to ES5:
 *
 * ```
 * var Greeter = function (name) {
 *   this.name = name;
 * }
 *
 * Greeter.prototype.greet = function () {
 *   alert('Hello ' + this.name + '!');
 * }
 * ```
 *
 * ### Example with parameter annotations
 *
 * ```
 * var MyService = ng.Class({
 *   constructor: [String, [new Optional(), Service], function(name, myService) {
 *     ...
 *   }]
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class MyService {
 *   constructor(name: string, \@Optional() myService: Service) {
 *     ...
 *   }
 * }
 * ```
 *
 * ### Example with inheritance
 *
 * ```
 * var Shape = ng.Class({
 *   constructor: (color) {
 *     this.color = color;
 *   }
 * });
 *
 * var Square = ng.Class({
 *   extends: Shape,
 *   constructor: function(color, size) {
 *     Shape.call(this, color);
 *     this.size = size;
 *   }
 * });
 * ```
 * \@stable
 * @param {?} clsDef
 * @return {?}
 */
function Class(clsDef) {
    var /** @type {?} */ constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
    var /** @type {?} */ proto = constructor.prototype;
    if (clsDef.hasOwnProperty('extends')) {
        if (typeof clsDef.extends === 'function') {
            ((constructor)).prototype = proto =
                Object.create(((clsDef.extends)).prototype);
        }
        else {
            throw new Error("Class definition 'extends' property must be a constructor function was: " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(clsDef.extends));
        }
    }
    for (var key in clsDef) {
        if (key !== 'extends' && key !== 'prototype' && clsDef.hasOwnProperty(key)) {
            proto[key] = applyParams(clsDef[key], key);
        }
    }
    if (this && this.annotations instanceof Array) {
        Reflect.defineMetadata('annotations', this.annotations, constructor);
    }
    var /** @type {?} */ constructorName = constructor['name'];
    if (!constructorName || constructorName === 'constructor') {
        ((constructor))['overriddenName'] = "class" + _nextClassId++;
    }
    return (constructor);
}
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @param {?=} chainFn
 * @return {?}
 */
function makeDecorator(name, props, parentClass, chainFn) {
    if (chainFn === void 0) { chainFn = null; }
    var /** @type {?} */ metaCtor = makeMetadataCtor([props]);
    /**
     * @param {?} objOrType
     * @return {?}
     */
    function DecoratorFactory(objOrType) {
        if (!(Reflect && Reflect.getOwnMetadata)) {
            throw 'reflect-metadata shim is required when using class decorators';
        }
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, objOrType);
            return this;
        }
        var /** @type {?} */ annotationInstance = new ((DecoratorFactory))(objOrType);
        var /** @type {?} */ chainAnnotation = typeof this === 'function' && Array.isArray(this.annotations) ? this.annotations : [];
        chainAnnotation.push(annotationInstance);
        var /** @type {?} */ TypeDecorator = (function TypeDecorator(cls) {
            var /** @type {?} */ annotations = Reflect.getOwnMetadata('annotations', cls) || [];
            annotations.push(annotationInstance);
            Reflect.defineMetadata('annotations', annotations, cls);
            return cls;
        });
        TypeDecorator.annotations = chainAnnotation;
        TypeDecorator.Class = Class;
        if (chainFn)
            chainFn(TypeDecorator);
        return TypeDecorator;
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.toString = function () { return ("@" + name); };
    ((DecoratorFactory)).annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
/**
 * @param {?} props
 * @return {?}
 */
function makeMetadataCtor(props) {
    return function ctor() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        props.forEach(function (prop, i) {
            var /** @type {?} */ argVal = args[i];
            if (Array.isArray(prop)) {
                // plain parameter
                _this[prop[0]] = argVal === undefined ? prop[1] : argVal;
            }
            else {
                for (var propName in prop) {
                    _this[propName] =
                        argVal && argVal.hasOwnProperty(propName) ? argVal[propName] : prop[propName];
                }
            }
        });
    };
}
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @return {?}
 */
function makeParamDecorator(name, props, parentClass) {
    var /** @type {?} */ metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function ParamDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var /** @type {?} */ annotationInstance = new ((_a = ((ParamDecoratorFactory))).bind.apply(_a, [void 0].concat(args)))();
        ((ParamDecorator)).annotation = annotationInstance;
        return ParamDecorator;
        /**
         * @param {?} cls
         * @param {?} unusedKey
         * @param {?} index
         * @return {?}
         */
        function ParamDecorator(cls, unusedKey, index) {
            var /** @type {?} */ parameters = Reflect.getOwnMetadata('parameters', cls) || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            parameters[index].push(annotationInstance);
            Reflect.defineMetadata('parameters', parameters, cls);
            return cls;
        }
        var _a;
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.toString = function () { return ("@" + name); };
    ((ParamDecoratorFactory)).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @return {?}
 */
function makePropDecorator(name, props, parentClass) {
    var /** @type {?} */ metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function PropDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var /** @type {?} */ decoratorInstance = new ((_a = ((PropDecoratorFactory))).bind.apply(_a, [void 0].concat(args)))();
        return function PropDecorator(target, name) {
            var /** @type {?} */ meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
            Reflect.defineMetadata('propMetadata', meta, target.constructor);
        };
        var _a;
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.toString = function () { return ("@" + name); };
    ((PropDecoratorFactory)).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}
//# sourceMappingURL=decorators.js.map

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(16);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(249)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(111)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(252)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(8)){
  var LIBRARY             = __webpack_require__(48)
    , global              = __webpack_require__(4)
    , fails               = __webpack_require__(5)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(112)
    , $buffer             = __webpack_require__(184)
    , ctx                 = __webpack_require__(36)
    , anInstance          = __webpack_require__(47)
    , propertyDesc        = __webpack_require__(45)
    , hide                = __webpack_require__(17)
    , redefineAll         = __webpack_require__(52)
    , toInteger           = __webpack_require__(46)
    , toLength            = __webpack_require__(11)
    , toIndex             = __webpack_require__(54)
    , toPrimitive         = __webpack_require__(30)
    , has                 = __webpack_require__(14)
    , same                = __webpack_require__(246)
    , classof             = __webpack_require__(91)
    , isObject            = __webpack_require__(6)
    , toObject            = __webpack_require__(13)
    , isArrayIter         = __webpack_require__(169)
    , create              = __webpack_require__(49)
    , getPrototypeOf      = __webpack_require__(22)
    , gOPN                = __webpack_require__(50).f
    , getIterFn           = __webpack_require__(186)
    , uid                 = __webpack_require__(55)
    , wks                 = __webpack_require__(7)
    , createArrayMethod   = __webpack_require__(28)
    , createArrayIncludes = __webpack_require__(102)
    , speciesConstructor  = __webpack_require__(178)
    , ArrayIterators      = __webpack_require__(187)
    , Iterators           = __webpack_require__(70)
    , $iterDetect         = __webpack_require__(108)
    , setSpecies          = __webpack_require__(53)
    , arrayFill           = __webpack_require__(162)
    , arrayCopyWithin     = __webpack_require__(226)
    , $DP                 = __webpack_require__(9)
    , $GOPD               = __webpack_require__(21)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 39 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return THROW_IF_NOT_FOUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Injector; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var /** @type {?} */ _THROW_IF_NOT_FOUND = new Object();
var /** @type {?} */ THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
var _NullInjector = (function () {
    function _NullInjector() {
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    _NullInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = _THROW_IF_NOT_FOUND; }
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            throw new Error("No provider for " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(token) + "!");
        }
        return notFoundValue;
    };
    return _NullInjector;
}());
/**
 * \@whatItDoes Injector interface
 * \@howToUse
 * ```
 * const injector: Injector = ...;
 * injector.get(...);
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 * {\@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * \@stable
 * @abstract
 */
var Injector = (function () {
    function Injector() {
    }
    /**
     * Retrieves an instance from the injector based on the provided token.
     * If not found:
     * - Throws {\@link NoProviderError} if no `notFoundValue` that is not equal to
     * Injector.THROW_IF_NOT_FOUND is given
     * - Returns the `notFoundValue` otherwise
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    Injector.prototype.get = function (token, notFoundValue) { };
    Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
    Injector.NULL = new _NullInjector();
    return Injector;
}());
function Injector_tsickle_Closure_declarations() {
    /** @type {?} */
    Injector.THROW_IF_NOT_FOUND;
    /** @type {?} */
    Injector.NULL;
}
//# sourceMappingURL=injector.js.map

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringMapWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ListWrapper; });
/* harmony export (immutable) */ __webpack_exports__["b"] = isListLikeIterable;
/* harmony export (immutable) */ __webpack_exports__["c"] = areIterablesEqual;
/* harmony export (immutable) */ __webpack_exports__["d"] = iterateListLike;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Wraps Javascript Objects
 */
var StringMapWrapper = (function () {
    function StringMapWrapper() {
    }
    /**
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    StringMapWrapper.merge = function (m1, m2) {
        var /** @type {?} */ m = {};
        for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
            var k = _a[_i];
            m[k] = m1[k];
        }
        for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
            var k = _c[_b];
            m[k] = m2[k];
        }
        return m;
    };
    /**
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    StringMapWrapper.equals = function (m1, m2) {
        var /** @type {?} */ k1 = Object.keys(m1);
        var /** @type {?} */ k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (var /** @type {?} */ i = 0; i < k1.length; i++) {
            var /** @type {?} */ key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
var ListWrapper = (function () {
    function ListWrapper() {
    }
    /**
     * @param {?} arr
     * @param {?} condition
     * @return {?}
     */
    ListWrapper.findLast = function (arr, condition) {
        for (var /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
            if (condition(arr[i])) {
                return arr[i];
            }
        }
        return null;
    };
    /**
     * @param {?} list
     * @param {?} items
     * @return {?}
     */
    ListWrapper.removeAll = function (list, items) {
        for (var /** @type {?} */ i = 0; i < items.length; ++i) {
            var /** @type {?} */ index = list.indexOf(items[i]);
            if (index > -1) {
                list.splice(index, 1);
            }
        }
    };
    /**
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    ListWrapper.remove = function (list, el) {
        var /** @type {?} */ index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var /** @type {?} */ i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    /**
     * @param {?} list
     * @return {?}
     */
    ListWrapper.flatten = function (list) {
        return list.reduce(function (flat, item) {
            var /** @type {?} */ flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
            return ((flat)).concat(flatItem);
        }, []);
    };
    return ListWrapper;
}());
/**
 * @param {?} obj
 * @return {?}
 */
function isListLikeIterable(obj) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["d" /* isJsObject */])(obj))
        return false;
    return Array.isArray(obj) ||
        (!(obj instanceof Map) &&
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["e" /* getSymbolIterator */])() in obj); // JS Iterable have a Symbol.iterator prop
}
/**
 * @param {?} a
 * @param {?} b
 * @param {?} comparator
 * @return {?}
 */
function areIterablesEqual(a, b, comparator) {
    var /** @type {?} */ iterator1 = a[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["e" /* getSymbolIterator */])()]();
    var /** @type {?} */ iterator2 = b[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["e" /* getSymbolIterator */])()]();
    while (true) {
        var /** @type {?} */ item1 = iterator1.next();
        var /** @type {?} */ item2 = iterator2.next();
        if (item1.done && item2.done)
            return true;
        if (item1.done || item2.done)
            return false;
        if (!comparator(item1.value, item2.value))
            return false;
    }
}
/**
 * @param {?} obj
 * @param {?} fn
 * @return {?}
 */
function iterateListLike(obj, fn) {
    if (Array.isArray(obj)) {
        for (var /** @type {?} */ i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var /** @type {?} */ iterator = obj[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["e" /* getSymbolIterator */])()]();
        var /** @type {?} */ item = void 0;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
//# sourceMappingURL=collection.js.map

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_errors__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentStillLoadingError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ModuleWithComponentFactories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Compiler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return COMPILER_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CompilerFactory; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * Indicates that a component is still being loaded in a synchronous compile.
 *
 * \@stable
 */
var ComponentStillLoadingError = (function (_super) {
    __extends(ComponentStillLoadingError, _super);
    /**
     * @param {?} compType
     */
    function ComponentStillLoadingError(compType) {
        _super.call(this, "Can't compile synchronously as " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["c" /* stringify */])(compType) + " is still being loaded!");
        this.compType = compType;
    }
    return ComponentStillLoadingError;
}(__WEBPACK_IMPORTED_MODULE_1__facade_errors__["a" /* BaseError */]));
function ComponentStillLoadingError_tsickle_Closure_declarations() {
    /** @type {?} */
    ComponentStillLoadingError.prototype.compType;
}
/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * \@experimental
 */
var ModuleWithComponentFactories = (function () {
    /**
     * @param {?} ngModuleFactory
     * @param {?} componentFactories
     */
    function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
    }
    return ModuleWithComponentFactories;
}());
function ModuleWithComponentFactories_tsickle_Closure_declarations() {
    /** @type {?} */
    ModuleWithComponentFactories.prototype.ngModuleFactory;
    /** @type {?} */
    ModuleWithComponentFactories.prototype.componentFactories;
}
/**
 * @return {?}
 */
function _throwError() {
    throw new Error("Runtime compiler is not loaded");
}
/**
 * Low-level service for running the angular compiler during runtime
 * to create {\@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `\@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 * \@stable
 */
var Compiler = (function () {
    function Compiler() {
    }
    /**
     * Compiles the given NgModule and all of its components. All templates of the components listed
     * in `entryComponents`
     * have to be inlined. Otherwise throws a {\@link ComponentStillLoadingError}.
     * @param {?} moduleType
     * @return {?}
     */
    Compiler.prototype.compileModuleSync = function (moduleType) { throw _throwError(); };
    /**
     * Compiles the given NgModule and all of its components
     * @param {?} moduleType
     * @return {?}
     */
    Compiler.prototype.compileModuleAsync = function (moduleType) { throw _throwError(); };
    /**
     * Same as {\@link compileModuleSync} but also creates ComponentFactories for all components.
     * @param {?} moduleType
     * @return {?}
     */
    Compiler.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
        throw _throwError();
    };
    /**
     * Same as {\@link compileModuleAsync} but also creates ComponentFactories for all components.
     * @param {?} moduleType
     * @return {?}
     */
    Compiler.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
        throw _throwError();
    };
    /**
     * Exposes the CSS-style selectors that have been used in `ngContent` directives within
     * the template of the given component.
     * This is used by the `upgrade` library to compile the appropriate transclude content
     * in the Angular 1 wrapper component.
     * @param {?} component
     * @return {?}
     */
    Compiler.prototype.getNgContentSelectors = function (component) { throw _throwError(); };
    /**
     * Clears all caches.
     * @return {?}
     */
    Compiler.prototype.clearCache = function () { };
    /**
     * Clears the cache for the given component/ngModule.
     * @param {?} type
     * @return {?}
     */
    Compiler.prototype.clearCacheFor = function (type) { };
    Compiler.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    Compiler.ctorParameters = function () { return []; };
    return Compiler;
}());
function Compiler_tsickle_Closure_declarations() {
    /** @type {?} */
    Compiler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Compiler.ctorParameters;
}
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @experimental
 */
var /** @type {?} */ COMPILER_OPTIONS = new __WEBPACK_IMPORTED_MODULE_0__di__["g" /* OpaqueToken */]('compilerOptions');
/**
 * A factory for creating a Compiler
 *
 * \@experimental
 * @abstract
 */
var CompilerFactory = (function () {
    function CompilerFactory() {
    }
    /**
     * @abstract
     * @param {?=} options
     * @return {?}
     */
    CompilerFactory.prototype.createCompiler = function (options) { };
    return CompilerFactory;
}());
//# sourceMappingURL=compiler.js.map

/***/ }),
/* 43 */,
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(55)('meta')
  , isObject = __webpack_require__(6)
  , has      = __webpack_require__(14)
  , setDesc  = __webpack_require__(9).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(5)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(3)
  , dPs         = __webpack_require__(239)
  , enumBugKeys = __webpack_require__(165)
  , IE_PROTO    = __webpack_require__(177)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(164)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(167).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(241)
  , hiddenKeys = __webpack_require__(165).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(241)
  , enumBugKeys = __webpack_require__(165);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(18);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(4)
  , dP          = __webpack_require__(9)
  , DESCRIPTORS = __webpack_require__(8)
  , SPECIES     = __webpack_require__(7)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_ID; });
/* unused harmony export _appIdRandomProviderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return APP_ID_RANDOM_PROVIDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PLATFORM_INITIALIZER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return APP_BOOTSTRAP_LISTENER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PACKAGE_ROOT_URL; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 * @experimental
 */
var /** @type {?} */ APP_ID = new __WEBPACK_IMPORTED_MODULE_0__di__["g" /* OpaqueToken */]('AppId');
/**
 * @return {?}
 */
function _appIdRandomProviderFactory() {
    return "" + _randomChar() + _randomChar() + _randomChar();
}
/**
 * Providers that will generate a random APP_ID_TOKEN.
 * @experimental
 */
var /** @type {?} */ APP_ID_RANDOM_PROVIDER = {
    provide: APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: /** @type {?} */ ([]),
};
/**
 * @return {?}
 */
function _randomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}
/**
 * A function that will be executed when a platform is initialized.
 * @experimental
 */
var /** @type {?} */ PLATFORM_INITIALIZER = new __WEBPACK_IMPORTED_MODULE_0__di__["g" /* OpaqueToken */]('Platform Initializer');
/**
 * All callbacks provided via this token will be called for every component that is bootstrapped.
 * Signature of the callback:
 *
 * `(componentRef: ComponentRef) => void`.
 *
 * @experimental
 */
var /** @type {?} */ APP_BOOTSTRAP_LISTENER = new __WEBPACK_IMPORTED_MODULE_0__di__["g" /* OpaqueToken */]('appBootstrapListener');
/**
 * A token which indicates the root directory of the application
 * @experimental
 */
var /** @type {?} */ PACKAGE_ROOT_URL = new __WEBPACK_IMPORTED_MODULE_0__di__["g" /* OpaqueToken */]('Application Packages Root URL');
//# sourceMappingURL=application_tokens.js.map

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__differs_default_iterable_differ__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__differs_default_keyvalue_differ__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__differs_iterable_differs__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__differs_keyvalue_differs__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__change_detection_util__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_4__change_detection_util__["d"]; });
/* unused harmony reexport UNINITIALIZED */
/* unused harmony reexport ValueUnwrapper */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_4__change_detection_util__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__change_detection_util__["a"]; });
/* unused harmony reexport looseIdentical */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__change_detector_ref__ = __webpack_require__(129);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_5__change_detector_ref__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["b"]; });
/* unused harmony reexport isDefaultChangeDetectionStrategy */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__differs_default_iterable_differ__["b"]; });
/* unused harmony reexport DefaultIterableDifferFactory */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__differs_default_iterable_differ__["c"]; });
/* unused harmony reexport DefaultKeyValueDifferFactory */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_1__differs_default_keyvalue_differ__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__differs_iterable_differs__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__differs_keyvalue_differs__["a"]; });
/* unused harmony export keyValDiff */
/* unused harmony export iterableDiff */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return defaultIterableDiffers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return defaultKeyValueDiffers; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */












/**
 * Structural diffing for `Object`s and `Map`s.
 */
var /** @type {?} */ keyValDiff = [new __WEBPACK_IMPORTED_MODULE_1__differs_default_keyvalue_differ__["a" /* DefaultKeyValueDifferFactory */]()];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
var /** @type {?} */ iterableDiff = [new __WEBPACK_IMPORTED_MODULE_0__differs_default_iterable_differ__["a" /* DefaultIterableDifferFactory */]()];
var /** @type {?} */ defaultIterableDiffers = new __WEBPACK_IMPORTED_MODULE_2__differs_iterable_differs__["a" /* IterableDiffers */](iterableDiff);
var /** @type {?} */ defaultKeyValueDiffers = new __WEBPACK_IMPORTED_MODULE_3__differs_keyvalue_differs__["a" /* KeyValueDiffers */](keyValDiff);
//# sourceMappingURL=change_detection.js.map

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_collection__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* unused harmony reexport looseIdentical */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UNINITIALIZED; });
/* harmony export (immutable) */ __webpack_exports__["a"] = devModeEqual;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return WrappedValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ValueUnwrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SimpleChange; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



var /** @type {?} */ UNINITIALIZED = {
    toString: function () { return 'CD_INIT_VALUE'; }
};
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function devModeEqual(a, b) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_collection__["b" /* isListLikeIterable */])(a) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_collection__["b" /* isListLikeIterable */])(b)) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_collection__["c" /* areIterablesEqual */])(a, b, devModeEqual);
    }
    else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_collection__["b" /* isListLikeIterable */])(a) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["i" /* isPrimitive */])(a) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_collection__["b" /* isListLikeIterable */])(b) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["i" /* isPrimitive */])(b)) {
        return true;
    }
    else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["j" /* looseIdentical */])(a, b);
    }
}
/**
 * Indicates that the result of a {\@link Pipe} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 * \@stable
 */
var WrappedValue = (function () {
    /**
     * @param {?} wrapped
     */
    function WrappedValue(wrapped) {
        this.wrapped = wrapped;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    WrappedValue.wrap = function (value) { return new WrappedValue(value); };
    return WrappedValue;
}());
function WrappedValue_tsickle_Closure_declarations() {
    /** @type {?} */
    WrappedValue.prototype.wrapped;
}
/**
 * Helper class for unwrapping WrappedValue s
 */
var ValueUnwrapper = (function () {
    function ValueUnwrapper() {
        this.hasWrappedValue = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ValueUnwrapper.prototype.unwrap = function (value) {
        if (value instanceof WrappedValue) {
            this.hasWrappedValue = true;
            return value.wrapped;
        }
        return value;
    };
    /**
     * @return {?}
     */
    ValueUnwrapper.prototype.reset = function () { this.hasWrappedValue = false; };
    return ValueUnwrapper;
}());
function ValueUnwrapper_tsickle_Closure_declarations() {
    /** @type {?} */
    ValueUnwrapper.prototype.hasWrappedValue;
}
/**
 * Represents a basic change from a previous to a new value.
 * \@stable
 */
var SimpleChange = (function () {
    /**
     * @param {?} previousValue
     * @param {?} currentValue
     */
    function SimpleChange(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     * @return {?}
     */
    SimpleChange.prototype.isFirstChange = function () { return this.previousValue === UNINITIALIZED; };
    return SimpleChange;
}());
function SimpleChange_tsickle_Closure_declarations() {
    /** @type {?} */
    SimpleChange.prototype.previousValue;
    /** @type {?} */
    SimpleChange.prototype.currentValue;
}
//# sourceMappingURL=change_detection_util.js.map

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ChangeDetectionStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ChangeDetectorStatus; });
/* harmony export (immutable) */ __webpack_exports__["a"] = isDefaultChangeDetectionStrategy;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var ChangeDetectionStrategy = {};
ChangeDetectionStrategy.OnPush = 0;
ChangeDetectionStrategy.Default = 1;
ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush] = "OnPush";
ChangeDetectionStrategy[ChangeDetectionStrategy.Default] = "Default";
var ChangeDetectorStatus = {};
ChangeDetectorStatus.CheckOnce = 0;
ChangeDetectorStatus.Checked = 1;
ChangeDetectorStatus.CheckAlways = 2;
ChangeDetectorStatus.Detached = 3;
ChangeDetectorStatus.Errored = 4;
ChangeDetectorStatus.Destroyed = 5;
ChangeDetectorStatus[ChangeDetectorStatus.CheckOnce] = "CheckOnce";
ChangeDetectorStatus[ChangeDetectorStatus.Checked] = "Checked";
ChangeDetectorStatus[ChangeDetectorStatus.CheckAlways] = "CheckAlways";
ChangeDetectorStatus[ChangeDetectorStatus.Detached] = "Detached";
ChangeDetectorStatus[ChangeDetectorStatus.Errored] = "Errored";
ChangeDetectorStatus[ChangeDetectorStatus.Destroyed] = "Destroyed";
/**
 * @param {?} changeDetectionStrategy
 * @return {?}
 */
function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["k" /* isBlank */])(changeDetectionStrategy) ||
        changeDetectionStrategy === ChangeDetectionStrategy.Default;
}
//# sourceMappingURL=constants.js.map

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export unimplemented */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WrappedError; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Convenience to throw an Error with 'unimplemented' as the message.
 * @return {?}
 */
function unimplemented() {
    throw new Error('unimplemented');
}
/**
 * \@stable
 */
var BaseError = (function (_super) {
    __extends(BaseError, _super);
    /**
     * @param {?} message
     */
    function BaseError(message) {
        _super.call(this, message);
        // Errors don't use current this, instead they create a new instance.
        // We have to do forward all of our api to the nativeInstance.
        // TODO(bradfordcsmith): Remove this hack when
        //     google/closure-compiler/issues/2102 is fixed.
        var nativeError = new Error(message);
        this._nativeError = nativeError;
    }
    Object.defineProperty(BaseError.prototype, "message", {
        /**
         * @return {?}
         */
        get: function () { return this._nativeError.message; },
        /**
         * @param {?} message
         * @return {?}
         */
        set: function (message) { this._nativeError.message = message; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseError.prototype, "name", {
        /**
         * @return {?}
         */
        get: function () { return this._nativeError.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseError.prototype, "stack", {
        /**
         * @return {?}
         */
        get: function () { return ((this._nativeError)).stack; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { ((this._nativeError)).stack = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BaseError.prototype.toString = function () { return this._nativeError.toString(); };
    return BaseError;
}(Error));
function BaseError_tsickle_Closure_declarations() {
    /**
     * \@internal *
     * @type {?}
     */
    BaseError.prototype._nativeError;
}
/**
 * \@stable
 */
var WrappedError = (function (_super) {
    __extends(WrappedError, _super);
    /**
     * @param {?} message
     * @param {?} error
     */
    function WrappedError(message, error) {
        _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
        this.originalError = error;
    }
    Object.defineProperty(WrappedError.prototype, "stack", {
        /**
         * @return {?}
         */
        get: function () {
            return (((this.originalError instanceof Error ? this.originalError : this._nativeError)))
                .stack;
        },
        enumerable: true,
        configurable: true
    });
    return WrappedError;
}(BaseError));
function WrappedError_tsickle_Closure_declarations() {
    /** @type {?} */
    WrappedError.prototype.originalError;
}
//# sourceMappingURL=errors.js.map

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_errors__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* unused harmony export NoComponentFactoryError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ComponentFactoryResolver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodegenComponentFactoryResolver; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * \@stable
 */
var NoComponentFactoryError = (function (_super) {
    __extends(NoComponentFactoryError, _super);
    /**
     * @param {?} component
     */
    function NoComponentFactoryError(component) {
        _super.call(this, "No component factory found for " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(component) + ". Did you add it to @NgModule.entryComponents?");
        this.component = component;
    }
    return NoComponentFactoryError;
}(__WEBPACK_IMPORTED_MODULE_0__facade_errors__["a" /* BaseError */]));
function NoComponentFactoryError_tsickle_Closure_declarations() {
    /** @type {?} */
    NoComponentFactoryError.prototype.component;
}
var _NullComponentFactoryResolver = (function () {
    function _NullComponentFactoryResolver() {
    }
    /**
     * @param {?} component
     * @return {?}
     */
    _NullComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
        throw new NoComponentFactoryError(component);
    };
    return _NullComponentFactoryResolver;
}());
/**
 * \@stable
 * @abstract
 */
var ComponentFactoryResolver = (function () {
    function ComponentFactoryResolver() {
    }
    /**
     * @abstract
     * @param {?} component
     * @return {?}
     */
    ComponentFactoryResolver.prototype.resolveComponentFactory = function (component) { };
    ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
    return ComponentFactoryResolver;
}());
function ComponentFactoryResolver_tsickle_Closure_declarations() {
    /** @type {?} */
    ComponentFactoryResolver.NULL;
}
var CodegenComponentFactoryResolver = (function () {
    /**
     * @param {?} factories
     * @param {?} _parent
     */
    function CodegenComponentFactoryResolver(factories, _parent) {
        this._parent = _parent;
        this._factories = new Map();
        for (var i = 0; i < factories.length; i++) {
            var factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    /**
     * @param {?} component
     * @return {?}
     */
    CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
        var /** @type {?} */ result = this._factories.get(component);
        if (!result) {
            result = this._parent.resolveComponentFactory(component);
        }
        return result;
    };
    return CodegenComponentFactoryResolver;
}());
function CodegenComponentFactoryResolver_tsickle_Closure_declarations() {
    /** @type {?} */
    CodegenComponentFactoryResolver.prototype._factories;
    /** @type {?} */
    CodegenComponentFactoryResolver.prototype._parent;
}
//# sourceMappingURL=component_factory_resolver.js.map

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementRef; });
var ElementRef = (function () {
    /**
     * @param {?} nativeElement
     */
    function ElementRef(nativeElement) {
        this.nativeElement = nativeElement;
    }
    return ElementRef;
}());
function ElementRef_tsickle_Closure_declarations() {
    /**
     * The underlying native element or `null` if direct access to native elements is not supported
     * (e.g. when the application runs in a web worker).
     *
     * <div class="callout is-critical">
     *   <header>Use with caution</header>
     *   <p>
     *    Use this API as the last resort when direct access to DOM is needed. Use templating and
     *    data-binding provided by Angular instead. Alternatively you take a look at {\@link Renderer}
     *    which provides API that can safely be used even when direct access to native elements is not
     *    supported.
     *   </p>
     *   <p>
     *    Relying on direct DOM access creates tight coupling between your application and rendering
     *    layers which will make it impossible to separate the two and deploy your application into a
     *    web worker.
     *   </p>
     * </div>
     * \@stable
     * @type {?}
     */
    ElementRef.prototype.nativeElement;
}
//# sourceMappingURL=element_ref.js.map

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewType; });
var ViewType = {};
ViewType.HOST = 0;
ViewType.COMPONENT = 1;
ViewType.EMBEDDED = 2;
ViewType[ViewType.HOST] = "HOST";
ViewType[ViewType.COMPONENT] = "COMPONENT";
ViewType[ViewType.EMBEDDED] = "EMBEDDED";
//# sourceMappingURL=view_type.js.map

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation_animation_queue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__change_detection_change_detection__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__di__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__render_api__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__security__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__version__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__errors__ = __webpack_require__(139);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewUtils", function() { return ViewUtils; });
/* harmony export (immutable) */ __webpack_exports__["createRenderComponentType"] = createRenderComponentType;
/* harmony export (immutable) */ __webpack_exports__["addToArray"] = addToArray;
/* harmony export (immutable) */ __webpack_exports__["interpolate"] = interpolate;
/* harmony export (immutable) */ __webpack_exports__["inlineInterpolate"] = inlineInterpolate;
/* harmony export (immutable) */ __webpack_exports__["checkBinding"] = checkBinding;
/* harmony export (immutable) */ __webpack_exports__["castByValue"] = castByValue;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_ARRAY", function() { return EMPTY_ARRAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_MAP", function() { return EMPTY_MAP; });
/* harmony export (immutable) */ __webpack_exports__["pureProxy1"] = pureProxy1;
/* harmony export (immutable) */ __webpack_exports__["pureProxy2"] = pureProxy2;
/* harmony export (immutable) */ __webpack_exports__["pureProxy3"] = pureProxy3;
/* harmony export (immutable) */ __webpack_exports__["pureProxy4"] = pureProxy4;
/* harmony export (immutable) */ __webpack_exports__["pureProxy5"] = pureProxy5;
/* harmony export (immutable) */ __webpack_exports__["pureProxy6"] = pureProxy6;
/* harmony export (immutable) */ __webpack_exports__["pureProxy7"] = pureProxy7;
/* harmony export (immutable) */ __webpack_exports__["pureProxy8"] = pureProxy8;
/* harmony export (immutable) */ __webpack_exports__["pureProxy9"] = pureProxy9;
/* harmony export (immutable) */ __webpack_exports__["pureProxy10"] = pureProxy10;
/* harmony export (immutable) */ __webpack_exports__["setBindingDebugInfoForChanges"] = setBindingDebugInfoForChanges;
/* harmony export (immutable) */ __webpack_exports__["setBindingDebugInfo"] = setBindingDebugInfo;
/* harmony export (immutable) */ __webpack_exports__["createRenderElement"] = createRenderElement;
/* harmony export (immutable) */ __webpack_exports__["selectOrCreateRenderHostElement"] = selectOrCreateRenderHostElement;
/* harmony export (immutable) */ __webpack_exports__["subscribeToRenderElement"] = subscribeToRenderElement;
/* harmony export (immutable) */ __webpack_exports__["noop"] = noop;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InlineArray2", function() { return InlineArray2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InlineArray4", function() { return InlineArray4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InlineArray8", function() { return InlineArray8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InlineArray16", function() { return InlineArray16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InlineArrayDynamic", function() { return InlineArrayDynamic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_INLINE_ARRAY", function() { return EMPTY_INLINE_ARRAY; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */









var ViewUtils = (function () {
    /**
     * @param {?} _renderer
     * @param {?} sanitizer
     * @param {?} animationQueue
     */
    function ViewUtils(_renderer, sanitizer, animationQueue) {
        this._renderer = _renderer;
        this.animationQueue = animationQueue;
        this.sanitizer = sanitizer;
    }
    /**
     * \@internal
     * @param {?} renderComponentType
     * @return {?}
     */
    ViewUtils.prototype.renderComponent = function (renderComponentType) {
        return this._renderer.renderComponent(renderComponentType);
    };
    ViewUtils.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_3__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    ViewUtils.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_5__render_api__["b" /* RootRenderer */], },
        { type: __WEBPACK_IMPORTED_MODULE_6__security__["a" /* Sanitizer */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__animation_animation_queue__["a" /* AnimationQueue */], },
    ]; };
    return ViewUtils;
}());
function ViewUtils_tsickle_Closure_declarations() {
    /** @type {?} */
    ViewUtils.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ViewUtils.ctorParameters;
    /** @type {?} */
    ViewUtils.prototype.sanitizer;
    /** @type {?} */
    ViewUtils.prototype._renderer;
    /** @type {?} */
    ViewUtils.prototype.animationQueue;
}
var /** @type {?} */ nextRenderComponentTypeId = 0;
/**
 * @param {?} templateUrl
 * @param {?} slotCount
 * @param {?} encapsulation
 * @param {?} styles
 * @param {?} animations
 * @return {?}
 */
function createRenderComponentType(templateUrl, slotCount, encapsulation, styles, animations) {
    return new __WEBPACK_IMPORTED_MODULE_5__render_api__["c" /* RenderComponentType */]("" + nextRenderComponentTypeId++, templateUrl, slotCount, encapsulation, styles, animations);
}
/**
 * @param {?} e
 * @param {?} array
 * @return {?}
 */
function addToArray(e, array) {
    array.push(e);
}
/**
 * @param {?} valueCount
 * @param {?} constAndInterp
 * @return {?}
 */
function interpolate(valueCount, constAndInterp) {
    var /** @type {?} */ result = '';
    for (var /** @type {?} */ i = 0; i < valueCount * 2; i = i + 2) {
        result = result + constAndInterp[i] + _toStringWithNull(constAndInterp[i + 1]);
    }
    return result + constAndInterp[valueCount * 2];
}
/**
 * @param {?} valueCount
 * @param {?} c0
 * @param {?} a1
 * @param {?} c1
 * @param {?=} a2
 * @param {?=} c2
 * @param {?=} a3
 * @param {?=} c3
 * @param {?=} a4
 * @param {?=} c4
 * @param {?=} a5
 * @param {?=} c5
 * @param {?=} a6
 * @param {?=} c6
 * @param {?=} a7
 * @param {?=} c7
 * @param {?=} a8
 * @param {?=} c8
 * @param {?=} a9
 * @param {?=} c9
 * @return {?}
 */
function inlineInterpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
    switch (valueCount) {
        case 1:
            return c0 + _toStringWithNull(a1) + c1;
        case 2:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;
        case 3:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3;
        case 4:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4;
        case 5:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;
        case 6:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;
        case 7:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7;
        case 8:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;
        case 9:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;
        default:
            throw new Error("Does not support more than 9 expressions");
    }
}
/**
 * @param {?} v
 * @return {?}
 */
function _toStringWithNull(v) {
    return v != null ? v.toString() : '';
}
/**
 * @param {?} throwOnChange
 * @param {?} oldValue
 * @param {?} newValue
 * @return {?}
 */
function checkBinding(throwOnChange, oldValue, newValue) {
    if (throwOnChange) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__change_detection_change_detection__["a" /* devModeEqual */])(oldValue, newValue)) {
            throw new __WEBPACK_IMPORTED_MODULE_8__errors__["a" /* ExpressionChangedAfterItHasBeenCheckedError */](oldValue, newValue);
        }
        return false;
    }
    else {
        return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(oldValue, newValue);
    }
}
/**
 * @param {?} input
 * @param {?} value
 * @return {?}
 */
function castByValue(input, value) {
    return (input);
}
var /** @type {?} */ EMPTY_ARRAY = [];
var /** @type {?} */ EMPTY_MAP = {};
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy1(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0)) {
            v0 = p0;
            result = fn(p0);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy2(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    var /** @type {?} */ v1 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1)) {
            v0 = p0;
            v1 = p1;
            result = fn(p0, p1);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy3(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    var /** @type {?} */ v1 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    var /** @type {?} */ v2 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1, p2) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v2, p2)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            result = fn(p0, p1, p2);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy4(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3;
    v0 = v1 = v2 = v3 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1, p2, p3) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v2, p2) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v3, p3)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            result = fn(p0, p1, p2, p3);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy5(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4;
    v0 = v1 = v2 = v3 = v4 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1, p2, p3, p4) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v2, p2) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v3, p3) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v4, p4)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            result = fn(p0, p1, p2, p3, p4);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy6(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5;
    v0 = v1 = v2 = v3 = v4 = v5 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1, p2, p3, p4, p5) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v2, p2) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v3, p3) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v4, p4) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v5, p5)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            result = fn(p0, p1, p2, p3, p4, p5);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy7(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1, p2, p3, p4, p5, p6) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v2, p2) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v3, p3) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v4, p4) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v5, p5) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v6, p6)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            result = fn(p0, p1, p2, p3, p4, p5, p6);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy8(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1, p2, p3, p4, p5, p6, p7) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v2, p2) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v3, p3) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v4, p4) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v5, p5) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v6, p6) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v7, p7)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy9(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7, /** @type {?} */ v8;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1, p2, p3, p4, p5, p6, p7, p8) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v2, p2) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v3, p3) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v4, p4) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v5, p5) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v6, p6) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v7, p7) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v8, p8)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            v8 = p8;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy10(fn) {
    var /** @type {?} */ result;
    var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7, /** @type {?} */ v8, /** @type {?} */ v9;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = v9 = __WEBPACK_IMPORTED_MODULE_2__change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    return function (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v0, p0) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v1, p1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v2, p2) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v3, p3) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v4, p4) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v5, p5) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v6, p6) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v7, p7) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v8, p8) ||
            !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["j" /* looseIdentical */])(v9, p9)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            v8 = p8;
            v9 = p9;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        }
        return result;
    };
}
/**
 * @param {?} renderer
 * @param {?} el
 * @param {?} changes
 * @return {?}
 */
function setBindingDebugInfoForChanges(renderer, el, changes) {
    Object.keys(changes).forEach(function (propName) {
        setBindingDebugInfo(renderer, el, propName, changes[propName].currentValue);
    });
}
/**
 * @param {?} renderer
 * @param {?} el
 * @param {?} propName
 * @param {?} value
 * @return {?}
 */
function setBindingDebugInfo(renderer, el, propName, value) {
    try {
        renderer.setBindingDebugInfo(el, "ng-reflect-" + camelCaseToDashCase(propName), value ? value.toString() : null);
    }
    catch (e) {
        renderer.setBindingDebugInfo(el, "ng-reflect-" + camelCaseToDashCase(propName), '[ERROR] Exception while trying to serialize the value');
    }
}
var /** @type {?} */ CAMEL_CASE_REGEXP = /([A-Z])/g;
/**
 * @param {?} input
 * @return {?}
 */
function camelCaseToDashCase(input) {
    return input.replace(CAMEL_CASE_REGEXP, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i - 0] = arguments[_i];
        }
        return '-' + m[1].toLowerCase();
    });
}
/**
 * @param {?} renderer
 * @param {?} parentElement
 * @param {?} name
 * @param {?} attrs
 * @param {?=} debugInfo
 * @return {?}
 */
function createRenderElement(renderer, parentElement, name, attrs, debugInfo) {
    var /** @type {?} */ el = renderer.createElement(parentElement, name, debugInfo);
    for (var /** @type {?} */ i = 0; i < attrs.length; i += 2) {
        renderer.setElementAttribute(el, attrs.get(i), attrs.get(i + 1));
    }
    return el;
}
/**
 * @param {?} renderer
 * @param {?} elementName
 * @param {?} attrs
 * @param {?} rootSelectorOrNode
 * @param {?=} debugInfo
 * @return {?}
 */
function selectOrCreateRenderHostElement(renderer, elementName, attrs, rootSelectorOrNode, debugInfo) {
    var /** @type {?} */ hostElement;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["b" /* isPresent */])(rootSelectorOrNode)) {
        hostElement = renderer.selectRootElement(rootSelectorOrNode, debugInfo);
        for (var /** @type {?} */ i = 0; i < attrs.length; i += 2) {
            renderer.setElementAttribute(hostElement, attrs.get(i), attrs.get(i + 1));
        }
        renderer.setElementAttribute(hostElement, 'ng-version', __WEBPACK_IMPORTED_MODULE_7__version__["b" /* VERSION */].full);
    }
    else {
        hostElement = createRenderElement(renderer, null, elementName, attrs, debugInfo);
    }
    return hostElement;
}
/**
 * @param {?} view
 * @param {?} element
 * @param {?} eventNamesAndTargets
 * @param {?} listener
 * @return {?}
 */
function subscribeToRenderElement(view, element, eventNamesAndTargets, listener) {
    var /** @type {?} */ disposables = createEmptyInlineArray(eventNamesAndTargets.length / 2);
    for (var /** @type {?} */ i = 0; i < eventNamesAndTargets.length; i += 2) {
        var /** @type {?} */ eventName = eventNamesAndTargets.get(i);
        var /** @type {?} */ eventTarget = eventNamesAndTargets.get(i + 1);
        var /** @type {?} */ disposable = void 0;
        if (eventTarget) {
            disposable = view.renderer.listenGlobal(eventTarget, eventName, listener.bind(view, eventTarget + ":" + eventName));
        }
        else {
            disposable = view.renderer.listen(element, eventName, listener.bind(view, eventName));
        }
        disposables.set(i / 2, disposable);
    }
    return disposeInlineArray.bind(null, disposables);
}
/**
 * @param {?} disposables
 * @return {?}
 */
function disposeInlineArray(disposables) {
    for (var /** @type {?} */ i = 0; i < disposables.length; i++) {
        disposables.get(i)();
    }
}
/**
 * @return {?}
 */
function noop() { }
/**
 * @param {?} length
 * @return {?}
 */
function createEmptyInlineArray(length) {
    var /** @type {?} */ ctor;
    if (length <= 2) {
        ctor = InlineArray2;
    }
    else if (length <= 4) {
        ctor = InlineArray4;
    }
    else if (length <= 8) {
        ctor = InlineArray8;
    }
    else if (length <= 16) {
        ctor = InlineArray16;
    }
    else {
        ctor = InlineArrayDynamic;
    }
    return new ctor(length);
}
var InlineArray0 = (function () {
    function InlineArray0() {
        this.length = 0;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    InlineArray0.prototype.get = function (index) { return undefined; };
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    InlineArray0.prototype.set = function (index, value) { };
    return InlineArray0;
}());
function InlineArray0_tsickle_Closure_declarations() {
    /** @type {?} */
    InlineArray0.prototype.length;
}
var InlineArray2 = (function () {
    /**
     * @param {?} length
     * @param {?=} _v0
     * @param {?=} _v1
     */
    function InlineArray2(length, _v0, _v1) {
        this.length = length;
        this._v0 = _v0;
        this._v1 = _v1;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    InlineArray2.prototype.get = function (index) {
        switch (index) {
            case 0:
                return this._v0;
            case 1:
                return this._v1;
            default:
                return undefined;
        }
    };
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    InlineArray2.prototype.set = function (index, value) {
        switch (index) {
            case 0:
                this._v0 = value;
                break;
            case 1:
                this._v1 = value;
                break;
        }
    };
    return InlineArray2;
}());
function InlineArray2_tsickle_Closure_declarations() {
    /** @type {?} */
    InlineArray2.prototype.length;
    /** @type {?} */
    InlineArray2.prototype._v0;
    /** @type {?} */
    InlineArray2.prototype._v1;
}
var InlineArray4 = (function () {
    /**
     * @param {?} length
     * @param {?=} _v0
     * @param {?=} _v1
     * @param {?=} _v2
     * @param {?=} _v3
     */
    function InlineArray4(length, _v0, _v1, _v2, _v3) {
        this.length = length;
        this._v0 = _v0;
        this._v1 = _v1;
        this._v2 = _v2;
        this._v3 = _v3;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    InlineArray4.prototype.get = function (index) {
        switch (index) {
            case 0:
                return this._v0;
            case 1:
                return this._v1;
            case 2:
                return this._v2;
            case 3:
                return this._v3;
            default:
                return undefined;
        }
    };
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    InlineArray4.prototype.set = function (index, value) {
        switch (index) {
            case 0:
                this._v0 = value;
                break;
            case 1:
                this._v1 = value;
                break;
            case 2:
                this._v2 = value;
                break;
            case 3:
                this._v3 = value;
                break;
        }
    };
    return InlineArray4;
}());
function InlineArray4_tsickle_Closure_declarations() {
    /** @type {?} */
    InlineArray4.prototype.length;
    /** @type {?} */
    InlineArray4.prototype._v0;
    /** @type {?} */
    InlineArray4.prototype._v1;
    /** @type {?} */
    InlineArray4.prototype._v2;
    /** @type {?} */
    InlineArray4.prototype._v3;
}
var InlineArray8 = (function () {
    /**
     * @param {?} length
     * @param {?=} _v0
     * @param {?=} _v1
     * @param {?=} _v2
     * @param {?=} _v3
     * @param {?=} _v4
     * @param {?=} _v5
     * @param {?=} _v6
     * @param {?=} _v7
     */
    function InlineArray8(length, _v0, _v1, _v2, _v3, _v4, _v5, _v6, _v7) {
        this.length = length;
        this._v0 = _v0;
        this._v1 = _v1;
        this._v2 = _v2;
        this._v3 = _v3;
        this._v4 = _v4;
        this._v5 = _v5;
        this._v6 = _v6;
        this._v7 = _v7;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    InlineArray8.prototype.get = function (index) {
        switch (index) {
            case 0:
                return this._v0;
            case 1:
                return this._v1;
            case 2:
                return this._v2;
            case 3:
                return this._v3;
            case 4:
                return this._v4;
            case 5:
                return this._v5;
            case 6:
                return this._v6;
            case 7:
                return this._v7;
            default:
                return undefined;
        }
    };
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    InlineArray8.prototype.set = function (index, value) {
        switch (index) {
            case 0:
                this._v0 = value;
                break;
            case 1:
                this._v1 = value;
                break;
            case 2:
                this._v2 = value;
                break;
            case 3:
                this._v3 = value;
                break;
            case 4:
                this._v4 = value;
                break;
            case 5:
                this._v5 = value;
                break;
            case 6:
                this._v6 = value;
                break;
            case 7:
                this._v7 = value;
                break;
        }
    };
    return InlineArray8;
}());
function InlineArray8_tsickle_Closure_declarations() {
    /** @type {?} */
    InlineArray8.prototype.length;
    /** @type {?} */
    InlineArray8.prototype._v0;
    /** @type {?} */
    InlineArray8.prototype._v1;
    /** @type {?} */
    InlineArray8.prototype._v2;
    /** @type {?} */
    InlineArray8.prototype._v3;
    /** @type {?} */
    InlineArray8.prototype._v4;
    /** @type {?} */
    InlineArray8.prototype._v5;
    /** @type {?} */
    InlineArray8.prototype._v6;
    /** @type {?} */
    InlineArray8.prototype._v7;
}
var InlineArray16 = (function () {
    /**
     * @param {?} length
     * @param {?=} _v0
     * @param {?=} _v1
     * @param {?=} _v2
     * @param {?=} _v3
     * @param {?=} _v4
     * @param {?=} _v5
     * @param {?=} _v6
     * @param {?=} _v7
     * @param {?=} _v8
     * @param {?=} _v9
     * @param {?=} _v10
     * @param {?=} _v11
     * @param {?=} _v12
     * @param {?=} _v13
     * @param {?=} _v14
     * @param {?=} _v15
     */
    function InlineArray16(length, _v0, _v1, _v2, _v3, _v4, _v5, _v6, _v7, _v8, _v9, _v10, _v11, _v12, _v13, _v14, _v15) {
        this.length = length;
        this._v0 = _v0;
        this._v1 = _v1;
        this._v2 = _v2;
        this._v3 = _v3;
        this._v4 = _v4;
        this._v5 = _v5;
        this._v6 = _v6;
        this._v7 = _v7;
        this._v8 = _v8;
        this._v9 = _v9;
        this._v10 = _v10;
        this._v11 = _v11;
        this._v12 = _v12;
        this._v13 = _v13;
        this._v14 = _v14;
        this._v15 = _v15;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    InlineArray16.prototype.get = function (index) {
        switch (index) {
            case 0:
                return this._v0;
            case 1:
                return this._v1;
            case 2:
                return this._v2;
            case 3:
                return this._v3;
            case 4:
                return this._v4;
            case 5:
                return this._v5;
            case 6:
                return this._v6;
            case 7:
                return this._v7;
            case 8:
                return this._v8;
            case 9:
                return this._v9;
            case 10:
                return this._v10;
            case 11:
                return this._v11;
            case 12:
                return this._v12;
            case 13:
                return this._v13;
            case 14:
                return this._v14;
            case 15:
                return this._v15;
            default:
                return undefined;
        }
    };
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    InlineArray16.prototype.set = function (index, value) {
        switch (index) {
            case 0:
                this._v0 = value;
                break;
            case 1:
                this._v1 = value;
                break;
            case 2:
                this._v2 = value;
                break;
            case 3:
                this._v3 = value;
                break;
            case 4:
                this._v4 = value;
                break;
            case 5:
                this._v5 = value;
                break;
            case 6:
                this._v6 = value;
                break;
            case 7:
                this._v7 = value;
                break;
            case 8:
                this._v8 = value;
                break;
            case 9:
                this._v9 = value;
                break;
            case 10:
                this._v10 = value;
                break;
            case 11:
                this._v11 = value;
                break;
            case 12:
                this._v12 = value;
                break;
            case 13:
                this._v13 = value;
                break;
            case 14:
                this._v14 = value;
                break;
            case 15:
                this._v15 = value;
                break;
        }
    };
    return InlineArray16;
}());
function InlineArray16_tsickle_Closure_declarations() {
    /** @type {?} */
    InlineArray16.prototype.length;
    /** @type {?} */
    InlineArray16.prototype._v0;
    /** @type {?} */
    InlineArray16.prototype._v1;
    /** @type {?} */
    InlineArray16.prototype._v2;
    /** @type {?} */
    InlineArray16.prototype._v3;
    /** @type {?} */
    InlineArray16.prototype._v4;
    /** @type {?} */
    InlineArray16.prototype._v5;
    /** @type {?} */
    InlineArray16.prototype._v6;
    /** @type {?} */
    InlineArray16.prototype._v7;
    /** @type {?} */
    InlineArray16.prototype._v8;
    /** @type {?} */
    InlineArray16.prototype._v9;
    /** @type {?} */
    InlineArray16.prototype._v10;
    /** @type {?} */
    InlineArray16.prototype._v11;
    /** @type {?} */
    InlineArray16.prototype._v12;
    /** @type {?} */
    InlineArray16.prototype._v13;
    /** @type {?} */
    InlineArray16.prototype._v14;
    /** @type {?} */
    InlineArray16.prototype._v15;
}
var InlineArrayDynamic = (function () {
    /**
     * @param {?} length
     * @param {...?} values
     */
    function InlineArrayDynamic(length) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this.length = length;
        this._values = values;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    InlineArrayDynamic.prototype.get = function (index) { return this._values[index]; };
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    InlineArrayDynamic.prototype.set = function (index, value) { this._values[index] = value; };
    return InlineArrayDynamic;
}());
function InlineArrayDynamic_tsickle_Closure_declarations() {
    /** @type {?} */
    InlineArrayDynamic.prototype._values;
    /** @type {?} */
    InlineArrayDynamic.prototype.length;
}
var /** @type {?} */ EMPTY_INLINE_ARRAY = new InlineArray0();
//# sourceMappingURL=view_utils.js.map

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wtf_impl__ = __webpack_require__(221);
/* unused harmony export wtfEnabled */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wtfCreateScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return wtfLeave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return wtfStartTimeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return wtfEndTimeRange; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * True if WTF is enabled.
 */
var /** @type {?} */ wtfEnabled = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__wtf_impl__["a" /* detectWTF */])();
/**
 * @param {?=} arg0
 * @param {?=} arg1
 * @return {?}
 */
function noopScope(arg0, arg1) {
    return null;
}
/**
 * Create trace scope.
 *
 * Scopes must be strictly nested and are analogous to stack frames, but
 * do not have to follow the stack frames. Instead it is recommended that they follow logical
 * nesting. You may want to use
 * [Event
 * Signatures](http://google.github.io/tracing-framework/instrumenting-code.html#custom-events)
 * as they are defined in WTF.
 *
 * Used to mark scope entry. The return value is used to leave the scope.
 *
 *     var myScope = wtfCreateScope('MyClass#myMethod(ascii someVal)');
 *
 *     someMethod() {
 *        var s = myScope('Foo'); // 'Foo' gets stored in tracing UI
 *        // DO SOME WORK HERE
 *        return wtfLeave(s, 123); // Return value 123
 *     }
 *
 * Note, adding try-finally block around the work to ensure that `wtfLeave` gets called can
 * negatively impact the performance of your application. For this reason we recommend that
 * you don't add them to ensure that `wtfLeave` gets called. In production `wtfLeave` is a noop and
 * so try-finally block has no value. When debugging perf issues, skipping `wtfLeave`, do to
 * exception, will produce incorrect trace, but presence of exception signifies logic error which
 * needs to be fixed before the app should be profiled. Add try-finally only when you expect that
 * an exception is expected during normal execution while profiling.
 *
 * @experimental
 */
var /** @type {?} */ wtfCreateScope = wtfEnabled ? __WEBPACK_IMPORTED_MODULE_0__wtf_impl__["b" /* createScope */] : function (signature, flags) { return noopScope; };
/**
 * Used to mark end of Scope.
 *
 * - `scope` to end.
 * - `returnValue` (optional) to be passed to the WTF.
 *
 * Returns the `returnValue for easy chaining.
 * @experimental
 */
var /** @type {?} */ wtfLeave = wtfEnabled ? __WEBPACK_IMPORTED_MODULE_0__wtf_impl__["c" /* leave */] : function (s, r) { return r; };
/**
 * Used to mark Async start. Async are similar to scope but they don't have to be strictly nested.
 * The return value is used in the call to [endAsync]. Async ranges only work if WTF has been
 * enabled.
 *
 *     someMethod() {
 *        var s = wtfStartTimeRange('HTTP:GET', 'some.url');
 *        var future = new Future.delay(5).then((_) {
 *          wtfEndTimeRange(s);
 *        });
 *     }
 * @experimental
 */
var /** @type {?} */ wtfStartTimeRange = wtfEnabled ? __WEBPACK_IMPORTED_MODULE_0__wtf_impl__["d" /* startTimeRange */] : function (rangeType, action) { return null; };
/**
 * Ends a async time range operation.
 * [range] is the return value from [wtfStartTimeRange] Async ranges only work if WTF has been
 * enabled.
 * @experimental
 */
var /** @type {?} */ wtfEndTimeRange = wtfEnabled ? __WEBPACK_IMPORTED_MODULE_0__wtf_impl__["e" /* endTimeRange */] : function (r) { return null; };
//# sourceMappingURL=profile.js.map

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_async__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgZone; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {\@link runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {\@link run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * ### Example
 *
 * ```
 * import {Component, NgZone} from '\@angular/core';
 * import {NgIf} from '\@angular/common';
 *
 * \@Component({
 *   selector: 'ng-zone-demo'.
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *       // reenter the Angular zone and display done
 *       this._ngZone.run(() => {console.log('Outside Done!') });
 *     }}));
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * \@experimental
 */
var NgZone = (function () {
    /**
     * @param {?} __0
     */
    function NgZone(_a) {
        var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b;
        this._hasPendingMicrotasks = false;
        this._hasPendingMacrotasks = false;
        this._isStable = true;
        this._nesting = 0;
        this._onUnstable = new __WEBPACK_IMPORTED_MODULE_0__facade_async__["a" /* EventEmitter */](false);
        this._onMicrotaskEmpty = new __WEBPACK_IMPORTED_MODULE_0__facade_async__["a" /* EventEmitter */](false);
        this._onStable = new __WEBPACK_IMPORTED_MODULE_0__facade_async__["a" /* EventEmitter */](false);
        this._onErrorEvents = new __WEBPACK_IMPORTED_MODULE_0__facade_async__["a" /* EventEmitter */](false);
        if (typeof Zone == 'undefined') {
            throw new Error('Angular requires Zone.js prolyfill.');
        }
        Zone.assertZonePatched();
        this.outer = this.inner = Zone.current;
        if (Zone['wtfZoneSpec']) {
            this.inner = this.inner.fork(Zone['wtfZoneSpec']);
        }
        if (enableLongStackTrace && Zone['longStackTraceZoneSpec']) {
            this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
        }
        this.forkInnerZoneWithAngularBehavior();
    }
    /**
     * @return {?}
     */
    NgZone.isInAngularZone = function () { return Zone.current.get('isAngularZone') === true; };
    /**
     * @return {?}
     */
    NgZone.assertInAngularZone = function () {
        if (!NgZone.isInAngularZone()) {
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
    };
    /**
     * @return {?}
     */
    NgZone.assertNotInAngularZone = function () {
        if (NgZone.isInAngularZone()) {
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
    };
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {\@link runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     * @param {?} fn
     * @return {?}
     */
    NgZone.prototype.run = function (fn) { return this.inner.run(fn); };
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     * @param {?} fn
     * @return {?}
     */
    NgZone.prototype.runGuarded = function (fn) { return this.inner.runGuarded(fn); };
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {\@link run} to reenter the Angular zone and do work that updates the application model.
     * @param {?} fn
     * @return {?}
     */
    NgZone.prototype.runOutsideAngular = function (fn) { return this.outer.run(fn); };
    Object.defineProperty(NgZone.prototype, "onUnstable", {
        /**
         * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
         * @return {?}
         */
        get: function () { return this._onUnstable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
        /**
         * Notifies when there is no more microtasks enqueue in the current VM Turn.
         * This is a hint for Angular to do change detection, which may enqueue more microtasks.
         * For this reason this event can fire multiple times per VM Turn.
         * @return {?}
         */
        get: function () { return this._onMicrotaskEmpty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onStable", {
        /**
         * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
         * implies we are about to relinquish VM turn.
         * This event gets called just once.
         * @return {?}
         */
        get: function () { return this._onStable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onError", {
        /**
         * Notify that an error has been delivered.
         * @return {?}
         */
        get: function () { return this._onErrorEvents; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "isStable", {
        /**
         * Whether there are no outstanding microtasks or macrotasks.
         * @return {?}
         */
        get: function () { return this._isStable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
        /**
         * @return {?}
         */
        get: function () { return this._hasPendingMicrotasks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
        /**
         * @return {?}
         */
        get: function () { return this._hasPendingMacrotasks; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgZone.prototype.checkStable = function () {
        var _this = this;
        if (this._nesting == 0 && !this._hasPendingMicrotasks && !this._isStable) {
            try {
                this._nesting++;
                this._onMicrotaskEmpty.emit(null);
            }
            finally {
                this._nesting--;
                if (!this._hasPendingMicrotasks) {
                    try {
                        this.runOutsideAngular(function () { return _this._onStable.emit(null); });
                    }
                    finally {
                        this._isStable = true;
                    }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    NgZone.prototype.forkInnerZoneWithAngularBehavior = function () {
        var _this = this;
        this.inner = this.inner.fork({
            name: 'angular',
            properties: /** @type {?} */ ({ 'isAngularZone': true }),
            onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
                try {
                    _this.onEnter();
                    return delegate.invokeTask(target, task, applyThis, applyArgs);
                }
                finally {
                    _this.onLeave();
                }
            },
            onInvoke: function (delegate, current, target, callback, applyThis, applyArgs, source) {
                try {
                    _this.onEnter();
                    return delegate.invoke(target, callback, applyThis, applyArgs, source);
                }
                finally {
                    _this.onLeave();
                }
            },
            onHasTask: function (delegate, current, target, hasTaskState) {
                delegate.hasTask(target, hasTaskState);
                if (current === target) {
                    // We are only interested in hasTask events which originate from our zone
                    // (A child hasTask event is not interesting to us)
                    if (hasTaskState.change == 'microTask') {
                        _this.setHasMicrotask(hasTaskState.microTask);
                    }
                    else if (hasTaskState.change == 'macroTask') {
                        _this.setHasMacrotask(hasTaskState.macroTask);
                    }
                }
            },
            onHandleError: function (delegate, current, target, error) {
                delegate.handleError(target, error);
                _this.triggerError(error);
                return false;
            }
        });
    };
    /**
     * @return {?}
     */
    NgZone.prototype.onEnter = function () {
        this._nesting++;
        if (this._isStable) {
            this._isStable = false;
            this._onUnstable.emit(null);
        }
    };
    /**
     * @return {?}
     */
    NgZone.prototype.onLeave = function () {
        this._nesting--;
        this.checkStable();
    };
    /**
     * @param {?} hasMicrotasks
     * @return {?}
     */
    NgZone.prototype.setHasMicrotask = function (hasMicrotasks) {
        this._hasPendingMicrotasks = hasMicrotasks;
        this.checkStable();
    };
    /**
     * @param {?} hasMacrotasks
     * @return {?}
     */
    NgZone.prototype.setHasMacrotask = function (hasMacrotasks) { this._hasPendingMacrotasks = hasMacrotasks; };
    /**
     * @param {?} error
     * @return {?}
     */
    NgZone.prototype.triggerError = function (error) { this._onErrorEvents.emit(error); };
    return NgZone;
}());
function NgZone_tsickle_Closure_declarations() {
    /** @type {?} */
    NgZone.prototype.outer;
    /** @type {?} */
    NgZone.prototype.inner;
    /** @type {?} */
    NgZone.prototype._hasPendingMicrotasks;
    /** @type {?} */
    NgZone.prototype._hasPendingMacrotasks;
    /** @type {?} */
    NgZone.prototype._isStable;
    /** @type {?} */
    NgZone.prototype._nesting;
    /** @type {?} */
    NgZone.prototype._onUnstable;
    /** @type {?} */
    NgZone.prototype._onMicrotaskEmpty;
    /** @type {?} */
    NgZone.prototype._onStable;
    /** @type {?} */
    NgZone.prototype._onErrorEvents;
}
//# sourceMappingURL=ng_zone.js.map

/***/ }),
/* 67 */,
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(7)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(17)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(36)
  , call        = __webpack_require__(235)
  , isArrayIter = __webpack_require__(169)
  , anObject    = __webpack_require__(3)
  , toLength    = __webpack_require__(11)
  , getIterFn   = __webpack_require__(186)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f
  , has = __webpack_require__(14)
  , TAG = __webpack_require__(7)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(24)
  , fails   = __webpack_require__(5)
  , spaces  = __webpack_require__(182)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 73 */,
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NoOpAnimationPlayer; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
var AnimationPlayer = (function () {
    function AnimationPlayer() {
    }
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    AnimationPlayer.prototype.onDone = function (fn) { };
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    AnimationPlayer.prototype.onStart = function (fn) { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.init = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.hasStarted = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.play = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.pause = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.restart = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.finish = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.destroy = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.reset = function () { };
    /**
     * @abstract
     * @param {?} p
     * @return {?}
     */
    AnimationPlayer.prototype.setPosition = function (p) { };
    /**
     * @abstract
     * @return {?}
     */
    AnimationPlayer.prototype.getPosition = function () { };
    Object.defineProperty(AnimationPlayer.prototype, "parentPlayer", {
        /**
         * @return {?}
         */
        get: function () { throw new Error('NOT IMPLEMENTED: Base Class'); },
        /**
         * @param {?} player
         * @return {?}
         */
        set: function (player) { throw new Error('NOT IMPLEMENTED: Base Class'); },
        enumerable: true,
        configurable: true
    });
    return AnimationPlayer;
}());
var NoOpAnimationPlayer = (function () {
    function NoOpAnimationPlayer() {
        var _this = this;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._started = false;
        this.parentPlayer = null;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* scheduleMicroTask */])(function () { return _this._onFinish(); });
    }
    /**
     * \@internal
     * @return {?}
     */
    NoOpAnimationPlayer.prototype._onFinish = function () {
        this._onDoneFns.forEach(function (fn) { return fn(); });
        this._onDoneFns = [];
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.init = function () { };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.play = function () {
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
        }
        this._started = true;
    };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.pause = function () { };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.restart = function () { };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.finish = function () { this._onFinish(); };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.destroy = function () { };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.reset = function () { };
    /**
     * @param {?} p
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.setPosition = function (p) { };
    /**
     * @return {?}
     */
    NoOpAnimationPlayer.prototype.getPosition = function () { return 0; };
    return NoOpAnimationPlayer;
}());
function NoOpAnimationPlayer_tsickle_Closure_declarations() {
    /** @type {?} */
    NoOpAnimationPlayer.prototype._onDoneFns;
    /** @type {?} */
    NoOpAnimationPlayer.prototype._onStartFns;
    /** @type {?} */
    NoOpAnimationPlayer.prototype._started;
    /** @type {?} */
    NoOpAnimationPlayer.prototype.parentPlayer;
}
//# sourceMappingURL=animation_player.js.map

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_util_lang__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_INITIALIZER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ApplicationInitStatus; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * A function that will be executed when an application is initialized.
 * @experimental
 */
var /** @type {?} */ APP_INITIALIZER = new __WEBPACK_IMPORTED_MODULE_1__di__["g" /* OpaqueToken */]('Application Initializer');
/**
 * A class that reflects the state of running {\@link APP_INITIALIZER}s.
 *
 * \@experimental
 */
var ApplicationInitStatus = (function () {
    /**
     * @param {?} appInits
     */
    function ApplicationInitStatus(appInits) {
        var _this = this;
        this._done = false;
        var asyncInitPromises = [];
        if (appInits) {
            for (var i = 0; i < appInits.length; i++) {
                var initResult = appInits[i]();
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_util_lang__["a" /* isPromise */])(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        this._donePromise = Promise.all(asyncInitPromises).then(function () { _this._done = true; });
        if (asyncInitPromises.length === 0) {
            this._done = true;
        }
    }
    Object.defineProperty(ApplicationInitStatus.prototype, "done", {
        /**
         * @return {?}
         */
        get: function () { return this._done; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationInitStatus.prototype, "donePromise", {
        /**
         * @return {?}
         */
        get: function () { return this._donePromise; },
        enumerable: true,
        configurable: true
    });
    ApplicationInitStatus.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    ApplicationInitStatus.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__di__["h" /* Inject */], args: [APP_INITIALIZER,] }, { type: __WEBPACK_IMPORTED_MODULE_1__di__["i" /* Optional */] },] },
    ]; };
    return ApplicationInitStatus;
}());
function ApplicationInitStatus_tsickle_Closure_declarations() {
    /** @type {?} */
    ApplicationInitStatus.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ApplicationInitStatus.ctorParameters;
    /** @type {?} */
    ApplicationInitStatus.prototype._donePromise;
    /** @type {?} */
    ApplicationInitStatus.prototype._done;
}
//# sourceMappingURL=application_init.js.map

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_error_handler__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_facade_collection__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_util_lang__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__application_init__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__application_tokens__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__console__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__di__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__linker_compiler__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__linker_component_factory__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__linker_component_factory_resolver__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__profile_profile__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__testability_testability__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__zone_ng_zone__ = __webpack_require__(66);
/* harmony export (immutable) */ __webpack_exports__["g"] = enableProdMode;
/* harmony export (immutable) */ __webpack_exports__["h"] = isDevMode;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return NgProbeToken; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createPlatform;
/* harmony export (immutable) */ __webpack_exports__["i"] = createPlatformFactory;
/* harmony export (immutable) */ __webpack_exports__["b"] = assertPlatform;
/* harmony export (immutable) */ __webpack_exports__["c"] = destroyPlatform;
/* harmony export (immutable) */ __webpack_exports__["d"] = getPlatform;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PlatformRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return PlatformRef_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ApplicationRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return ApplicationRef_; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};














var /** @type {?} */ _devMode = true;
var /** @type {?} */ _runModeLocked = false;
var /** @type {?} */ _platform;
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * \@stable
 * @return {?}
 */
function enableProdMode() {
    if (_runModeLocked) {
        throw new Error('Cannot enable prod mode after platform setup.');
    }
    _devMode = false;
}
/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @return {?}
 */
function isDevMode() {
    _runModeLocked = true;
    return _devMode;
}
/**
 * A token for third-party components that can register themselves with NgProbe.
 *
 * \@experimental
 */
var NgProbeToken = (function () {
    /**
     * @param {?} name
     * @param {?} token
     */
    function NgProbeToken(name, token) {
        this.name = name;
        this.token = token;
    }
    return NgProbeToken;
}());
function NgProbeToken_tsickle_Closure_declarations() {
    /** @type {?} */
    NgProbeToken.prototype.name;
    /** @type {?} */
    NgProbeToken.prototype.token;
}
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @param {?} injector
 * @return {?}
 */
function createPlatform(injector) {
    if (_platform && !_platform.destroyed) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    var /** @type {?} */ inits = (injector.get(__WEBPACK_IMPORTED_MODULE_5__application_tokens__["c" /* PLATFORM_INITIALIZER */], null));
    if (inits)
        inits.forEach(function (init) { return init(); });
    return _platform;
}
/**
 * Creates a factory for a platform
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @param {?} parentPlatformFactory
 * @param {?} name
 * @param {?=} providers
 * @return {?}
 */
function createPlatformFactory(parentPlatformFactory, name, providers) {
    if (providers === void 0) { providers = []; }
    var /** @type {?} */ marker = new __WEBPACK_IMPORTED_MODULE_7__di__["g" /* OpaqueToken */]("Platform: " + name);
    return function (extraProviders) {
        if (extraProviders === void 0) { extraProviders = []; }
        if (!getPlatform()) {
            if (parentPlatformFactory) {
                parentPlatformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
            }
            else {
                createPlatform(__WEBPACK_IMPORTED_MODULE_7__di__["d" /* ReflectiveInjector */].resolveAndCreate(providers.concat(extraProviders).concat({ provide: marker, useValue: true })));
            }
        }
        return assertPlatform(marker);
    };
}
/**
 * Checks that there currently is a platform
 * which contains the given token as a provider.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @param {?} requiredToken
 * @return {?}
 */
function assertPlatform(requiredToken) {
    var /** @type {?} */ platform = getPlatform();
    if (!platform) {
        throw new Error('No platform exists!');
    }
    if (!platform.injector.get(requiredToken, null)) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
/**
 * Destroy the existing platform.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @return {?}
 */
function destroyPlatform() {
    if (_platform && !_platform.destroyed) {
        _platform.destroy();
    }
}
/**
 * Returns the current platform.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @return {?}
 */
function getPlatform() {
    return _platform && !_platform.destroyed ? _platform : null;
}
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {\@link bootstrap}() is called, or
 * explicitly by calling {\@link createPlatform}().
 *
 * \@stable
 * @abstract
 */
var PlatformRef = (function () {
    function PlatformRef() {
    }
    /**
     * Creates an instance of an `\@NgModule` for the given platform
     * for offline compilation.
     *
     * ## Simple Example
     *
     * ```typescript
     * my_module.ts:
     *
     * \@NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * main.ts:
     * import {MyModuleNgFactory} from './my_module.ngfactory';
     * import {platformBrowser} from '\@angular/platform-browser';
     *
     * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
     * ```
     *
     * \@experimental APIs related to application bootstrap are currently under review.
     * @abstract
     * @param {?} moduleFactory
     * @return {?}
     */
    PlatformRef.prototype.bootstrapModuleFactory = function (moduleFactory) { };
    /**
     * Creates an instance of an `\@NgModule` for a given platform using the given runtime compiler.
     *
     * ## Simple Example
     *
     * ```typescript
     * \@NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * let moduleRef = platformBrowser().bootstrapModule(MyModule);
     * ```
     * \@stable
     * @abstract
     * @param {?} moduleType
     * @param {?=} compilerOptions
     * @return {?}
     */
    PlatformRef.prototype.bootstrapModule = function (moduleType, compilerOptions) { };
    /**
     * Register a listener to be called when the platform is disposed.
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    PlatformRef.prototype.onDestroy = function (callback) { };
    /**
     * Retrieve the platform {\@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     * @abstract
     * @return {?}
     */
    PlatformRef.prototype.injector = function () { };
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     * @abstract
     * @return {?}
     */
    PlatformRef.prototype.destroy = function () { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformRef.prototype.destroyed = function () { };
    return PlatformRef;
}());
/**
 * @param {?} errorHandler
 * @param {?} callback
 * @return {?}
 */
function _callAndReportToErrorHandler(errorHandler, callback) {
    try {
        var /** @type {?} */ result = callback();
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__src_util_lang__["a" /* isPromise */])(result)) {
            return result.catch(function (e) {
                errorHandler.handleError(e);
                // rethrow as the exception handler might not do it
                throw e;
            });
        }
        return result;
    }
    catch (e) {
        errorHandler.handleError(e);
        // rethrow as the exception handler might not do it
        throw e;
    }
}
var PlatformRef_ = (function (_super) {
    __extends(PlatformRef_, _super);
    /**
     * @param {?} _injector
     */
    function PlatformRef_(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    PlatformRef_.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    Object.defineProperty(PlatformRef_.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformRef_.prototype, "destroyed", {
        /**
         * @return {?}
         */
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PlatformRef_.prototype.destroy = function () {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(function (module) { return module.destroy(); });
        this._destroyListeners.forEach(function (listener) { return listener(); });
        this._destroyed = true;
    };
    /**
     * @param {?} moduleFactory
     * @return {?}
     */
    PlatformRef_.prototype.bootstrapModuleFactory = function (moduleFactory) {
        return this._bootstrapModuleFactoryWithZone(moduleFactory, null);
    };
    /**
     * @param {?} moduleFactory
     * @param {?} ngZone
     * @return {?}
     */
    PlatformRef_.prototype._bootstrapModuleFactoryWithZone = function (moduleFactory, ngZone) {
        var _this = this;
        // Note: We need to create the NgZone _before_ we instantiate the module,
        // as instantiating the module creates some providers eagerly.
        // So we create a mini parent injector that just contains the new NgZone and
        // pass that as parent to the NgModuleFactory.
        if (!ngZone)
            ngZone = new __WEBPACK_IMPORTED_MODULE_13__zone_ng_zone__["a" /* NgZone */]({ enableLongStackTrace: isDevMode() });
        // Attention: Don't use ApplicationRef.run here,
        // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
        return ngZone.run(function () {
            var /** @type {?} */ ngZoneInjector = __WEBPACK_IMPORTED_MODULE_7__di__["d" /* ReflectiveInjector */].resolveAndCreate([{ provide: __WEBPACK_IMPORTED_MODULE_13__zone_ng_zone__["a" /* NgZone */], useValue: ngZone }], _this.injector);
            var /** @type {?} */ moduleRef = (moduleFactory.create(ngZoneInjector));
            var /** @type {?} */ exceptionHandler = moduleRef.injector.get(__WEBPACK_IMPORTED_MODULE_0__src_error_handler__["a" /* ErrorHandler */], null);
            if (!exceptionHandler) {
                throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
            }
            moduleRef.onDestroy(function () { return __WEBPACK_IMPORTED_MODULE_1__src_facade_collection__["e" /* ListWrapper */].remove(_this._modules, moduleRef); });
            ngZone.onError.subscribe({ next: function (error) { exceptionHandler.handleError(error); } });
            return _callAndReportToErrorHandler(exceptionHandler, function () {
                var /** @type {?} */ initStatus = moduleRef.injector.get(__WEBPACK_IMPORTED_MODULE_4__application_init__["b" /* ApplicationInitStatus */]);
                return initStatus.donePromise.then(function () {
                    _this._moduleDoBootstrap(moduleRef);
                    return moduleRef;
                });
            });
        });
    };
    /**
     * @param {?} moduleType
     * @param {?=} compilerOptions
     * @return {?}
     */
    PlatformRef_.prototype.bootstrapModule = function (moduleType, compilerOptions) {
        if (compilerOptions === void 0) { compilerOptions = []; }
        return this._bootstrapModuleWithZone(moduleType, compilerOptions, null);
    };
    /**
     * @param {?} moduleType
     * @param {?=} compilerOptions
     * @param {?} ngZone
     * @param {?=} componentFactoryCallback
     * @return {?}
     */
    PlatformRef_.prototype._bootstrapModuleWithZone = function (moduleType, compilerOptions, ngZone, componentFactoryCallback) {
        var _this = this;
        if (compilerOptions === void 0) { compilerOptions = []; }
        var /** @type {?} */ compilerFactory = this.injector.get(__WEBPACK_IMPORTED_MODULE_8__linker_compiler__["c" /* CompilerFactory */]);
        var /** @type {?} */ compiler = compilerFactory.createCompiler(Array.isArray(compilerOptions) ? compilerOptions : [compilerOptions]);
        // ugly internal api hack: generate host component factories for all declared components and
        // pass the factories into the callback - this is used by UpdateAdapter to get hold of all
        // factories.
        if (componentFactoryCallback) {
            return compiler.compileModuleAndAllComponentsAsync(moduleType)
                .then(function (_a) {
                var ngModuleFactory = _a.ngModuleFactory, componentFactories = _a.componentFactories;
                componentFactoryCallback(componentFactories);
                return _this._bootstrapModuleFactoryWithZone(ngModuleFactory, ngZone);
            });
        }
        return compiler.compileModuleAsync(moduleType)
            .then(function (moduleFactory) { return _this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone); });
    };
    /**
     * @param {?} moduleRef
     * @return {?}
     */
    PlatformRef_.prototype._moduleDoBootstrap = function (moduleRef) {
        var /** @type {?} */ appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef.bootstrapFactories.length > 0) {
            moduleRef.bootstrapFactories.forEach(function (compFactory) { return appRef.bootstrap(compFactory); });
        }
        else if (moduleRef.instance.ngDoBootstrap) {
            moduleRef.instance.ngDoBootstrap(appRef);
        }
        else {
            throw new Error(("The module " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__src_facade_lang__["c" /* stringify */])(moduleRef.instance.constructor) + " was bootstrapped, but it does not declare \"@NgModule.bootstrap\" components nor a \"ngDoBootstrap\" method. ") +
                "Please define one of these.");
        }
        this._modules.push(moduleRef);
    };
    PlatformRef_.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_7__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    PlatformRef_.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_7__di__["c" /* Injector */], },
    ]; };
    return PlatformRef_;
}(PlatformRef));
function PlatformRef__tsickle_Closure_declarations() {
    /** @type {?} */
    PlatformRef_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PlatformRef_.ctorParameters;
    /** @type {?} */
    PlatformRef_.prototype._modules;
    /** @type {?} */
    PlatformRef_.prototype._destroyListeners;
    /** @type {?} */
    PlatformRef_.prototype._destroyed;
    /** @type {?} */
    PlatformRef_.prototype._injector;
}
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {\@link bootstrap}.
 *
 * \@stable
 * @abstract
 */
var ApplicationRef = (function () {
    function ApplicationRef() {
    }
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * ### Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the [componentType]'s
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * ### Example
     * {\@example core/ts/platform/platform.ts region='longform'}
     * @abstract
     * @param {?} componentFactory
     * @return {?}
     */
    ApplicationRef.prototype.bootstrap = function (componentFactory) { };
    /**
     * Invoke this method to explicitly process change detection and its side-effects.
     *
     * In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further changes are detected. If additional changes are picked up during this second cycle,
     * bindings in the app have side-effects that cannot be resolved in a single change detection
     * pass.
     * In this case, Angular throws an error, since an Angular application can only have one change
     * detection pass during which all change detection must complete.
     * @abstract
     * @return {?}
     */
    ApplicationRef.prototype.tick = function () { };
    /**
     * Get a list of component types registered to this application.
     * This list is populated even before the component is created.
     * @abstract
     * @return {?}
     */
    ApplicationRef.prototype.componentTypes = function () { };
    /**
     * Get a list of components registered to this application.
     * @abstract
     * @return {?}
     */
    ApplicationRef.prototype.components = function () { };
    /**
     * Attaches a view so that it will be dirty checked.
     * The view will be automatically detached when it is destroyed.
     * This will throw if the view is already attached to a ViewContainer.
     * @abstract
     * @param {?} view
     * @return {?}
     */
    ApplicationRef.prototype.attachView = function (view) { };
    /**
     * Detaches a view from dirty checking again.
     * @abstract
     * @param {?} view
     * @return {?}
     */
    ApplicationRef.prototype.detachView = function (view) { };
    /**
     * Returns the number of attached views.
     * @abstract
     * @return {?}
     */
    ApplicationRef.prototype.viewCount = function () { };
    return ApplicationRef;
}());
var ApplicationRef_ = (function (_super) {
    __extends(ApplicationRef_, _super);
    /**
     * @param {?} _zone
     * @param {?} _console
     * @param {?} _injector
     * @param {?} _exceptionHandler
     * @param {?} _componentFactoryResolver
     * @param {?} _initStatus
     * @param {?} _testabilityRegistry
     * @param {?} _testability
     */
    function ApplicationRef_(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus, _testabilityRegistry, _testability) {
        var _this = this;
        _super.call(this);
        this._zone = _zone;
        this._console = _console;
        this._injector = _injector;
        this._exceptionHandler = _exceptionHandler;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._initStatus = _initStatus;
        this._testabilityRegistry = _testabilityRegistry;
        this._testability = _testability;
        this._bootstrapListeners = [];
        this._rootComponents = [];
        this._rootComponentTypes = [];
        this._views = [];
        this._runningTick = false;
        this._enforceNoNewChanges = false;
        this._enforceNoNewChanges = isDevMode();
        this._zone.onMicrotaskEmpty.subscribe({ next: function () { _this._zone.run(function () { _this.tick(); }); } });
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ApplicationRef_.prototype.attachView = function (viewRef) {
        var /** @type {?} */ view = ((viewRef)).internalView;
        this._views.push(view);
        view.attachToAppRef(this);
    };
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ApplicationRef_.prototype.detachView = function (viewRef) {
        var /** @type {?} */ view = ((viewRef)).internalView;
        __WEBPACK_IMPORTED_MODULE_1__src_facade_collection__["e" /* ListWrapper */].remove(this._views, view);
        view.detach();
    };
    /**
     * @param {?} componentOrFactory
     * @return {?}
     */
    ApplicationRef_.prototype.bootstrap = function (componentOrFactory) {
        var _this = this;
        if (!this._initStatus.done) {
            throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
        }
        var /** @type {?} */ componentFactory;
        if (componentOrFactory instanceof __WEBPACK_IMPORTED_MODULE_9__linker_component_factory__["b" /* ComponentFactory */]) {
            componentFactory = componentOrFactory;
        }
        else {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this._rootComponentTypes.push(componentFactory.componentType);
        var /** @type {?} */ compRef = componentFactory.create(this._injector, [], componentFactory.selector);
        compRef.onDestroy(function () { _this._unloadComponent(compRef); });
        var /** @type {?} */ testability = compRef.injector.get(__WEBPACK_IMPORTED_MODULE_12__testability_testability__["a" /* Testability */], null);
        if (testability) {
            compRef.injector.get(__WEBPACK_IMPORTED_MODULE_12__testability_testability__["b" /* TestabilityRegistry */])
                .registerApplication(compRef.location.nativeElement, testability);
        }
        this._loadComponent(compRef);
        if (isDevMode()) {
            this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode.");
        }
        return compRef;
    };
    /**
     * @param {?} componentRef
     * @return {?}
     */
    ApplicationRef_.prototype._loadComponent = function (componentRef) {
        this.attachView(componentRef.hostView);
        this.tick();
        this._rootComponents.push(componentRef);
        // Get the listeners lazily to prevent DI cycles.
        var /** @type {?} */ listeners = (this._injector.get(__WEBPACK_IMPORTED_MODULE_5__application_tokens__["d" /* APP_BOOTSTRAP_LISTENER */], [])
            .concat(this._bootstrapListeners));
        listeners.forEach(function (listener) { return listener(componentRef); });
    };
    /**
     * @param {?} componentRef
     * @return {?}
     */
    ApplicationRef_.prototype._unloadComponent = function (componentRef) {
        this.detachView(componentRef.hostView);
        __WEBPACK_IMPORTED_MODULE_1__src_facade_collection__["e" /* ListWrapper */].remove(this._rootComponents, componentRef);
    };
    /**
     * @return {?}
     */
    ApplicationRef_.prototype.tick = function () {
        if (this._runningTick) {
            throw new Error('ApplicationRef.tick is called recursively');
        }
        var /** @type {?} */ scope = ApplicationRef_._tickScope();
        try {
            this._runningTick = true;
            this._views.forEach(function (view) { return view.ref.detectChanges(); });
            if (this._enforceNoNewChanges) {
                this._views.forEach(function (view) { return view.ref.checkNoChanges(); });
            }
        }
        finally {
            this._runningTick = false;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__profile_profile__["b" /* wtfLeave */])(scope);
        }
    };
    /**
     * @return {?}
     */
    ApplicationRef_.prototype.ngOnDestroy = function () {
        // TODO(alxhub): Dispose of the NgZone.
        this._views.slice().forEach(function (view) { return view.destroy(); });
    };
    Object.defineProperty(ApplicationRef_.prototype, "viewCount", {
        /**
         * @return {?}
         */
        get: function () { return this._views.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
        /**
         * @return {?}
         */
        get: function () { return this._rootComponentTypes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "components", {
        /**
         * @return {?}
         */
        get: function () { return this._rootComponents; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    ApplicationRef_._tickScope = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__profile_profile__["a" /* wtfCreateScope */])('ApplicationRef#tick()');
    ApplicationRef_.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_7__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    ApplicationRef_.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_13__zone_ng_zone__["a" /* NgZone */], },
        { type: __WEBPACK_IMPORTED_MODULE_6__console__["a" /* Console */], },
        { type: __WEBPACK_IMPORTED_MODULE_7__di__["c" /* Injector */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__src_error_handler__["a" /* ErrorHandler */], },
        { type: __WEBPACK_IMPORTED_MODULE_10__linker_component_factory_resolver__["b" /* ComponentFactoryResolver */], },
        { type: __WEBPACK_IMPORTED_MODULE_4__application_init__["b" /* ApplicationInitStatus */], },
        { type: __WEBPACK_IMPORTED_MODULE_12__testability_testability__["b" /* TestabilityRegistry */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_7__di__["i" /* Optional */] },] },
        { type: __WEBPACK_IMPORTED_MODULE_12__testability_testability__["a" /* Testability */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_7__di__["i" /* Optional */] },] },
    ]; };
    return ApplicationRef_;
}(ApplicationRef));
function ApplicationRef__tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    ApplicationRef_._tickScope;
    /** @type {?} */
    ApplicationRef_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ApplicationRef_.ctorParameters;
    /** @type {?} */
    ApplicationRef_.prototype._bootstrapListeners;
    /** @type {?} */
    ApplicationRef_.prototype._rootComponents;
    /** @type {?} */
    ApplicationRef_.prototype._rootComponentTypes;
    /** @type {?} */
    ApplicationRef_.prototype._views;
    /** @type {?} */
    ApplicationRef_.prototype._runningTick;
    /** @type {?} */
    ApplicationRef_.prototype._enforceNoNewChanges;
    /** @type {?} */
    ApplicationRef_.prototype._zone;
    /** @type {?} */
    ApplicationRef_.prototype._console;
    /** @type {?} */
    ApplicationRef_.prototype._injector;
    /** @type {?} */
    ApplicationRef_.prototype._exceptionHandler;
    /** @type {?} */
    ApplicationRef_.prototype._componentFactoryResolver;
    /** @type {?} */
    ApplicationRef_.prototype._initStatus;
    /** @type {?} */
    ApplicationRef_.prototype._testabilityRegistry;
    /** @type {?} */
    ApplicationRef_.prototype._testability;
}
//# sourceMappingURL=application_ref.js.map

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_collection__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultIterableDifferFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DefaultIterableDiffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CollectionChangeRecord; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


var DefaultIterableDifferFactory = (function () {
    function DefaultIterableDifferFactory() {
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    DefaultIterableDifferFactory.prototype.supports = function (obj) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_collection__["b" /* isListLikeIterable */])(obj); };
    /**
     * @param {?} cdRef
     * @param {?=} trackByFn
     * @return {?}
     */
    DefaultIterableDifferFactory.prototype.create = function (cdRef, trackByFn) {
        return new DefaultIterableDiffer(trackByFn);
    };
    return DefaultIterableDifferFactory;
}());
var /** @type {?} */ trackByIdentity = function (index, item) { return item; };
/**
 * \@stable
 */
var DefaultIterableDiffer = (function () {
    /**
     * @param {?=} _trackByFn
     */
    function DefaultIterableDiffer(_trackByFn) {
        this._trackByFn = _trackByFn;
        this._length = null;
        this._collection = null;
        this._linkedRecords = null;
        this._unlinkedRecords = null;
        this._previousItHead = null;
        this._itHead = null;
        this._itTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._movesHead = null;
        this._movesTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
        this._identityChangesHead = null;
        this._identityChangesTail = null;
        this._trackByFn = this._trackByFn || trackByIdentity;
    }
    Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
        /**
         * @return {?}
         */
        get: function () { return this._collection; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
        /**
         * @return {?}
         */
        get: function () { return this._length; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._itHead; record !== null; record = record._next) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachOperation = function (fn) {
        var /** @type {?} */ nextIt = this._itHead;
        var /** @type {?} */ nextRemove = this._removalsHead;
        var /** @type {?} */ addRemoveOffset = 0;
        var /** @type {?} */ moveOffsets = null;
        while (nextIt || nextRemove) {
            // Figure out which is the next record to process
            // Order: remove, add, move
            var /** @type {?} */ record = !nextRemove ||
                nextIt &&
                    nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
                nextIt :
                nextRemove;
            var /** @type {?} */ adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
            var /** @type {?} */ currentIndex = record.currentIndex;
            // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
            if (record === nextRemove) {
                addRemoveOffset--;
                nextRemove = nextRemove._nextRemoved;
            }
            else {
                nextIt = nextIt._next;
                if (record.previousIndex == null) {
                    addRemoveOffset++;
                }
                else {
                    // INVARIANT:  currentIndex < previousIndex
                    if (!moveOffsets)
                        moveOffsets = [];
                    var /** @type {?} */ localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                    var /** @type {?} */ localCurrentIndex = currentIndex - addRemoveOffset;
                    if (localMovePreviousIndex != localCurrentIndex) {
                        for (var /** @type {?} */ i = 0; i < localMovePreviousIndex; i++) {
                            var /** @type {?} */ offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                            var /** @type {?} */ index = offset + i;
                            if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                moveOffsets[i] = offset + 1;
                            }
                        }
                        var /** @type {?} */ previousIndex = record.previousIndex;
                        moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                    }
                }
            }
            if (adjPreviousIndex !== currentIndex) {
                fn(record, adjPreviousIndex, currentIndex);
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachPreviousItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachAddedItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachMovedItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._movesHead; record !== null; record = record._nextMoved) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachRemovedItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachIdentityChange = function (fn) {
        var /** @type {?} */ record;
        for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
            fn(record);
        }
    };
    /**
     * @param {?} collection
     * @return {?}
     */
    DefaultIterableDiffer.prototype.diff = function (collection) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["k" /* isBlank */])(collection))
            collection = [];
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_collection__["b" /* isListLikeIterable */])(collection)) {
            throw new Error("Error trying to diff '" + collection + "'");
        }
        if (this.check(collection)) {
            return this;
        }
        else {
            return null;
        }
    };
    /**
     * @return {?}
     */
    DefaultIterableDiffer.prototype.onDestroy = function () { };
    /**
     * @param {?} collection
     * @return {?}
     */
    DefaultIterableDiffer.prototype.check = function (collection) {
        var _this = this;
        this._reset();
        var /** @type {?} */ record = this._itHead;
        var /** @type {?} */ mayBeDirty = false;
        var /** @type {?} */ index;
        var /** @type {?} */ item;
        var /** @type {?} */ itemTrackBy;
        if (Array.isArray(collection)) {
            var /** @type {?} */ list = collection;
            this._length = collection.length;
            for (var /** @type {?} */ index_1 = 0; index_1 < this._length; index_1++) {
                item = list[index_1];
                itemTrackBy = this._trackByFn(index_1, item);
                if (record === null || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["j" /* looseIdentical */])(record.trackById, itemTrackBy)) {
                    record = this._mismatch(record, item, itemTrackBy, index_1);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = this._verifyReinsertion(record, item, itemTrackBy, index_1);
                    }
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["j" /* looseIdentical */])(record.item, item))
                        this._addIdentityChange(record, item);
                }
                record = record._next;
            }
        }
        else {
            index = 0;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_collection__["d" /* iterateListLike */])(collection, function (item /** TODO #9100 */) {
                itemTrackBy = _this._trackByFn(index, item);
                if (record === null || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["j" /* looseIdentical */])(record.trackById, itemTrackBy)) {
                    record = _this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = _this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["j" /* looseIdentical */])(record.item, item))
                        _this._addIdentityChange(record, item);
                }
                record = record._next;
                index++;
            });
            this._length = index;
        }
        this._truncate(record);
        this._collection = collection;
        return this.isDirty;
    };
    Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
        /**
         * @return {?}
         */
        get: function () {
            return this._additionsHead !== null || this._movesHead !== null ||
                this._removalsHead !== null || this._identityChangesHead !== null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     *
     * \@internal
     * @return {?}
     */
    DefaultIterableDiffer.prototype._reset = function () {
        if (this.isDirty) {
            var /** @type {?} */ record = void 0;
            var /** @type {?} */ nextRecord = void 0;
            for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                record.previousIndex = record.currentIndex;
            }
            this._additionsHead = this._additionsTail = null;
            for (record = this._movesHead; record !== null; record = nextRecord) {
                record.previousIndex = record.currentIndex;
                nextRecord = record._nextMoved;
            }
            this._movesHead = this._movesTail = null;
            this._removalsHead = this._removalsTail = null;
            this._identityChangesHead = this._identityChangesTail = null;
        }
    };
    /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     *
     * \@internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._mismatch = function (record, item, itemTrackBy, index) {
        // The previous record after which we will append the current one.
        var /** @type {?} */ previousRecord;
        if (record === null) {
            previousRecord = this._itTail;
        }
        else {
            previousRecord = record._prev;
            // Remove the record from the collection since we know it does not match the item.
            this._remove(record);
        }
        // Attempt to see if we have seen the item before.
        record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
        if (record !== null) {
            // We have seen this before, we need to move it forward in the collection.
            // But first we need to check if identity changed, so we can update in view if necessary
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["j" /* looseIdentical */])(record.item, item))
                this._addIdentityChange(record, item);
            this._moveAfter(record, previousRecord, index);
        }
        else {
            // Never seen it, check evicted list.
            record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
            if (record !== null) {
                // It is an item which we have evicted earlier: reinsert it back into the list.
                // But first we need to check if identity changed, so we can update in view if necessary
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["j" /* looseIdentical */])(record.item, item))
                    this._addIdentityChange(record, item);
                this._reinsertAfter(record, previousRecord, index);
            }
            else {
                // It is a new item: add it.
                record =
                    this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
            }
        }
        return record;
    };
    /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     *
     * \@internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._verifyReinsertion = function (record, item, itemTrackBy, index) {
        var /** @type {?} */ reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
        if (reinsertRecord !== null) {
            record = this._reinsertAfter(reinsertRecord, record._prev, index);
        }
        else if (record.currentIndex != index) {
            record.currentIndex = index;
            this._addToMoves(record, index);
        }
        return record;
    };
    /**
     * Get rid of any excess {\@link CollectionChangeRecord}s from the previous collection
     *
     * - `record` The first excess {\@link CollectionChangeRecord}.
     *
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultIterableDiffer.prototype._truncate = function (record) {
        // Anything after that needs to be removed;
        while (record !== null) {
            var /** @type {?} */ nextRecord = record._next;
            this._addToRemovals(this._unlink(record));
            record = nextRecord;
        }
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.clear();
        }
        if (this._additionsTail !== null) {
            this._additionsTail._nextAdded = null;
        }
        if (this._movesTail !== null) {
            this._movesTail._nextMoved = null;
        }
        if (this._itTail !== null) {
            this._itTail._next = null;
        }
        if (this._removalsTail !== null) {
            this._removalsTail._nextRemoved = null;
        }
        if (this._identityChangesTail !== null) {
            this._identityChangesTail._nextIdentityChange = null;
        }
    };
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._reinsertAfter = function (record, prevRecord, index) {
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.remove(record);
        }
        var /** @type {?} */ prev = record._prevRemoved;
        var /** @type {?} */ next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    };
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._moveAfter = function (record, prevRecord, index) {
        this._unlink(record);
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    };
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._addAfter = function (record, prevRecord, index) {
        this._insertAfter(record, prevRecord, index);
        if (this._additionsTail === null) {
            // todo(vicb)
            // assert(this._additionsHead === null);
            this._additionsTail = this._additionsHead = record;
        }
        else {
            // todo(vicb)
            // assert(_additionsTail._nextAdded === null);
            // assert(record._nextAdded === null);
            this._additionsTail = this._additionsTail._nextAdded = record;
        }
        return record;
    };
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._insertAfter = function (record, prevRecord, index) {
        // todo(vicb)
        // assert(record != prevRecord);
        // assert(record._next === null);
        // assert(record._prev === null);
        var /** @type {?} */ next = prevRecord === null ? this._itHead : prevRecord._next;
        // todo(vicb)
        // assert(next != record);
        // assert(prevRecord != record);
        record._next = next;
        record._prev = prevRecord;
        if (next === null) {
            this._itTail = record;
        }
        else {
            next._prev = record;
        }
        if (prevRecord === null) {
            this._itHead = record;
        }
        else {
            prevRecord._next = record;
        }
        if (this._linkedRecords === null) {
            this._linkedRecords = new _DuplicateMap();
        }
        this._linkedRecords.put(record);
        record.currentIndex = index;
        return record;
    };
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultIterableDiffer.prototype._remove = function (record) {
        return this._addToRemovals(this._unlink(record));
    };
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultIterableDiffer.prototype._unlink = function (record) {
        if (this._linkedRecords !== null) {
            this._linkedRecords.remove(record);
        }
        var /** @type {?} */ prev = record._prev;
        var /** @type {?} */ next = record._next;
        // todo(vicb)
        // assert((record._prev = null) === null);
        // assert((record._next = null) === null);
        if (prev === null) {
            this._itHead = next;
        }
        else {
            prev._next = next;
        }
        if (next === null) {
            this._itTail = prev;
        }
        else {
            next._prev = prev;
        }
        return record;
    };
    /**
     * \@internal
     * @param {?} record
     * @param {?} toIndex
     * @return {?}
     */
    DefaultIterableDiffer.prototype._addToMoves = function (record, toIndex) {
        // todo(vicb)
        // assert(record._nextMoved === null);
        if (record.previousIndex === toIndex) {
            return record;
        }
        if (this._movesTail === null) {
            // todo(vicb)
            // assert(_movesHead === null);
            this._movesTail = this._movesHead = record;
        }
        else {
            // todo(vicb)
            // assert(_movesTail._nextMoved === null);
            this._movesTail = this._movesTail._nextMoved = record;
        }
        return record;
    };
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultIterableDiffer.prototype._addToRemovals = function (record) {
        if (this._unlinkedRecords === null) {
            this._unlinkedRecords = new _DuplicateMap();
        }
        this._unlinkedRecords.put(record);
        record.currentIndex = null;
        record._nextRemoved = null;
        if (this._removalsTail === null) {
            // todo(vicb)
            // assert(_removalsHead === null);
            this._removalsTail = this._removalsHead = record;
            record._prevRemoved = null;
        }
        else {
            // todo(vicb)
            // assert(_removalsTail._nextRemoved === null);
            // assert(record._nextRemoved === null);
            record._prevRemoved = this._removalsTail;
            this._removalsTail = this._removalsTail._nextRemoved = record;
        }
        return record;
    };
    /**
     * \@internal
     * @param {?} record
     * @param {?} item
     * @return {?}
     */
    DefaultIterableDiffer.prototype._addIdentityChange = function (record, item) {
        record.item = item;
        if (this._identityChangesTail === null) {
            this._identityChangesTail = this._identityChangesHead = record;
        }
        else {
            this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
        }
        return record;
    };
    /**
     * @return {?}
     */
    DefaultIterableDiffer.prototype.toString = function () {
        var /** @type {?} */ list = [];
        this.forEachItem(function (record /** TODO #9100 */) { return list.push(record); });
        var /** @type {?} */ previous = [];
        this.forEachPreviousItem(function (record /** TODO #9100 */) { return previous.push(record); });
        var /** @type {?} */ additions = [];
        this.forEachAddedItem(function (record /** TODO #9100 */) { return additions.push(record); });
        var /** @type {?} */ moves = [];
        this.forEachMovedItem(function (record /** TODO #9100 */) { return moves.push(record); });
        var /** @type {?} */ removals = [];
        this.forEachRemovedItem(function (record /** TODO #9100 */) { return removals.push(record); });
        var /** @type {?} */ identityChanges = [];
        this.forEachIdentityChange(function (record /** TODO #9100 */) { return identityChanges.push(record); });
        return 'collection: ' + list.join(', ') + '\n' +
            'previous: ' + previous.join(', ') + '\n' +
            'additions: ' + additions.join(', ') + '\n' +
            'moves: ' + moves.join(', ') + '\n' +
            'removals: ' + removals.join(', ') + '\n' +
            'identityChanges: ' + identityChanges.join(', ') + '\n';
    };
    return DefaultIterableDiffer;
}());
function DefaultIterableDiffer_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultIterableDiffer.prototype._length;
    /** @type {?} */
    DefaultIterableDiffer.prototype._collection;
    /** @type {?} */
    DefaultIterableDiffer.prototype._linkedRecords;
    /** @type {?} */
    DefaultIterableDiffer.prototype._unlinkedRecords;
    /** @type {?} */
    DefaultIterableDiffer.prototype._previousItHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._itHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._itTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._additionsHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._additionsTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._movesHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._movesTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._removalsHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._removalsTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._identityChangesHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._identityChangesTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._trackByFn;
}
/**
 * \@stable
 */
var CollectionChangeRecord = (function () {
    /**
     * @param {?} item
     * @param {?} trackById
     */
    function CollectionChangeRecord(item, trackById) {
        this.item = item;
        this.trackById = trackById;
        this.currentIndex = null;
        this.previousIndex = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._prev = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._prevDup = null;
        /** @internal */
        this._nextDup = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextMoved = null;
        /** @internal */
        this._nextIdentityChange = null;
    }
    /**
     * @return {?}
     */
    CollectionChangeRecord.prototype.toString = function () {
        return this.previousIndex === this.currentIndex ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(this.item) :
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(this.item) + '[' +
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(this.previousIndex) + '->' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(this.currentIndex) + ']';
    };
    return CollectionChangeRecord;
}());
function CollectionChangeRecord_tsickle_Closure_declarations() {
    /** @type {?} */
    CollectionChangeRecord.prototype.currentIndex;
    /** @type {?} */
    CollectionChangeRecord.prototype.previousIndex;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._nextPrevious;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._prev;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._next;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._prevDup;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._nextDup;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._prevRemoved;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._nextRemoved;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._nextAdded;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._nextMoved;
    /**
     * \@internal
     * @type {?}
     */
    CollectionChangeRecord.prototype._nextIdentityChange;
    /** @type {?} */
    CollectionChangeRecord.prototype.item;
    /** @type {?} */
    CollectionChangeRecord.prototype.trackById;
}
var _DuplicateItemRecordList = (function () {
    function _DuplicateItemRecordList() {
        /** @internal */
        this._head = null;
        /** @internal */
        this._tail = null;
    }
    /**
     * Append the record to the list of duplicates.
     *
     * Note: by design all records in the list of duplicates hold the same value in record.item.
     * @param {?} record
     * @return {?}
     */
    _DuplicateItemRecordList.prototype.add = function (record) {
        if (this._head === null) {
            this._head = this._tail = record;
            record._nextDup = null;
            record._prevDup = null;
        }
        else {
            // todo(vicb)
            // assert(record.item ==  _head.item ||
            //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
            this._tail._nextDup = record;
            record._prevDup = this._tail;
            record._nextDup = null;
            this._tail = record;
        }
    };
    /**
     * @param {?} trackById
     * @param {?} afterIndex
     * @return {?}
     */
    _DuplicateItemRecordList.prototype.get = function (trackById, afterIndex) {
        var /** @type {?} */ record;
        for (record = this._head; record !== null; record = record._nextDup) {
            if ((afterIndex === null || afterIndex < record.currentIndex) &&
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["j" /* looseIdentical */])(record.trackById, trackById)) {
                return record;
            }
        }
        return null;
    };
    /**
     * Remove one {\@link CollectionChangeRecord} from the list of duplicates.
     *
     * Returns whether the list of duplicates is empty.
     * @param {?} record
     * @return {?}
     */
    _DuplicateItemRecordList.prototype.remove = function (record) {
        // todo(vicb)
        // assert(() {
        //  // verify that the record being removed is in the list.
        //  for (CollectionChangeRecord cursor = _head; cursor != null; cursor = cursor._nextDup) {
        //    if (identical(cursor, record)) return true;
        //  }
        //  return false;
        //});
        var /** @type {?} */ prev = record._prevDup;
        var /** @type {?} */ next = record._nextDup;
        if (prev === null) {
            this._head = next;
        }
        else {
            prev._nextDup = next;
        }
        if (next === null) {
            this._tail = prev;
        }
        else {
            next._prevDup = prev;
        }
        return this._head === null;
    };
    return _DuplicateItemRecordList;
}());
function _DuplicateItemRecordList_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    _DuplicateItemRecordList.prototype._head;
    /**
     * \@internal
     * @type {?}
     */
    _DuplicateItemRecordList.prototype._tail;
}
var _DuplicateMap = (function () {
    function _DuplicateMap() {
        this.map = new Map();
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _DuplicateMap.prototype.put = function (record) {
        var /** @type {?} */ key = record.trackById;
        var /** @type {?} */ duplicates = this.map.get(key);
        if (!duplicates) {
            duplicates = new _DuplicateItemRecordList();
            this.map.set(key, duplicates);
        }
        duplicates.add(record);
    };
    /**
     * Retrieve the `value` using key. Because the CollectionChangeRecord value may be one which we
     * have already iterated over, we use the afterIndex to pretend it is not there.
     *
     * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
     * have any more `a`s needs to return the last `a` not the first or second.
     * @param {?} trackById
     * @param {?=} afterIndex
     * @return {?}
     */
    _DuplicateMap.prototype.get = function (trackById, afterIndex) {
        if (afterIndex === void 0) { afterIndex = null; }
        var /** @type {?} */ key = trackById;
        var /** @type {?} */ recordList = this.map.get(key);
        return recordList ? recordList.get(trackById, afterIndex) : null;
    };
    /**
     * Removes a {\@link CollectionChangeRecord} from the list of duplicates.
     *
     * The list of duplicates also is removed from the map if it gets empty.
     * @param {?} record
     * @return {?}
     */
    _DuplicateMap.prototype.remove = function (record) {
        var /** @type {?} */ key = record.trackById;
        var /** @type {?} */ recordList = this.map.get(key);
        // Remove the list of duplicates when it gets empty
        if (recordList.remove(record)) {
            this.map.delete(key);
        }
        return record;
    };
    Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
        /**
         * @return {?}
         */
        get: function () { return this.map.size === 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    _DuplicateMap.prototype.clear = function () { this.map.clear(); };
    /**
     * @return {?}
     */
    _DuplicateMap.prototype.toString = function () { return '_DuplicateMap(' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(this.map) + ')'; };
    return _DuplicateMap;
}());
function _DuplicateMap_tsickle_Closure_declarations() {
    /** @type {?} */
    _DuplicateMap.prototype.map;
}
/**
 * @param {?} item
 * @param {?} addRemoveOffset
 * @param {?} moveOffsets
 * @return {?}
 */
function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
    var /** @type {?} */ previousIndex = item.previousIndex;
    if (previousIndex === null)
        return previousIndex;
    var /** @type {?} */ moveOffset = 0;
    if (moveOffsets && previousIndex < moveOffsets.length) {
        moveOffset = moveOffsets[previousIndex];
    }
    return previousIndex + addRemoveOffset + moveOffset;
}
//# sourceMappingURL=default_iterable_differ.js.map

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Console; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


var Console = (function () {
    function Console() {
    }
    /**
     * @param {?} message
     * @return {?}
     */
    Console.prototype.log = function (message) { __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["f" /* print */])(message); };
    /**
     * @param {?} message
     * @return {?}
     */
    Console.prototype.warn = function (message) { __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["g" /* warn */])(message); };
    Console.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    Console.ctorParameters = function () { return []; };
    return Console;
}());
function Console_tsickle_Closure_declarations() {
    /** @type {?} */
    Console.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Console.ctorParameters;
}
//# sourceMappingURL=console.js.map

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = forwardRef;
/* harmony export (immutable) */ __webpack_exports__["a"] = resolveForwardRef;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {\@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * \@experimental
 * @param {?} forwardRefFn
 * @return {?}
 */
function forwardRef(forwardRefFn) {
    ((forwardRefFn)).__forward_ref__ = forwardRef;
    ((forwardRefFn)).toString = function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(this()); };
    return (((forwardRefFn)));
}
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 *
 * {\@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * See: {\@link forwardRef}
 * \@experimental
 * @param {?} type
 * @return {?}
 */
function resolveForwardRef(type) {
    if (typeof type === 'function' && type.hasOwnProperty('__forward_ref__') &&
        type.__forward_ref__ === forwardRef) {
        return ((type))();
    }
    else {
        return type;
    }
}
//# sourceMappingURL=forward_ref.js.map

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__metadata__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpaqueToken; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var OpaqueToken = (function () {
    /**
     * @param {?} _desc
     */
    function OpaqueToken(_desc) {
        this._desc = _desc;
    }
    /**
     * @return {?}
     */
    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
    OpaqueToken.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__metadata__["a" /* Injectable */] },
    ];
    /** @nocollapse */
    OpaqueToken.ctorParameters = function () { return [
        null,
    ]; };
    return OpaqueToken;
}());
function OpaqueToken_tsickle_Closure_declarations() {
    /** @type {?} */
    OpaqueToken.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    OpaqueToken.ctorParameters;
    /** @type {?} */
    OpaqueToken.prototype._desc;
}
//# sourceMappingURL=opaque_token.js.map

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forward_ref__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReflectiveKey; });
/* unused harmony export KeyRegistry */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * A unique object used for retrieving items from the {\@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {\@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {\@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 * \@experimental
 */
var ReflectiveKey = (function () {
    /**
     * Private
     * @param {?} token
     * @param {?} id
     */
    function ReflectiveKey(token, id) {
        this.token = token;
        this.id = id;
        if (!token) {
            throw new Error('Token must be defined!');
        }
    }
    Object.defineProperty(ReflectiveKey.prototype, "displayName", {
        /**
         * Returns a stringified token.
         * @return {?}
         */
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(this.token); },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves a `Key` for a token.
     * @param {?} token
     * @return {?}
     */
    ReflectiveKey.get = function (token) {
        return _globalKeyRegistry.get(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__forward_ref__["a" /* resolveForwardRef */])(token));
    };
    Object.defineProperty(ReflectiveKey, "numberOfKeys", {
        /**
         * @return {?} the number of keys registered in the system.
         */
        get: function () { return _globalKeyRegistry.numberOfKeys; },
        enumerable: true,
        configurable: true
    });
    return ReflectiveKey;
}());
function ReflectiveKey_tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectiveKey.prototype.token;
    /** @type {?} */
    ReflectiveKey.prototype.id;
}
/**
 * \@internal
 */
var KeyRegistry = (function () {
    function KeyRegistry() {
        this._allKeys = new Map();
    }
    /**
     * @param {?} token
     * @return {?}
     */
    KeyRegistry.prototype.get = function (token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return this._allKeys.get(token);
        }
        var /** @type {?} */ newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
        /**
         * @return {?}
         */
        get: function () { return this._allKeys.size; },
        enumerable: true,
        configurable: true
    });
    return KeyRegistry;
}());
function KeyRegistry_tsickle_Closure_declarations() {
    /** @type {?} */
    KeyRegistry.prototype._allKeys;
}
var /** @type {?} */ _globalKeyRegistry = new KeyRegistry();
//# sourceMappingURL=reflective_key.js.map

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reflection_reflection__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forward_ref__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__metadata__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reflective_errors__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reflective_key__ = __webpack_require__(81);
/* unused harmony export ReflectiveDependency */
/* unused harmony export ResolvedReflectiveProvider_ */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ResolvedReflectiveFactory; });
/* harmony export (immutable) */ __webpack_exports__["c"] = resolveReflectiveProviders;
/* unused harmony export mergeResolvedReflectiveProviders */
/* harmony export (immutable) */ __webpack_exports__["a"] = constructDependencies;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */






/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
var ReflectiveDependency = (function () {
    /**
     * @param {?} key
     * @param {?} optional
     * @param {?} visibility
     */
    function ReflectiveDependency(key, optional, visibility) {
        this.key = key;
        this.optional = optional;
        this.visibility = visibility;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    ReflectiveDependency.fromKey = function (key) {
        return new ReflectiveDependency(key, false, null);
    };
    return ReflectiveDependency;
}());
function ReflectiveDependency_tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectiveDependency.prototype.key;
    /** @type {?} */
    ReflectiveDependency.prototype.optional;
    /** @type {?} */
    ReflectiveDependency.prototype.visibility;
}
var /** @type {?} */ _EMPTY_LIST = [];
var ResolvedReflectiveProvider_ = (function () {
    /**
     * @param {?} key
     * @param {?} resolvedFactories
     * @param {?} multiProvider
     */
    function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
        /**
         * @return {?}
         */
        get: function () { return this.resolvedFactories[0]; },
        enumerable: true,
        configurable: true
    });
    return ResolvedReflectiveProvider_;
}());
function ResolvedReflectiveProvider__tsickle_Closure_declarations() {
    /** @type {?} */
    ResolvedReflectiveProvider_.prototype.key;
    /** @type {?} */
    ResolvedReflectiveProvider_.prototype.resolvedFactories;
    /** @type {?} */
    ResolvedReflectiveProvider_.prototype.multiProvider;
}
/**
 * An internal resolved representation of a factory function created by resolving {\@link
 * Provider}.
 * \@experimental
 */
var ResolvedReflectiveFactory = (function () {
    /**
     * @param {?} factory
     * @param {?} dependencies
     */
    function ResolvedReflectiveFactory(factory, dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
    return ResolvedReflectiveFactory;
}());
function ResolvedReflectiveFactory_tsickle_Closure_declarations() {
    /**
     * Factory function which can return an instance of an object represented by a key.
     * @type {?}
     */
    ResolvedReflectiveFactory.prototype.factory;
    /**
     * Arguments (dependencies) to the `factory` function.
     * @type {?}
     */
    ResolvedReflectiveFactory.prototype.dependencies;
}
/**
 * Resolve a single provider.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveFactory(provider) {
    var /** @type {?} */ factoryFn;
    var /** @type {?} */ resolvedDeps;
    if (provider.useClass) {
        var /** @type {?} */ useClass = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__forward_ref__["a" /* resolveForwardRef */])(provider.useClass);
        factoryFn = __WEBPACK_IMPORTED_MODULE_0__reflection_reflection__["a" /* reflector */].factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (provider.useExisting) {
        factoryFn = function (aliasInstance) { return aliasInstance; };
        resolvedDeps = [ReflectiveDependency.fromKey(__WEBPACK_IMPORTED_MODULE_5__reflective_key__["a" /* ReflectiveKey */].get(provider.useExisting))];
    }
    else if (provider.useFactory) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
    }
    else {
        factoryFn = function () { return provider.useValue; };
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
/**
 * Converts the {\@link Provider} into {\@link ResolvedProvider}.
 *
 * {\@link Injector} internally only uses {\@link ResolvedProvider}, {\@link Provider} contains
 * convenience provider syntax.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(__WEBPACK_IMPORTED_MODULE_5__reflective_key__["a" /* ReflectiveKey */].get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi);
}
/**
 * Resolve a list of Providers.
 * @param {?} providers
 * @return {?}
 */
function resolveReflectiveProviders(providers) {
    var /** @type {?} */ normalized = _normalizeProviders(providers, []);
    var /** @type {?} */ resolved = normalized.map(resolveReflectiveProvider);
    var /** @type {?} */ resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
    return Array.from(resolvedProviderMap.values());
}
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 * @param {?} providers
 * @param {?} normalizedProvidersMap
 * @return {?}
 */
function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (var /** @type {?} */ i = 0; i < providers.length; i++) {
        var /** @type {?} */ provider = providers[i];
        var /** @type {?} */ existing = normalizedProvidersMap.get(provider.key.id);
        if (existing) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw new __WEBPACK_IMPORTED_MODULE_4__reflective_errors__["a" /* MixingMultiProvidersWithRegularProvidersError */](existing, provider);
            }
            if (provider.multiProvider) {
                for (var /** @type {?} */ j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            var /** @type {?} */ resolvedProvider = void 0;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
/**
 * @param {?} providers
 * @param {?} res
 * @return {?}
 */
function _normalizeProviders(providers, res) {
    providers.forEach(function (b) {
        if (b instanceof __WEBPACK_IMPORTED_MODULE_1__type__["a" /* Type */]) {
            res.push({ provide: b, useClass: b });
        }
        else if (b && typeof b == 'object' && ((b)).provide !== undefined) {
            res.push(/** @type {?} */ (b));
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else {
            throw new __WEBPACK_IMPORTED_MODULE_4__reflective_errors__["b" /* InvalidProviderError */](b);
        }
    });
    return res;
}
/**
 * @param {?} typeOrFunc
 * @param {?} dependencies
 * @return {?}
 */
function constructDependencies(typeOrFunc, dependencies) {
    if (!dependencies) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        var /** @type {?} */ params_1 = dependencies.map(function (t) { return [t]; });
        return dependencies.map(function (t) { return _extractToken(typeOrFunc, t, params_1); });
    }
}
/**
 * @param {?} typeOrFunc
 * @return {?}
 */
function _dependenciesFor(typeOrFunc) {
    var /** @type {?} */ params = __WEBPACK_IMPORTED_MODULE_0__reflection_reflection__["a" /* reflector */].parameters(typeOrFunc);
    if (!params)
        return [];
    if (params.some(function (p) { return p == null; })) {
        throw new __WEBPACK_IMPORTED_MODULE_4__reflective_errors__["c" /* NoAnnotationError */](typeOrFunc, params);
    }
    return params.map(function (p) { return _extractToken(typeOrFunc, p, params); });
}
/**
 * @param {?} typeOrFunc
 * @param {?} metadata
 * @param {?} params
 * @return {?}
 */
function _extractToken(typeOrFunc, metadata, params) {
    var /** @type {?} */ token = null;
    var /** @type {?} */ optional = false;
    if (!Array.isArray(metadata)) {
        if (metadata instanceof __WEBPACK_IMPORTED_MODULE_3__metadata__["b" /* Inject */]) {
            return _createDependency(metadata.token, optional, null);
        }
        else {
            return _createDependency(metadata, optional, null);
        }
    }
    var /** @type {?} */ visibility = null;
    for (var /** @type {?} */ i = 0; i < metadata.length; ++i) {
        var /** @type {?} */ paramMetadata = metadata[i];
        if (paramMetadata instanceof __WEBPACK_IMPORTED_MODULE_1__type__["a" /* Type */]) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof __WEBPACK_IMPORTED_MODULE_3__metadata__["b" /* Inject */]) {
            token = paramMetadata.token;
        }
        else if (paramMetadata instanceof __WEBPACK_IMPORTED_MODULE_3__metadata__["c" /* Optional */]) {
            optional = true;
        }
        else if (paramMetadata instanceof __WEBPACK_IMPORTED_MODULE_3__metadata__["d" /* Self */] || paramMetadata instanceof __WEBPACK_IMPORTED_MODULE_3__metadata__["e" /* SkipSelf */]) {
            visibility = paramMetadata;
        }
    }
    token = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__forward_ref__["a" /* resolveForwardRef */])(token);
    if (token != null) {
        return _createDependency(token, optional, visibility);
    }
    else {
        throw new __WEBPACK_IMPORTED_MODULE_4__reflective_errors__["c" /* NoAnnotationError */](typeOrFunc, params);
    }
}
/**
 * @param {?} token
 * @param {?} optional
 * @param {?} visibility
 * @return {?}
 */
function _createDependency(token, optional, visibility) {
    return new ReflectiveDependency(__WEBPACK_IMPORTED_MODULE_5__reflective_key__["a" /* ReflectiveKey */].get(token), optional, visibility);
}
//# sourceMappingURL=reflective_provider.js.map

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* unused harmony reexport Observable */
/* unused harmony reexport Subject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventEmitter; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * \@Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   \@Output() open: EventEmitter<any> = new EventEmitter();
 *   \@Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * The events payload can be accessed by the parameter `$event` on the components output event
 * handler:
 *
 * ```
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * Uses Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 * \@stable
 */
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     * @param {?=} isAsync
     */
    function EventEmitter(isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        _super.call(this);
        this.__isAsync = isAsync;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
    /**
     * @param {?=} generatorOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var /** @type {?} */ schedulerFn;
        var /** @type {?} */ errorFn = function (err) { return null; };
        var /** @type {?} */ completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync ? function (value) {
                setTimeout(function () { return generatorOrNext.next(value); });
            } : function (value) { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                    function (err) { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                    function () { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync ? function (value) { setTimeout(function () { return generatorOrNext(value); }); } :
                function (value) { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
            }
            if (complete) {
                completeFn =
                    this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
            }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return EventEmitter;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]));
function EventEmitter_tsickle_Closure_declarations() {
    /** @type {?} */
    EventEmitter.prototype.__isAsync;
}
//# sourceMappingURL=async.js.map

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_ref__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_utils__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ComponentRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentRef_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ComponentFactory; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * Represents an instance of a Component created via a {\@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
 * method.
 * \@stable
 * @abstract
 */
var ComponentRef = (function () {
    function ComponentRef() {
    }
    /**
     * Location of the Host Element of this Component Instance.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.location = function () { };
    /**
     * The injector on which the component instance exists.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.injector = function () { };
    /**
     * The instance of the Component.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.instance = function () { };
    /**
     * The {\@link ViewRef} of the Host View of this Component instance.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.hostView = function () { };
    /**
     * The {\@link ChangeDetectorRef} of the Component instance.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.changeDetectorRef = function () { };
    /**
     * The component type.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.componentType = function () { };
    /**
     * Destroys the component instance and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.destroy = function () { };
    /**
     * Allows to register a callback that will be called when the component is destroyed.
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    ComponentRef.prototype.onDestroy = function (callback) { };
    return ComponentRef;
}());
var ComponentRef_ = (function (_super) {
    __extends(ComponentRef_, _super);
    /**
     * @param {?} _index
     * @param {?} _parentView
     * @param {?} _nativeElement
     * @param {?} _component
     */
    function ComponentRef_(_index, _parentView, _nativeElement, _component) {
        _super.call(this);
        this._index = _index;
        this._parentView = _parentView;
        this._nativeElement = _nativeElement;
        this._component = _component;
    }
    Object.defineProperty(ComponentRef_.prototype, "location", {
        /**
         * @return {?}
         */
        get: function () { return new __WEBPACK_IMPORTED_MODULE_0__element_ref__["a" /* ElementRef */](this._nativeElement); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return this._parentView.injector(this._index); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "instance", {
        /**
         * @return {?}
         */
        get: function () { return this._component; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ComponentRef_.prototype, "hostView", {
        /**
         * @return {?}
         */
        get: function () { return this._parentView.ref; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ComponentRef_.prototype, "changeDetectorRef", {
        /**
         * @return {?}
         */
        get: function () { return this._parentView.ref; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ComponentRef_.prototype, "componentType", {
        /**
         * @return {?}
         */
        get: function () { return (this._component.constructor); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ComponentRef_.prototype.destroy = function () { this._parentView.detachAndDestroy(); };
    /**
     * @param {?} callback
     * @return {?}
     */
    ComponentRef_.prototype.onDestroy = function (callback) { this.hostView.onDestroy(callback); };
    return ComponentRef_;
}(ComponentRef));
function ComponentRef__tsickle_Closure_declarations() {
    /** @type {?} */
    ComponentRef_.prototype._index;
    /** @type {?} */
    ComponentRef_.prototype._parentView;
    /** @type {?} */
    ComponentRef_.prototype._nativeElement;
    /** @type {?} */
    ComponentRef_.prototype._component;
}
/**
 * \@stable
 */
var ComponentFactory = (function () {
    /**
     * @param {?} selector
     * @param {?} _viewClass
     * @param {?} _componentType
     */
    function ComponentFactory(selector, _viewClass, _componentType) {
        this.selector = selector;
        this._viewClass = _viewClass;
        this._componentType = _componentType;
    }
    Object.defineProperty(ComponentFactory.prototype, "componentType", {
        /**
         * @return {?}
         */
        get: function () { return this._componentType; },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new component.
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    ComponentFactory.prototype.create = function (injector, projectableNodes, rootSelectorOrNode) {
        if (projectableNodes === void 0) { projectableNodes = null; }
        if (rootSelectorOrNode === void 0) { rootSelectorOrNode = null; }
        var /** @type {?} */ vu = injector.get(__WEBPACK_IMPORTED_MODULE_1__view_utils__["ViewUtils"]);
        if (!projectableNodes) {
            projectableNodes = [];
        }
        var /** @type {?} */ hostView = new this._viewClass(vu, null, null, null);
        return hostView.createHostView(rootSelectorOrNode, injector, projectableNodes);
    };
    return ComponentFactory;
}());
function ComponentFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    ComponentFactory.prototype.selector;
    /** @type {?} */
    ComponentFactory.prototype._viewClass;
    /** @type {?} */
    ComponentFactory.prototype._componentType;
}
//# sourceMappingURL=component_factory.js.map

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reflection_capabilities__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reflector__ = __webpack_require__(149);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__reflector__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reflector; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * The {@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
var /** @type {?} */ reflector = new __WEBPACK_IMPORTED_MODULE_1__reflector__["a" /* Reflector */](new __WEBPACK_IMPORTED_MODULE_0__reflection_capabilities__["a" /* ReflectionCapabilities */]());
//# sourceMappingURL=reflection.js.map

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReflectorReader; });
/**
 * Provides read-only access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 * @abstract
 */
var ReflectorReader = (function () {
    function ReflectorReader() {
    }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.parameters = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.annotations = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.propMetadata = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.importUri = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} runtime
     * @return {?}
     */
    ReflectorReader.prototype.resolveIdentifier = function (name, moduleUrl, runtime) { };
    /**
     * @abstract
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    ReflectorReader.prototype.resolveEnum = function (identifier, name) { };
    return ReflectorReader;
}());
//# sourceMappingURL=reflector_reader.js.map

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RenderComponentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderDebugInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Renderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RootRenderer; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var RenderComponentType = (function () {
    /**
     * @param {?} id
     * @param {?} templateUrl
     * @param {?} slotCount
     * @param {?} encapsulation
     * @param {?} styles
     * @param {?} animations
     */
    function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
        this.animations = animations;
    }
    return RenderComponentType;
}());
function RenderComponentType_tsickle_Closure_declarations() {
    /** @type {?} */
    RenderComponentType.prototype.id;
    /** @type {?} */
    RenderComponentType.prototype.templateUrl;
    /** @type {?} */
    RenderComponentType.prototype.slotCount;
    /** @type {?} */
    RenderComponentType.prototype.encapsulation;
    /** @type {?} */
    RenderComponentType.prototype.styles;
    /** @type {?} */
    RenderComponentType.prototype.animations;
}
/**
 * @abstract
 */
var RenderDebugInfo = (function () {
    function RenderDebugInfo() {
    }
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.injector = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.component = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.providerTokens = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.references = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.context = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.source = function () { };
    return RenderDebugInfo;
}());
/**
 * \@experimental
 * @abstract
 */
var Renderer = (function () {
    function Renderer() {
    }
    /**
     * @abstract
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    Renderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) { };
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} name
     * @param {?=} debugInfo
     * @return {?}
     */
    Renderer.prototype.createElement = function (parentElement, name, debugInfo) { };
    /**
     * @abstract
     * @param {?} hostElement
     * @return {?}
     */
    Renderer.prototype.createViewRoot = function (hostElement) { };
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?=} debugInfo
     * @return {?}
     */
    Renderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) { };
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    Renderer.prototype.createText = function (parentElement, value, debugInfo) { };
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    Renderer.prototype.projectNodes = function (parentElement, nodes) { };
    /**
     * @abstract
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    Renderer.prototype.attachViewAfter = function (node, viewRootNodes) { };
    /**
     * @abstract
     * @param {?} viewRootNodes
     * @return {?}
     */
    Renderer.prototype.detachView = function (viewRootNodes) { };
    /**
     * @abstract
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    Renderer.prototype.destroyView = function (hostElement, viewAllNodes) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    Renderer.prototype.listen = function (renderElement, name, callback) { };
    /**
     * @abstract
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    Renderer.prototype.listenGlobal = function (target, name, callback) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    Renderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    Renderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) { };
    /**
     * Used only in debug mode to serialize property changes to dom nodes as attributes.
     * @abstract
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    Renderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    Renderer.prototype.setElementClass = function (renderElement, className, isAdd) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    Renderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?=} args
     * @return {?}
     */
    Renderer.prototype.invokeElementMethod = function (renderElement, methodName, args) { };
    /**
     * @abstract
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    Renderer.prototype.setText = function (renderNode, text) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    Renderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) { };
    return Renderer;
}());
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {\@link #setElementProperty} or {\@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 * \@experimental
 * @abstract
 */
var RootRenderer = (function () {
    function RootRenderer() {
    }
    /**
     * @abstract
     * @param {?} componentType
     * @return {?}
     */
    RootRenderer.prototype.renderComponent = function (componentType) { };
    return RootRenderer;
}());
//# sourceMappingURL=api.js.map

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__zone_ng_zone__ = __webpack_require__(66);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Testability; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TestabilityRegistry; });
/* harmony export (immutable) */ __webpack_exports__["c"] = setTestabilityGetter;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 * \@experimental
 */
var Testability = (function () {
    /**
     * @param {?} _ngZone
     */
    function Testability(_ngZone) {
        this._ngZone = _ngZone;
        /** @internal */
        this._pendingCount = 0;
        /** @internal */
        this._isZoneStable = true;
        /**
         * Whether any work was done since the last 'whenStable' callback. This is
         * useful to detect if this could have potentially destabilized another
         * component while it is stabilizing.
         * @internal
         */
        this._didWork = false;
        /** @internal */
        this._callbacks = [];
        this._watchAngularEvents();
    }
    /**
     * \@internal
     * @return {?}
     */
    Testability.prototype._watchAngularEvents = function () {
        var _this = this;
        this._ngZone.onUnstable.subscribe({
            next: function () {
                _this._didWork = true;
                _this._isZoneStable = false;
            }
        });
        this._ngZone.runOutsideAngular(function () {
            _this._ngZone.onStable.subscribe({
                next: function () {
                    __WEBPACK_IMPORTED_MODULE_2__zone_ng_zone__["a" /* NgZone */].assertNotInAngularZone();
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* scheduleMicroTask */])(function () {
                        _this._isZoneStable = true;
                        _this._runCallbacksIfReady();
                    });
                }
            });
        });
    };
    /**
     * @return {?}
     */
    Testability.prototype.increasePendingRequestCount = function () {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
    };
    /**
     * @return {?}
     */
    Testability.prototype.decreasePendingRequestCount = function () {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
            throw new Error('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
    };
    /**
     * @return {?}
     */
    Testability.prototype.isStable = function () {
        return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
    };
    /**
     * \@internal
     * @return {?}
     */
    Testability.prototype._runCallbacksIfReady = function () {
        var _this = this;
        if (this.isStable()) {
            // Schedules the call backs in a new frame so that it is always async.
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* scheduleMicroTask */])(function () {
                while (_this._callbacks.length !== 0) {
                    (_this._callbacks.pop())(_this._didWork);
                }
                _this._didWork = false;
            });
        }
        else {
            // Not Ready
            this._didWork = true;
        }
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    Testability.prototype.whenStable = function (callback) {
        this._callbacks.push(callback);
        this._runCallbacksIfReady();
    };
    /**
     * @return {?}
     */
    Testability.prototype.getPendingRequestCount = function () { return this._pendingCount; };
    /**
     * @deprecated use findProviders
     * @param {?} using
     * @param {?} provider
     * @param {?} exactMatch
     * @return {?}
     */
    Testability.prototype.findBindings = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    /**
     * @param {?} using
     * @param {?} provider
     * @param {?} exactMatch
     * @return {?}
     */
    Testability.prototype.findProviders = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    Testability.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    Testability.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_2__zone_ng_zone__["a" /* NgZone */], },
    ]; };
    return Testability;
}());
function Testability_tsickle_Closure_declarations() {
    /** @type {?} */
    Testability.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Testability.ctorParameters;
    /**
     * \@internal
     * @type {?}
     */
    Testability.prototype._pendingCount;
    /**
     * \@internal
     * @type {?}
     */
    Testability.prototype._isZoneStable;
    /**
     * Whether any work was done since the last 'whenStable' callback. This is
     * useful to detect if this could have potentially destabilized another
     * component while it is stabilizing.
     * \@internal
     * @type {?}
     */
    Testability.prototype._didWork;
    /**
     * \@internal
     * @type {?}
     */
    Testability.prototype._callbacks;
    /** @type {?} */
    Testability.prototype._ngZone;
}
/**
 * A global registry of {\@link Testability} instances for specific elements.
 * \@experimental
 */
var TestabilityRegistry = (function () {
    function TestabilityRegistry() {
        /** @internal */
        this._applications = new Map();
        _testabilityGetter.addToWindow(this);
    }
    /**
     * @param {?} token
     * @param {?} testability
     * @return {?}
     */
    TestabilityRegistry.prototype.registerApplication = function (token, testability) {
        this._applications.set(token, testability);
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    TestabilityRegistry.prototype.getTestability = function (elem) { return this._applications.get(elem); };
    /**
     * @return {?}
     */
    TestabilityRegistry.prototype.getAllTestabilities = function () { return Array.from(this._applications.values()); };
    /**
     * @return {?}
     */
    TestabilityRegistry.prototype.getAllRootElements = function () { return Array.from(this._applications.keys()); };
    /**
     * @param {?} elem
     * @param {?=} findInAncestors
     * @return {?}
     */
    TestabilityRegistry.prototype.findTestabilityInTree = function (elem, findInAncestors) {
        if (findInAncestors === void 0) { findInAncestors = true; }
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    };
    TestabilityRegistry.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    TestabilityRegistry.ctorParameters = function () { return []; };
    return TestabilityRegistry;
}());
function TestabilityRegistry_tsickle_Closure_declarations() {
    /** @type {?} */
    TestabilityRegistry.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TestabilityRegistry.ctorParameters;
    /**
     * \@internal
     * @type {?}
     */
    TestabilityRegistry.prototype._applications;
}
var _NoopGetTestability = (function () {
    function _NoopGetTestability() {
    }
    /**
     * @param {?} registry
     * @return {?}
     */
    _NoopGetTestability.prototype.addToWindow = function (registry) { };
    /**
     * @param {?} registry
     * @param {?} elem
     * @param {?} findInAncestors
     * @return {?}
     */
    _NoopGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
        return null;
    };
    return _NoopGetTestability;
}());
/**
 * Set the {\@link GetTestability} implementation used by the Angular testing framework.
 * \@experimental
 * @param {?} getter
 * @return {?}
 */
function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
var /** @type {?} */ _testabilityGetter = new _NoopGetTestability();
//# sourceMappingURL=testability.js.map

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Type; });
/* harmony export (immutable) */ __webpack_exports__["b"] = isType;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @whatItDoes Represents a type that a Component or other object is instances of.
 *
 * @description
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @stable
 */
var /** @type {?} */ Type = Function;
/**
 * @param {?} v
 * @return {?}
 */
function isType(v) {
    return typeof v === 'function';
}
//# sourceMappingURL=type.js.map

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_symbol_observable__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_symbol_observable__);
/* harmony export (immutable) */ __webpack_exports__["a"] = isPromise;
/* harmony export (immutable) */ __webpack_exports__["b"] = isObservable;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Determine if the argument is shaped like a Promise
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && typeof obj.then === 'function';
}
/**
 * Determine if the argument is an Observable
 * @param {?} obj
 * @return {?}
 */
function isObservable(obj) {
    return !!(obj && obj[__WEBPACK_IMPORTED_MODULE_0_rxjs_symbol_observable__["$$observable"]]);
}
//# sourceMappingURL=lang.js.map

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23)
  , TAG = __webpack_require__(7)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 93 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(257);
var isObject_1 = __webpack_require__(258);
var isFunction_1 = __webpack_require__(156);
var tryCatch_1 = __webpack_require__(260);
var errorObject_1 = __webpack_require__(155);
var UnsubscriptionError_1 = __webpack_require__(256);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(96);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/**
 * window: browser in DOM main thread
 * self: browser in WebWorker
 * global: Node.js/other
 */
exports.root = (typeof window == 'object' && window.window === window && window
    || typeof self == 'object' && self.self === self && self
    || typeof global == 'object' && global.global === global && global);
if (!exports.root) {
    throw new Error('RxJS could not find any global context (window, self, global)');
}
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20)
  , toLength  = __webpack_require__(11)
  , toIndex   = __webpack_require__(54);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(4)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(18)
  , redefineAll       = __webpack_require__(52)
  , meta              = __webpack_require__(44)
  , forOf             = __webpack_require__(69)
  , anInstance        = __webpack_require__(47)
  , isObject          = __webpack_require__(6)
  , fails             = __webpack_require__(5)
  , $iterDetect       = __webpack_require__(108)
  , setToStringTag    = __webpack_require__(71)
  , inheritIfRequired = __webpack_require__(168);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(17)
  , redefine = __webpack_require__(18)
  , fails    = __webpack_require__(5)
  , defined  = __webpack_require__(24)
  , wks      = __webpack_require__(7);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(3);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 106 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(6)
  , cof      = __webpack_require__(23)
  , MATCH    = __webpack_require__(7)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(7)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(48)|| !__webpack_require__(5)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(4)[K];
});

/***/ }),
/* 110 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4)
  , hide   = __webpack_require__(17)
  , uid    = __webpack_require__(55)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(96);
var toSubscriber_1 = __webpack_require__(259);
var observable_1 = __webpack_require__(154);
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(156);
var Subscription_1 = __webpack_require__(94);
var Observer_1 = __webpack_require__(152);
var rxSubscriber_1 = __webpack_require__(95);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FILL_STYLE_FLAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ANY_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEFAULT_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EMPTY_STATE; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */ FILL_STYLE_FLAG = 'true'; // TODO (matsko): change to boolean
var /** @type {?} */ ANY_STATE = '*';
var /** @type {?} */ DEFAULT_STATE = '*';
var /** @type {?} */ EMPTY_STATE = 'void';
//# sourceMappingURL=animation_constants.js.map

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationGroupPlayer; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var AnimationGroupPlayer = (function () {
    /**
     * @param {?} _players
     */
    function AnimationGroupPlayer(_players) {
        var _this = this;
        this._players = _players;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.parentPlayer = null;
        var count = 0;
        var total = this._players.length;
        if (total == 0) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* scheduleMicroTask */])(function () { return _this._onFinish(); });
        }
        else {
            this._players.forEach(function (player) {
                player.parentPlayer = _this;
                player.onDone(function () {
                    if (++count >= total) {
                        _this._onFinish();
                    }
                });
            });
        }
    }
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        }
    };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.init = function () { this._players.forEach(function (player) { return player.init(); }); };
    /**
     * @param {?} fn
     * @return {?}
     */
    AnimationGroupPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    AnimationGroupPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.hasStarted = function () { return this._started; };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.play = function () {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(this.parentPlayer)) {
            this.init();
        }
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
            this._started = true;
        }
        this._players.forEach(function (player) { return player.play(); });
    };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.pause = function () { this._players.forEach(function (player) { return player.pause(); }); };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.restart = function () { this._players.forEach(function (player) { return player.restart(); }); };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.finish = function () {
        this._onFinish();
        this._players.forEach(function (player) { return player.finish(); });
    };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.destroy = function () {
        if (!this._destroyed) {
            this._onFinish();
            this._players.forEach(function (player) { return player.destroy(); });
            this._destroyed = true;
        }
    };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.reset = function () {
        this._players.forEach(function (player) { return player.reset(); });
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    };
    /**
     * @param {?} p
     * @return {?}
     */
    AnimationGroupPlayer.prototype.setPosition = function (p) {
        this._players.forEach(function (player) { player.setPosition(p); });
    };
    /**
     * @return {?}
     */
    AnimationGroupPlayer.prototype.getPosition = function () {
        var /** @type {?} */ min = 0;
        this._players.forEach(function (player) {
            var /** @type {?} */ p = player.getPosition();
            min = Math.min(p, min);
        });
        return min;
    };
    Object.defineProperty(AnimationGroupPlayer.prototype, "players", {
        /**
         * @return {?}
         */
        get: function () { return this._players; },
        enumerable: true,
        configurable: true
    });
    return AnimationGroupPlayer;
}());
function AnimationGroupPlayer_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationGroupPlayer.prototype._onDoneFns;
    /** @type {?} */
    AnimationGroupPlayer.prototype._onStartFns;
    /** @type {?} */
    AnimationGroupPlayer.prototype._finished;
    /** @type {?} */
    AnimationGroupPlayer.prototype._started;
    /** @type {?} */
    AnimationGroupPlayer.prototype._destroyed;
    /** @type {?} */
    AnimationGroupPlayer.prototype.parentPlayer;
    /** @type {?} */
    AnimationGroupPlayer.prototype._players;
}
//# sourceMappingURL=animation_group_player.js.map

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationKeyframe; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `AnimationKeyframe` consists of a series of styles (contained within {\@link AnimationStyles
 * `AnimationStyles`})
 * and an offset value indicating when those styles are applied within the `duration/delay/easing`
 * timings.
 * `AnimationKeyframe` is mostly an internal class which is designed to be used alongside {\@link
 * Renderer#animate-anchor `Renderer.animate`}.
 *
 * \@experimental Animation support is experimental
 */
var AnimationKeyframe = (function () {
    /**
     * @param {?} offset
     * @param {?} styles
     */
    function AnimationKeyframe(offset, styles) {
        this.offset = offset;
        this.styles = styles;
    }
    return AnimationKeyframe;
}());
function AnimationKeyframe_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationKeyframe.prototype.offset;
    /** @type {?} */
    AnimationKeyframe.prototype.styles;
}
//# sourceMappingURL=animation_keyframe.js.map

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di_metadata__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zone_ng_zone__ = __webpack_require__(66);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationQueue; });


var AnimationQueue = (function () {
    /**
     * @param {?} _zone
     */
    function AnimationQueue(_zone) {
        this._zone = _zone;
        this.entries = [];
    }
    /**
     * @param {?} player
     * @return {?}
     */
    AnimationQueue.prototype.enqueue = function (player) { this.entries.push(player); };
    /**
     * @return {?}
     */
    AnimationQueue.prototype.flush = function () {
        var _this = this;
        // given that each animation player may set aside
        // microtasks and rely on DOM-based events, this
        // will cause Angular to run change detection after
        // each request. This sidesteps the issue. If a user
        // hooks into an animation via (@anim.start) or (@anim.done)
        // then those methods will automatically trigger change
        // detection by wrapping themselves inside of a zone
        if (this.entries.length) {
            this._zone.runOutsideAngular(function () {
                // this code is wrapped into a single promise such that the
                // onStart and onDone player callbacks are triggered outside
                // of the digest cycle of animations
                Promise.resolve(null).then(function () { return _this._triggerAnimations(); });
            });
        }
    };
    /**
     * @return {?}
     */
    AnimationQueue.prototype._triggerAnimations = function () {
        __WEBPACK_IMPORTED_MODULE_1__zone_ng_zone__["a" /* NgZone */].assertNotInAngularZone();
        while (this.entries.length) {
            var /** @type {?} */ player = this.entries.shift();
            // in the event that an animation throws an error then we do
            // not want to re-run animations on any previous animations
            // if they have already been kicked off beforehand
            if (!player.hasStarted()) {
                player.play();
            }
        }
    };
    AnimationQueue.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__di_metadata__["a" /* Injectable */] },
    ];
    /** @nocollapse */
    AnimationQueue.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__zone_ng_zone__["a" /* NgZone */], },
    ]; };
    return AnimationQueue;
}());
function AnimationQueue_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationQueue.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AnimationQueue.ctorParameters;
    /** @type {?} */
    AnimationQueue.prototype.entries;
    /** @type {?} */
    AnimationQueue.prototype._zone;
}
//# sourceMappingURL=animation_queue.js.map

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_player__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationSequencePlayer; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


var AnimationSequencePlayer = (function () {
    /**
     * @param {?} _players
     */
    function AnimationSequencePlayer(_players) {
        var _this = this;
        this._players = _players;
        this._currentIndex = 0;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.parentPlayer = null;
        this._players.forEach(function (player) { player.parentPlayer = _this; });
        this._onNext(false);
    }
    /**
     * @param {?} start
     * @return {?}
     */
    AnimationSequencePlayer.prototype._onNext = function (start) {
        var _this = this;
        if (this._finished)
            return;
        if (this._players.length == 0) {
            this._activePlayer = new __WEBPACK_IMPORTED_MODULE_1__animation_player__["b" /* NoOpAnimationPlayer */]();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* scheduleMicroTask */])(function () { return _this._onFinish(); });
        }
        else if (this._currentIndex >= this._players.length) {
            this._activePlayer = new __WEBPACK_IMPORTED_MODULE_1__animation_player__["b" /* NoOpAnimationPlayer */]();
            this._onFinish();
        }
        else {
            var /** @type {?} */ player = this._players[this._currentIndex++];
            player.onDone(function () { return _this._onNext(true); });
            this._activePlayer = player;
            if (start) {
                player.play();
            }
        }
    };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        }
    };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.init = function () { this._players.forEach(function (player) { return player.init(); }); };
    /**
     * @param {?} fn
     * @return {?}
     */
    AnimationSequencePlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    AnimationSequencePlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.hasStarted = function () { return this._started; };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.play = function () {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(this.parentPlayer)) {
            this.init();
        }
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
            this._started = true;
        }
        this._activePlayer.play();
    };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.pause = function () { this._activePlayer.pause(); };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.restart = function () {
        this.reset();
        if (this._players.length > 0) {
            this._players[0].restart();
        }
    };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.reset = function () {
        this._players.forEach(function (player) { return player.reset(); });
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.finish = function () {
        this._onFinish();
        this._players.forEach(function (player) { return player.finish(); });
    };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.destroy = function () {
        if (!this._destroyed) {
            this._onFinish();
            this._players.forEach(function (player) { return player.destroy(); });
            this._destroyed = true;
            this._activePlayer = new __WEBPACK_IMPORTED_MODULE_1__animation_player__["b" /* NoOpAnimationPlayer */]();
        }
    };
    /**
     * @param {?} p
     * @return {?}
     */
    AnimationSequencePlayer.prototype.setPosition = function (p) { this._players[0].setPosition(p); };
    /**
     * @return {?}
     */
    AnimationSequencePlayer.prototype.getPosition = function () { return this._players[0].getPosition(); };
    Object.defineProperty(AnimationSequencePlayer.prototype, "players", {
        /**
         * @return {?}
         */
        get: function () { return this._players; },
        enumerable: true,
        configurable: true
    });
    return AnimationSequencePlayer;
}());
function AnimationSequencePlayer_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationSequencePlayer.prototype._currentIndex;
    /** @type {?} */
    AnimationSequencePlayer.prototype._activePlayer;
    /** @type {?} */
    AnimationSequencePlayer.prototype._onDoneFns;
    /** @type {?} */
    AnimationSequencePlayer.prototype._onStartFns;
    /** @type {?} */
    AnimationSequencePlayer.prototype._finished;
    /** @type {?} */
    AnimationSequencePlayer.prototype._started;
    /** @type {?} */
    AnimationSequencePlayer.prototype._destroyed;
    /** @type {?} */
    AnimationSequencePlayer.prototype.parentPlayer;
    /** @type {?} */
    AnimationSequencePlayer.prototype._players;
}
//# sourceMappingURL=animation_sequence_player.js.map

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationStyles; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `AnimationStyles` consists of a collection of key/value maps containing CSS-based style data
 * that can either be used as initial styling data or apart of a series of keyframes within an
 * animation.
 * This class is mostly internal, and it is designed to be used alongside
 * {\@link AnimationKeyframe `AnimationKeyframe`} and {\@link Renderer#animate-anchor
 * `Renderer.animate`}.
 *
 * \@experimental Animation support is experimental
 */
var AnimationStyles = (function () {
    /**
     * @param {?} styles
     */
    function AnimationStyles(styles) {
        this.styles = styles;
    }
    return AnimationStyles;
}());
function AnimationStyles_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationStyles.prototype.styles;
}
//# sourceMappingURL=animation_styles.js.map

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationTransitionEvent; });
/**
 * An instance of this class is returned as an event parameter when an animation
 * callback is captured for an animation either during the start or done phase.
 *
 * ```typescript
 * \@Component({
 *   host: {
 *     '[\@myAnimationTrigger]': 'someExpression',
 *     '(\@myAnimationTrigger.start)': 'captureStartEvent($event)',
 *     '(\@myAnimationTrigger.done)': 'captureDoneEvent($event)',
 *   },
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *        // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   someExpression: any = false;
 *   captureStartEvent(event: AnimationTransitionEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 *
 *   captureDoneEvent(event: AnimationTransitionEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 * }
 * ```
 *
 * \@experimental Animation support is experimental.
 */
var AnimationTransitionEvent = (function () {
    /**
     * @param {?} __0
     */
    function AnimationTransitionEvent(_a) {
        var fromState = _a.fromState, toState = _a.toState, totalTime = _a.totalTime, phaseName = _a.phaseName;
        this.fromState = fromState;
        this.toState = toState;
        this.totalTime = totalTime;
        this.phaseName = phaseName;
    }
    return AnimationTransitionEvent;
}());
function AnimationTransitionEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationTransitionEvent.prototype.fromState;
    /** @type {?} */
    AnimationTransitionEvent.prototype.toState;
    /** @type {?} */
    AnimationTransitionEvent.prototype.totalTime;
    /** @type {?} */
    AnimationTransitionEvent.prototype.phaseName;
}
//# sourceMappingURL=animation_transition_event.js.map

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTO_STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AnimationEntryMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AnimationStateMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AnimationStateDeclarationMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return AnimationStateTransitionMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return AnimationMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return AnimationKeyframesSequenceMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return AnimationStyleMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return AnimationAnimateMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return AnimationWithStepsMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return AnimationSequenceMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return AnimationGroupMetadata; });
/* harmony export (immutable) */ __webpack_exports__["m"] = animate;
/* harmony export (immutable) */ __webpack_exports__["n"] = group;
/* harmony export (immutable) */ __webpack_exports__["o"] = sequence;
/* harmony export (immutable) */ __webpack_exports__["p"] = style;
/* harmony export (immutable) */ __webpack_exports__["q"] = state;
/* harmony export (immutable) */ __webpack_exports__["r"] = keyframes;
/* harmony export (immutable) */ __webpack_exports__["s"] = transition;
/* harmony export (immutable) */ __webpack_exports__["t"] = trigger;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * @experimental Animation support is experimental.
 */
var /** @type {?} */ AUTO_STYLE = '*';
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link trigger trigger
 * animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
var AnimationEntryMetadata = (function () {
    /**
     * @param {?} name
     * @param {?} definitions
     */
    function AnimationEntryMetadata(name, definitions) {
        this.name = name;
        this.definitions = definitions;
    }
    return AnimationEntryMetadata;
}());
function AnimationEntryMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationEntryMetadata.prototype.name;
    /** @type {?} */
    AnimationEntryMetadata.prototype.definitions;
}
/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
var AnimationStateMetadata = (function () {
    function AnimationStateMetadata() {
    }
    return AnimationStateMetadata;
}());
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link state state animation
 * function} is called.
 *
 * \@experimental Animation support is experimental.
 */
var AnimationStateDeclarationMetadata = (function (_super) {
    __extends(AnimationStateDeclarationMetadata, _super);
    /**
     * @param {?} stateNameExpr
     * @param {?} styles
     */
    function AnimationStateDeclarationMetadata(stateNameExpr, styles) {
        _super.call(this);
        this.stateNameExpr = stateNameExpr;
        this.styles = styles;
    }
    return AnimationStateDeclarationMetadata;
}(AnimationStateMetadata));
function AnimationStateDeclarationMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationStateDeclarationMetadata.prototype.stateNameExpr;
    /** @type {?} */
    AnimationStateDeclarationMetadata.prototype.styles;
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the
 * {\@link transition transition animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
var AnimationStateTransitionMetadata = (function (_super) {
    __extends(AnimationStateTransitionMetadata, _super);
    /**
     * @param {?} stateChangeExpr
     * @param {?} steps
     */
    function AnimationStateTransitionMetadata(stateChangeExpr, steps) {
        _super.call(this);
        this.stateChangeExpr = stateChangeExpr;
        this.steps = steps;
    }
    return AnimationStateTransitionMetadata;
}(AnimationStateMetadata));
function AnimationStateTransitionMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationStateTransitionMetadata.prototype.stateChangeExpr;
    /** @type {?} */
    AnimationStateTransitionMetadata.prototype.steps;
}
/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
var AnimationMetadata = (function () {
    function AnimationMetadata() {
    }
    return AnimationMetadata;
}());
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link keyframes keyframes
 * animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
var AnimationKeyframesSequenceMetadata = (function (_super) {
    __extends(AnimationKeyframesSequenceMetadata, _super);
    /**
     * @param {?} steps
     */
    function AnimationKeyframesSequenceMetadata(steps) {
        _super.call(this);
        this.steps = steps;
    }
    return AnimationKeyframesSequenceMetadata;
}(AnimationMetadata));
function AnimationKeyframesSequenceMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationKeyframesSequenceMetadata.prototype.steps;
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link style style animation
 * function} is called.
 *
 * \@experimental Animation support is experimental.
 */
var AnimationStyleMetadata = (function (_super) {
    __extends(AnimationStyleMetadata, _super);
    /**
     * @param {?} styles
     * @param {?=} offset
     */
    function AnimationStyleMetadata(styles, offset) {
        if (offset === void 0) { offset = null; }
        _super.call(this);
        this.styles = styles;
        this.offset = offset;
    }
    return AnimationStyleMetadata;
}(AnimationMetadata));
function AnimationStyleMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationStyleMetadata.prototype.styles;
    /** @type {?} */
    AnimationStyleMetadata.prototype.offset;
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link animate animate
 * animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
var AnimationAnimateMetadata = (function (_super) {
    __extends(AnimationAnimateMetadata, _super);
    /**
     * @param {?} timings
     * @param {?} styles
     */
    function AnimationAnimateMetadata(timings, styles) {
        _super.call(this);
        this.timings = timings;
        this.styles = styles;
    }
    return AnimationAnimateMetadata;
}(AnimationMetadata));
function AnimationAnimateMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationAnimateMetadata.prototype.timings;
    /** @type {?} */
    AnimationAnimateMetadata.prototype.styles;
}
/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
var AnimationWithStepsMetadata = (function (_super) {
    __extends(AnimationWithStepsMetadata, _super);
    function AnimationWithStepsMetadata() {
        _super.call(this);
    }
    Object.defineProperty(AnimationWithStepsMetadata.prototype, "steps", {
        /**
         * @return {?}
         */
        get: function () { throw new Error('NOT IMPLEMENTED: Base Class'); },
        enumerable: true,
        configurable: true
    });
    return AnimationWithStepsMetadata;
}(AnimationMetadata));
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link sequence sequence
 * animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
var AnimationSequenceMetadata = (function (_super) {
    __extends(AnimationSequenceMetadata, _super);
    /**
     * @param {?} _steps
     */
    function AnimationSequenceMetadata(_steps) {
        _super.call(this);
        this._steps = _steps;
    }
    Object.defineProperty(AnimationSequenceMetadata.prototype, "steps", {
        /**
         * @return {?}
         */
        get: function () { return this._steps; },
        enumerable: true,
        configurable: true
    });
    return AnimationSequenceMetadata;
}(AnimationWithStepsMetadata));
function AnimationSequenceMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationSequenceMetadata.prototype._steps;
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link group group animation
 * function} is called.
 *
 * \@experimental Animation support is experimental.
 */
var AnimationGroupMetadata = (function (_super) {
    __extends(AnimationGroupMetadata, _super);
    /**
     * @param {?} _steps
     */
    function AnimationGroupMetadata(_steps) {
        _super.call(this);
        this._steps = _steps;
    }
    Object.defineProperty(AnimationGroupMetadata.prototype, "steps", {
        /**
         * @return {?}
         */
        get: function () { return this._steps; },
        enumerable: true,
        configurable: true
    });
    return AnimationGroupMetadata;
}(AnimationWithStepsMetadata));
function AnimationGroupMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationGroupMetadata.prototype._steps;
}
/**
 * `animate` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `animate` specifies an animation step that will apply the provided `styles` data for a given
 * amount of
 * time based on the provided `timing` expression value. Calls to `animate` are expected to be
 * used within {\@link sequence an animation sequence}, {\@link group group}, or {\@link transition
 * transition}.
 *
 * ### Usage
 *
 * The `animate` function accepts two input parameters: `timing` and `styles`:
 *
 * - `timing` is a string based value that can be a combination of a duration with optional
 * delay and easing values. The format for the expression breaks down to `duration delay easing`
 * (therefore a value such as `1s 100ms ease-out` will be parse itself into `duration=1000,
 * delay=100, easing=ease-out`.
 * If a numeric value is provided then that will be used as the `duration` value in millisecond
 * form.
 * - `styles` is the style input data which can either be a call to {\@link style style} or {\@link
 * keyframes keyframes}.
 * If left empty then the styles from the destination state will be collected and used (this is
 * useful when
 * describing an animation step that will complete an animation by {\@link
 * transition#the-final-animate-call animating to the final state}).
 *
 * ```typescript
 * // various functions for specifying timing data
 * animate(500, style(...))
 * animate("1s", style(...))
 * animate("100ms 0.5s", style(...))
 * animate("5s ease", style(...))
 * animate("5s 10ms cubic-bezier(.17,.67,.88,.1)", style(...))
 *
 * // either style() of keyframes() can be used
 * animate(500, style({ background: "red" }))
 * animate(500, keyframes([
 *   style({ background: "blue" })),
 *   style({ background: "red" }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} timing
 * @param {?=} styles
 * @return {?}
 */
function animate(timing, styles) {
    if (styles === void 0) { styles = null; }
    var /** @type {?} */ stylesEntry = styles;
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(stylesEntry)) {
        var /** @type {?} */ EMPTY_STYLE = {};
        stylesEntry = new AnimationStyleMetadata([EMPTY_STYLE], 1);
    }
    return new AnimationAnimateMetadata(timing, stylesEntry);
}
/**
 * `group` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `group` specifies a list of animation steps that are all run in parallel. Grouped animations
 * are useful when a series of styles must be animated/closed off
 * at different statrting/ending times.
 *
 * The `group` function can either be used within a {\@link sequence sequence} or a {\@link transition
 * transition}
 * and it will only continue to the next instruction once all of the inner animation steps
 * have completed.
 *
 * ### Usage
 *
 * The `steps` data that is passed into the `group` animation function can either consist
 * of {\@link style style} or {\@link animate animate} function calls. Each call to `style()` or
 * `animate()`
 * within a group will be executed instantly (use {\@link keyframes keyframes} or a
 * {\@link animate#usage animate() with a delay value} to offset styles to be applied at a later
 * time).
 *
 * ```typescript
 * group([
 *   animate("1s", { background: "black" }))
 *   animate("2s", { color: "white" }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} steps
 * @return {?}
 */
function group(steps) {
    return new AnimationGroupMetadata(steps);
}
/**
 * `sequence` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `sequence` Specifies a list of animation steps that are run one by one. (`sequence` is used
 * by default when an array is passed as animation data into {\@link transition transition}.)
 *
 * The `sequence` function can either be used within a {\@link group group} or a {\@link transition
 * transition}
 * and it will only continue to the next instruction once each of the inner animation steps
 * have completed.
 *
 * To perform animation styling in parallel with other animation steps then
 * have a look at the {\@link group group} animation function.
 *
 * ### Usage
 *
 * The `steps` data that is passed into the `sequence` animation function can either consist
 * of {\@link style style} or {\@link animate animate} function calls. A call to `style()` will apply
 * the
 * provided styling data immediately while a call to `animate()` will apply its styling
 * data over a given time depending on its timing data.
 *
 * ```typescript
 * sequence([
 *   style({ opacity: 0 })),
 *   animate("1s", { opacity: 1 }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} steps
 * @return {?}
 */
function sequence(steps) {
    return new AnimationSequenceMetadata(steps);
}
/**
 * `style` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `style` declares a key/value object containing CSS properties/styles that can then
 * be used for {\@link state animation states}, within an {\@link sequence animation sequence}, or as
 * styling data for both {\@link animate animate} and {\@link keyframes keyframes}.
 *
 * ### Usage
 *
 * `style` takes in a key/value string map as data and expects one or more CSS property/value
 * pairs to be defined.
 *
 * ```typescript
 * // string values are used for css properties
 * style({ background: "red", color: "blue" })
 *
 * // numerical (pixel) values are also supported
 * style({ width: 100, height: 0 })
 * ```
 *
 * #### Auto-styles (using `*`)
 *
 * When an asterix (`*`) character is used as a value then it will be detected from the element
 * being animated
 * and applied as animation data when the animation starts.
 *
 * This feature proves useful for a state depending on layout and/or environment factors; in such
 * cases
 * the styles are calculated just before the animation starts.
 *
 * ```typescript
 * // the steps below will animate from 0 to the
 * // actual height of the element
 * style({ height: 0 }),
 * animate("1s", style({ height: "*" }))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} tokens
 * @return {?}
 */
function style(tokens) {
    var /** @type {?} */ input;
    var /** @type {?} */ offset = null;
    if (typeof tokens === 'string') {
        input = [(tokens)];
    }
    else {
        if (Array.isArray(tokens)) {
            input = (tokens);
        }
        else {
            input = [(tokens)];
        }
        input.forEach(function (entry) {
            var /** @type {?} */ entryOffset = ((entry) /** TODO #9100 */)['offset'];
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(entryOffset)) {
                offset = offset == null ? parseFloat(entryOffset) : offset;
            }
        });
    }
    return new AnimationStyleMetadata(input, offset);
}
/**
 * `state` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `state` declares an animation state within the given trigger. When a state is
 * active within a component then its associated styles will persist on
 * the element that the trigger is attached to (even when the animation ends).
 *
 * To animate between states, have a look at the animation {\@link transition transition}
 * DSL function. To register states to an animation trigger please have a look
 * at the {\@link trigger trigger} function.
 *
 * #### The `void` state
 *
 * The `void` state value is a reserved word that angular uses to determine when the element is not
 * apart
 * of the application anymore (e.g. when an `ngIf` evaluates to false then the state of the
 * associated element
 * is void).
 *
 * #### The `*` (default) state
 *
 * The `*` state (when styled) is a fallback state that will be used if
 * the state that is being animated is not declared within the trigger.
 *
 * ### Usage
 *
 * `state` will declare an animation state with its associated styles
 * within the given trigger.
 *
 * - `stateNameExpr` can be one or more state names separated by commas.
 * - `styles` refers to the {\@link style styling data} that will be persisted on the element once
 * the state
 * has been reached.
 *
 * ```typescript
 * // "void" is a reserved name for a state and is used to represent
 * // the state in which an element is detached from from the application.
 * state("void", style({ height: 0 }))
 *
 * // user-defined states
 * state("closed", style({ height: 0 }))
 * state("open, visible", style({ height: "*" }))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} stateNameExpr
 * @param {?} styles
 * @return {?}
 */
function state(stateNameExpr, styles) {
    return new AnimationStateDeclarationMetadata(stateNameExpr, styles);
}
/**
 * `keyframes` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `keyframes` specifies a collection of {\@link style style} entries each optionally characterized
 * by an `offset` value.
 *
 * ### Usage
 *
 * The `keyframes` animation function is designed to be used alongside the {\@link animate animate}
 * animation function. Instead of applying animations from where they are
 * currently to their destination, keyframes can describe how each style entry is applied
 * and at what point within the animation arc (much like CSS Keyframe Animations do).
 *
 * For each `style()` entry an `offset` value can be set. Doing so allows to specifiy at
 * what percentage of the animate time the styles will be applied.
 *
 * ```typescript
 * // the provided offset values describe when each backgroundColor value is applied.
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red", offset: 0 }),
 *   style({ backgroundColor: "blue", offset: 0.2 }),
 *   style({ backgroundColor: "orange", offset: 0.3 }),
 *   style({ backgroundColor: "black", offset: 1 })
 * ]))
 * ```
 *
 * Alternatively, if there are no `offset` values used within the style entries then the offsets
 * will
 * be calculated automatically.
 *
 * ```typescript
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red" }) // offset = 0
 *   style({ backgroundColor: "blue" }) // offset = 0.33
 *   style({ backgroundColor: "orange" }) // offset = 0.66
 *   style({ backgroundColor: "black" }) // offset = 1
 * ]))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} steps
 * @return {?}
 */
function keyframes(steps) {
    return new AnimationKeyframesSequenceMetadata(steps);
}
/**
 * `transition` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `transition` declares the {\@link sequence sequence of animation steps} that will be run when the
 * provided
 * `stateChangeExpr` value is satisfied. The `stateChangeExpr` consists of a `state1 => state2`
 * which consists
 * of two known states (use an asterix (`*`) to refer to a dynamic starting and/or ending state).
 *
 * Animation transitions are placed within an {\@link trigger animation trigger}. For an transition
 * to animate to
 * a state value and persist its styles then one or more {\@link state animation states} is expected
 * to be defined.
 *
 * ### Usage
 *
 * An animation transition is kicked off the `stateChangeExpr` predicate evaluates to true based on
 * what the
 * previous state is and what the current state has become. In other words, if a transition is
 * defined that
 * matches the old/current state criteria then the associated animation will be triggered.
 *
 * ```typescript
 * // all transition/state changes are defined within an animation trigger
 * trigger("myAnimationTrigger", [
 *   // if a state is defined then its styles will be persisted when the
 *   // animation has fully completed itself
 *   state("on", style({ background: "green" })),
 *   state("off", style({ background: "grey" })),
 *
 *   // a transition animation that will be kicked off when the state value
 *   // bound to "myAnimationTrigger" changes from "on" to "off"
 *   transition("on => off", animate(500)),
 *
 *   // it is also possible to do run the same animation for both directions
 *   transition("on <=> off", animate(500)),
 *
 *   // or to define multiple states pairs separated by commas
 *   transition("on => off, off => void", animate(500)),
 *
 *   // this is a catch-all state change for when an element is inserted into
 *   // the page and the destination state is unknown
 *   transition("void => *", [
 *     style({ opacity: 0 }),
 *     animate(500)
 *   ]),
 *
 *   // this will capture a state change between any states
 *   transition("* => *", animate("1s 0s")),
 * ])
 * ```
 *
 * The template associated with this component will make use of the `myAnimationTrigger`
 * animation trigger by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [\@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * #### The final `animate` call
 *
 * If the final step within the transition steps is a call to `animate()` that **only**
 * uses a timing value with **no style data** then it will be automatically used as the final
 * animation
 * arc for the element to animate itself to the final state. This involves an automatic mix of
 * adding/removing CSS styles so that the element will be in the exact state it should be for the
 * applied state to be presented correctly.
 *
 * ```
 * // start off by hiding the element, but make sure that it animates properly to whatever state
 * // is currently active for "myAnimationTrigger"
 * transition("void => *", [
 *   style({ opacity: 0 }),
 *   animate(500)
 * ])
 * ```
 *
 * ### Transition Aliases (`:enter` and `:leave`)
 *
 * Given that enter (insertion) and leave (removal) animations are so common,
 * the `transition` function accepts both `:enter` and `:leave` values which
 * are aliases for the `void => *` and `* => void` state changes.
 *
 * ```
 * transition(":enter", [
 *   style({ opacity: 0 }),
 *   animate(500, style({ opacity: 1 }))
 * ])
 * transition(":leave", [
 *   animate(500, style({ opacity: 0 }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} stateChangeExpr
 * @param {?} steps
 * @return {?}
 */
function transition(stateChangeExpr, steps) {
    var /** @type {?} */ animationData = Array.isArray(steps) ? new AnimationSequenceMetadata(steps) : steps;
    return new AnimationStateTransitionMetadata(stateChangeExpr, animationData);
}
/**
 * `trigger` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `trigger` Creates an animation trigger which will a list of {\@link state state} and {\@link
 * transition transition}
 * entries that will be evaluated when the expression bound to the trigger changes.
 *
 * Triggers are registered within the component annotation data under the
 * {\@link Component#animations-anchor animations section}. An animation trigger can
 * be placed on an element within a template by referencing the name of the
 * trigger followed by the expression value that the trigger is bound to
 * (in the form of `[\@triggerName]="expression"`.
 *
 * ### Usage
 *
 * `trigger` will create an animation trigger reference based on the provided `name` value.
 * The provided `animation` value is expected to be an array consisting of {\@link state state} and
 * {\@link transition transition}
 * declarations.
 *
 * ```typescript
 * \@Component({
 *   selector: 'my-component',
 *   templateUrl: 'my-component-tpl.html',
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *       state(...),
 *       state(...),
 *       transition(...),
 *       transition(...)
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "something";
 * }
 * ```
 *
 * The template associated with this component will make use of the `myAnimationTrigger`
 * animation trigger by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [\@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} name
 * @param {?} animation
 * @return {?}
 */
function trigger(name, animation) {
    return new AnimationEntryMetadata(name, animation);
}
//# sourceMappingURL=metadata.js.map

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangeDetectorRef; });
/**
 * \@stable
 * @abstract
 */
var ChangeDetectorRef = (function () {
    function ChangeDetectorRef() {
    }
    /**
     * Marks all {\@link ChangeDetectionStrategy#OnPush} ancestors as to be checked.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/GC512b?p=preview))
     *
     * ```typescript
     * \@Component({
     *   selector: 'cmp',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `Number of ticks: {{numberOfTicks}}`
     * })
     * class Cmp {
     *   numberOfTicks = 0;
     *
     *   constructor(ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks ++
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     *
     * \@Component({
     *   selector: 'app',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `
     *     <cmp><cmp>
     *   `,
     * })
     * class App {
     * }
     * ```
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.markForCheck = function () { };
    /**
     * Detaches the change detector from the change detector tree.
     *
     * The detached change detector will not be checked until it is reattached.
     *
     * This can also be used in combination with {\@link ChangeDetectorRef#detectChanges} to implement
     * local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```typescript
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * \@Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="let d of dataProvider.data">Data {{d}}</lig>
     *   `,
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * \@Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     * })
     * class App {
     * }
     * ```
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.detach = function () { };
    /**
     * Checks the change detector and its children.
     *
     * This can also be used in combination with {\@link ChangeDetectorRef#detach} to implement local
     * change detection
     * checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check
     * every five seconds.
     *
     * See {\@link ChangeDetectorRef#detach} for more information.
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.detectChanges = function () { };
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't introduce
     * other changes.
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.checkNoChanges = function () { };
    /**
     * Reattach the change detector to the change detector tree.
     *
     * This also marks OnPush ancestors as to be checked. This reattached change detector will be
     * checked during the next change detection run.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/aUhZha?p=preview))
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```typescript
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * \@Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: 'Data: {{dataProvider.data}}'
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {}
     *
     *   set live(value) {
     *     if (value)
     *       this.ref.reattach();
     *     else
     *       this.ref.detach();
     *   }
     * }
     *
     * \@Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     * })
     * class App {
     *   live = true;
     * }
     * ```
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.reattach = function () { };
    return ChangeDetectorRef;
}());
//# sourceMappingURL=change_detector_ref.js.map

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultKeyValueDifferFactory; });
/* unused harmony export DefaultKeyValueDiffer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return KeyValueChangeRecord; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var DefaultKeyValueDifferFactory = (function () {
    function DefaultKeyValueDifferFactory() {
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    DefaultKeyValueDifferFactory.prototype.supports = function (obj) { return obj instanceof Map || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["d" /* isJsObject */])(obj); };
    /**
     * @param {?} cdRef
     * @return {?}
     */
    DefaultKeyValueDifferFactory.prototype.create = function (cdRef) { return new DefaultKeyValueDiffer(); };
    return DefaultKeyValueDifferFactory;
}());
var DefaultKeyValueDiffer = (function () {
    function DefaultKeyValueDiffer() {
        this._records = new Map();
        this._mapHead = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
    }
    Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
        /**
         * @return {?}
         */
        get: function () {
            return this._additionsHead !== null || this._changesHead !== null ||
                this._removalsHead !== null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.forEachItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._mapHead; record !== null; record = record._next) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.forEachPreviousItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.forEachChangedItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.forEachAddedItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.forEachRemovedItem = function (fn) {
        var /** @type {?} */ record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    };
    /**
     * @param {?} map
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.diff = function (map) {
        if (!map) {
            map = new Map();
        }
        else if (!(map instanceof Map || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["d" /* isJsObject */])(map))) {
            throw new Error("Error trying to diff '" + map + "'");
        }
        return this.check(map) ? this : null;
    };
    /**
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.onDestroy = function () { };
    /**
     * @param {?} map
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.check = function (map) {
        var _this = this;
        this._reset();
        var /** @type {?} */ records = this._records;
        var /** @type {?} */ oldSeqRecord = this._mapHead;
        var /** @type {?} */ lastOldSeqRecord = null;
        var /** @type {?} */ lastNewSeqRecord = null;
        var /** @type {?} */ seqChanged = false;
        this._forEach(map, function (value, key) {
            var /** @type {?} */ newSeqRecord;
            if (oldSeqRecord && key === oldSeqRecord.key) {
                newSeqRecord = oldSeqRecord;
                _this._maybeAddToChanges(newSeqRecord, value);
            }
            else {
                seqChanged = true;
                if (oldSeqRecord !== null) {
                    _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
                    _this._addToRemovals(oldSeqRecord);
                }
                if (records.has(key)) {
                    newSeqRecord = records.get(key);
                    _this._maybeAddToChanges(newSeqRecord, value);
                }
                else {
                    newSeqRecord = new KeyValueChangeRecord(key);
                    records.set(key, newSeqRecord);
                    newSeqRecord.currentValue = value;
                    _this._addToAdditions(newSeqRecord);
                }
            }
            if (seqChanged) {
                if (_this._isInRemovals(newSeqRecord)) {
                    _this._removeFromRemovals(newSeqRecord);
                }
                if (lastNewSeqRecord == null) {
                    _this._mapHead = newSeqRecord;
                }
                else {
                    lastNewSeqRecord._next = newSeqRecord;
                }
            }
            lastOldSeqRecord = oldSeqRecord;
            lastNewSeqRecord = newSeqRecord;
            oldSeqRecord = oldSeqRecord && oldSeqRecord._next;
        });
        this._truncate(lastOldSeqRecord, oldSeqRecord);
        return this.isDirty;
    };
    /**
     * \@internal
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._reset = function () {
        if (this.isDirty) {
            var /** @type {?} */ record = void 0;
            // Record the state of the mapping
            for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                record.previousValue = record.currentValue;
            }
            for (record = this._additionsHead; record != null; record = record._nextAdded) {
                record.previousValue = record.currentValue;
            }
            this._changesHead = this._changesTail = null;
            this._additionsHead = this._additionsTail = null;
            this._removalsHead = this._removalsTail = null;
        }
    };
    /**
     * \@internal
     * @param {?} lastRecord
     * @param {?} record
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._truncate = function (lastRecord, record) {
        while (record !== null) {
            if (lastRecord === null) {
                this._mapHead = null;
            }
            else {
                lastRecord._next = null;
            }
            var /** @type {?} */ nextRecord = record._next;
            this._addToRemovals(record);
            lastRecord = record;
            record = nextRecord;
        }
        for (var /** @type {?} */ rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
            rec.previousValue = rec.currentValue;
            rec.currentValue = null;
            this._records.delete(rec.key);
        }
    };
    /**
     * @param {?} record
     * @param {?} newValue
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._maybeAddToChanges = function (record, newValue) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["j" /* looseIdentical */])(newValue, record.currentValue)) {
            record.previousValue = record.currentValue;
            record.currentValue = newValue;
            this._addToChanges(record);
        }
    };
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._isInRemovals = function (record) {
        return record === this._removalsHead || record._nextRemoved !== null ||
            record._prevRemoved !== null;
    };
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._addToRemovals = function (record) {
        if (this._removalsHead === null) {
            this._removalsHead = this._removalsTail = record;
        }
        else {
            this._removalsTail._nextRemoved = record;
            record._prevRemoved = this._removalsTail;
            this._removalsTail = record;
        }
    };
    /**
     * \@internal
     * @param {?} prev
     * @param {?} record
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._removeFromSeq = function (prev, record) {
        var /** @type {?} */ next = record._next;
        if (prev === null) {
            this._mapHead = next;
        }
        else {
            prev._next = next;
        }
        record._next = null;
    };
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._removeFromRemovals = function (record) {
        var /** @type {?} */ prev = record._prevRemoved;
        var /** @type {?} */ next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        record._prevRemoved = record._nextRemoved = null;
    };
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._addToAdditions = function (record) {
        if (this._additionsHead === null) {
            this._additionsHead = this._additionsTail = record;
        }
        else {
            this._additionsTail._nextAdded = record;
            this._additionsTail = record;
        }
    };
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._addToChanges = function (record) {
        if (this._changesHead === null) {
            this._changesHead = this._changesTail = record;
        }
        else {
            this._changesTail._nextChanged = record;
            this._changesTail = record;
        }
    };
    /**
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype.toString = function () {
        var /** @type {?} */ items = [];
        var /** @type {?} */ previous = [];
        var /** @type {?} */ changes = [];
        var /** @type {?} */ additions = [];
        var /** @type {?} */ removals = [];
        var /** @type {?} */ record;
        for (record = this._mapHead; record !== null; record = record._next) {
            items.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(record));
        }
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            previous.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(record));
        }
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            changes.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(record));
        }
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            additions.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(record));
        }
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            removals.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(record));
        }
        return 'map: ' + items.join(', ') + '\n' +
            'previous: ' + previous.join(', ') + '\n' +
            'additions: ' + additions.join(', ') + '\n' +
            'changes: ' + changes.join(', ') + '\n' +
            'removals: ' + removals.join(', ') + '\n';
    };
    /**
     * \@internal
     * @param {?} obj
     * @param {?} fn
     * @return {?}
     */
    DefaultKeyValueDiffer.prototype._forEach = function (obj, fn) {
        if (obj instanceof Map) {
            obj.forEach(fn);
        }
        else {
            Object.keys(obj).forEach(function (k) { return fn(obj[k], k); });
        }
    };
    return DefaultKeyValueDiffer;
}());
function DefaultKeyValueDiffer_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._records;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._mapHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._previousMapHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._changesHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._changesTail;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._additionsHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._additionsTail;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._removalsHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._removalsTail;
}
/**
 * \@stable
 */
var KeyValueChangeRecord = (function () {
    /**
     * @param {?} key
     */
    function KeyValueChangeRecord(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextChanged = null;
    }
    /**
     * @return {?}
     */
    KeyValueChangeRecord.prototype.toString = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["j" /* looseIdentical */])(this.previousValue, this.currentValue) ?
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(this.key) :
            (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(this.key) + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(this.previousValue) + '->' +
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(this.currentValue) + ']');
    };
    return KeyValueChangeRecord;
}());
function KeyValueChangeRecord_tsickle_Closure_declarations() {
    /** @type {?} */
    KeyValueChangeRecord.prototype.previousValue;
    /** @type {?} */
    KeyValueChangeRecord.prototype.currentValue;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord.prototype._nextPrevious;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord.prototype._next;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord.prototype._nextAdded;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord.prototype._nextRemoved;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord.prototype._prevRemoved;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord.prototype._nextChanged;
    /** @type {?} */
    KeyValueChangeRecord.prototype.key;
}
//# sourceMappingURL=default_keyvalue_differ.js.map

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IterableDiffers; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 * \@stable
 */
var IterableDiffers = (function () {
    /**
     * @param {?} factories
     */
    function IterableDiffers(factories) {
        this.factories = factories;
    }
    /**
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    IterableDiffers.create = function (factories, parent) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["b" /* isPresent */])(parent)) {
            var /** @type {?} */ copied = parent.factories.slice();
            factories = factories.concat(copied);
            return new IterableDiffers(factories);
        }
        else {
            return new IterableDiffers(factories);
        }
    };
    /**
     * Takes an array of {\@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {\@link IterableDiffers} instance with the provided factories and return a new
     * {\@link IterableDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link IterableDiffer} available.
     *
     * ### Example
     *
     * ```
     * \@Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     * @param {?} factories
     * @return {?}
     */
    IterableDiffers.extend = function (factories) {
        return {
            provide: IterableDiffers,
            useFactory: function (parent) {
                if (!parent) {
                    // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend IterableDiffers without a parent injector');
                }
                return IterableDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[IterableDiffers, new __WEBPACK_IMPORTED_MODULE_0__di__["l" /* SkipSelf */](), new __WEBPACK_IMPORTED_MODULE_0__di__["i" /* Optional */]()]]
        };
    };
    /**
     * @param {?} iterable
     * @return {?}
     */
    IterableDiffers.prototype.find = function (iterable) {
        var /** @type {?} */ factory = this.factories.find(function (f) { return f.supports(iterable); });
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["b" /* isPresent */])(factory)) {
            return factory;
        }
        else {
            throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["l" /* getTypeNameForDebugging */])(iterable) + "'");
        }
    };
    return IterableDiffers;
}());
function IterableDiffers_tsickle_Closure_declarations() {
    /** @type {?} */
    IterableDiffers.prototype.factories;
}
//# sourceMappingURL=iterable_differs.js.map

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyValueDiffers; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 * \@stable
 */
var KeyValueDiffers = (function () {
    /**
     * @param {?} factories
     */
    function KeyValueDiffers(factories) {
        this.factories = factories;
    }
    /**
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    KeyValueDiffers.create = function (factories, parent) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["b" /* isPresent */])(parent)) {
            var /** @type {?} */ copied = parent.factories.slice();
            factories = factories.concat(copied);
            return new KeyValueDiffers(factories);
        }
        else {
            return new KeyValueDiffers(factories);
        }
    };
    /**
     * Takes an array of {\@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {\@link KeyValueDiffers} instance with the provided factories and return a new
     * {\@link KeyValueDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link KeyValueDiffer} available.
     *
     * ### Example
     *
     * ```
     * \@Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     * @param {?} factories
     * @return {?}
     */
    KeyValueDiffers.extend = function (factories) {
        return {
            provide: KeyValueDiffers,
            useFactory: function (parent) {
                if (!parent) {
                    // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend KeyValueDiffers without a parent injector');
                }
                return KeyValueDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[KeyValueDiffers, new __WEBPACK_IMPORTED_MODULE_0__di__["l" /* SkipSelf */](), new __WEBPACK_IMPORTED_MODULE_0__di__["i" /* Optional */]()]]
        };
    };
    /**
     * @param {?} kv
     * @return {?}
     */
    KeyValueDiffers.prototype.find = function (kv) {
        var /** @type {?} */ factory = this.factories.find(function (f) { return f.supports(kv); });
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["b" /* isPresent */])(factory)) {
            return factory;
        }
        else {
            throw new Error("Cannot find a differ supporting object '" + kv + "'");
        }
    };
    return KeyValueDiffers;
}());
function KeyValueDiffers_tsickle_Closure_declarations() {
    /** @type {?} */
    KeyValueDiffers.prototype.factories;
}
//# sourceMappingURL=keyvalue_differs.js.map

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return EventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DebugNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DebugElement; });
/* harmony export (immutable) */ __webpack_exports__["c"] = asNativeElements;
/* harmony export (immutable) */ __webpack_exports__["d"] = getDebugNode;
/* unused harmony export getAllDebugNodes */
/* harmony export (immutable) */ __webpack_exports__["e"] = indexDebugNode;
/* harmony export (immutable) */ __webpack_exports__["f"] = removeDebugNodeFromIndex;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventListener = (function () {
    /**
     * @param {?} name
     * @param {?} callback
     */
    function EventListener(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    ;
    return EventListener;
}());
function EventListener_tsickle_Closure_declarations() {
    /** @type {?} */
    EventListener.prototype.name;
    /** @type {?} */
    EventListener.prototype.callback;
}
/**
 * \@experimental All debugging apis are currently experimental.
 */
var DebugNode = (function () {
    /**
     * @param {?} nativeNode
     * @param {?} parent
     * @param {?} _debugInfo
     */
    function DebugNode(nativeNode, parent, _debugInfo) {
        this._debugInfo = _debugInfo;
        this.nativeNode = nativeNode;
        if (parent && parent instanceof DebugElement) {
            parent.addChild(this);
        }
        else {
            this.parent = null;
        }
        this.listeners = [];
    }
    Object.defineProperty(DebugNode.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return this._debugInfo ? this._debugInfo.injector : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "componentInstance", {
        /**
         * @return {?}
         */
        get: function () { return this._debugInfo ? this._debugInfo.component : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "context", {
        /**
         * @return {?}
         */
        get: function () { return this._debugInfo ? this._debugInfo.context : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "references", {
        /**
         * @return {?}
         */
        get: function () {
            return this._debugInfo ? this._debugInfo.references : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "providerTokens", {
        /**
         * @return {?}
         */
        get: function () { return this._debugInfo ? this._debugInfo.providerTokens : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "source", {
        /**
         * @return {?}
         */
        get: function () { return this._debugInfo ? this._debugInfo.source : null; },
        enumerable: true,
        configurable: true
    });
    return DebugNode;
}());
function DebugNode_tsickle_Closure_declarations() {
    /** @type {?} */
    DebugNode.prototype.nativeNode;
    /** @type {?} */
    DebugNode.prototype.listeners;
    /** @type {?} */
    DebugNode.prototype.parent;
    /** @type {?} */
    DebugNode.prototype._debugInfo;
}
/**
 * \@experimental All debugging apis are currently experimental.
 */
var DebugElement = (function (_super) {
    __extends(DebugElement, _super);
    /**
     * @param {?} nativeNode
     * @param {?} parent
     * @param {?} _debugInfo
     */
    function DebugElement(nativeNode, parent, _debugInfo) {
        _super.call(this, nativeNode, parent, _debugInfo);
        this.properties = {};
        this.attributes = {};
        this.classes = {};
        this.styles = {};
        this.childNodes = [];
        this.nativeElement = nativeNode;
    }
    /**
     * @param {?} child
     * @return {?}
     */
    DebugElement.prototype.addChild = function (child) {
        if (child) {
            this.childNodes.push(child);
            child.parent = this;
        }
    };
    /**
     * @param {?} child
     * @return {?}
     */
    DebugElement.prototype.removeChild = function (child) {
        var /** @type {?} */ childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            child.parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    };
    /**
     * @param {?} child
     * @param {?} newChildren
     * @return {?}
     */
    DebugElement.prototype.insertChildrenAfter = function (child, newChildren) {
        var /** @type {?} */ siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            var /** @type {?} */ previousChildren = this.childNodes.slice(0, siblingIndex + 1);
            var /** @type {?} */ nextChildren = this.childNodes.slice(siblingIndex + 1);
            this.childNodes = previousChildren.concat(newChildren, nextChildren);
            for (var /** @type {?} */ i = 0; i < newChildren.length; ++i) {
                var /** @type {?} */ newChild = newChildren[i];
                if (newChild.parent) {
                    newChild.parent.removeChild(newChild);
                }
                newChild.parent = this;
            }
        }
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement.prototype.query = function (predicate) {
        var /** @type {?} */ results = this.queryAll(predicate);
        return results[0] || null;
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement.prototype.queryAll = function (predicate) {
        var /** @type {?} */ matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement.prototype.queryAllNodes = function (predicate) {
        var /** @type {?} */ matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    };
    Object.defineProperty(DebugElement.prototype, "children", {
        /**
         * @return {?}
         */
        get: function () {
            return (this.childNodes.filter(function (node) { return node instanceof DebugElement; }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} eventName
     * @param {?} eventObj
     * @return {?}
     */
    DebugElement.prototype.triggerEventHandler = function (eventName, eventObj) {
        this.listeners.forEach(function (listener) {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    };
    return DebugElement;
}(DebugNode));
function DebugElement_tsickle_Closure_declarations() {
    /** @type {?} */
    DebugElement.prototype.name;
    /** @type {?} */
    DebugElement.prototype.properties;
    /** @type {?} */
    DebugElement.prototype.attributes;
    /** @type {?} */
    DebugElement.prototype.classes;
    /** @type {?} */
    DebugElement.prototype.styles;
    /** @type {?} */
    DebugElement.prototype.childNodes;
    /** @type {?} */
    DebugElement.prototype.nativeElement;
}
/**
 * \@experimental
 * @param {?} debugEls
 * @return {?}
 */
function asNativeElements(debugEls) {
    return debugEls.map(function (el) { return el.nativeElement; });
}
/**
 * @param {?} element
 * @param {?} predicate
 * @param {?} matches
 * @return {?}
 */
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(function (node) {
        if (node instanceof DebugElement) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
/**
 * @param {?} parentNode
 * @param {?} predicate
 * @param {?} matches
 * @return {?}
 */
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement) {
        parentNode.childNodes.forEach(function (node) {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
// Need to keep the nodes in a global Map so that multiple angular apps are supported.
var /** @type {?} */ _nativeNodeToDebugNode = new Map();
/**
 * \@experimental
 * @param {?} nativeNode
 * @return {?}
 */
function getDebugNode(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode);
}
/**
 * @return {?}
 */
function getAllDebugNodes() {
    return Array.from(_nativeNodeToDebugNode.values());
}
/**
 * @param {?} node
 * @return {?}
 */
function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
/**
 * @param {?} node
 * @return {?}
 */
function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}
//# sourceMappingURL=debug_node.js.map

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_errors__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return AbstractProviderError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return NoProviderError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CyclicDependencyError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return InstantiationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return InvalidProviderError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NoAnnotationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return OutOfBoundsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MixingMultiProvidersWithRegularProvidersError; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * @param {?} keys
 * @return {?}
 */
function findFirstClosedCycle(keys) {
    var /** @type {?} */ res = [];
    for (var /** @type {?} */ i = 0; i < keys.length; ++i) {
        if (res.indexOf(keys[i]) > -1) {
            res.push(keys[i]);
            return res;
        }
        res.push(keys[i]);
    }
    return res;
}
/**
 * @param {?} keys
 * @return {?}
 */
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        var /** @type {?} */ reversed = findFirstClosedCycle(keys.slice().reverse());
        var /** @type {?} */ tokenStrs = reversed.map(function (k) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(k.token); });
        return ' (' + tokenStrs.join(' -> ') + ')';
    }
    return '';
}
/**
 * Base class for all errors arising from misconfigured providers.
 * \@stable
 */
var AbstractProviderError = (function (_super) {
    __extends(AbstractProviderError, _super);
    /**
     * @param {?} injector
     * @param {?} key
     * @param {?} constructResolvingMessage
     */
    function AbstractProviderError(injector, key, constructResolvingMessage) {
        _super.call(this, 'DI Error');
        this.keys = [key];
        this.injectors = [injector];
        this.constructResolvingMessage = constructResolvingMessage;
        this.message = this.constructResolvingMessage(this.keys);
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    AbstractProviderError.prototype.addKey = function (injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
        this.message = this.constructResolvingMessage(this.keys);
    };
    return AbstractProviderError;
}(__WEBPACK_IMPORTED_MODULE_0__facade_errors__["a" /* BaseError */]));
function AbstractProviderError_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    AbstractProviderError.prototype.message;
    /**
     * \@internal
     * @type {?}
     */
    AbstractProviderError.prototype.keys;
    /**
     * \@internal
     * @type {?}
     */
    AbstractProviderError.prototype.injectors;
    /**
     * \@internal
     * @type {?}
     */
    AbstractProviderError.prototype.constructResolvingMessage;
}
/**
 * Thrown when trying to retrieve a dependency by key from {\@link Injector}, but the
 * {\@link Injector} does not have a {\@link Provider} for the given key.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 * \@stable
 */
var NoProviderError = (function (_super) {
    __extends(NoProviderError, _super);
    /**
     * @param {?} injector
     * @param {?} key
     */
    function NoProviderError(injector, key) {
        _super.call(this, injector, key, function (keys) {
            var first = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(keys[0].token);
            return "No provider for " + first + "!" + constructResolvingPath(keys);
        });
    }
    return NoProviderError;
}(AbstractProviderError));
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
 *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 * \@stable
 */
var CyclicDependencyError = (function (_super) {
    __extends(CyclicDependencyError, _super);
    /**
     * @param {?} injector
     * @param {?} key
     */
    function CyclicDependencyError(injector, key) {
        _super.call(this, injector, key, function (keys) {
            return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
        });
    }
    return CyclicDependencyError;
}(AbstractProviderError));
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);
 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 * \@stable
 */
var InstantiationError = (function (_super) {
    __extends(InstantiationError, _super);
    /**
     * @param {?} injector
     * @param {?} originalException
     * @param {?} originalStack
     * @param {?} key
     */
    function InstantiationError(injector, originalException, originalStack, key) {
        _super.call(this, 'DI Error', originalException);
        this.keys = [key];
        this.injectors = [injector];
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    InstantiationError.prototype.addKey = function (injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
    };
    Object.defineProperty(InstantiationError.prototype, "message", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ first = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(this.keys[0].token);
            return this.originalError.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(this.keys) + ".";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstantiationError.prototype, "causeKey", {
        /**
         * @return {?}
         */
        get: function () { return this.keys[0]; },
        enumerable: true,
        configurable: true
    });
    return InstantiationError;
}(__WEBPACK_IMPORTED_MODULE_0__facade_errors__["b" /* WrappedError */]));
function InstantiationError_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    InstantiationError.prototype.keys;
    /**
     * \@internal
     * @type {?}
     */
    InstantiationError.prototype.injectors;
}
/**
 * Thrown when an object other then {\@link Provider} (or `Type`) is passed to {\@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 * \@stable
 */
var InvalidProviderError = (function (_super) {
    __extends(InvalidProviderError, _super);
    /**
     * @param {?} provider
     */
    function InvalidProviderError(provider) {
        _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
    }
    return InvalidProviderError;
}(__WEBPACK_IMPORTED_MODULE_0__facade_errors__["a" /* BaseError */]));
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {\@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {\@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 * \@stable
 */
var NoAnnotationError = (function (_super) {
    __extends(NoAnnotationError, _super);
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     */
    function NoAnnotationError(typeOrFunc, params) {
        _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params));
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     * @return {?}
     */
    NoAnnotationError._genMessage = function (typeOrFunc, params) {
        var /** @type {?} */ signature = [];
        for (var /** @type {?} */ i = 0, /** @type {?} */ ii = params.length; i < ii; i++) {
            var /** @type {?} */ parameter = params[i];
            if (!parameter || parameter.length == 0) {
                signature.push('?');
            }
            else {
                signature.push(parameter.map(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */]).join(' '));
            }
        }
        return 'Cannot resolve all parameters for \'' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(typeOrFunc) + '\'(' +
            signature.join(', ') + '). ' +
            'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(typeOrFunc) + '\' is decorated with Injectable.';
    };
    return NoAnnotationError;
}(__WEBPACK_IMPORTED_MODULE_0__facade_errors__["a" /* BaseError */]));
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 * \@stable
 */
var OutOfBoundsError = (function (_super) {
    __extends(OutOfBoundsError, _super);
    /**
     * @param {?} index
     */
    function OutOfBoundsError(index) {
        _super.call(this, "Index " + index + " is out-of-bounds.");
    }
    return OutOfBoundsError;
}(__WEBPACK_IMPORTED_MODULE_0__facade_errors__["a" /* BaseError */]));
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   { provide: "Strings", useValue: "string1", multi: true},
 *   { provide: "Strings", useValue: "string2", multi: false}
 * ])).toThrowError();
 * ```
 */
var MixingMultiProvidersWithRegularProvidersError = (function (_super) {
    __extends(MixingMultiProvidersWithRegularProvidersError, _super);
    /**
     * @param {?} provider1
     * @param {?} provider2
     */
    function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
        _super.call(this, 'Cannot mix multi providers and regular providers, got: ' + provider1.toString() + ' ' +
            provider2.toString());
    }
    return MixingMultiProvidersWithRegularProvidersError;
}(__WEBPACK_IMPORTED_MODULE_0__facade_errors__["a" /* BaseError */]));
//# sourceMappingURL=reflective_errors.js.map

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorHandler; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Provides a hook for centralized exception handling.
 *
 * \@description
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * ### Example
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * \@NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 * \@stable
 */
var ErrorHandler = (function () {
    /**
     * @param {?=} rethrowError
     */
    function ErrorHandler(rethrowError) {
        if (rethrowError === void 0) { rethrowError = true; }
        /**
         * @internal
         */
        this._console = console;
        this.rethrowError = rethrowError;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    ErrorHandler.prototype.handleError = function (error) {
        var /** @type {?} */ originalError = this._findOriginalError(error);
        var /** @type {?} */ originalStack = this._findOriginalStack(error);
        var /** @type {?} */ context = this._findContext(error);
        this._console.error("EXCEPTION: " + this._extractMessage(error));
        if (originalError) {
            this._console.error("ORIGINAL EXCEPTION: " + this._extractMessage(originalError));
        }
        if (originalStack) {
            this._console.error('ORIGINAL STACKTRACE:');
            this._console.error(originalStack);
        }
        if (context) {
            this._console.error('ERROR CONTEXT:');
            this._console.error(context);
        }
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
        if (this.rethrowError)
            throw error;
    };
    /**
     * \@internal
     * @param {?} error
     * @return {?}
     */
    ErrorHandler.prototype._extractMessage = function (error) {
        return error instanceof Error ? error.message : error.toString();
    };
    /**
     * \@internal
     * @param {?} error
     * @return {?}
     */
    ErrorHandler.prototype._findContext = function (error) {
        if (error) {
            return error.context ? error.context :
                this._findContext(((error)).originalError);
        }
        return null;
    };
    /**
     * \@internal
     * @param {?} error
     * @return {?}
     */
    ErrorHandler.prototype._findOriginalError = function (error) {
        var /** @type {?} */ e = ((error)).originalError;
        while (e && ((e)).originalError) {
            e = ((e)).originalError;
        }
        return e;
    };
    /**
     * \@internal
     * @param {?} error
     * @return {?}
     */
    ErrorHandler.prototype._findOriginalStack = function (error) {
        if (!(error instanceof Error))
            return null;
        var /** @type {?} */ e = error;
        var /** @type {?} */ stack = e.stack;
        while (e instanceof Error && ((e)).originalError) {
            e = ((e)).originalError;
            if (e instanceof Error && e.stack) {
                stack = e.stack;
            }
        }
        return stack;
    };
    return ErrorHandler;
}());
function ErrorHandler_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    ErrorHandler.prototype._console;
    /**
     * \@internal
     * @type {?}
     */
    ErrorHandler.prototype.rethrowError;
}
//# sourceMappingURL=error_handler.js.map

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di_opaque_token__ = __webpack_require__(80);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LOCALE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TRANSLATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TRANSLATIONS_FORMAT; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @experimental i18n support is experimental.
 */
var /** @type {?} */ LOCALE_ID = new __WEBPACK_IMPORTED_MODULE_0__di_opaque_token__["a" /* OpaqueToken */]('LocaleId');
/**
 * @experimental i18n support is experimental.
 */
var /** @type {?} */ TRANSLATIONS = new __WEBPACK_IMPORTED_MODULE_0__di_opaque_token__["a" /* OpaqueToken */]('Translations');
/**
 * @experimental i18n support is experimental.
 */
var /** @type {?} */ TRANSLATIONS_FORMAT = new __WEBPACK_IMPORTED_MODULE_0__di_opaque_token__["a" /* OpaqueToken */]('TranslationsFormat');
//# sourceMappingURL=tokens.js.map

/***/ }),
/* 137 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 137;

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_type__ = __webpack_require__(63);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StaticNodeDebugInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DebugContext; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


var StaticNodeDebugInfo = (function () {
    /**
     * @param {?} providerTokens
     * @param {?} componentToken
     * @param {?} refTokens
     */
    function StaticNodeDebugInfo(providerTokens, componentToken, refTokens) {
        this.providerTokens = providerTokens;
        this.componentToken = componentToken;
        this.refTokens = refTokens;
    }
    return StaticNodeDebugInfo;
}());
function StaticNodeDebugInfo_tsickle_Closure_declarations() {
    /** @type {?} */
    StaticNodeDebugInfo.prototype.providerTokens;
    /** @type {?} */
    StaticNodeDebugInfo.prototype.componentToken;
    /** @type {?} */
    StaticNodeDebugInfo.prototype.refTokens;
}
var DebugContext = (function () {
    /**
     * @param {?} _view
     * @param {?} _nodeIndex
     * @param {?} _tplRow
     * @param {?} _tplCol
     */
    function DebugContext(_view, _nodeIndex, _tplRow, _tplCol) {
        this._view = _view;
        this._nodeIndex = _nodeIndex;
        this._tplRow = _tplRow;
        this._tplCol = _tplCol;
    }
    Object.defineProperty(DebugContext.prototype, "_staticNodeInfo", {
        /**
         * @return {?}
         */
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "context", {
        /**
         * @return {?}
         */
        get: function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "component", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(staticNodeInfo) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(staticNodeInfo.componentToken)) {
                return this.injector.get(staticNodeInfo.componentToken);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "componentRenderElement", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ componentView = this._view;
            while (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(componentView.parentView) && componentView.type !== __WEBPACK_IMPORTED_MODULE_1__view_type__["a" /* ViewType */].COMPONENT) {
                componentView = (componentView.parentView);
            }
            return componentView.parentElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return this._view.injector(this._nodeIndex); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "renderNode", {
        /**
         * @return {?}
         */
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(this._nodeIndex) && this._view.allNodes) {
                return this._view.allNodes[this._nodeIndex];
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "providerTokens", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "source", {
        /**
         * @return {?}
         */
        get: function () {
            return this._view.componentType.templateUrl + ":" + this._tplRow + ":" + this._tplCol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "references", {
        /**
         * @return {?}
         */
        get: function () {
            var _this = this;
            var /** @type {?} */ varValues = {};
            var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(staticNodeInfo)) {
                var /** @type {?} */ refs_1 = staticNodeInfo.refTokens;
                Object.keys(refs_1).forEach(function (refName) {
                    var /** @type {?} */ refToken = refs_1[refName];
                    var /** @type {?} */ varValue;
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["k" /* isBlank */])(refToken)) {
                        varValue = _this._view.allNodes ? _this._view.allNodes[_this._nodeIndex] : null;
                    }
                    else {
                        varValue = _this._view.injectorGet(refToken, _this._nodeIndex, null);
                    }
                    varValues[refName] = varValue;
                });
            }
            return varValues;
        },
        enumerable: true,
        configurable: true
    });
    return DebugContext;
}());
function DebugContext_tsickle_Closure_declarations() {
    /** @type {?} */
    DebugContext.prototype._view;
    /** @type {?} */
    DebugContext.prototype._nodeIndex;
    /** @type {?} */
    DebugContext.prototype._tplRow;
    /** @type {?} */
    DebugContext.prototype._tplCol;
}
//# sourceMappingURL=debug_context.js.map

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection_util__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_errors__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpressionChangedAfterItHasBeenCheckedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ViewWrappedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ViewDestroyedError; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * An error thrown if application changes model breaking the top-down data flow.
 *
 * This exception is only thrown in dev mode.
 *
 * <!-- TODO: Add a link once the dev mode option is configurable -->
 *
 * ### Example
 *
 * ```typescript
 * \@Component({
 *   selector: 'parent',
 *   template: '<child [prop]="parentProp"></child>',
 * })
 * class Parent {
 *   parentProp = 'init';
 * }
 *
 * \@Directive({selector: 'child', inputs: ['prop']})
 * class Child {
 *   constructor(public parent: Parent) {}
 *
 *   set prop(v) {
 *     // this updates the parent property, which is disallowed during change detection
 *     // this will result in ExpressionChangedAfterItHasBeenCheckedError
 *     this.parent.parentProp = 'updated';
 *   }
 * }
 * ```
 * \@stable
 */
var ExpressionChangedAfterItHasBeenCheckedError = (function (_super) {
    __extends(ExpressionChangedAfterItHasBeenCheckedError, _super);
    /**
     * @param {?} oldValue
     * @param {?} currValue
     */
    function ExpressionChangedAfterItHasBeenCheckedError(oldValue, currValue) {
        var msg = "Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
        if (oldValue === __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection_util__["b" /* UNINITIALIZED */]) {
            msg +=
                " It seems like the view has been created after its parent and its children have been dirty checked." +
                    " Has it been created in a change detection hook ?";
        }
        _super.call(this, msg);
    }
    return ExpressionChangedAfterItHasBeenCheckedError;
}(__WEBPACK_IMPORTED_MODULE_1__facade_errors__["a" /* BaseError */]));
/**
 * Thrown when an exception was raised during view creation, change detection or destruction.
 *
 * This error wraps the original exception to attach additional contextual information that can
 * be useful for debugging.
 * \@stable
 */
var ViewWrappedError = (function (_super) {
    __extends(ViewWrappedError, _super);
    /**
     * @param {?} originalError
     * @param {?} context
     */
    function ViewWrappedError(originalError, context) {
        _super.call(this, "Error in " + context.source, originalError);
        this.context = context;
    }
    return ViewWrappedError;
}(__WEBPACK_IMPORTED_MODULE_1__facade_errors__["b" /* WrappedError */]));
function ViewWrappedError_tsickle_Closure_declarations() {
    /**
     * DebugContext
     * @type {?}
     */
    ViewWrappedError.prototype.context;
}
/**
 * Thrown when a destroyed view is used.
 *
 * This error indicates a bug in the framework.
 *
 * This is an internal Angular error.
 * \@stable
 */
var ViewDestroyedError = (function (_super) {
    __extends(ViewDestroyedError, _super);
    /**
     * @param {?} details
     */
    function ViewDestroyedError(details) {
        _super.call(this, "Attempt to use a destroyed view: " + details);
    }
    return ViewDestroyedError;
}(__WEBPACK_IMPORTED_MODULE_1__facade_errors__["a" /* BaseError */]));
//# sourceMappingURL=errors.js.map

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di_injector__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_factory_resolver__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NgModuleRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgModuleFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgModuleInjector; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * Represents an instance of an NgModule created via a {\@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 *
 * \@stable
 * @abstract
 */
var NgModuleRef = (function () {
    function NgModuleRef() {
    }
    /**
     * The injector that contains all of the providers of the NgModule.
     * @abstract
     * @return {?}
     */
    NgModuleRef.prototype.injector = function () { };
    /**
     * The ComponentFactoryResolver to get hold of the ComponentFactories
     * declared in the `entryComponents` property of the module.
     * @abstract
     * @return {?}
     */
    NgModuleRef.prototype.componentFactoryResolver = function () { };
    /**
     * The NgModule instance.
     * @abstract
     * @return {?}
     */
    NgModuleRef.prototype.instance = function () { };
    /**
     * Destroys the module instance and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    NgModuleRef.prototype.destroy = function () { };
    /**
     * Allows to register a callback that will be called when the module is destroyed.
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    NgModuleRef.prototype.onDestroy = function (callback) { };
    return NgModuleRef;
}());
/**
 * \@experimental
 */
var NgModuleFactory = (function () {
    /**
     * @param {?} _injectorClass
     * @param {?} _moduleType
     */
    function NgModuleFactory(_injectorClass, _moduleType) {
        this._injectorClass = _injectorClass;
        this._moduleType = _moduleType;
    }
    Object.defineProperty(NgModuleFactory.prototype, "moduleType", {
        /**
         * @return {?}
         */
        get: function () { return this._moduleType; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} parentInjector
     * @return {?}
     */
    NgModuleFactory.prototype.create = function (parentInjector) {
        if (!parentInjector) {
            parentInjector = __WEBPACK_IMPORTED_MODULE_0__di_injector__["a" /* Injector */].NULL;
        }
        var /** @type {?} */ instance = new this._injectorClass(parentInjector);
        instance.create();
        return instance;
    };
    return NgModuleFactory;
}());
function NgModuleFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    NgModuleFactory.prototype._injectorClass;
    /** @type {?} */
    NgModuleFactory.prototype._moduleType;
}
var /** @type {?} */ _UNDEFINED = new Object();
/**
 * @abstract
 */
var NgModuleInjector = (function (_super) {
    __extends(NgModuleInjector, _super);
    /**
     * @param {?} parent
     * @param {?} factories
     * @param {?} bootstrapFactories
     */
    function NgModuleInjector(parent, factories, bootstrapFactories) {
        _super.call(this, factories, parent.get(__WEBPACK_IMPORTED_MODULE_2__component_factory_resolver__["b" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_2__component_factory_resolver__["b" /* ComponentFactoryResolver */].NULL));
        this.parent = parent;
        this.bootstrapFactories = bootstrapFactories;
        this._destroyListeners = [];
        this._destroyed = false;
    }
    /**
     * @return {?}
     */
    NgModuleInjector.prototype.create = function () { this.instance = this.createInternal(); };
    /**
     * @abstract
     * @return {?}
     */
    NgModuleInjector.prototype.createInternal = function () { };
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    NgModuleInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = __WEBPACK_IMPORTED_MODULE_0__di_injector__["b" /* THROW_IF_NOT_FOUND */]; }
        if (token === __WEBPACK_IMPORTED_MODULE_0__di_injector__["a" /* Injector */] || token === __WEBPACK_IMPORTED_MODULE_2__component_factory_resolver__["b" /* ComponentFactoryResolver */]) {
            return this;
        }
        var /** @type {?} */ result = this.getInternal(token, _UNDEFINED);
        return result === _UNDEFINED ? this.parent.get(token, notFoundValue) : result;
    };
    /**
     * @abstract
     * @param {?} token
     * @param {?} notFoundValue
     * @return {?}
     */
    NgModuleInjector.prototype.getInternal = function (token, notFoundValue) { };
    Object.defineProperty(NgModuleInjector.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleInjector.prototype, "componentFactoryResolver", {
        /**
         * @return {?}
         */
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgModuleInjector.prototype.destroy = function () {
        if (this._destroyed) {
            throw new Error("The ng module " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* stringify */])(this.instance.constructor) + " has already been destroyed.");
        }
        this._destroyed = true;
        this.destroyInternal();
        this._destroyListeners.forEach(function (listener) { return listener(); });
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    NgModuleInjector.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    /**
     * @abstract
     * @return {?}
     */
    NgModuleInjector.prototype.destroyInternal = function () { };
    return NgModuleInjector;
}(__WEBPACK_IMPORTED_MODULE_2__component_factory_resolver__["a" /* CodegenComponentFactoryResolver */]));
function NgModuleInjector_tsickle_Closure_declarations() {
    /** @type {?} */
    NgModuleInjector.prototype._destroyListeners;
    /** @type {?} */
    NgModuleInjector.prototype._destroyed;
    /** @type {?} */
    NgModuleInjector.prototype.instance;
    /** @type {?} */
    NgModuleInjector.prototype.parent;
    /** @type {?} */
    NgModuleInjector.prototype.bootstrapFactories;
}
//# sourceMappingURL=ng_module_factory.js.map

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgModuleFactoryLoader; });
/* harmony export (immutable) */ __webpack_exports__["a"] = registerModuleFactory;
/* unused harmony export clearModulesForTest */
/* harmony export (immutable) */ __webpack_exports__["c"] = getModuleFactory;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Used to load ng module factories.
 * \@stable
 * @abstract
 */
var NgModuleFactoryLoader = (function () {
    function NgModuleFactoryLoader() {
    }
    /**
     * @abstract
     * @param {?} path
     * @return {?}
     */
    NgModuleFactoryLoader.prototype.load = function (path) { };
    return NgModuleFactoryLoader;
}());
var /** @type {?} */ moduleFactories = new Map();
/**
 * Registers a loaded module. Should only be called from generated NgModuleFactory code.
 * \@experimental
 * @param {?} id
 * @param {?} factory
 * @return {?}
 */
function registerModuleFactory(id, factory) {
    var /** @type {?} */ existing = moduleFactories.get(id);
    if (existing) {
        throw new Error("Duplicate module registered for " + id + " - " + existing.moduleType.name + " vs " + factory.moduleType.name);
    }
    moduleFactories.set(id, factory);
}
/**
 * @return {?}
 */
function clearModulesForTest() {
    moduleFactories = new Map();
}
/**
 * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
 * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
 * cannot be found.
 * \@experimental
 * @param {?} id
 * @return {?}
 */
function getModuleFactory(id) {
    var /** @type {?} */ factory = moduleFactories.get(id);
    if (!factory)
        throw new Error("No module with ID " + id + " loaded");
    return factory;
}
//# sourceMappingURL=ng_module_factory_loader.js.map

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_ref__ = __webpack_require__(62);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TemplateRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateRef_; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
 * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
 * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
 * `TemplateRef` from a Component or a Directive via {\@link Query}.
 *
 * To instantiate Embedded Views based on a Template, use
 * {\@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
 * View Container.
 * \@stable
 * @abstract
 */
var TemplateRef = (function () {
    function TemplateRef() {
    }
    /**
     * @abstract
     * @return {?}
     */
    TemplateRef.prototype.elementRef = function () { };
    /**
     * @abstract
     * @param {?} context
     * @return {?}
     */
    TemplateRef.prototype.createEmbeddedView = function (context) { };
    return TemplateRef;
}());
var TemplateRef_ = (function (_super) {
    __extends(TemplateRef_, _super);
    /**
     * @param {?} _parentView
     * @param {?} _nodeIndex
     * @param {?} _nativeElement
     */
    function TemplateRef_(_parentView, _nodeIndex, _nativeElement) {
        _super.call(this);
        this._parentView = _parentView;
        this._nodeIndex = _nodeIndex;
        this._nativeElement = _nativeElement;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    TemplateRef_.prototype.createEmbeddedView = function (context) {
        var /** @type {?} */ view = this._parentView.createEmbeddedViewInternal(this._nodeIndex);
        view.create(context || ({}));
        return view.ref;
    };
    Object.defineProperty(TemplateRef_.prototype, "elementRef", {
        /**
         * @return {?}
         */
        get: function () { return new __WEBPACK_IMPORTED_MODULE_0__element_ref__["a" /* ElementRef */](this._nativeElement); },
        enumerable: true,
        configurable: true
    });
    return TemplateRef_;
}(TemplateRef));
function TemplateRef__tsickle_Closure_declarations() {
    /** @type {?} */
    TemplateRef_.prototype._parentView;
    /** @type {?} */
    TemplateRef_.prototype._nodeIndex;
    /** @type {?} */
    TemplateRef_.prototype._nativeElement;
}
//# sourceMappingURL=template_ref.js.map

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ViewContainerRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewContainerRef_; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * Represents a container where one or more Views can be attached.
 *
 * The container can contain two kinds of Views. Host Views, created by instantiating a
 * {\@link Component} via {\@link #createComponent}, and Embedded Views, created by instantiating an
 * {\@link TemplateRef Embedded Template} via {\@link #createEmbeddedView}.
 *
 * The location of the View Container within the containing View is specified by the Anchor
 * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
 * have a single View Container.
 *
 * Root elements of Views attached to this container become siblings of the Anchor Element in
 * the Rendered View.
 *
 * To access a `ViewContainerRef` of an Element, you can either place a {\@link Directive} injected
 * with `ViewContainerRef` on the Element, or you obtain it via a {\@link ViewChild} query.
 * \@stable
 * @abstract
 */
var ViewContainerRef = (function () {
    function ViewContainerRef() {
    }
    /**
     * Anchor element that specifies the location of this container in the containing View.
     * <!-- TODO: rename to anchorElement -->
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.element = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.injector = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.parentInjector = function () { };
    /**
     * Destroys all Views in this container.
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.clear = function () { };
    /**
     * Returns the {\@link ViewRef} for the View located in this container at the specified index.
     * @abstract
     * @param {?} index
     * @return {?}
     */
    ViewContainerRef.prototype.get = function (index) { };
    /**
     * Returns the number of Views currently attached to this container.
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.length = function () { };
    /**
     * Instantiates an Embedded View based on the {\@link TemplateRef `templateRef`} and inserts it
     * into this container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the {\@link ViewRef} for the newly created View.
     * @abstract
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef.prototype.createEmbeddedView = function (templateRef, context, index) { };
    /**
     * Instantiates a single {\@link Component} and inserts its Host View into this container at the
     * specified `index`.
     *
     * The component is instantiated using its {\@link ComponentFactory} which can be
     * obtained via {\@link ComponentFactoryResolver#resolveComponentFactory}.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * You can optionally specify the {\@link Injector} that will be used as parent for the Component.
     *
     * Returns the {\@link ComponentRef} of the Host View created for the newly instantiated Component.
     * @abstract
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    ViewContainerRef.prototype.createComponent = function (componentFactory, index, injector, projectableNodes) { };
    /**
     * Inserts a View identified by a {\@link ViewRef} into the container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the inserted {\@link ViewRef}.
     * @abstract
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef.prototype.insert = function (viewRef, index) { };
    /**
     * Moves a View identified by a {\@link ViewRef} into the container at the specified `index`.
     *
     * Returns the inserted {\@link ViewRef}.
     * @abstract
     * @param {?} viewRef
     * @param {?} currentIndex
     * @return {?}
     */
    ViewContainerRef.prototype.move = function (viewRef, currentIndex) { };
    /**
     * Returns the index of the View, specified via {\@link ViewRef}, within the current container or
     * `-1` if this container doesn't contain the View.
     * @abstract
     * @param {?} viewRef
     * @return {?}
     */
    ViewContainerRef.prototype.indexOf = function (viewRef) { };
    /**
     * Destroys a View attached to this container at the specified `index`.
     *
     * If `index` is not specified, the last View in the container will be removed.
     * @abstract
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef.prototype.remove = function (index) { };
    /**
     * Use along with {\@link #insert} to move a View within the current container.
     *
     * If the `index` param is omitted, the last {\@link ViewRef} is detached.
     * @abstract
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef.prototype.detach = function (index) { };
    return ViewContainerRef;
}());
var ViewContainerRef_ = (function () {
    /**
     * @param {?} _element
     */
    function ViewContainerRef_(_element) {
        this._element = _element;
        /** @internal */
        this._createComponentInContainerScope = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* wtfCreateScope */])('ViewContainerRef#createComponent()');
        /** @internal */
        this._insertScope = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* wtfCreateScope */])('ViewContainerRef#insert()');
        /** @internal */
        this._removeScope = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* wtfCreateScope */])('ViewContainerRef#remove()');
        /** @internal */
        this._detachScope = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* wtfCreateScope */])('ViewContainerRef#detach()');
    }
    /**
     * @param {?} index
     * @return {?}
     */
    ViewContainerRef_.prototype.get = function (index) { return this._element.nestedViews[index].ref; };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ views = this._element.nestedViews;
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(views) ? views.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "element", {
        /**
         * @return {?}
         */
        get: function () { return this._element.elementRef; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return this._element.injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
        /**
         * @return {?}
         */
        get: function () { return this._element.parentInjector; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, context, index) {
        if (context === void 0) { context = null; }
        if (index === void 0) { index = -1; }
        var /** @type {?} */ viewRef = templateRef.createEmbeddedView(context);
        this.insert(viewRef, index);
        return viewRef;
    };
    /**
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    ViewContainerRef_.prototype.createComponent = function (componentFactory, index, injector, projectableNodes) {
        if (index === void 0) { index = -1; }
        if (injector === void 0) { injector = null; }
        if (projectableNodes === void 0) { projectableNodes = null; }
        var /** @type {?} */ s = this._createComponentInContainerScope();
        var /** @type {?} */ contextInjector = injector || this._element.parentInjector;
        var /** @type {?} */ componentRef = componentFactory.create(contextInjector, projectableNodes);
        this.insert(componentRef.hostView, index);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["b" /* wtfLeave */])(s, componentRef);
    };
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.insert = function (viewRef, index) {
        if (index === void 0) { index = -1; }
        var /** @type {?} */ s = this._insertScope();
        if (index == -1)
            index = this.length;
        var /** @type {?} */ viewRef_ = (viewRef);
        this._element.attachView(viewRef_.internalView, index);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["b" /* wtfLeave */])(s, viewRef_);
    };
    /**
     * @param {?} viewRef
     * @param {?} currentIndex
     * @return {?}
     */
    ViewContainerRef_.prototype.move = function (viewRef, currentIndex) {
        var /** @type {?} */ s = this._insertScope();
        if (currentIndex == -1)
            return;
        var /** @type {?} */ viewRef_ = (viewRef);
        this._element.moveView(viewRef_.internalView, currentIndex);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["b" /* wtfLeave */])(s, viewRef_);
    };
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ViewContainerRef_.prototype.indexOf = function (viewRef) {
        return this.length ? this._element.nestedViews.indexOf(((viewRef)).internalView) :
            -1;
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.remove = function (index) {
        if (index === void 0) { index = -1; }
        var /** @type {?} */ s = this._removeScope();
        if (index == -1)
            index = this.length - 1;
        var /** @type {?} */ view = this._element.detachView(index);
        view.destroy();
        // view is intentionally not returned to the client.
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["b" /* wtfLeave */])(s);
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.detach = function (index) {
        if (index === void 0) { index = -1; }
        var /** @type {?} */ s = this._detachScope();
        if (index == -1)
            index = this.length - 1;
        var /** @type {?} */ view = this._element.detachView(index);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__profile_profile__["b" /* wtfLeave */])(s, view.ref);
    };
    /**
     * @return {?}
     */
    ViewContainerRef_.prototype.clear = function () {
        for (var /** @type {?} */ i = this.length - 1; i >= 0; i--) {
            this.remove(i);
        }
    };
    return ViewContainerRef_;
}());
function ViewContainerRef__tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    ViewContainerRef_.prototype._createComponentInContainerScope;
    /**
     * \@internal
     * @type {?}
     */
    ViewContainerRef_.prototype._insertScope;
    /**
     * \@internal
     * @type {?}
     */
    ViewContainerRef_.prototype._removeScope;
    /**
     * \@internal
     * @type {?}
     */
    ViewContainerRef_.prototype._detachScope;
    /** @type {?} */
    ViewContainerRef_.prototype._element;
}
//# sourceMappingURL=view_container_ref.js.map

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detector_ref__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__change_detection_constants__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ViewRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EmbeddedViewRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewRef_; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * \@stable
 * @abstract
 */
var ViewRef = (function (_super) {
    __extends(ViewRef, _super);
    function ViewRef() {
        _super.apply(this, arguments);
    }
    /**
     * Destroys the view and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    ViewRef.prototype.destroy = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ViewRef.prototype.destroyed = function () { };
    /**
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    ViewRef.prototype.onDestroy = function (callback) { };
    return ViewRef;
}(__WEBPACK_IMPORTED_MODULE_0__change_detection_change_detector_ref__["a" /* ChangeDetectorRef */]));
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {\@link ViewContainerRef}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two {\@link TemplateRef}s:
 *
 * Outer {\@link TemplateRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ngFor let-item [ngForOf]="items"></template>
 * </ul>
 * ```
 *
 * Inner {\@link TemplateRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {\@link TemplateRef}s.
 *
 * The outer/inner {\@link TemplateRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <template view-container-ref></template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * \@experimental
 * @abstract
 */
var EmbeddedViewRef = (function (_super) {
    __extends(EmbeddedViewRef, _super);
    function EmbeddedViewRef() {
        _super.apply(this, arguments);
    }
    /**
     * @abstract
     * @return {?}
     */
    EmbeddedViewRef.prototype.context = function () { };
    /**
     * @abstract
     * @return {?}
     */
    EmbeddedViewRef.prototype.rootNodes = function () { };
    return EmbeddedViewRef;
}(ViewRef));
var ViewRef_ = (function () {
    /**
     * @param {?} _view
     * @param {?} animationQueue
     */
    function ViewRef_(_view, animationQueue) {
        this._view = _view;
        this.animationQueue = animationQueue;
        this._view = _view;
        this._originalMode = this._view.cdMode;
    }
    Object.defineProperty(ViewRef_.prototype, "internalView", {
        /**
         * @return {?}
         */
        get: function () { return this._view; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "rootNodes", {
        /**
         * @return {?}
         */
        get: function () { return this._view.flatRootNodes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "context", {
        /**
         * @return {?}
         */
        get: function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "destroyed", {
        /**
         * @return {?}
         */
        get: function () { return this._view.destroyed; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewRef_.prototype.markForCheck = function () { this._view.markPathToRootAsCheckOnce(); };
    /**
     * @return {?}
     */
    ViewRef_.prototype.detach = function () { this._view.cdMode = __WEBPACK_IMPORTED_MODULE_1__change_detection_constants__["b" /* ChangeDetectorStatus */].Detached; };
    /**
     * @return {?}
     */
    ViewRef_.prototype.detectChanges = function () {
        this._view.detectChanges(false);
        this.animationQueue.flush();
    };
    /**
     * @return {?}
     */
    ViewRef_.prototype.checkNoChanges = function () { this._view.detectChanges(true); };
    /**
     * @return {?}
     */
    ViewRef_.prototype.reattach = function () {
        this._view.cdMode = this._originalMode;
        this.markForCheck();
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    ViewRef_.prototype.onDestroy = function (callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(callback);
    };
    /**
     * @return {?}
     */
    ViewRef_.prototype.destroy = function () { this._view.detachAndDestroy(); };
    return ViewRef_;
}());
function ViewRef__tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    ViewRef_.prototype._originalMode;
    /** @type {?} */
    ViewRef_.prototype._view;
    /** @type {?} */
    ViewRef_.prototype.animationQueue;
}
//# sourceMappingURL=view_ref.js.map

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__metadata_di__ = __webpack_require__(217);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata_di__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata_di__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata_di__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata_di__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata_di__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata_di__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata_di__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__metadata_directives__ = __webpack_require__(218);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__metadata_directives__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_1__metadata_directives__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_1__metadata_directives__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_1__metadata_directives__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_1__metadata_directives__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_1__metadata_directives__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_1__metadata_directives__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__ = __webpack_require__(146);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_2__metadata_lifecycle_hooks__["j"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__metadata_ng_module__ = __webpack_require__(219);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_3__metadata_ng_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_3__metadata_ng_module__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_3__metadata_ng_module__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__metadata_view__ = __webpack_require__(147);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_4__metadata_view__["b"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





//# sourceMappingURL=metadata.js.map

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LifecycleHooks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LIFECYCLE_HOOKS_VALUES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return OnChanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return OnInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return DoCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return OnDestroy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AfterContentInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AfterContentChecked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return AfterViewInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return AfterViewChecked; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var LifecycleHooks = {};
LifecycleHooks.OnInit = 0;
LifecycleHooks.OnDestroy = 1;
LifecycleHooks.DoCheck = 2;
LifecycleHooks.OnChanges = 3;
LifecycleHooks.AfterContentInit = 4;
LifecycleHooks.AfterContentChecked = 5;
LifecycleHooks.AfterViewInit = 6;
LifecycleHooks.AfterViewChecked = 7;
LifecycleHooks[LifecycleHooks.OnInit] = "OnInit";
LifecycleHooks[LifecycleHooks.OnDestroy] = "OnDestroy";
LifecycleHooks[LifecycleHooks.DoCheck] = "DoCheck";
LifecycleHooks[LifecycleHooks.OnChanges] = "OnChanges";
LifecycleHooks[LifecycleHooks.AfterContentInit] = "AfterContentInit";
LifecycleHooks[LifecycleHooks.AfterContentChecked] = "AfterContentChecked";
LifecycleHooks[LifecycleHooks.AfterViewInit] = "AfterViewInit";
LifecycleHooks[LifecycleHooks.AfterViewChecked] = "AfterViewChecked";
var /** @type {?} */ LIFECYCLE_HOOKS_VALUES = [
    LifecycleHooks.OnInit, LifecycleHooks.OnDestroy, LifecycleHooks.DoCheck, LifecycleHooks.OnChanges,
    LifecycleHooks.AfterContentInit, LifecycleHooks.AfterContentChecked, LifecycleHooks.AfterViewInit,
    LifecycleHooks.AfterViewChecked
];
/**
 * \@whatItDoes Lifecycle hook that is called when any data-bound property of a directive changes.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * \@description
 * `ngOnChanges` is called right after the data-bound properties have been checked and before view
 * and content children are checked if at least one of them has changed.
 * The `changes` parameter contains the changed properties.
 *
 * See {\@linkDocs guide/lifecycle-hooks#onchanges "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
var OnChanges = (function () {
    function OnChanges() {
    }
    /**
     * @abstract
     * @param {?} changes
     * @return {?}
     */
    OnChanges.prototype.ngOnChanges = function (changes) { };
    return OnChanges;
}());
/**
 * \@whatItDoes Lifecycle hook that is called after data-bound properties of a directive are
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 * \@description
 * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
 * first time, and before any of its children have been checked. It is invoked only once when the
 * directive is instantiated.
 *
 * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
var OnInit = (function () {
    function OnInit() {
    }
    /**
     * @abstract
     * @return {?}
     */
    OnInit.prototype.ngOnInit = function () { };
    return OnInit;
}());
/**
 * \@whatItDoes Lifecycle hook that is called when Angular dirty checks a directive.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * \@description
 * `ngDoCheck` gets called to check the changes in the directives in addition to the default
 * algorithm. The default change detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs.
 *
 * Note that a directive typically should not use both `DoCheck` and {\@link OnChanges} to respond to
 * changes on the same input, as `ngOnChanges` will continue to be called when the default change
 * detector detects changes.
 *
 * See {\@link KeyValueDiffers} and {\@link IterableDiffers} for implementing custom dirty checking
 * for collections.
 *
 * See {\@linkDocs guide/lifecycle-hooks#docheck "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
var DoCheck = (function () {
    function DoCheck() {
    }
    /**
     * @abstract
     * @return {?}
     */
    DoCheck.prototype.ngDoCheck = function () { };
    return DoCheck;
}());
/**
 * \@whatItDoes Lifecycle hook that is called when a directive, pipe or service is destroyed.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * \@description
 * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
 * instance is destroyed.
 *
 * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
var OnDestroy = (function () {
    function OnDestroy() {
    }
    /**
     * @abstract
     * @return {?}
     */
    OnDestroy.prototype.ngOnDestroy = function () { };
    return OnDestroy;
}());
/**
 *
 * \@whatItDoes Lifecycle hook that is called after a directive's content has been fully
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
var AfterContentInit = (function () {
    function AfterContentInit() {
    }
    /**
     * @abstract
     * @return {?}
     */
    AfterContentInit.prototype.ngAfterContentInit = function () { };
    return AfterContentInit;
}());
/**
 * \@whatItDoes Lifecycle hook that is called after every check of a directive's content.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
var AfterContentChecked = (function () {
    function AfterContentChecked() {
    }
    /**
     * @abstract
     * @return {?}
     */
    AfterContentChecked.prototype.ngAfterContentChecked = function () { };
    return AfterContentChecked;
}());
/**
 * \@whatItDoes Lifecycle hook that is called after a component's view has been fully
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
var AfterViewInit = (function () {
    function AfterViewInit() {
    }
    /**
     * @abstract
     * @return {?}
     */
    AfterViewInit.prototype.ngAfterViewInit = function () { };
    return AfterViewInit;
}());
/**
 * \@whatItDoes Lifecycle hook that is called after every check of a component's view.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
var AfterViewChecked = (function () {
    function AfterViewChecked() {
    }
    /**
     * @abstract
     * @return {?}
     */
    AfterViewChecked.prototype.ngAfterViewChecked = function () { };
    return AfterViewChecked;
}());
//# sourceMappingURL=lifecycle_hooks.js.map

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ViewEncapsulation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewMetadata; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ViewEncapsulation = {};
ViewEncapsulation.Emulated = 0;
ViewEncapsulation.Native = 1;
ViewEncapsulation.None = 2;
ViewEncapsulation[ViewEncapsulation.Emulated] = "Emulated";
ViewEncapsulation[ViewEncapsulation.Native] = "Native";
ViewEncapsulation[ViewEncapsulation.None] = "None";
/**
 * Metadata properties available for configuring Views.
 *
 * For details on the `\@Component` annotation, see {\@link Component}.
 *
 * ### Example
 *
 * ```
 * \@Component({
 *   selector: 'greet',
 *   template: 'Hello {{name}}!',
 * })
 * class Greet {
 *   name: string;
 *
 *   constructor() {
 *     this.name = 'World';
 *   }
 * }
 * ```
 *
 * @deprecated Use Component instead.
 *
 * {\@link Component}
 */
var ViewMetadata = (function () {
    /**
     * @param {?=} __0
     */
    function ViewMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, templateUrl = _b.templateUrl, template = _b.template, encapsulation = _b.encapsulation, styles = _b.styles, styleUrls = _b.styleUrls, animations = _b.animations, interpolation = _b.interpolation;
        this.templateUrl = templateUrl;
        this.template = template;
        this.styleUrls = styleUrls;
        this.styles = styles;
        this.encapsulation = encapsulation;
        this.animations = animations;
        this.interpolation = interpolation;
    }
    return ViewMetadata;
}());
function ViewMetadata_tsickle_Closure_declarations() {
    /**
     * {\@link Component.templateUrl}
     * @type {?}
     */
    ViewMetadata.prototype.templateUrl;
    /**
     * {\@link Component.template}
     * @type {?}
     */
    ViewMetadata.prototype.template;
    /**
     * {\@link Component.stylesUrl}
     * @type {?}
     */
    ViewMetadata.prototype.styleUrls;
    /**
     * {\@link Component.styles}
     * @type {?}
     */
    ViewMetadata.prototype.styles;
    /**
     * {\@link Component.encapsulation}
     * @type {?}
     */
    ViewMetadata.prototype.encapsulation;
    /**
     * {\@link Component.animation}
     * @type {?}
     */
    ViewMetadata.prototype.animations;
    /**
     * {\@link Component.interpolation}
     * @type {?}
     */
    ViewMetadata.prototype.interpolation;
}
//# sourceMappingURL=view.js.map

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type__ = __webpack_require__(89);
/* unused harmony export DELEGATE_CTOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReflectionCapabilities; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * Attention: This regex has to hold even if the code is minified!
 */
var /** @type {?} */ DELEGATE_CTOR = /^function\s+\S+\(\)\s*{\s*("use strict";)?\s*(return\s+)?\S+\.apply\(this,\s*arguments\)/;
var ReflectionCapabilities = (function () {
    /**
     * @param {?=} reflect
     */
    function ReflectionCapabilities(reflect) {
        this._reflect = reflect || __WEBPACK_IMPORTED_MODULE_0__facade_lang__["h" /* global */].Reflect;
    }
    /**
     * @return {?}
     */
    ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
    /**
     * @param {?} t
     * @return {?}
     */
    ReflectionCapabilities.prototype.factory = function (t) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return new (t.bind.apply(t, [void 0].concat(args)))();
    }; };
    /**
     * \@internal
     * @param {?} paramTypes
     * @param {?} paramAnnotations
     * @return {?}
     */
    ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes, paramAnnotations) {
        var /** @type {?} */ result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (var /** @type {?} */ i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (paramAnnotations && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    };
    /**
     * @param {?} type
     * @param {?} parentCtor
     * @return {?}
     */
    ReflectionCapabilities.prototype._ownParameters = function (type, parentCtor) {
        // If we have no decorators, we only have function.length as metadata.
        // In that case, to detect whether a child class declared an own constructor or not,
        // we need to look inside of that constructor to check whether it is
        // just calling the parent.
        // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
        // that sets 'design:paramtypes' to []
        // if a class inherits from another class but has no ctor declared itself.
        if (DELEGATE_CTOR.exec(type.toString())) {
            return null;
        }
        // Prefer the direct API.
        if (((type)).parameters && ((type)).parameters !== parentCtor.parameters) {
            return ((type)).parameters;
        }
        // API of tsickle for lowering decorators to properties on the class.
        var /** @type {?} */ tsickleCtorParams = ((type)).ctorParameters;
        if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
            // Newer tsickle uses a function closure
            // Retain the non-function case for compatibility with older tsickle
            var /** @type {?} */ ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
            var /** @type {?} */ paramTypes = ctorParameters.map(function (ctorParam) { return ctorParam && ctorParam.type; });
            var /** @type {?} */ paramAnnotations = ctorParameters.map(function (ctorParam) {
                return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
            });
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
        // API for metadata created by invoking the decorators.
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(this._reflect) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(this._reflect.getOwnMetadata)) {
            var /** @type {?} */ paramAnnotations = this._reflect.getOwnMetadata('parameters', type);
            var /** @type {?} */ paramTypes = this._reflect.getOwnMetadata('design:paramtypes', type);
            if (paramTypes || paramAnnotations) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }
        // If a class has no decorators, at least create metadata
        // based on function.length.
        // Note: We know that this is a real constructor as we checked
        // the content of the constructor above.
        return new Array(((type.length))).fill(undefined);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    ReflectionCapabilities.prototype.parameters = function (type) {
        // Note: only report metadata if we have at least one class decorator
        // to stay in sync with the static reflector.
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__type__["b" /* isType */])(type)) {
            return [];
        }
        var /** @type {?} */ parentCtor = getParentCtor(type);
        var /** @type {?} */ parameters = this._ownParameters(type, parentCtor);
        if (!parameters && parentCtor !== Object) {
            parameters = this.parameters(parentCtor);
        }
        return parameters || [];
    };
    /**
     * @param {?} typeOrFunc
     * @param {?} parentCtor
     * @return {?}
     */
    ReflectionCapabilities.prototype._ownAnnotations = function (typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (((typeOrFunc)).annotations && ((typeOrFunc)).annotations !== parentCtor.annotations) {
            var /** @type {?} */ annotations = ((typeOrFunc)).annotations;
            if (typeof annotations === 'function' && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (((typeOrFunc)).decorators && ((typeOrFunc)).decorators !== parentCtor.decorators) {
            return convertTsickleDecoratorIntoMetadata(((typeOrFunc)).decorators);
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('annotations', typeOrFunc);
        }
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__type__["b" /* isType */])(typeOrFunc)) {
            return [];
        }
        var /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
        var /** @type {?} */ ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        var /** @type {?} */ parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations);
    };
    /**
     * @param {?} typeOrFunc
     * @param {?} parentCtor
     * @return {?}
     */
    ReflectionCapabilities.prototype._ownPropMetadata = function (typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (((typeOrFunc)).propMetadata &&
            ((typeOrFunc)).propMetadata !== parentCtor.propMetadata) {
            var /** @type {?} */ propMetadata = ((typeOrFunc)).propMetadata;
            if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (((typeOrFunc)).propDecorators &&
            ((typeOrFunc)).propDecorators !== parentCtor.propDecorators) {
            var /** @type {?} */ propDecorators_1 = ((typeOrFunc)).propDecorators;
            var /** @type {?} */ propMetadata_1 = ({});
            Object.keys(propDecorators_1).forEach(function (prop) {
                propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
            });
            return propMetadata_1;
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('propMetadata', typeOrFunc);
        }
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__type__["b" /* isType */])(typeOrFunc)) {
            return {};
        }
        var /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
        var /** @type {?} */ propMetadata = {};
        if (parentCtor !== Object) {
            var /** @type {?} */ parentPropMetadata_1 = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata_1).forEach(function (propName) {
                propMetadata[propName] = parentPropMetadata_1[propName];
            });
        }
        var /** @type {?} */ ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach(function (propName) {
                var /** @type {?} */ decorators = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push.apply(decorators, propMetadata[propName]);
                }
                decorators.push.apply(decorators, ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    };
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    ReflectionCapabilities.prototype.hasLifecycleHook = function (type, lcProperty) {
        return type instanceof __WEBPACK_IMPORTED_MODULE_1__type__["a" /* Type */] && lcProperty in type.prototype;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ReflectionCapabilities.prototype.getter = function (name) { return ((new Function('o', 'return o.' + name + ';'))); };
    /**
     * @param {?} name
     * @return {?}
     */
    ReflectionCapabilities.prototype.setter = function (name) {
        return ((new Function('o', 'v', 'return o.' + name + ' = v;')));
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ReflectionCapabilities.prototype.method = function (name) {
        var /** @type {?} */ functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
        return ((new Function('o', 'args', functionBody)));
    };
    /**
     * @param {?} type
     * @return {?}
     */
    ReflectionCapabilities.prototype.importUri = function (type) {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return "./" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["c" /* stringify */])(type);
    };
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} runtime
     * @return {?}
     */
    ReflectionCapabilities.prototype.resolveIdentifier = function (name, moduleUrl, runtime) { return runtime; };
    /**
     * @param {?} enumIdentifier
     * @param {?} name
     * @return {?}
     */
    ReflectionCapabilities.prototype.resolveEnum = function (enumIdentifier, name) { return enumIdentifier[name]; };
    return ReflectionCapabilities;
}());
function ReflectionCapabilities_tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectionCapabilities.prototype._reflect;
}
/**
 * @param {?} decoratorInvocations
 * @return {?}
 */
function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(function (decoratorInvocation) {
        var /** @type {?} */ decoratorType = decoratorInvocation.type;
        var /** @type {?} */ annotationCls = decoratorType.annotationCls;
        var /** @type {?} */ annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new (annotationCls.bind.apply(annotationCls, [void 0].concat(annotationArgs)))();
    });
}
/**
 * @param {?} ctor
 * @return {?}
 */
function getParentCtor(ctor) {
    var /** @type {?} */ parentProto = Object.getPrototypeOf(ctor.prototype);
    var /** @type {?} */ parentCtor = parentProto ? parentProto.constructor : null;
    // Note: We always use `Object` as the null value
    // to simplify checking later on.
    return parentCtor || Object;
}
//# sourceMappingURL=reflection_capabilities.js.map

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reflector_reader__ = __webpack_require__(86);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Reflector; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
var Reflector = (function (_super) {
    __extends(Reflector, _super);
    /**
     * @param {?} reflectionCapabilities
     */
    function Reflector(reflectionCapabilities) {
        _super.call(this);
        this.reflectionCapabilities = reflectionCapabilities;
    }
    /**
     * @param {?} caps
     * @return {?}
     */
    Reflector.prototype.updateCapabilities = function (caps) { this.reflectionCapabilities = caps; };
    /**
     * @param {?} type
     * @return {?}
     */
    Reflector.prototype.factory = function (type) { return this.reflectionCapabilities.factory(type); };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    Reflector.prototype.parameters = function (typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    Reflector.prototype.annotations = function (typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    Reflector.prototype.propMetadata = function (typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    };
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    Reflector.prototype.hasLifecycleHook = function (type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    Reflector.prototype.getter = function (name) { return this.reflectionCapabilities.getter(name); };
    /**
     * @param {?} name
     * @return {?}
     */
    Reflector.prototype.setter = function (name) { return this.reflectionCapabilities.setter(name); };
    /**
     * @param {?} name
     * @return {?}
     */
    Reflector.prototype.method = function (name) { return this.reflectionCapabilities.method(name); };
    /**
     * @param {?} type
     * @return {?}
     */
    Reflector.prototype.importUri = function (type) { return this.reflectionCapabilities.importUri(type); };
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} runtime
     * @return {?}
     */
    Reflector.prototype.resolveIdentifier = function (name, moduleUrl, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, runtime);
    };
    /**
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    Reflector.prototype.resolveEnum = function (identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    };
    return Reflector;
}(__WEBPACK_IMPORTED_MODULE_0__reflector_reader__["a" /* ReflectorReader */]));
function Reflector_tsickle_Closure_declarations() {
    /** @type {?} */
    Reflector.prototype.reflectionCapabilities;
}
//# sourceMappingURL=reflector.js.map

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SecurityContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sanitizer; });
var SecurityContext = {};
SecurityContext.NONE = 0;
SecurityContext.HTML = 1;
SecurityContext.STYLE = 2;
SecurityContext.SCRIPT = 3;
SecurityContext.URL = 4;
SecurityContext.RESOURCE_URL = 5;
SecurityContext[SecurityContext.NONE] = "NONE";
SecurityContext[SecurityContext.HTML] = "HTML";
SecurityContext[SecurityContext.STYLE] = "STYLE";
SecurityContext[SecurityContext.SCRIPT] = "SCRIPT";
SecurityContext[SecurityContext.URL] = "URL";
SecurityContext[SecurityContext.RESOURCE_URL] = "RESOURCE_URL";
/**
 * Sanitizer is used by the views to sanitize potentially dangerous values.
 *
 * \@stable
 * @abstract
 */
var Sanitizer = (function () {
    function Sanitizer() {
    }
    /**
     * @abstract
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    Sanitizer.prototype.sanitize = function (context, value) { };
    return Sanitizer;
}());
//# sourceMappingURL=security.js.map

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VERSION; });
/**
 * \@whatItDoes Represents the version of Angular
 *
 * \@stable
 */
var Version = (function () {
    /**
     * @param {?} full
     */
    function Version(full) {
        this.full = full;
    }
    Object.defineProperty(Version.prototype, "major", {
        /**
         * @return {?}
         */
        get: function () { return this.full.split('.')[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "minor", {
        /**
         * @return {?}
         */
        get: function () { return this.full.split('.')[1]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "patch", {
        /**
         * @return {?}
         */
        get: function () { return this.full.split('.').slice(2).join('.'); },
        enumerable: true,
        configurable: true
    });
    return Version;
}());
function Version_tsickle_Closure_declarations() {
    /** @type {?} */
    Version.prototype.full;
}
/**
 * @stable
 */
var /** @type {?} */ VERSION = new Version('2.4.10');
//# sourceMappingURL=version.js.map

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(113);
var Subscriber_1 = __webpack_require__(114);
var Subscription_1 = __webpack_require__(94);
var ObjectUnsubscribedError_1 = __webpack_require__(255);
var SubjectSubscription_1 = __webpack_require__(254);
var rxSubscriber_1 = __webpack_require__(95);
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(96);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(13)
  , toIndex  = __webpack_require__(54)
  , toLength = __webpack_require__(11);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(9)
  , createDesc      = __webpack_require__(45);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6)
  , document = __webpack_require__(4).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 165 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(7)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4).document && document.documentElement;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(6)
  , setPrototypeOf = __webpack_require__(176).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(70)
  , ITERATOR   = __webpack_require__(7)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(23);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(49)
  , descriptor     = __webpack_require__(45)
  , setToStringTag = __webpack_require__(71)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(17)(IteratorPrototype, __webpack_require__(7)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(48)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(18)
  , hide           = __webpack_require__(17)
  , has            = __webpack_require__(14)
  , Iterators      = __webpack_require__(70)
  , $iterCreate    = __webpack_require__(171)
  , setToStringTag = __webpack_require__(71)
  , getPrototypeOf = __webpack_require__(22)
  , ITERATOR       = __webpack_require__(7)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 173 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 174 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , macrotask = __webpack_require__(183).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(23)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(6)
  , anObject = __webpack_require__(3);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(36)(Function.call, __webpack_require__(21).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(111)('keys')
  , uid    = __webpack_require__(55);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(3)
  , aFunction = __webpack_require__(16)
  , SPECIES   = __webpack_require__(7)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46)
  , defined   = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(107)
  , defined  = __webpack_require__(24);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(46)
  , defined   = __webpack_require__(24);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(36)
  , invoke             = __webpack_require__(106)
  , html               = __webpack_require__(167)
  , cel                = __webpack_require__(164)
  , global             = __webpack_require__(4)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(23)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(4)
  , DESCRIPTORS    = __webpack_require__(8)
  , LIBRARY        = __webpack_require__(48)
  , $typed         = __webpack_require__(112)
  , hide           = __webpack_require__(17)
  , redefineAll    = __webpack_require__(52)
  , fails          = __webpack_require__(5)
  , anInstance     = __webpack_require__(47)
  , toInteger      = __webpack_require__(46)
  , toLength       = __webpack_require__(11)
  , gOPN           = __webpack_require__(50).f
  , dP             = __webpack_require__(9).f
  , arrayFill      = __webpack_require__(162)
  , setToStringTag = __webpack_require__(71)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(4)
  , core           = __webpack_require__(35)
  , LIBRARY        = __webpack_require__(48)
  , wksExt         = __webpack_require__(248)
  , defineProperty = __webpack_require__(9).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(91)
  , ITERATOR  = __webpack_require__(7)('iterator')
  , Iterators = __webpack_require__(70);
module.exports = __webpack_require__(35).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(68)
  , step             = __webpack_require__(236)
  , Iterators        = __webpack_require__(70)
  , toIObject        = __webpack_require__(20);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(172)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HelloModule = exports.HelloComponent = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _dec3, _class4;

var _core = __webpack_require__(2);

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/**
 * The HelloComponent component, used to greet any subject you like!
 */
var HelloComponent = exports.HelloComponent = (_dec = (0, _core.Component)({
	selector: 'hello',
	styles: ['\n\t\tp {\n\t\t\tfont-style: italic;\n\t\t}\n\t'],
	template: '<p>Hello {{ subject }}!</p>'
}), _dec2 = (0, _core.Input)(), _dec(_class = (_class2 = function HelloComponent() {
	_classCallCheck(this, HelloComponent);

	_initDefineProp(this, 'subject', _descriptor, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'subject', [_dec2], {
	enumerable: true,
	initializer: function initializer() {
		return this.subject;
	}
})), _class2)) || _class);

/**
 * The HelloModule module, which offers the _excellent_ HelloComponent component!
 */
var HelloModule = exports.HelloModule = (_dec3 = (0, _core.NgModule)({
	declarations: [HelloComponent],
	exports: [HelloComponent]
}), _dec3(_class4 = function HelloModule() {
	_classCallCheck(this, HelloModule);
}) || _class4);

/***/ }),
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_collection__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_constants__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__metadata__ = __webpack_require__(128);
/* harmony export (immutable) */ __webpack_exports__["a"] = prepareFinalAnimationStyles;
/* harmony export (immutable) */ __webpack_exports__["b"] = balanceAnimationKeyframes;
/* harmony export (immutable) */ __webpack_exports__["d"] = clearStyles;
/* harmony export (immutable) */ __webpack_exports__["f"] = collectAndResolveStyles;
/* harmony export (immutable) */ __webpack_exports__["e"] = renderStyles;
/* harmony export (immutable) */ __webpack_exports__["c"] = flattenStyles;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * @param {?} previousStyles
 * @param {?} newStyles
 * @param {?=} nullValue
 * @return {?}
 */
function prepareFinalAnimationStyles(previousStyles, newStyles, nullValue) {
    if (nullValue === void 0) { nullValue = null; }
    var /** @type {?} */ finalStyles = {};
    Object.keys(newStyles).forEach(function (prop) {
        var /** @type {?} */ value = newStyles[prop];
        finalStyles[prop] = value == __WEBPACK_IMPORTED_MODULE_3__metadata__["a" /* AUTO_STYLE */] ? nullValue : value.toString();
    });
    Object.keys(previousStyles).forEach(function (prop) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["b" /* isPresent */])(finalStyles[prop])) {
            finalStyles[prop] = nullValue;
        }
    });
    return finalStyles;
}
/**
 * @param {?} collectedStyles
 * @param {?} finalStateStyles
 * @param {?} keyframes
 * @return {?}
 */
function balanceAnimationKeyframes(collectedStyles, finalStateStyles, keyframes) {
    var /** @type {?} */ limit = keyframes.length - 1;
    var /** @type {?} */ firstKeyframe = keyframes[0];
    // phase 1: copy all the styles from the first keyframe into the lookup map
    var /** @type {?} */ flatenedFirstKeyframeStyles = flattenStyles(firstKeyframe.styles.styles);
    var /** @type {?} */ extraFirstKeyframeStyles = {};
    var /** @type {?} */ hasExtraFirstStyles = false;
    Object.keys(collectedStyles).forEach(function (prop) {
        var /** @type {?} */ value = (collectedStyles[prop]);
        // if the style is already defined in the first keyframe then
        // we do not replace it.
        if (!flatenedFirstKeyframeStyles[prop]) {
            flatenedFirstKeyframeStyles[prop] = value;
            extraFirstKeyframeStyles[prop] = value;
            hasExtraFirstStyles = true;
        }
    });
    var /** @type {?} */ keyframeCollectedStyles = __WEBPACK_IMPORTED_MODULE_0__facade_collection__["a" /* StringMapWrapper */].merge({}, flatenedFirstKeyframeStyles);
    // phase 2: normalize the final keyframe
    var /** @type {?} */ finalKeyframe = keyframes[limit];
    finalKeyframe.styles.styles.unshift(finalStateStyles);
    var /** @type {?} */ flatenedFinalKeyframeStyles = flattenStyles(finalKeyframe.styles.styles);
    var /** @type {?} */ extraFinalKeyframeStyles = {};
    var /** @type {?} */ hasExtraFinalStyles = false;
    Object.keys(keyframeCollectedStyles).forEach(function (prop) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["b" /* isPresent */])(flatenedFinalKeyframeStyles[prop])) {
            extraFinalKeyframeStyles[prop] = __WEBPACK_IMPORTED_MODULE_3__metadata__["a" /* AUTO_STYLE */];
            hasExtraFinalStyles = true;
        }
    });
    if (hasExtraFinalStyles) {
        finalKeyframe.styles.styles.push(extraFinalKeyframeStyles);
    }
    Object.keys(flatenedFinalKeyframeStyles).forEach(function (prop) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["b" /* isPresent */])(flatenedFirstKeyframeStyles[prop])) {
            extraFirstKeyframeStyles[prop] = __WEBPACK_IMPORTED_MODULE_3__metadata__["a" /* AUTO_STYLE */];
            hasExtraFirstStyles = true;
        }
    });
    if (hasExtraFirstStyles) {
        firstKeyframe.styles.styles.push(extraFirstKeyframeStyles);
    }
    collectAndResolveStyles(collectedStyles, [finalStateStyles]);
    return keyframes;
}
/**
 * @param {?} styles
 * @return {?}
 */
function clearStyles(styles) {
    var /** @type {?} */ finalStyles = {};
    Object.keys(styles).forEach(function (key) { finalStyles[key] = null; });
    return finalStyles;
}
/**
 * @param {?} collection
 * @param {?} styles
 * @return {?}
 */
function collectAndResolveStyles(collection, styles) {
    return styles.map(function (entry) {
        var /** @type {?} */ stylesObj = {};
        Object.keys(entry).forEach(function (prop) {
            var /** @type {?} */ value = entry[prop];
            if (value == __WEBPACK_IMPORTED_MODULE_2__animation_constants__["d" /* FILL_STYLE_FLAG */]) {
                value = collection[prop];
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["b" /* isPresent */])(value)) {
                    value = __WEBPACK_IMPORTED_MODULE_3__metadata__["a" /* AUTO_STYLE */];
                }
            }
            collection[prop] = value;
            stylesObj[prop] = value;
        });
        return stylesObj;
    });
}
/**
 * @param {?} element
 * @param {?} renderer
 * @param {?} styles
 * @return {?}
 */
function renderStyles(element, renderer, styles) {
    Object.keys(styles).forEach(function (prop) { renderer.setElementStyle(element, prop, styles[prop]); });
}
/**
 * @param {?} styles
 * @return {?}
 */
function flattenStyles(styles) {
    var /** @type {?} */ finalStyles = {};
    styles.forEach(function (entry) {
        Object.keys(entry).forEach(function (prop) { finalStyles[prop] = (entry[prop]); });
    });
    return finalStyles;
}
//# sourceMappingURL=animation_style_util.js.map

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation_transition_event__ = __webpack_require__(127);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationTransition; });

var AnimationTransition = (function () {
    /**
     * @param {?} _player
     * @param {?} _fromState
     * @param {?} _toState
     * @param {?} _totalTime
     */
    function AnimationTransition(_player, _fromState, _toState, _totalTime) {
        this._player = _player;
        this._fromState = _fromState;
        this._toState = _toState;
        this._totalTime = _totalTime;
    }
    /**
     * @param {?} phaseName
     * @return {?}
     */
    AnimationTransition.prototype._createEvent = function (phaseName) {
        return new __WEBPACK_IMPORTED_MODULE_0__animation_transition_event__["a" /* AnimationTransitionEvent */]({
            fromState: this._fromState,
            toState: this._toState,
            totalTime: this._totalTime,
            phaseName: phaseName
        });
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    AnimationTransition.prototype.onStart = function (callback) {
        var _this = this;
        var /** @type {?} */ fn = (Zone.current.wrap(function () { return callback(_this._createEvent('start')); }, 'player.onStart'));
        this._player.onStart(fn);
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    AnimationTransition.prototype.onDone = function (callback) {
        var _this = this;
        var /** @type {?} */ fn = (Zone.current.wrap(function () { return callback(_this._createEvent('done')); }, 'player.onDone'));
        this._player.onDone(fn);
    };
    return AnimationTransition;
}());
function AnimationTransition_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationTransition.prototype._player;
    /** @type {?} */
    AnimationTransition.prototype._fromState;
    /** @type {?} */
    AnimationTransition.prototype._toState;
    /** @type {?} */
    AnimationTransition.prototype._totalTime;
}
//# sourceMappingURL=animation_transition.js.map

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewAnimationMap; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var ViewAnimationMap = (function () {
    function ViewAnimationMap() {
        this._map = new Map();
        this._allPlayers = [];
    }
    /**
     * @param {?} element
     * @param {?} animationName
     * @return {?}
     */
    ViewAnimationMap.prototype.find = function (element, animationName) {
        var /** @type {?} */ playersByAnimation = this._map.get(element);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(playersByAnimation)) {
            return playersByAnimation[animationName];
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    ViewAnimationMap.prototype.findAllPlayersByElement = function (element) {
        var /** @type {?} */ el = this._map.get(element);
        return el ? Object.keys(el).map(function (k) { return el[k]; }) : [];
    };
    /**
     * @param {?} element
     * @param {?} animationName
     * @param {?} player
     * @return {?}
     */
    ViewAnimationMap.prototype.set = function (element, animationName, player) {
        var /** @type {?} */ playersByAnimation = this._map.get(element);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(playersByAnimation)) {
            playersByAnimation = {};
        }
        var /** @type {?} */ existingEntry = playersByAnimation[animationName];
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(existingEntry)) {
            this.remove(element, animationName);
        }
        playersByAnimation[animationName] = player;
        this._allPlayers.push(player);
        this._map.set(element, playersByAnimation);
    };
    /**
     * @return {?}
     */
    ViewAnimationMap.prototype.getAllPlayers = function () { return this._allPlayers; };
    /**
     * @param {?} element
     * @param {?} animationName
     * @param {?=} targetPlayer
     * @return {?}
     */
    ViewAnimationMap.prototype.remove = function (element, animationName, targetPlayer) {
        if (targetPlayer === void 0) { targetPlayer = null; }
        var /** @type {?} */ playersByAnimation = this._map.get(element);
        if (playersByAnimation) {
            var /** @type {?} */ player = playersByAnimation[animationName];
            if (!targetPlayer || player === targetPlayer) {
                delete playersByAnimation[animationName];
                var /** @type {?} */ index = this._allPlayers.indexOf(player);
                this._allPlayers.splice(index, 1);
                if (Object.keys(playersByAnimation).length === 0) {
                    this._map.delete(element);
                }
            }
        }
    };
    return ViewAnimationMap;
}());
function ViewAnimationMap_tsickle_Closure_declarations() {
    /** @type {?} */
    ViewAnimationMap.prototype._map;
    /** @type {?} */
    ViewAnimationMap.prototype._allPlayers;
}
//# sourceMappingURL=view_animation_map.js.map

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation_animation_queue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_init__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__application_ref__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__application_tokens__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__change_detection_change_detection__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__di_metadata__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__i18n_tokens__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__linker_compiler__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__linker_view_utils__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__metadata__ = __webpack_require__(145);
/* unused harmony export _iterableDiffersFactory */
/* unused harmony export _keyValueDiffersFactory */
/* unused harmony export _localeFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationModule; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */










/**
 * @return {?}
 */
function _iterableDiffersFactory() {
    return __WEBPACK_IMPORTED_MODULE_4__change_detection_change_detection__["c" /* defaultIterableDiffers */];
}
/**
 * @return {?}
 */
function _keyValueDiffersFactory() {
    return __WEBPACK_IMPORTED_MODULE_4__change_detection_change_detection__["d" /* defaultKeyValueDiffers */];
}
/**
 * @param {?=} locale
 * @return {?}
 */
function _localeFactory(locale) {
    return locale || 'en-US';
}
/**
 * This module includes the providers of \@angular/core that are needed
 * to bootstrap components via `ApplicationRef`.
 *
 * \@experimental
 */
var ApplicationModule = (function () {
    function ApplicationModule() {
    }
    ApplicationModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_9__metadata__["y" /* NgModule */], args: [{
                    providers: [
                        __WEBPACK_IMPORTED_MODULE_2__application_ref__["k" /* ApplicationRef_ */],
                        { provide: __WEBPACK_IMPORTED_MODULE_2__application_ref__["f" /* ApplicationRef */], useExisting: __WEBPACK_IMPORTED_MODULE_2__application_ref__["k" /* ApplicationRef_ */] },
                        __WEBPACK_IMPORTED_MODULE_1__application_init__["b" /* ApplicationInitStatus */],
                        __WEBPACK_IMPORTED_MODULE_7__linker_compiler__["b" /* Compiler */],
                        __WEBPACK_IMPORTED_MODULE_3__application_tokens__["e" /* APP_ID_RANDOM_PROVIDER */],
                        __WEBPACK_IMPORTED_MODULE_8__linker_view_utils__["ViewUtils"],
                        __WEBPACK_IMPORTED_MODULE_0__animation_animation_queue__["a" /* AnimationQueue */],
                        { provide: __WEBPACK_IMPORTED_MODULE_4__change_detection_change_detection__["e" /* IterableDiffers */], useFactory: _iterableDiffersFactory },
                        { provide: __WEBPACK_IMPORTED_MODULE_4__change_detection_change_detection__["f" /* KeyValueDiffers */], useFactory: _keyValueDiffersFactory },
                        {
                            provide: __WEBPACK_IMPORTED_MODULE_6__i18n_tokens__["c" /* LOCALE_ID */],
                            useFactory: _localeFactory,
                            deps: [[new __WEBPACK_IMPORTED_MODULE_5__di_metadata__["b" /* Inject */](__WEBPACK_IMPORTED_MODULE_6__i18n_tokens__["c" /* LOCALE_ID */]), new __WEBPACK_IMPORTED_MODULE_5__di_metadata__["c" /* Optional */](), new __WEBPACK_IMPORTED_MODULE_5__di_metadata__["e" /* SkipSelf */]()]]
                        },
                    ]
                },] },
    ];
    /** @nocollapse */
    ApplicationModule.ctorParameters = function () { return []; };
    return ApplicationModule;
}());
function ApplicationModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ApplicationModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ApplicationModule.ctorParameters;
}
//# sourceMappingURL=application_module.js.map

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__ = __webpack_require__(57);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["m"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Change detection enables data binding in Angular.
 */

//# sourceMappingURL=change_detection.js.map

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__metadata__ = __webpack_require__(145);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_0", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_1", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_2", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_3", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_4", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_5", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_6", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_7", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_8", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_9", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["v"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_10", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["w"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_11", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["x"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_12", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_13", function() { return __WEBPACK_IMPORTED_MODULE_0__metadata__["z"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__version__ = __webpack_require__(151);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_14", function() { return __WEBPACK_IMPORTED_MODULE_1__version__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_15", function() { return __WEBPACK_IMPORTED_MODULE_1__version__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(223);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_16", function() { return __WEBPACK_IMPORTED_MODULE_2__util__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__di__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_17", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_18", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_19", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_20", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_21", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_22", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_23", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_24", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_25", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_26", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_27", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_28", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_29", function() { return __WEBPACK_IMPORTED_MODULE_3__di__["m"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__application_ref__ = __webpack_require__(76);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_4__application_ref__["j"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__application_tokens__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_5__application_tokens__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_5__application_tokens__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_5__application_tokens__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_5__application_tokens__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__application_init__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_6__application_init__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_6__application_init__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__zone__ = __webpack_require__(224);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_30", function() { return __WEBPACK_IMPORTED_MODULE_7__zone__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__render__ = __webpack_require__(222);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_31", function() { return __WEBPACK_IMPORTED_MODULE_8__render__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_32", function() { return __WEBPACK_IMPORTED_MODULE_8__render__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_33", function() { return __WEBPACK_IMPORTED_MODULE_8__render__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__linker__ = __webpack_require__(210);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_34", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_35", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_36", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_37", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_38", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_39", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_40", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_41", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_42", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_43", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_44", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_45", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_46", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_47", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_48", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_49", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_50", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_51", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_52", function() { return __WEBPACK_IMPORTED_MODULE_9__linker__["s"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__debug_debug_node__ = __webpack_require__(133);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_10__debug_debug_node__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_10__debug_debug_node__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_10__debug_debug_node__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_10__debug_debug_node__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__testability_testability__ = __webpack_require__(88);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_11__testability_testability__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_11__testability_testability__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_11__testability_testability__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__change_detection__ = __webpack_require__(205);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_53", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_54", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_55", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_56", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_57", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_58", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_59", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_60", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_61", function() { return __WEBPACK_IMPORTED_MODULE_12__change_detection__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__platform_core_providers__ = __webpack_require__(220);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_62", function() { return __WEBPACK_IMPORTED_MODULE_13__platform_core_providers__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__i18n_tokens__ = __webpack_require__(136);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_14__i18n_tokens__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_14__i18n_tokens__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_14__i18n_tokens__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__application_module__ = __webpack_require__(204);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_15__application_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__profile_profile__ = __webpack_require__(65);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_16__profile_profile__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_16__profile_profile__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_16__profile_profile__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_16__profile_profile__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__type__ = __webpack_require__(89);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_17__type__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__facade_async__ = __webpack_require__(83);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_18__facade_async__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__error_handler__ = __webpack_require__(135);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __WEBPACK_IMPORTED_MODULE_19__error_handler__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__core_private_export__ = __webpack_require__(207);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_63", function() { return __WEBPACK_IMPORTED_MODULE_20__core_private_export__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__animation_metadata__ = __webpack_require__(128);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_64", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_65", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_66", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_67", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_68", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_69", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_70", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_71", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_72", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_73", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_74", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_75", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_76", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_77", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_78", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_79", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_80", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_81", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_82", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_83", function() { return __WEBPACK_IMPORTED_MODULE_21__animation_metadata__["t"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__animation_animation_transition_event__ = __webpack_require__(127);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_22__animation_animation_transition_event__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__animation_animation_player__ = __webpack_require__(74);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return __WEBPACK_IMPORTED_MODULE_23__animation_animation_player__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__animation_animation_styles__ = __webpack_require__(126);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return __WEBPACK_IMPORTED_MODULE_24__animation_animation_styles__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__animation_animation_keyframe__ = __webpack_require__(123);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return __WEBPACK_IMPORTED_MODULE_25__animation_animation_keyframe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__security__ = __webpack_require__(150);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return __WEBPACK_IMPORTED_MODULE_26__security__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return __WEBPACK_IMPORTED_MODULE_26__security__["b"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */



























//# sourceMappingURL=core.js.map

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation_animation_constants__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_animation_group_player__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_animation_keyframe__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animation_animation_player__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation_animation_sequence_player__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__animation_animation_style_util__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__animation_animation_styles__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__animation_animation_transition__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__application_tokens__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__change_detection_change_detection_util__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__change_detection_constants__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__console__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__debug_debug_renderer__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__di_reflective_provider__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__linker_compiler__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__linker_component_factory__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__linker_component_factory_resolver__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__linker_debug_context__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__linker_ng_module_factory__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__linker_ng_module_factory_loader__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__linker_template_ref__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__linker_view__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__linker_view_container__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__linker_view_type__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__linker_view_utils__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__metadata_lifecycle_hooks__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__metadata_view__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__reflection_reflection__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__reflection_reflection_capabilities__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__reflection_reflector_reader__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__render_api__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__util_decorators__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__util_lang__ = __webpack_require__(90);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __core_private__; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

































var /** @type {?} */ __core_private__ = {
    isDefaultChangeDetectionStrategy: __WEBPACK_IMPORTED_MODULE_10__change_detection_constants__["a" /* isDefaultChangeDetectionStrategy */],
    ChangeDetectorStatus: __WEBPACK_IMPORTED_MODULE_10__change_detection_constants__["b" /* ChangeDetectorStatus */],
    constructDependencies: __WEBPACK_IMPORTED_MODULE_13__di_reflective_provider__["a" /* constructDependencies */],
    LifecycleHooks: __WEBPACK_IMPORTED_MODULE_25__metadata_lifecycle_hooks__["a" /* LifecycleHooks */],
    LIFECYCLE_HOOKS_VALUES: __WEBPACK_IMPORTED_MODULE_25__metadata_lifecycle_hooks__["b" /* LIFECYCLE_HOOKS_VALUES */],
    ReflectorReader: __WEBPACK_IMPORTED_MODULE_29__reflection_reflector_reader__["a" /* ReflectorReader */],
    CodegenComponentFactoryResolver: __WEBPACK_IMPORTED_MODULE_16__linker_component_factory_resolver__["a" /* CodegenComponentFactoryResolver */],
    ComponentRef_: __WEBPACK_IMPORTED_MODULE_15__linker_component_factory__["a" /* ComponentRef_ */],
    ViewContainer: __WEBPACK_IMPORTED_MODULE_22__linker_view_container__["a" /* ViewContainer */],
    AppView: __WEBPACK_IMPORTED_MODULE_21__linker_view__["a" /* AppView */],
    DebugAppView: __WEBPACK_IMPORTED_MODULE_21__linker_view__["b" /* DebugAppView */],
    NgModuleInjector: __WEBPACK_IMPORTED_MODULE_18__linker_ng_module_factory__["a" /* NgModuleInjector */],
    registerModuleFactory: __WEBPACK_IMPORTED_MODULE_19__linker_ng_module_factory_loader__["a" /* registerModuleFactory */],
    ViewType: __WEBPACK_IMPORTED_MODULE_23__linker_view_type__["a" /* ViewType */],
    view_utils: __WEBPACK_IMPORTED_MODULE_24__linker_view_utils__,
    ViewMetadata: __WEBPACK_IMPORTED_MODULE_26__metadata_view__["a" /* ViewMetadata */],
    DebugContext: __WEBPACK_IMPORTED_MODULE_17__linker_debug_context__["a" /* DebugContext */],
    StaticNodeDebugInfo: __WEBPACK_IMPORTED_MODULE_17__linker_debug_context__["b" /* StaticNodeDebugInfo */],
    devModeEqual: __WEBPACK_IMPORTED_MODULE_9__change_detection_change_detection_util__["a" /* devModeEqual */],
    UNINITIALIZED: __WEBPACK_IMPORTED_MODULE_9__change_detection_change_detection_util__["b" /* UNINITIALIZED */],
    ValueUnwrapper: __WEBPACK_IMPORTED_MODULE_9__change_detection_change_detection_util__["c" /* ValueUnwrapper */],
    RenderDebugInfo: __WEBPACK_IMPORTED_MODULE_30__render_api__["a" /* RenderDebugInfo */],
    TemplateRef_: __WEBPACK_IMPORTED_MODULE_20__linker_template_ref__["a" /* TemplateRef_ */],
    ReflectionCapabilities: __WEBPACK_IMPORTED_MODULE_28__reflection_reflection_capabilities__["a" /* ReflectionCapabilities */],
    makeDecorator: __WEBPACK_IMPORTED_MODULE_31__util_decorators__["a" /* makeDecorator */],
    DebugDomRootRenderer: __WEBPACK_IMPORTED_MODULE_12__debug_debug_renderer__["a" /* DebugDomRootRenderer */],
    Console: __WEBPACK_IMPORTED_MODULE_11__console__["a" /* Console */],
    reflector: __WEBPACK_IMPORTED_MODULE_27__reflection_reflection__["a" /* reflector */],
    Reflector: __WEBPACK_IMPORTED_MODULE_27__reflection_reflection__["b" /* Reflector */],
    NoOpAnimationPlayer: __WEBPACK_IMPORTED_MODULE_3__animation_animation_player__["b" /* NoOpAnimationPlayer */],
    AnimationPlayer: __WEBPACK_IMPORTED_MODULE_3__animation_animation_player__["a" /* AnimationPlayer */],
    AnimationSequencePlayer: __WEBPACK_IMPORTED_MODULE_4__animation_animation_sequence_player__["a" /* AnimationSequencePlayer */],
    AnimationGroupPlayer: __WEBPACK_IMPORTED_MODULE_1__animation_animation_group_player__["a" /* AnimationGroupPlayer */],
    AnimationKeyframe: __WEBPACK_IMPORTED_MODULE_2__animation_animation_keyframe__["a" /* AnimationKeyframe */],
    prepareFinalAnimationStyles: __WEBPACK_IMPORTED_MODULE_5__animation_animation_style_util__["a" /* prepareFinalAnimationStyles */],
    balanceAnimationKeyframes: __WEBPACK_IMPORTED_MODULE_5__animation_animation_style_util__["b" /* balanceAnimationKeyframes */],
    flattenStyles: __WEBPACK_IMPORTED_MODULE_5__animation_animation_style_util__["c" /* flattenStyles */],
    clearStyles: __WEBPACK_IMPORTED_MODULE_5__animation_animation_style_util__["d" /* clearStyles */],
    renderStyles: __WEBPACK_IMPORTED_MODULE_5__animation_animation_style_util__["e" /* renderStyles */],
    collectAndResolveStyles: __WEBPACK_IMPORTED_MODULE_5__animation_animation_style_util__["f" /* collectAndResolveStyles */],
    APP_ID_RANDOM_PROVIDER: __WEBPACK_IMPORTED_MODULE_8__application_tokens__["e" /* APP_ID_RANDOM_PROVIDER */],
    AnimationStyles: __WEBPACK_IMPORTED_MODULE_6__animation_animation_styles__["a" /* AnimationStyles */],
    ANY_STATE: __WEBPACK_IMPORTED_MODULE_0__animation_animation_constants__["a" /* ANY_STATE */],
    DEFAULT_STATE: __WEBPACK_IMPORTED_MODULE_0__animation_animation_constants__["b" /* DEFAULT_STATE */],
    EMPTY_STATE: __WEBPACK_IMPORTED_MODULE_0__animation_animation_constants__["c" /* EMPTY_STATE */],
    FILL_STYLE_FLAG: __WEBPACK_IMPORTED_MODULE_0__animation_animation_constants__["d" /* FILL_STYLE_FLAG */],
    ComponentStillLoadingError: __WEBPACK_IMPORTED_MODULE_14__linker_compiler__["a" /* ComponentStillLoadingError */],
    isPromise: __WEBPACK_IMPORTED_MODULE_32__util_lang__["a" /* isPromise */],
    isObservable: __WEBPACK_IMPORTED_MODULE_32__util_lang__["b" /* isObservable */],
    AnimationTransition: __WEBPACK_IMPORTED_MODULE_7__animation_animation_transition__["a" /* AnimationTransition */]
};
//# sourceMappingURL=core_private_export.js.map

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__debug_node__ = __webpack_require__(133);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DebugDomRootRenderer; });
/* unused harmony export DebugDomRenderer */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


var DebugDomRootRenderer = (function () {
    /**
     * @param {?} _delegate
     */
    function DebugDomRootRenderer(_delegate) {
        this._delegate = _delegate;
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    DebugDomRootRenderer.prototype.renderComponent = function (componentProto) {
        return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
    };
    return DebugDomRootRenderer;
}());
function DebugDomRootRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    DebugDomRootRenderer.prototype._delegate;
}
var DebugDomRenderer = (function () {
    /**
     * @param {?} _delegate
     */
    function DebugDomRenderer(_delegate) {
        this._delegate = _delegate;
    }
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    DebugDomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var /** @type {?} */ nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
        var /** @type {?} */ debugEl = new __WEBPACK_IMPORTED_MODULE_1__debug_node__["a" /* DebugElement */](nativeEl, null, debugInfo);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["e" /* indexDebugNode */])(debugEl);
        return nativeEl;
    };
    /**
     * @param {?} parentElement
     * @param {?} name
     * @param {?=} debugInfo
     * @return {?}
     */
    DebugDomRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
        var /** @type {?} */ nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
        var /** @type {?} */ debugEl = new __WEBPACK_IMPORTED_MODULE_1__debug_node__["a" /* DebugElement */](nativeEl, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(parentElement), debugInfo);
        debugEl.name = name;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["e" /* indexDebugNode */])(debugEl);
        return nativeEl;
    };
    /**
     * @param {?} hostElement
     * @return {?}
     */
    DebugDomRenderer.prototype.createViewRoot = function (hostElement) { return this._delegate.createViewRoot(hostElement); };
    /**
     * @param {?} parentElement
     * @param {?=} debugInfo
     * @return {?}
     */
    DebugDomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var /** @type {?} */ comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
        var /** @type {?} */ debugEl = new __WEBPACK_IMPORTED_MODULE_1__debug_node__["b" /* DebugNode */](comment, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(parentElement), debugInfo);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["e" /* indexDebugNode */])(debugEl);
        return comment;
    };
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    DebugDomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
        var /** @type {?} */ text = this._delegate.createText(parentElement, value, debugInfo);
        var /** @type {?} */ debugEl = new __WEBPACK_IMPORTED_MODULE_1__debug_node__["b" /* DebugNode */](text, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(parentElement), debugInfo);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["e" /* indexDebugNode */])(debugEl);
        return text;
    };
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    DebugDomRenderer.prototype.projectNodes = function (parentElement, nodes) {
        var /** @type {?} */ debugParent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(parentElement);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugParent) && debugParent instanceof __WEBPACK_IMPORTED_MODULE_1__debug_node__["a" /* DebugElement */]) {
            var /** @type {?} */ debugElement_1 = debugParent;
            nodes.forEach(function (node) { debugElement_1.addChild(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(node)); });
        }
        this._delegate.projectNodes(parentElement, nodes);
    };
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    DebugDomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
        var /** @type {?} */ debugNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(node);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugNode)) {
            var /** @type {?} */ debugParent = debugNode.parent;
            if (viewRootNodes.length > 0 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugParent)) {
                var /** @type {?} */ debugViewRootNodes_1 = [];
                viewRootNodes.forEach(function (rootNode) { return debugViewRootNodes_1.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(rootNode)); });
                debugParent.insertChildrenAfter(debugNode, debugViewRootNodes_1);
            }
        }
        this._delegate.attachViewAfter(node, viewRootNodes);
    };
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    DebugDomRenderer.prototype.detachView = function (viewRootNodes) {
        viewRootNodes.forEach(function (node) {
            var /** @type {?} */ debugNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(node);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugNode) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugNode.parent)) {
                debugNode.parent.removeChild(debugNode);
            }
        });
        this._delegate.detachView(viewRootNodes);
    };
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    DebugDomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        viewAllNodes = viewAllNodes || [];
        viewAllNodes.forEach(function (node) { __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["f" /* removeDebugNodeFromIndex */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(node)); });
        this._delegate.destroyView(hostElement, viewAllNodes);
    };
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    DebugDomRenderer.prototype.listen = function (renderElement, name, callback) {
        var /** @type {?} */ debugEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(renderElement);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugEl)) {
            debugEl.listeners.push(new __WEBPACK_IMPORTED_MODULE_1__debug_node__["g" /* EventListener */](name, callback));
        }
        return this._delegate.listen(renderElement, name, callback);
    };
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    DebugDomRenderer.prototype.listenGlobal = function (target, name, callback) {
        return this._delegate.listenGlobal(target, name, callback);
    };
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    DebugDomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        var /** @type {?} */ debugEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(renderElement);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugEl) && debugEl instanceof __WEBPACK_IMPORTED_MODULE_1__debug_node__["a" /* DebugElement */]) {
            debugEl.properties[propertyName] = propertyValue;
        }
        this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
    };
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    DebugDomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        var /** @type {?} */ debugEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(renderElement);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugEl) && debugEl instanceof __WEBPACK_IMPORTED_MODULE_1__debug_node__["a" /* DebugElement */]) {
            debugEl.attributes[attributeName] = attributeValue;
        }
        this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    DebugDomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    DebugDomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        var /** @type {?} */ debugEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(renderElement);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugEl) && debugEl instanceof __WEBPACK_IMPORTED_MODULE_1__debug_node__["a" /* DebugElement */]) {
            debugEl.classes[className] = isAdd;
        }
        this._delegate.setElementClass(renderElement, className, isAdd);
    };
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    DebugDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        var /** @type {?} */ debugEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug_node__["d" /* getDebugNode */])(renderElement);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["b" /* isPresent */])(debugEl) && debugEl instanceof __WEBPACK_IMPORTED_MODULE_1__debug_node__["a" /* DebugElement */]) {
            debugEl.styles[styleName] = styleValue;
        }
        this._delegate.setElementStyle(renderElement, styleName, styleValue);
    };
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?=} args
     * @return {?}
     */
    DebugDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        this._delegate.invokeElementMethod(renderElement, methodName, args);
    };
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    DebugDomRenderer.prototype.setText = function (renderNode, text) { this._delegate.setText(renderNode, text); };
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    DebugDomRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        return this._delegate.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
    };
    return DebugDomRenderer;
}());
function DebugDomRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    DebugDomRenderer.prototype._delegate;
}
//# sourceMappingURL=debug_renderer.js.map

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__injector__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__metadata__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reflective_errors__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reflective_key__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reflective_provider__ = __webpack_require__(82);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReflectiveInjector; });
/* unused harmony export ReflectiveInjector_ */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





// Threshold for the dynamic version
var /** @type {?} */ UNDEFINED = new Object();
/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * \@Injectable()
 * class Engine {
 * }
 *
 * \@Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 *
 * \@stable
 * @abstract
 */
var ReflectiveInjector = (function () {
    function ReflectiveInjector() {
    }
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of {\@link ResolvedReflectiveProvider}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {\@link ReflectiveInjector#fromResolvedProviders} for more info.
     * @param {?} providers
     * @return {?}
     */
    ReflectiveInjector.resolve = function (providers) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__reflective_provider__["c" /* resolveReflectiveProviders */])(providers);
    };
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, {\@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedProviders`
     * because it needs to resolve the passed-in providers first.
     * See {\@link Injector#resolve} and {\@link Injector#fromResolvedProviders}.
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    ReflectiveInjector.resolveAndCreate = function (providers, parent) {
        if (parent === void 0) { parent = null; }
        var /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    };
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, Engine]);
     * var injector = ReflectiveInjector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     * \@experimental
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    ReflectiveInjector.fromResolvedProviders = function (providers, parent) {
        if (parent === void 0) { parent = null; }
        return new ReflectiveInjector_(providers, parent);
    };
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
     *
     * ```typescript
     * var parent = ReflectiveInjector.resolveAndCreate([]);
     * var child = parent.resolveAndCreateChild([]);
     * expect(child.parent).toBe(parent);
     * ```
     * @abstract
     * @return {?}
     */
    ReflectiveInjector.prototype.parent = function () { };
    /**
     * Resolves an array of providers and creates a child injector from those providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in providers can be an array of `Type`, {\@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
     * var child = parent.resolveAndCreateChild([ChildProvider]);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in providers first.
     * See {\@link Injector#resolve} and {\@link Injector#createChildFromResolved}.
     * @abstract
     * @param {?} providers
     * @return {?}
     */
    ReflectiveInjector.prototype.resolveAndCreateChild = function (providers) { };
    /**
     * Creates a child injector from previously resolved providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
     * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
     *
     * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
     * var child = parent.createChildFromResolved(childProviders);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     * @abstract
     * @param {?} providers
     * @return {?}
     */
    ReflectiveInjector.prototype.createChildFromResolved = function (providers) { };
    /**
     * Resolves a provider and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     * @abstract
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector.prototype.resolveAndInstantiate = function (provider) { };
    /**
     * Instantiates an object using a resolved provider in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     * var carProvider = ReflectiveInjector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carProvider);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
     * ```
     * @abstract
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector.prototype.instantiateResolved = function (provider) { };
    /**
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    ReflectiveInjector.prototype.get = function (token, notFoundValue) { };
    return ReflectiveInjector;
}());
var ReflectiveInjector_ = (function () {
    /**
     * Private
     * @param {?} _providers
     * @param {?=} _parent
     */
    function ReflectiveInjector_(_providers, _parent) {
        if (_parent === void 0) { _parent = null; }
        /** @internal */
        this._constructionCounter = 0;
        this._providers = _providers;
        this._parent = _parent;
        var len = _providers.length;
        this.keyIds = new Array(len);
        this.objs = new Array(len);
        for (var i = 0; i < len; i++) {
            this.keyIds[i] = _providers[i].key.id;
            this.objs[i] = UNDEFINED;
        }
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    ReflectiveInjector_.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = __WEBPACK_IMPORTED_MODULE_0__injector__["b" /* THROW_IF_NOT_FOUND */]; }
        return this._getByKey(__WEBPACK_IMPORTED_MODULE_3__reflective_key__["a" /* ReflectiveKey */].get(token), null, notFoundValue);
    };
    Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
        /**
         * @return {?}
         */
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} providers
     * @return {?}
     */
    ReflectiveInjector_.prototype.resolveAndCreateChild = function (providers) {
        var /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
    };
    /**
     * @param {?} providers
     * @return {?}
     */
    ReflectiveInjector_.prototype.createChildFromResolved = function (providers) {
        var /** @type {?} */ inj = new ReflectiveInjector_(providers);
        inj._parent = this;
        return inj;
    };
    /**
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector_.prototype.resolveAndInstantiate = function (provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    };
    /**
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector_.prototype.instantiateResolved = function (provider) {
        return this._instantiateProvider(provider);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ReflectiveInjector_.prototype.getProviderAtIndex = function (index) {
        if (index < 0 || index >= this._providers.length) {
            throw new __WEBPACK_IMPORTED_MODULE_2__reflective_errors__["d" /* OutOfBoundsError */](index);
        }
        return this._providers[index];
    };
    /**
     * \@internal
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector_.prototype._new = function (provider) {
        if (this._constructionCounter++ > this._getMaxNumberOfObjects()) {
            throw new __WEBPACK_IMPORTED_MODULE_2__reflective_errors__["e" /* CyclicDependencyError */](this, provider.key);
        }
        return this._instantiateProvider(provider);
    };
    /**
     * @return {?}
     */
    ReflectiveInjector_.prototype._getMaxNumberOfObjects = function () { return this.objs.length; };
    /**
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector_.prototype._instantiateProvider = function (provider) {
        if (provider.multiProvider) {
            var /** @type {?} */ res = new Array(provider.resolvedFactories.length);
            for (var /** @type {?} */ i = 0; i < provider.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
            }
            return res;
        }
        else {
            return this._instantiate(provider, provider.resolvedFactories[0]);
        }
    };
    /**
     * @param {?} provider
     * @param {?} ResolvedReflectiveFactory
     * @return {?}
     */
    ReflectiveInjector_.prototype._instantiate = function (provider, ResolvedReflectiveFactory) {
        var _this = this;
        var /** @type {?} */ factory = ResolvedReflectiveFactory.factory;
        var /** @type {?} */ deps;
        try {
            deps =
                ResolvedReflectiveFactory.dependencies.map(function (dep) { return _this._getByReflectiveDependency(dep); });
        }
        catch (e) {
            if (e instanceof __WEBPACK_IMPORTED_MODULE_2__reflective_errors__["f" /* AbstractProviderError */] || e instanceof __WEBPACK_IMPORTED_MODULE_2__reflective_errors__["g" /* InstantiationError */]) {
                e.addKey(this, provider.key);
            }
            throw e;
        }
        var /** @type {?} */ obj;
        try {
            obj = factory.apply(void 0, deps);
        }
        catch (e) {
            throw new __WEBPACK_IMPORTED_MODULE_2__reflective_errors__["g" /* InstantiationError */](this, e, e.stack, provider.key);
        }
        return obj;
    };
    /**
     * @param {?} dep
     * @return {?}
     */
    ReflectiveInjector_.prototype._getByReflectiveDependency = function (dep) {
        return this._getByKey(dep.key, dep.visibility, dep.optional ? null : __WEBPACK_IMPORTED_MODULE_0__injector__["b" /* THROW_IF_NOT_FOUND */]);
    };
    /**
     * @param {?} key
     * @param {?} visibility
     * @param {?} notFoundValue
     * @return {?}
     */
    ReflectiveInjector_.prototype._getByKey = function (key, visibility, notFoundValue) {
        if (key === INJECTOR_KEY) {
            return this;
        }
        if (visibility instanceof __WEBPACK_IMPORTED_MODULE_1__metadata__["d" /* Self */]) {
            return this._getByKeySelf(key, notFoundValue);
        }
        else {
            return this._getByKeyDefault(key, notFoundValue, visibility);
        }
    };
    /**
     * @param {?} keyId
     * @return {?}
     */
    ReflectiveInjector_.prototype._getObjByKeyId = function (keyId) {
        for (var /** @type {?} */ i = 0; i < this.keyIds.length; i++) {
            if (this.keyIds[i] === keyId) {
                if (this.objs[i] === UNDEFINED) {
                    this.objs[i] = this._new(this._providers[i]);
                }
                return this.objs[i];
            }
        }
        return UNDEFINED;
    };
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    ReflectiveInjector_.prototype._throwOrNull = function (key, notFoundValue) {
        if (notFoundValue !== __WEBPACK_IMPORTED_MODULE_0__injector__["b" /* THROW_IF_NOT_FOUND */]) {
            return notFoundValue;
        }
        else {
            throw new __WEBPACK_IMPORTED_MODULE_2__reflective_errors__["h" /* NoProviderError */](this, key);
        }
    };
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    ReflectiveInjector_.prototype._getByKeySelf = function (key, notFoundValue) {
        var /** @type {?} */ obj = this._getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    };
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @param {?} visibility
     * @return {?}
     */
    ReflectiveInjector_.prototype._getByKeyDefault = function (key, notFoundValue, visibility) {
        var /** @type {?} */ inj;
        if (visibility instanceof __WEBPACK_IMPORTED_MODULE_1__metadata__["e" /* SkipSelf */]) {
            inj = this._parent;
        }
        else {
            inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
            var /** @type {?} */ inj_ = (inj);
            var /** @type {?} */ obj = inj_._getObjByKeyId(key.id);
            if (obj !== UNDEFINED)
                return obj;
            inj = inj_._parent;
        }
        if (inj !== null) {
            return inj.get(key.token, notFoundValue);
        }
        else {
            return this._throwOrNull(key, notFoundValue);
        }
    };
    Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ providers = _mapProviders(this, function (b) { return ' "' + b.key.displayName + '" '; })
                .join(', ');
            return "ReflectiveInjector(providers: [" + providers + "])";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ReflectiveInjector_.prototype.toString = function () { return this.displayName; };
    return ReflectiveInjector_;
}());
function ReflectiveInjector__tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    ReflectiveInjector_.prototype._constructionCounter;
    /**
     * \@internal
     * @type {?}
     */
    ReflectiveInjector_.prototype._providers;
    /**
     * \@internal
     * @type {?}
     */
    ReflectiveInjector_.prototype._parent;
    /** @type {?} */
    ReflectiveInjector_.prototype.keyIds;
    /** @type {?} */
    ReflectiveInjector_.prototype.objs;
}
var /** @type {?} */ INJECTOR_KEY = __WEBPACK_IMPORTED_MODULE_3__reflective_key__["a" /* ReflectiveKey */].get(__WEBPACK_IMPORTED_MODULE_0__injector__["a" /* Injector */]);
/**
 * @param {?} injector
 * @param {?} fn
 * @return {?}
 */
function _mapProviders(injector, fn) {
    var /** @type {?} */ res = new Array(injector._providers.length);
    for (var /** @type {?} */ i = 0; i < injector._providers.length; ++i) {
        res[i] = fn(injector.getProviderAtIndex(i));
    }
    return res;
}
//# sourceMappingURL=reflective_injector.js.map

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__linker_compiler__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__linker_compiler__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__linker_compiler__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__linker_compiler__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__linker_compiler__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linker_component_factory__ = __webpack_require__(84);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__linker_component_factory__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__linker_component_factory__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__linker_component_factory_resolver__ = __webpack_require__(61);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__linker_component_factory_resolver__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__linker_element_ref__ = __webpack_require__(62);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__linker_element_ref__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__linker_ng_module_factory__ = __webpack_require__(140);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_4__linker_ng_module_factory__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_4__linker_ng_module_factory__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__linker_ng_module_factory_loader__ = __webpack_require__(141);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_5__linker_ng_module_factory_loader__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_5__linker_ng_module_factory_loader__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__linker_query_list__ = __webpack_require__(213);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_6__linker_query_list__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__linker_system_js_ng_module_factory_loader__ = __webpack_require__(214);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_7__linker_system_js_ng_module_factory_loader__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_7__linker_system_js_ng_module_factory_loader__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__linker_template_ref__ = __webpack_require__(142);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_8__linker_template_ref__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__linker_view_container_ref__ = __webpack_require__(143);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_9__linker_view_container_ref__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__linker_view_ref__ = __webpack_require__(144);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_10__linker_view_ref__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_10__linker_view_ref__["c"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for compiler











//# sourceMappingURL=linker.js.map

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation_animation_group_player__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_animation_sequence_player__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_view_animation_map__ = __webpack_require__(203);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationViewContext; });



var AnimationViewContext = (function () {
    /**
     * @param {?} _animationQueue
     */
    function AnimationViewContext(_animationQueue) {
        this._animationQueue = _animationQueue;
        this._players = new __WEBPACK_IMPORTED_MODULE_2__animation_view_animation_map__["a" /* ViewAnimationMap */]();
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    AnimationViewContext.prototype.onAllActiveAnimationsDone = function (callback) {
        var /** @type {?} */ activeAnimationPlayers = this._players.getAllPlayers();
        // we check for the length to avoid having GroupAnimationPlayer
        // issue an unnecessary microtask when zero players are passed in
        if (activeAnimationPlayers.length) {
            new __WEBPACK_IMPORTED_MODULE_0__animation_animation_group_player__["a" /* AnimationGroupPlayer */](activeAnimationPlayers).onDone(function () { return callback(); });
        }
        else {
            callback();
        }
    };
    /**
     * @param {?} element
     * @param {?} animationName
     * @param {?} player
     * @return {?}
     */
    AnimationViewContext.prototype.queueAnimation = function (element, animationName, player) {
        var _this = this;
        this._animationQueue.enqueue(player);
        this._players.set(element, animationName, player);
        player.onDone(function () { return _this._players.remove(element, animationName, player); });
    };
    /**
     * @param {?} element
     * @param {?=} animationName
     * @return {?}
     */
    AnimationViewContext.prototype.getAnimationPlayers = function (element, animationName) {
        if (animationName === void 0) { animationName = null; }
        var /** @type {?} */ players = [];
        if (animationName) {
            var /** @type {?} */ currentPlayer = this._players.find(element, animationName);
            if (currentPlayer) {
                _recursePlayers(currentPlayer, players);
            }
        }
        else {
            this._players.findAllPlayersByElement(element).forEach(function (player) { return _recursePlayers(player, players); });
        }
        return players;
    };
    return AnimationViewContext;
}());
function AnimationViewContext_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationViewContext.prototype._players;
    /** @type {?} */
    AnimationViewContext.prototype._animationQueue;
}
/**
 * @param {?} player
 * @param {?} collectedPlayers
 * @return {?}
 */
function _recursePlayers(player, collectedPlayers) {
    if ((player instanceof __WEBPACK_IMPORTED_MODULE_0__animation_animation_group_player__["a" /* AnimationGroupPlayer */]) || (player instanceof __WEBPACK_IMPORTED_MODULE_1__animation_animation_sequence_player__["a" /* AnimationSequencePlayer */])) {
        player.players.forEach(function (player) { return _recursePlayers(player, collectedPlayers); });
    }
    else {
        collectedPlayers.push(player);
    }
}
//# sourceMappingURL=animation_view_context.js.map

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di_injector__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementInjector; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var ElementInjector = (function (_super) {
    __extends(ElementInjector, _super);
    /**
     * @param {?} _view
     * @param {?} _nodeIndex
     */
    function ElementInjector(_view, _nodeIndex) {
        _super.call(this);
        this._view = _view;
        this._nodeIndex = _nodeIndex;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    ElementInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = __WEBPACK_IMPORTED_MODULE_0__di_injector__["b" /* THROW_IF_NOT_FOUND */]; }
        return this._view.injectorGet(token, this._nodeIndex, notFoundValue);
    };
    return ElementInjector;
}(__WEBPACK_IMPORTED_MODULE_0__di_injector__["a" /* Injector */]));
function ElementInjector_tsickle_Closure_declarations() {
    /** @type {?} */
    ElementInjector.prototype._view;
    /** @type {?} */
    ElementInjector.prototype._nodeIndex;
}
//# sourceMappingURL=element_injector.js.map

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_async__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_collection__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_lang__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryList; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {\@link Query} and {\@link ViewQueryMetadata} provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
 * ```typescript
 * \@Component({...})
 * class Container {
 *   \@ViewChildren(Item) items:QueryList<Item>;
 * }
 * ```
 * \@stable
 */
var QueryList = (function () {
    function QueryList() {
        this._dirty = true;
        this._results = [];
        this._emitter = new __WEBPACK_IMPORTED_MODULE_0__facade_async__["a" /* EventEmitter */]();
    }
    Object.defineProperty(QueryList.prototype, "changes", {
        /**
         * @return {?}
         */
        get: function () { return this._emitter; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "length", {
        /**
         * @return {?}
         */
        get: function () { return this._results.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "first", {
        /**
         * @return {?}
         */
        get: function () { return this._results[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "last", {
        /**
         * @return {?}
         */
        get: function () { return this._results[this.length - 1]; },
        enumerable: true,
        configurable: true
    });
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     * @param {?} fn
     * @return {?}
     */
    QueryList.prototype.map = function (fn) { return this._results.map(fn); };
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     * @param {?} fn
     * @return {?}
     */
    QueryList.prototype.filter = function (fn) {
        return this._results.filter(fn);
    };
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     * @param {?} fn
     * @return {?}
     */
    QueryList.prototype.find = function (fn) { return this._results.find(fn); };
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     * @param {?} fn
     * @param {?} init
     * @return {?}
     */
    QueryList.prototype.reduce = function (fn, init) {
        return this._results.reduce(fn, init);
    };
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     * @param {?} fn
     * @return {?}
     */
    QueryList.prototype.forEach = function (fn) { this._results.forEach(fn); };
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     * @param {?} fn
     * @return {?}
     */
    QueryList.prototype.some = function (fn) {
        return this._results.some(fn);
    };
    /**
     * @return {?}
     */
    QueryList.prototype.toArray = function () { return this._results.slice(); };
    /**
     * @return {?}
     */
    QueryList.prototype[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["e" /* getSymbolIterator */])()] = function () { return ((this._results))[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["e" /* getSymbolIterator */])()](); };
    /**
     * @return {?}
     */
    QueryList.prototype.toString = function () { return this._results.toString(); };
    /**
     * @param {?} res
     * @return {?}
     */
    QueryList.prototype.reset = function (res) {
        this._results = __WEBPACK_IMPORTED_MODULE_1__facade_collection__["e" /* ListWrapper */].flatten(res);
        this._dirty = false;
    };
    /**
     * @return {?}
     */
    QueryList.prototype.notifyOnChanges = function () { this._emitter.emit(this); };
    /**
     * internal
     * @return {?}
     */
    QueryList.prototype.setDirty = function () { this._dirty = true; };
    Object.defineProperty(QueryList.prototype, "dirty", {
        /**
         * internal
         * @return {?}
         */
        get: function () { return this._dirty; },
        enumerable: true,
        configurable: true
    });
    return QueryList;
}());
function QueryList_tsickle_Closure_declarations() {
    /** @type {?} */
    QueryList.prototype._dirty;
    /** @type {?} */
    QueryList.prototype._results;
    /** @type {?} */
    QueryList.prototype._emitter;
}
//# sourceMappingURL=query_list.js.map

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compiler__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SystemJsNgModuleLoaderConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SystemJsNgModuleLoader; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


var /** @type {?} */ _SEPARATOR = '#';
var /** @type {?} */ FACTORY_CLASS_SUFFIX = 'NgFactory';
/**
 * Configuration for SystemJsNgModuleLoader.
 * token.
 *
 * \@experimental
 * @abstract
 */
var SystemJsNgModuleLoaderConfig = (function () {
    function SystemJsNgModuleLoaderConfig() {
    }
    return SystemJsNgModuleLoaderConfig;
}());
function SystemJsNgModuleLoaderConfig_tsickle_Closure_declarations() {
    /**
     * Prefix to add when computing the name of the factory module for a given module name.
     * @type {?}
     */
    SystemJsNgModuleLoaderConfig.prototype.factoryPathPrefix;
    /**
     * Suffix to add when computing the name of the factory module for a given module name.
     * @type {?}
     */
    SystemJsNgModuleLoaderConfig.prototype.factoryPathSuffix;
}
var /** @type {?} */ DEFAULT_CONFIG = {
    factoryPathPrefix: '',
    factoryPathSuffix: '.ngfactory',
};
/**
 * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
 * \@experimental
 */
var SystemJsNgModuleLoader = (function () {
    /**
     * @param {?} _compiler
     * @param {?=} config
     */
    function SystemJsNgModuleLoader(_compiler, config) {
        this._compiler = _compiler;
        this._config = config || DEFAULT_CONFIG;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    SystemJsNgModuleLoader.prototype.load = function (path) {
        var /** @type {?} */ offlineMode = this._compiler instanceof __WEBPACK_IMPORTED_MODULE_1__compiler__["b" /* Compiler */];
        return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
    };
    /**
     * @param {?} path
     * @return {?}
     */
    SystemJsNgModuleLoader.prototype.loadAndCompile = function (path) {
        var _this = this;
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        if (exportName === undefined) {
            exportName = 'default';
        }
        return __webpack_require__(137)(module)
            .then(function (module) { return module[exportName]; })
            .then(function (type) { return checkNotEmpty(type, module, exportName); })
            .then(function (type) { return _this._compiler.compileModuleAsync(type); });
    };
    /**
     * @param {?} path
     * @return {?}
     */
    SystemJsNgModuleLoader.prototype.loadFactory = function (path) {
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        var /** @type {?} */ factoryClassSuffix = FACTORY_CLASS_SUFFIX;
        if (exportName === undefined) {
            exportName = 'default';
            factoryClassSuffix = '';
        }
        return __webpack_require__(137)(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix)
            .then(function (module) { return module[exportName + factoryClassSuffix]; })
            .then(function (factory) { return checkNotEmpty(factory, module, exportName); });
    };
    SystemJsNgModuleLoader.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__di__["j" /* Injectable */] },
    ];
    /** @nocollapse */
    SystemJsNgModuleLoader.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__compiler__["b" /* Compiler */], },
        { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__di__["i" /* Optional */] },] },
    ]; };
    return SystemJsNgModuleLoader;
}());
function SystemJsNgModuleLoader_tsickle_Closure_declarations() {
    /** @type {?} */
    SystemJsNgModuleLoader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SystemJsNgModuleLoader.ctorParameters;
    /** @type {?} */
    SystemJsNgModuleLoader.prototype._config;
    /** @type {?} */
    SystemJsNgModuleLoader.prototype._compiler;
}
/**
 * @param {?} value
 * @param {?} modulePath
 * @param {?} exportName
 * @return {?}
 */
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) {
        throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
    }
    return value;
}
//# sourceMappingURL=system_js_ng_module_factory_loader.js.map

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di_injector__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_lang__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation_view_context__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__debug_context__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__element_injector__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__errors__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__view_ref__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__view_type__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_utils__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DebugAppView; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};











var /** @type {?} */ _scope_check = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* wtfCreateScope */])("AppView#check(ascii id)");
/**
 * @experimental
 */
var /** @type {?} */ EMPTY_CONTEXT = new Object();
var /** @type {?} */ UNDEFINED = new Object();
/**
 * Cost of making objects: http://jsperf.com/instantiate-size-of-object
 *
 * @abstract
 */
var AppView = (function () {
    /**
     * @param {?} clazz
     * @param {?} componentType
     * @param {?} type
     * @param {?} viewUtils
     * @param {?} parentView
     * @param {?} parentIndex
     * @param {?} parentElement
     * @param {?} cdMode
     * @param {?=} declaredViewContainer
     */
    function AppView(clazz, componentType, type, viewUtils, parentView, parentIndex, parentElement, cdMode, declaredViewContainer) {
        if (declaredViewContainer === void 0) { declaredViewContainer = null; }
        this.clazz = clazz;
        this.componentType = componentType;
        this.type = type;
        this.viewUtils = viewUtils;
        this.parentView = parentView;
        this.parentIndex = parentIndex;
        this.parentElement = parentElement;
        this.cdMode = cdMode;
        this.declaredViewContainer = declaredViewContainer;
        this.numberOfChecks = 0;
        this.ref = new __WEBPACK_IMPORTED_MODULE_8__view_ref__["a" /* ViewRef_ */](this, viewUtils.animationQueue);
        if (type === __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].COMPONENT || type === __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].HOST) {
            this.renderer = viewUtils.renderComponent(componentType);
        }
        else {
            this.renderer = parentView.renderer;
        }
        this._directRenderer = this.renderer.directRenderer;
    }
    Object.defineProperty(AppView.prototype, "animationContext", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._animationContext) {
                this._animationContext = new __WEBPACK_IMPORTED_MODULE_4__animation_view_context__["a" /* AnimationViewContext */](this.viewUtils.animationQueue);
            }
            return this._animationContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppView.prototype, "destroyed", {
        /**
         * @return {?}
         */
        get: function () { return this.cdMode === __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Destroyed; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AppView.prototype.create = function (context) {
        this.context = context;
        return this.createInternal(null);
    };
    /**
     * @param {?} rootSelectorOrNode
     * @param {?} hostInjector
     * @param {?} projectableNodes
     * @return {?}
     */
    AppView.prototype.createHostView = function (rootSelectorOrNode, hostInjector, projectableNodes) {
        this.context = (EMPTY_CONTEXT);
        this._hasExternalHostElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["b" /* isPresent */])(rootSelectorOrNode);
        this._hostInjector = hostInjector;
        this._hostProjectableNodes = projectableNodes;
        return this.createInternal(rootSelectorOrNode);
    };
    /**
     * Overwritten by implementations.
     * Returns the ComponentRef for the host element for ViewType.HOST.
     * @param {?} rootSelectorOrNode
     * @return {?}
     */
    AppView.prototype.createInternal = function (rootSelectorOrNode) { return null; };
    /**
     * Overwritten by implementations.
     * @param {?} templateNodeIndex
     * @return {?}
     */
    AppView.prototype.createEmbeddedViewInternal = function (templateNodeIndex) { return null; };
    /**
     * @param {?} lastRootNode
     * @param {?} allNodes
     * @param {?} disposables
     * @return {?}
     */
    AppView.prototype.init = function (lastRootNode, allNodes, disposables) {
        this.lastRootNode = lastRootNode;
        this.allNodes = allNodes;
        this.disposables = disposables;
        if (this.type === __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].COMPONENT) {
            this.dirtyParentQueriesInternal();
        }
    };
    /**
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?=} notFoundValue
     * @return {?}
     */
    AppView.prototype.injectorGet = function (token, nodeIndex, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = __WEBPACK_IMPORTED_MODULE_1__di_injector__["b" /* THROW_IF_NOT_FOUND */]; }
        var /** @type {?} */ result = UNDEFINED;
        var /** @type {?} */ view = this;
        while (result === UNDEFINED) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["b" /* isPresent */])(nodeIndex)) {
                result = view.injectorGetInternal(token, nodeIndex, UNDEFINED);
            }
            if (result === UNDEFINED && view.type === __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].HOST) {
                result = view._hostInjector.get(token, notFoundValue);
            }
            nodeIndex = view.parentIndex;
            view = view.parentView;
        }
        return result;
    };
    /**
     * Overwritten by implementations
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?} notFoundResult
     * @return {?}
     */
    AppView.prototype.injectorGetInternal = function (token, nodeIndex, notFoundResult) {
        return notFoundResult;
    };
    /**
     * @param {?} nodeIndex
     * @return {?}
     */
    AppView.prototype.injector = function (nodeIndex) { return new __WEBPACK_IMPORTED_MODULE_6__element_injector__["a" /* ElementInjector */](this, nodeIndex); };
    /**
     * @return {?}
     */
    AppView.prototype.detachAndDestroy = function () {
        if (this.viewContainer) {
            this.viewContainer.detachView(this.viewContainer.nestedViews.indexOf(this));
        }
        else if (this.appRef) {
            this.appRef.detachView(this.ref);
        }
        else if (this._hasExternalHostElement) {
            this.detach();
        }
        this.destroy();
    };
    /**
     * @return {?}
     */
    AppView.prototype.destroy = function () {
        var _this = this;
        if (this.cdMode === __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Destroyed) {
            return;
        }
        var /** @type {?} */ hostElement = this.type === __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].COMPONENT ? this.parentElement : null;
        if (this.disposables) {
            for (var /** @type {?} */ i = 0; i < this.disposables.length; i++) {
                this.disposables[i]();
            }
        }
        this.destroyInternal();
        this.dirtyParentQueriesInternal();
        if (this._animationContext) {
            this._animationContext.onAllActiveAnimationsDone(function () { return _this.renderer.destroyView(hostElement, _this.allNodes); });
        }
        else {
            this.renderer.destroyView(hostElement, this.allNodes);
        }
        this.cdMode = __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Destroyed;
    };
    /**
     * Overwritten by implementations
     * @return {?}
     */
    AppView.prototype.destroyInternal = function () { };
    /**
     * Overwritten by implementations
     * @return {?}
     */
    AppView.prototype.detachInternal = function () { };
    /**
     * @return {?}
     */
    AppView.prototype.detach = function () {
        var _this = this;
        this.detachInternal();
        if (this._animationContext) {
            this._animationContext.onAllActiveAnimationsDone(function () { return _this._renderDetach(); });
        }
        else {
            this._renderDetach();
        }
        if (this.declaredViewContainer && this.declaredViewContainer !== this.viewContainer &&
            this.declaredViewContainer.projectedViews) {
            var /** @type {?} */ projectedViews = this.declaredViewContainer.projectedViews;
            var /** @type {?} */ index = projectedViews.indexOf(this);
            // perf: pop is faster than splice!
            if (index >= projectedViews.length - 1) {
                projectedViews.pop();
            }
            else {
                projectedViews.splice(index, 1);
            }
        }
        this.appRef = null;
        this.viewContainer = null;
        this.dirtyParentQueriesInternal();
    };
    /**
     * @return {?}
     */
    AppView.prototype._renderDetach = function () {
        if (this._directRenderer) {
            this.visitRootNodesInternal(this._directRenderer.remove, null);
        }
        else {
            this.renderer.detachView(this.flatRootNodes);
        }
    };
    /**
     * @param {?} appRef
     * @return {?}
     */
    AppView.prototype.attachToAppRef = function (appRef) {
        if (this.viewContainer) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this.appRef = appRef;
        this.dirtyParentQueriesInternal();
    };
    /**
     * @param {?} viewContainer
     * @param {?} prevView
     * @return {?}
     */
    AppView.prototype.attachAfter = function (viewContainer, prevView) {
        if (this.appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._renderAttach(viewContainer, prevView);
        this.viewContainer = viewContainer;
        if (this.declaredViewContainer && this.declaredViewContainer !== viewContainer) {
            if (!this.declaredViewContainer.projectedViews) {
                this.declaredViewContainer.projectedViews = [];
            }
            this.declaredViewContainer.projectedViews.push(this);
        }
        this.dirtyParentQueriesInternal();
    };
    /**
     * @param {?} viewContainer
     * @param {?} prevView
     * @return {?}
     */
    AppView.prototype.moveAfter = function (viewContainer, prevView) {
        this._renderAttach(viewContainer, prevView);
        this.dirtyParentQueriesInternal();
    };
    /**
     * @param {?} viewContainer
     * @param {?} prevView
     * @return {?}
     */
    AppView.prototype._renderAttach = function (viewContainer, prevView) {
        var /** @type {?} */ prevNode = prevView ? prevView.lastRootNode : viewContainer.nativeElement;
        if (this._directRenderer) {
            var /** @type {?} */ nextSibling = this._directRenderer.nextSibling(prevNode);
            if (nextSibling) {
                this.visitRootNodesInternal(this._directRenderer.insertBefore, nextSibling);
            }
            else {
                var /** @type {?} */ parentElement = this._directRenderer.parentElement(prevNode);
                if (parentElement) {
                    this.visitRootNodesInternal(this._directRenderer.appendChild, parentElement);
                }
            }
        }
        else {
            this.renderer.attachViewAfter(prevNode, this.flatRootNodes);
        }
    };
    Object.defineProperty(AppView.prototype, "changeDetectorRef", {
        /**
         * @return {?}
         */
        get: function () { return this.ref; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppView.prototype, "flatRootNodes", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ nodes = [];
            this.visitRootNodesInternal(__WEBPACK_IMPORTED_MODULE_10__view_utils__["addToArray"], nodes);
            return nodes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} parentElement
     * @param {?} ngContentIndex
     * @return {?}
     */
    AppView.prototype.projectNodes = function (parentElement, ngContentIndex) {
        if (this._directRenderer) {
            this.visitProjectedNodes(ngContentIndex, this._directRenderer.appendChild, parentElement);
        }
        else {
            var /** @type {?} */ nodes = [];
            this.visitProjectedNodes(ngContentIndex, __WEBPACK_IMPORTED_MODULE_10__view_utils__["addToArray"], nodes);
            this.renderer.projectNodes(parentElement, nodes);
        }
    };
    /**
     * @param {?} ngContentIndex
     * @param {?} cb
     * @param {?} c
     * @return {?}
     */
    AppView.prototype.visitProjectedNodes = function (ngContentIndex, cb, c) {
        switch (this.type) {
            case __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].EMBEDDED:
                this.parentView.visitProjectedNodes(ngContentIndex, cb, c);
                break;
            case __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].COMPONENT:
                if (this.parentView.type === __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].HOST) {
                    var /** @type {?} */ nodes = this.parentView._hostProjectableNodes[ngContentIndex] || [];
                    for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                        cb(nodes[i], c);
                    }
                }
                else {
                    this.parentView.visitProjectableNodesInternal(this.parentIndex, ngContentIndex, cb, c);
                }
                break;
        }
    };
    /**
     * Overwritten by implementations
     * @param {?} cb
     * @param {?} c
     * @return {?}
     */
    AppView.prototype.visitRootNodesInternal = function (cb, c) { };
    /**
     * Overwritten by implementations
     * @param {?} nodeIndex
     * @param {?} ngContentIndex
     * @param {?} cb
     * @param {?} c
     * @return {?}
     */
    AppView.prototype.visitProjectableNodesInternal = function (nodeIndex, ngContentIndex, cb, c) { };
    /**
     * Overwritten by implementations
     * @return {?}
     */
    AppView.prototype.dirtyParentQueriesInternal = function () { };
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    AppView.prototype.internalDetectChanges = function (throwOnChange) {
        if (this.cdMode !== __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Detached) {
            this.detectChanges(throwOnChange);
        }
    };
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    AppView.prototype.detectChanges = function (throwOnChange) {
        var /** @type {?} */ s = _scope_check(this.clazz);
        if (this.cdMode === __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Checked ||
            this.cdMode === __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Errored)
            return;
        if (this.cdMode === __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Destroyed) {
            this.throwDestroyedError('detectChanges');
        }
        this.detectChangesInternal(throwOnChange);
        if (this.cdMode === __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].CheckOnce)
            this.cdMode = __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Checked;
        this.numberOfChecks++;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["b" /* wtfLeave */])(s);
    };
    /**
     * Overwritten by implementations
     * @param {?} throwOnChange
     * @return {?}
     */
    AppView.prototype.detectChangesInternal = function (throwOnChange) { };
    /**
     * @return {?}
     */
    AppView.prototype.markAsCheckOnce = function () { this.cdMode = __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].CheckOnce; };
    /**
     * @return {?}
     */
    AppView.prototype.markPathToRootAsCheckOnce = function () {
        var /** @type {?} */ c = this;
        while (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["b" /* isPresent */])(c) && c.cdMode !== __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Detached) {
            if (c.cdMode === __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Checked) {
                c.cdMode = __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].CheckOnce;
            }
            if (c.type === __WEBPACK_IMPORTED_MODULE_9__view_type__["a" /* ViewType */].COMPONENT) {
                c = c.parentView;
            }
            else {
                c = c.viewContainer ? c.viewContainer.parentView : null;
            }
        }
    };
    /**
     * @param {?} cb
     * @return {?}
     */
    AppView.prototype.eventHandler = function (cb) {
        return cb;
    };
    /**
     * @param {?} details
     * @return {?}
     */
    AppView.prototype.throwDestroyedError = function (details) { throw new __WEBPACK_IMPORTED_MODULE_7__errors__["b" /* ViewDestroyedError */](details); };
    return AppView;
}());
function AppView_tsickle_Closure_declarations() {
    /** @type {?} */
    AppView.prototype.ref;
    /** @type {?} */
    AppView.prototype.lastRootNode;
    /** @type {?} */
    AppView.prototype.allNodes;
    /** @type {?} */
    AppView.prototype.disposables;
    /** @type {?} */
    AppView.prototype.viewContainer;
    /** @type {?} */
    AppView.prototype.appRef;
    /** @type {?} */
    AppView.prototype.numberOfChecks;
    /** @type {?} */
    AppView.prototype.renderer;
    /** @type {?} */
    AppView.prototype._hasExternalHostElement;
    /** @type {?} */
    AppView.prototype._hostInjector;
    /** @type {?} */
    AppView.prototype._hostProjectableNodes;
    /** @type {?} */
    AppView.prototype._animationContext;
    /** @type {?} */
    AppView.prototype._directRenderer;
    /** @type {?} */
    AppView.prototype.context;
    /** @type {?} */
    AppView.prototype.clazz;
    /** @type {?} */
    AppView.prototype.componentType;
    /** @type {?} */
    AppView.prototype.type;
    /** @type {?} */
    AppView.prototype.viewUtils;
    /** @type {?} */
    AppView.prototype.parentView;
    /** @type {?} */
    AppView.prototype.parentIndex;
    /** @type {?} */
    AppView.prototype.parentElement;
    /** @type {?} */
    AppView.prototype.cdMode;
    /** @type {?} */
    AppView.prototype.declaredViewContainer;
}
var DebugAppView = (function (_super) {
    __extends(DebugAppView, _super);
    /**
     * @param {?} clazz
     * @param {?} componentType
     * @param {?} type
     * @param {?} viewUtils
     * @param {?} parentView
     * @param {?} parentIndex
     * @param {?} parentNode
     * @param {?} cdMode
     * @param {?} staticNodeDebugInfos
     * @param {?=} declaredViewContainer
     */
    function DebugAppView(clazz, componentType, type, viewUtils, parentView, parentIndex, parentNode, cdMode, staticNodeDebugInfos, declaredViewContainer) {
        if (declaredViewContainer === void 0) { declaredViewContainer = null; }
        _super.call(this, clazz, componentType, type, viewUtils, parentView, parentIndex, parentNode, cdMode, declaredViewContainer);
        this.staticNodeDebugInfos = staticNodeDebugInfos;
        this._currentDebugContext = null;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    DebugAppView.prototype.create = function (context) {
        this._resetDebug();
        try {
            return _super.prototype.create.call(this, context);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    /**
     * @param {?} rootSelectorOrNode
     * @param {?} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    DebugAppView.prototype.createHostView = function (rootSelectorOrNode, injector, projectableNodes) {
        if (projectableNodes === void 0) { projectableNodes = null; }
        this._resetDebug();
        try {
            return _super.prototype.createHostView.call(this, rootSelectorOrNode, injector, projectableNodes);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    /**
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?=} notFoundResult
     * @return {?}
     */
    DebugAppView.prototype.injectorGet = function (token, nodeIndex, notFoundResult) {
        this._resetDebug();
        try {
            return _super.prototype.injectorGet.call(this, token, nodeIndex, notFoundResult);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    /**
     * @return {?}
     */
    DebugAppView.prototype.detach = function () {
        this._resetDebug();
        try {
            _super.prototype.detach.call(this);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    /**
     * @return {?}
     */
    DebugAppView.prototype.destroy = function () {
        this._resetDebug();
        try {
            _super.prototype.destroy.call(this);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    DebugAppView.prototype.detectChanges = function (throwOnChange) {
        this._resetDebug();
        try {
            _super.prototype.detectChanges.call(this, throwOnChange);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    /**
     * @return {?}
     */
    DebugAppView.prototype._resetDebug = function () { this._currentDebugContext = null; };
    /**
     * @param {?} nodeIndex
     * @param {?} rowNum
     * @param {?} colNum
     * @return {?}
     */
    DebugAppView.prototype.debug = function (nodeIndex, rowNum, colNum) {
        return this._currentDebugContext = new __WEBPACK_IMPORTED_MODULE_5__debug_context__["a" /* DebugContext */](this, nodeIndex, rowNum, colNum);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DebugAppView.prototype._rethrowWithContext = function (e) {
        if (!(e instanceof __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* ViewWrappedError */])) {
            if (!(e instanceof __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ExpressionChangedAfterItHasBeenCheckedError */])) {
                this.cdMode = __WEBPACK_IMPORTED_MODULE_0__change_detection_change_detection__["b" /* ChangeDetectorStatus */].Errored;
            }
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["b" /* isPresent */])(this._currentDebugContext)) {
                throw new __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* ViewWrappedError */](e, this._currentDebugContext);
            }
        }
    };
    /**
     * @param {?} cb
     * @return {?}
     */
    DebugAppView.prototype.eventHandler = function (cb) {
        var _this = this;
        var /** @type {?} */ superHandler = _super.prototype.eventHandler.call(this, cb);
        return function (eventName, event) {
            _this._resetDebug();
            try {
                return superHandler.call(_this, eventName, event);
            }
            catch (e) {
                _this._rethrowWithContext(e);
                throw e;
            }
        };
    };
    return DebugAppView;
}(AppView));
function DebugAppView_tsickle_Closure_declarations() {
    /** @type {?} */
    DebugAppView.prototype._currentDebugContext;
    /** @type {?} */
    DebugAppView.prototype.staticNodeDebugInfos;
}
//# sourceMappingURL=view.js.map

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_ref__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_container_ref__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_type__ = __webpack_require__(63);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewContainer; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * A ViewContainer is created for elements that have a ViewContainerRef
 * to keep track of the nested views.
 */
var ViewContainer = (function () {
    /**
     * @param {?} index
     * @param {?} parentIndex
     * @param {?} parentView
     * @param {?} nativeElement
     */
    function ViewContainer(index, parentIndex, parentView, nativeElement) {
        this.index = index;
        this.parentIndex = parentIndex;
        this.parentView = parentView;
        this.nativeElement = nativeElement;
    }
    Object.defineProperty(ViewContainer.prototype, "elementRef", {
        /**
         * @return {?}
         */
        get: function () { return new __WEBPACK_IMPORTED_MODULE_0__element_ref__["a" /* ElementRef */](this.nativeElement); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainer.prototype, "vcRef", {
        /**
         * @return {?}
         */
        get: function () { return new __WEBPACK_IMPORTED_MODULE_1__view_container_ref__["a" /* ViewContainerRef_ */](this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainer.prototype, "parentInjector", {
        /**
         * @return {?}
         */
        get: function () { return this.parentView.injector(this.parentIndex); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainer.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return this.parentView.injector(this.index); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    ViewContainer.prototype.detectChangesInNestedViews = function (throwOnChange) {
        if (this.nestedViews) {
            for (var /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                this.nestedViews[i].detectChanges(throwOnChange);
            }
        }
    };
    /**
     * @return {?}
     */
    ViewContainer.prototype.destroyNestedViews = function () {
        if (this.nestedViews) {
            for (var /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                this.nestedViews[i].destroy();
            }
        }
    };
    /**
     * @param {?} cb
     * @param {?} c
     * @return {?}
     */
    ViewContainer.prototype.visitNestedViewRootNodes = function (cb, c) {
        if (this.nestedViews) {
            for (var /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                this.nestedViews[i].visitRootNodesInternal(cb, c);
            }
        }
    };
    /**
     * @param {?} nestedViewClass
     * @param {?} callback
     * @return {?}
     */
    ViewContainer.prototype.mapNestedViews = function (nestedViewClass, callback) {
        var /** @type {?} */ result = [];
        if (this.nestedViews) {
            for (var /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                var /** @type {?} */ nestedView = this.nestedViews[i];
                if (nestedView.clazz === nestedViewClass) {
                    result.push(callback(nestedView));
                }
            }
        }
        if (this.projectedViews) {
            for (var /** @type {?} */ i = 0; i < this.projectedViews.length; i++) {
                var /** @type {?} */ projectedView = this.projectedViews[i];
                if (projectedView.clazz === nestedViewClass) {
                    result.push(callback(projectedView));
                }
            }
        }
        return result;
    };
    /**
     * @param {?} view
     * @param {?} currentIndex
     * @return {?}
     */
    ViewContainer.prototype.moveView = function (view, currentIndex) {
        var /** @type {?} */ previousIndex = this.nestedViews.indexOf(view);
        if (view.type === __WEBPACK_IMPORTED_MODULE_2__view_type__["a" /* ViewType */].COMPONENT) {
            throw new Error("Component views can't be moved!");
        }
        var /** @type {?} */ nestedViews = this.nestedViews;
        if (nestedViews == null) {
            nestedViews = [];
            this.nestedViews = nestedViews;
        }
        nestedViews.splice(previousIndex, 1);
        nestedViews.splice(currentIndex, 0, view);
        var /** @type {?} */ prevView = currentIndex > 0 ? nestedViews[currentIndex - 1] : null;
        view.moveAfter(this, prevView);
    };
    /**
     * @param {?} view
     * @param {?} viewIndex
     * @return {?}
     */
    ViewContainer.prototype.attachView = function (view, viewIndex) {
        if (view.type === __WEBPACK_IMPORTED_MODULE_2__view_type__["a" /* ViewType */].COMPONENT) {
            throw new Error("Component views can't be moved!");
        }
        var /** @type {?} */ nestedViews = this.nestedViews;
        if (nestedViews == null) {
            nestedViews = [];
            this.nestedViews = nestedViews;
        }
        // perf: array.push is faster than array.splice!
        if (viewIndex >= nestedViews.length) {
            nestedViews.push(view);
        }
        else {
            nestedViews.splice(viewIndex, 0, view);
        }
        var /** @type {?} */ prevView = viewIndex > 0 ? nestedViews[viewIndex - 1] : null;
        view.attachAfter(this, prevView);
    };
    /**
     * @param {?} viewIndex
     * @return {?}
     */
    ViewContainer.prototype.detachView = function (viewIndex) {
        var /** @type {?} */ view = this.nestedViews[viewIndex];
        // perf: array.pop is faster than array.splice!
        if (viewIndex >= this.nestedViews.length - 1) {
            this.nestedViews.pop();
        }
        else {
            this.nestedViews.splice(viewIndex, 1);
        }
        if (view.type === __WEBPACK_IMPORTED_MODULE_2__view_type__["a" /* ViewType */].COMPONENT) {
            throw new Error("Component views can't be moved!");
        }
        view.detach();
        return view;
    };
    return ViewContainer;
}());
function ViewContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    ViewContainer.prototype.nestedViews;
    /** @type {?} */
    ViewContainer.prototype.projectedViews;
    /** @type {?} */
    ViewContainer.prototype.index;
    /** @type {?} */
    ViewContainer.prototype.parentIndex;
    /** @type {?} */
    ViewContainer.prototype.parentView;
    /** @type {?} */
    ViewContainer.prototype.nativeElement;
}
//# sourceMappingURL=view_container.js.map

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__di_opaque_token__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_decorators__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ANALYZE_FOR_ENTRY_COMPONENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ContentChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ContentChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ViewChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ViewChild; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * This token can be used to create a virtual provider that will populate the
 * `entryComponents` fields of components and ng modules based on its `useValue`.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) will be added to the `entryComponents` property.
 *
 * ### Example
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on the router configuration which refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * @NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * @experimental
 */
var /** @type {?} */ ANALYZE_FOR_ENTRY_COMPONENTS = new __WEBPACK_IMPORTED_MODULE_0__di_opaque_token__["a" /* OpaqueToken */]('AnalyzeForEntryComponents');
/**
 * Attribute decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Attribute = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["b" /* makeParamDecorator */])('Attribute', [['attributeName', undefined]]);
/**
 * Base class for query metadata.
 *
 * See {\@link ContentChildren}, {\@link ContentChild}, {\@link ViewChildren}, {\@link ViewChild} for
 * more information.
 *
 * \@stable
 * @abstract
 */
var Query = (function () {
    function Query() {
    }
    return Query;
}());
/**
 * ContentChildren decorator and metadata.
 *
 *  @stable
 *  @Annotation
 */
var /** @type {?} */ ContentChildren = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["d" /* makePropDecorator */])('ContentChildren', [
    ['selector', undefined], {
        first: false,
        isViewQuery: false,
        descendants: false,
        read: undefined,
    }
], Query));
/**
 * ContentChild decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ ContentChild = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["d" /* makePropDecorator */])('ContentChild', [
    ['selector', undefined], {
        first: true,
        isViewQuery: false,
        descendants: true,
        read: undefined,
    }
], Query);
/**
 * ViewChildren decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ ViewChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["d" /* makePropDecorator */])('ViewChildren', [
    ['selector', undefined], {
        first: false,
        isViewQuery: true,
        descendants: true,
        read: undefined,
    }
], Query);
/**
 * ViewChild decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ ViewChild = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["d" /* makePropDecorator */])('ViewChild', [
    ['selector', undefined], {
        first: true,
        isViewQuery: true,
        descendants: true,
        read: undefined,
    }
], Query);
//# sourceMappingURL=di.js.map

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_detection_constants__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_decorators__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Directive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return Pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Input; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Output; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HostBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HostListener; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * Directive decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Directive = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["a" /* makeDecorator */])('Directive', {
    selector: undefined,
    inputs: undefined,
    outputs: undefined,
    host: undefined,
    providers: undefined,
    exportAs: undefined,
    queries: undefined
}));
/**
 * Component decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Component = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["a" /* makeDecorator */])('Component', {
    selector: undefined,
    inputs: undefined,
    outputs: undefined,
    host: undefined,
    exportAs: undefined,
    moduleId: undefined,
    providers: undefined,
    viewProviders: undefined,
    changeDetection: __WEBPACK_IMPORTED_MODULE_0__change_detection_constants__["c" /* ChangeDetectionStrategy */].Default,
    queries: undefined,
    templateUrl: undefined,
    template: undefined,
    styleUrls: undefined,
    styles: undefined,
    animations: undefined,
    encapsulation: undefined,
    interpolation: undefined,
    entryComponents: undefined
}, Directive));
/**
 * Pipe decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Pipe = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["a" /* makeDecorator */])('Pipe', {
    name: undefined,
    pure: true,
}));
/**
 * Input decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Input = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["d" /* makePropDecorator */])('Input', [['bindingPropertyName', undefined]]);
/**
 * Output decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ Output = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["d" /* makePropDecorator */])('Output', [['bindingPropertyName', undefined]]);
/**
 * HostBinding decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ HostBinding = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["d" /* makePropDecorator */])('HostBinding', [['hostPropertyName', undefined]]);
/**
 * HostListener decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ HostListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_decorators__["d" /* makePropDecorator */])('HostListener', [['eventName', undefined], ['args', []]]);
//# sourceMappingURL=directives.js.map

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_decorators__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CUSTOM_ELEMENTS_SCHEMA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NO_ERRORS_SCHEMA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NgModule; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Defines a schema that will allow:
 * - any non-Angular elements with a `-` in their name,
 * - any properties on elements with a `-` in their name which is the common rule for custom
 * elements.
 *
 * @stable
 */
var /** @type {?} */ CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Defines a schema that will allow any property on any element.
 *
 * @experimental
 */
var /** @type {?} */ NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
/**
 * NgModule decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var /** @type {?} */ NgModule = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_decorators__["a" /* makeDecorator */])('NgModule', {
    providers: undefined,
    declarations: undefined,
    imports: undefined,
    exports: undefined,
    entryComponents: undefined,
    bootstrap: undefined,
    schemas: undefined,
    id: undefined,
}));
//# sourceMappingURL=ng_module.js.map

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_ref__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__console__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reflection_reflection__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reflection_reflector_reader__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__testability_testability__ = __webpack_require__(88);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return platformCore; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





/**
 * @return {?}
 */
function _reflector() {
    return __WEBPACK_IMPORTED_MODULE_2__reflection_reflection__["a" /* reflector */];
}
var /** @type {?} */ _CORE_PLATFORM_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_0__application_ref__["l" /* PlatformRef_ */],
    { provide: __WEBPACK_IMPORTED_MODULE_0__application_ref__["e" /* PlatformRef */], useExisting: __WEBPACK_IMPORTED_MODULE_0__application_ref__["l" /* PlatformRef_ */] },
    { provide: __WEBPACK_IMPORTED_MODULE_2__reflection_reflection__["b" /* Reflector */], useFactory: _reflector, deps: [] },
    { provide: __WEBPACK_IMPORTED_MODULE_3__reflection_reflector_reader__["a" /* ReflectorReader */], useExisting: __WEBPACK_IMPORTED_MODULE_2__reflection_reflection__["b" /* Reflector */] },
    __WEBPACK_IMPORTED_MODULE_4__testability_testability__["b" /* TestabilityRegistry */],
    __WEBPACK_IMPORTED_MODULE_1__console__["a" /* Console */],
];
/**
 * This platform has to be included in any other platform
 *
 * @experimental
 */
var /** @type {?} */ platformCore = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__application_ref__["i" /* createPlatformFactory */])(null, 'core', _CORE_PLATFORM_PROVIDERS);
//# sourceMappingURL=platform_core_providers.js.map

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = detectWTF;
/* harmony export (immutable) */ __webpack_exports__["b"] = createScope;
/* harmony export (immutable) */ __webpack_exports__["c"] = leave;
/* harmony export (immutable) */ __webpack_exports__["d"] = startTimeRange;
/* harmony export (immutable) */ __webpack_exports__["e"] = endTimeRange;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var /** @type {?} */ trace;
var /** @type {?} */ events;
/**
 * @return {?}
 */
function detectWTF() {
    var /** @type {?} */ wtf = ((__WEBPACK_IMPORTED_MODULE_0__facade_lang__["h" /* global */]) /** TODO #9100 */)['wtf'];
    if (wtf) {
        trace = wtf['trace'];
        if (trace) {
            events = trace['events'];
            return true;
        }
    }
    return false;
}
/**
 * @param {?} signature
 * @param {?=} flags
 * @return {?}
 */
function createScope(signature, flags) {
    if (flags === void 0) { flags = null; }
    return events.createScope(signature, flags);
}
/**
 * @param {?} scope
 * @param {?=} returnValue
 * @return {?}
 */
function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
}
/**
 * @param {?} rangeType
 * @param {?} action
 * @return {?}
 */
function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
}
/**
 * @param {?} range
 * @return {?}
 */
function endTimeRange(range) {
    trace.endTimeRange(range);
}
//# sourceMappingURL=wtf_impl.js.map

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_api__ = __webpack_require__(87);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__render_api__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__render_api__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__render_api__["b"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for render

//# sourceMappingURL=render.js.map

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_decorators__ = __webpack_require__(32);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__util_decorators__["c"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for util

//# sourceMappingURL=util.js.map

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__zone_ng_zone__ = __webpack_require__(66);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__zone_ng_zone__["a"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for Zone

//# sourceMappingURL=zone.js.map

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(23);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(13)
  , toIndex  = __webpack_require__(54)
  , toLength = __webpack_require__(11);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(69);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(16)
  , toObject  = __webpack_require__(13)
  , IObject   = __webpack_require__(92)
  , toLength  = __webpack_require__(11);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(16)
  , isObject   = __webpack_require__(6)
  , invoke     = __webpack_require__(106)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(9).f
  , create      = __webpack_require__(49)
  , redefineAll = __webpack_require__(52)
  , ctx         = __webpack_require__(36)
  , anInstance  = __webpack_require__(47)
  , defined     = __webpack_require__(24)
  , forOf       = __webpack_require__(69)
  , $iterDefine = __webpack_require__(172)
  , step        = __webpack_require__(236)
  , setSpecies  = __webpack_require__(53)
  , DESCRIPTORS = __webpack_require__(8)
  , fastKey     = __webpack_require__(44).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(91)
  , from    = __webpack_require__(227);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(52)
  , getWeak           = __webpack_require__(44).getWeak
  , anObject          = __webpack_require__(3)
  , isObject          = __webpack_require__(6)
  , anInstance        = __webpack_require__(47)
  , forOf             = __webpack_require__(69)
  , createArrayMethod = __webpack_require__(28)
  , $has              = __webpack_require__(14)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(5)(function(){
  return Object.defineProperty(__webpack_require__(164)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(6)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(3);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 237 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(51)
  , gOPS     = __webpack_require__(110)
  , pIE      = __webpack_require__(93)
  , toObject = __webpack_require__(13)
  , IObject  = __webpack_require__(92)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(5)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(9)
  , anObject = __webpack_require__(3)
  , getKeys  = __webpack_require__(51);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(20)
  , gOPN      = __webpack_require__(50).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(14)
  , toIObject    = __webpack_require__(20)
  , arrayIndexOf = __webpack_require__(102)(false)
  , IE_PROTO     = __webpack_require__(177)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(51)
  , toIObject = __webpack_require__(20)
  , isEnum    = __webpack_require__(93).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(50)
  , gOPS     = __webpack_require__(110)
  , anObject = __webpack_require__(3)
  , Reflect  = __webpack_require__(4).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(4).parseFloat
  , $trim       = __webpack_require__(72).trim;

module.exports = 1 / $parseFloat(__webpack_require__(182) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(4).parseInt
  , $trim     = __webpack_require__(72).trim
  , ws        = __webpack_require__(182)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 246 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(11)
  , repeat   = __webpack_require__(181)
  , defined  = __webpack_require__(24);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(230);

// 23.1 Map Objects
module.exports = __webpack_require__(103)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(8) && /./g.flags != 'g')__webpack_require__(9).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(105)
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(230);

// 23.2 Set Objects
module.exports = __webpack_require__(103)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(28)(0)
  , redefine     = __webpack_require__(18)
  , meta         = __webpack_require__(44)
  , assign       = __webpack_require__(238)
  , weak         = __webpack_require__(232)
  , isObject     = __webpack_require__(6)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(103)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 253 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(94);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(114);
var rxSubscriber_1 = __webpack_require__(95);
var Observer_1 = __webpack_require__(152);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(155);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(482);

__webpack_require__(483);

__webpack_require__(302);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	 true ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var Zone$1 = (function (global) {
    if (global['Zone']) {
        throw new Error('Zone already loaded.');
    }
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var Zone = (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global.Promise !== ZoneAwarePromise) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = undefined; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this)
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                    // if the task's state is notScheduled, then it has already been cancelled
                    // we should not reset the state to scheduled
                    if (task.state !== notScheduled) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                }
                else {
                    task.runCount = 0;
                    this._updateTaskCount(task, -1);
                    reEntryGuard && task._transitionTo(notScheduled, running, notScheduled);
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task.zone = this;
            task = this._zoneDelegate.scheduleTask(this, task);
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            task._transitionTo(canceling, scheduled, running);
            this._zoneDelegate.cancelTask(this, task);
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) {
            return delegate.invokeTask(target, task, applyThis, applyArgs);
        },
        onCancelTask: function (delegate, _, target, task) {
            return delegate.cancelTask(target, task);
        }
    };
    var ZoneDelegate = (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ?
                this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            return this._hasTaskZS &&
                this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts.microTask > 0,
                    macroTask: counts.macroTask > 0,
                    eventTask: counts.eventTask > 0,
                    change: type
                };
                // TODO(misko): what should happen if it throws?
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this.zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            this.invoke = function () {
                _numberOfNestedTaskFrames++;
                try {
                    self.runCount++;
                    return self.zone.runTask(self, this, arguments);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            };
        }
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ?
                    ' or \'' + fromState2 + '\'' :
                    '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                data: this.data,
                zone: this.zone.name,
                invoke: this.invoke,
                scheduleFn: this.scheduleFn,
                cancelFn: this.cancelFn,
                runCount: this.runCount,
                callback: this.callback
            };
        };
        return ZoneTask;
    }());
    var ZoneFrame = (function () {
        function ZoneFrame(parent, zone) {
            this.parent = parent;
            this.zone = zone;
        }
        return ZoneFrame;
    }());
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _currentZoneFrame = new ZoneFrame(null, new Zone(null, null));
    var _currentTask = null;
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var _uncaughtPromiseErrors = [];
    var _numberOfNestedTaskFrames = 0;
    function scheduleQueueDrain() {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (global[symbolPromise]) {
                global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
    }
    function scheduleMicroTask(task) {
        scheduleQueueDrain();
        _microTaskQueue.push(task);
    }
    function consoleError(e) {
        if (Zone[__symbol__('ignoreConsoleErrorUncaughtError')]) {
            return;
        }
        var rejection = e && e.rejection;
        if (rejection) {
            console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
        }
        console.error(e);
    }
    function handleUnhandledRejection(e) {
        consoleError(e);
        try {
            var handler = Zone[__symbol__('unhandledPromiseRejectionHandler')];
            if (handler && typeof handler === 'function') {
                handler.apply(this, [e]);
            }
        }
        catch (err) {
        }
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        consoleError(error);
                    }
                }
            }
            while (_uncaughtPromiseErrors.length) {
                var _loop_1 = function() {
                    var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                    try {
                        uncaughtPromiseError.zone.runGuarded(function () {
                            throw uncaughtPromiseError;
                        });
                    }
                    catch (error) {
                        handleUnhandledRejection(error);
                    }
                };
                while (_uncaughtPromiseErrors.length) {
                    _loop_1();
                }
            }
            _isDrainingMicrotaskQueue = false;
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError('Promise resolved with itself');
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.apply(value, [
                        onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false))
                    ]);
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    value[__symbol__('currentTask')] = Zone.currentTask;
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        throw new Error('Uncaught (in promise): ' + value +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        scheduleQueueDrain();
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[__symbol__('rejectionHandledHandler')];
                if (handler && typeof handler === 'function') {
                    handler.apply(this, [{ rejection: promise[symbolValue], promise: promise }]);
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var delegate = promise[symbolState] ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                resolvePromise(chainPromise, true, zone.run(delegate, undefined, [promise[symbolValue]]));
            }
            catch (error) {
                resolvePromise(chainPromise, false, error);
            }
        });
    }
    var ZoneAwarePromise = (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return 'function ZoneAwarePromise() { [native code] }';
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                _a = [res, rej], resolve = _a[0], reject = _a[1];
                var _a;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var Ctor = resultPromise.constructor;
            if (!Ctor[symbolThenPatched]) {
                patchThen(Ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch = global['fetch'];
        if (typeof fetch == 'function') {
            global['fetch'] = zoneify(fetch);
        }
    }
    // This is not part of public API, but it is usefull for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    /*
     * This code patches Error so that:
     *   - It ignores un-needed stack frames.
     *   - It Shows the associated Zone for reach frame.
     */
    var FrameType;
    (function (FrameType) {
        /// Skip this frame when printing out stack
        FrameType[FrameType["blackList"] = 0] = "blackList";
        /// This frame marks zone transition
        FrameType[FrameType["transition"] = 1] = "transition";
    })(FrameType || (FrameType = {}));
    var NativeError = global[__symbol__('Error')] = global.Error;
    // Store the frames which should be removed from the stack frames
    var blackListedStackFrames = {};
    // We must find the frame where Error was created, otherwise we assume we don't understand stack
    var zoneAwareFrame;
    global.Error = ZoneAwareError;
    // How should the stack frames be parsed.
    var frameParserStrategy = null;
    var stackRewrite = 'stackRewrite';
    // fix #595, create property descriptor
    // for error properties
    var createProperty = function (props, key) {
        // if property is already defined, skip it.
        if (props[key]) {
            return;
        }
        // define a local property
        // in case error property is not settable
        var name = __symbol__(key);
        props[key] = {
            configurable: true,
            enumerable: true,
            get: function () {
                // if local property has no value
                // use internal error's property value
                if (!this[name]) {
                    var error_2 = this[__symbol__('error')];
                    if (error_2) {
                        this[name] = error_2[key];
                    }
                }
                return this[name];
            },
            set: function (value) {
                // setter will set value to local property value
                this[name] = value;
            }
        };
    };
    // fix #595, create property descriptor
    // for error method properties
    var createMethodProperty = function (props, key) {
        if (props[key]) {
            return;
        }
        props[key] = {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function () {
                var error = this[__symbol__('error')];
                var errorMethod = (error && error[key]) || this[key];
                if (errorMethod) {
                    return errorMethod.apply(error, arguments);
                }
            }
        };
    };
    var createErrorProperties = function () {
        var props = Object.create(null);
        var error = new NativeError();
        var keys = Object.getOwnPropertyNames(error);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(error, key)) {
                createProperty(props, key);
            }
        }
        var proto = NativeError.prototype;
        if (proto) {
            var pKeys = Object.getOwnPropertyNames(proto);
            for (var i = 0; i < pKeys.length; i++) {
                var key = pKeys[i];
                // skip constructor
                if (key !== 'constructor' && key !== 'toString' && key !== 'toSource') {
                    createProperty(props, key);
                }
            }
        }
        // some other properties are not
        // in NativeError
        createProperty(props, 'originalStack');
        createProperty(props, 'zoneAwareStack');
        // define toString, toSource as method property
        createMethodProperty(props, 'toString');
        createMethodProperty(props, 'toSource');
        return props;
    };
    var errorProperties = createErrorProperties();
    // for derived Error class which extends ZoneAwareError
    // we should not override the derived class's property
    // so we create a new props object only copy the properties
    // from errorProperties which not exist in derived Error's prototype
    var getErrorPropertiesForPrototype = function (prototype) {
        // if the prototype is ZoneAwareError.prototype
        // we just return the prebuilt errorProperties.
        if (prototype === ZoneAwareError.prototype) {
            return errorProperties;
        }
        var newProps = Object.create(null);
        var cKeys = Object.getOwnPropertyNames(errorProperties);
        var keys = Object.getOwnPropertyNames(prototype);
        cKeys.forEach(function (cKey) {
            if (keys.filter(function (key) {
                return key === cKey;
            })
                .length === 0) {
                newProps[cKey] = errorProperties[cKey];
            }
        });
        return newProps;
    };
    /**
     * This is ZoneAwareError which processes the stack frame and cleans up extra frames as well as
     * adds zone information to it.
     */
    function ZoneAwareError() {
        // make sure we have a valid this
        // if this is undefined(call Error without new) or this is global
        // or this is some other objects, we should force to create a
        // valid ZoneAwareError by call Object.create()
        if (!(this instanceof ZoneAwareError)) {
            return ZoneAwareError.apply(Object.create(ZoneAwareError.prototype), arguments);
        }
        // Create an Error.
        var error = NativeError.apply(this, arguments);
        this[__symbol__('error')] = error;
        // Save original stack trace
        error.originalStack = error.stack;
        // Process the stack trace and rewrite the frames.
        if (ZoneAwareError[stackRewrite] && error.originalStack) {
            var frames_1 = error.originalStack.split('\n');
            var zoneFrame = _currentZoneFrame;
            var i = 0;
            // Find the first frame
            while (frames_1[i] !== zoneAwareFrame && i < frames_1.length) {
                i++;
            }
            for (; i < frames_1.length && zoneFrame; i++) {
                var frame = frames_1[i];
                if (frame.trim()) {
                    var frameType = blackListedStackFrames.hasOwnProperty(frame) && blackListedStackFrames[frame];
                    if (frameType === FrameType.blackList) {
                        frames_1.splice(i, 1);
                        i--;
                    }
                    else if (frameType === FrameType.transition) {
                        if (zoneFrame.parent) {
                            // This is the special frame where zone changed. Print and process it accordingly
                            frames_1[i] += " [" + zoneFrame.parent.zone.name + " => " + zoneFrame.zone.name + "]";
                            zoneFrame = zoneFrame.parent;
                        }
                        else {
                            zoneFrame = null;
                        }
                    }
                    else {
                        frames_1[i] += " [" + zoneFrame.zone.name + "]";
                    }
                }
            }
            error.stack = error.zoneAwareStack = frames_1.join('\n');
        }
        // use defineProperties here instead of copy property value
        // because of issue #595 which will break angular2.
        Object.defineProperties(this, getErrorPropertiesForPrototype(Object.getPrototypeOf(this)));
        return this;
    }
    // Copy the prototype so that instanceof operator works as expected
    ZoneAwareError.prototype = NativeError.prototype;
    ZoneAwareError[Zone.__symbol__('blacklistedStackFrames')] = blackListedStackFrames;
    ZoneAwareError[stackRewrite] = false;
    // those properties need special handling
    var specialPropertyNames = ['stackTraceLimit', 'captureStackTrace', 'prepareStackTrace'];
    // those properties of NativeError should be set to ZoneAwareError
    var nativeErrorProperties = Object.keys(NativeError);
    if (nativeErrorProperties) {
        nativeErrorProperties.forEach(function (prop) {
            if (specialPropertyNames.filter(function (sp) { return sp === prop; }).length === 0) {
                Object.defineProperty(ZoneAwareError, prop, {
                    get: function () {
                        return NativeError[prop];
                    },
                    set: function (value) {
                        NativeError[prop] = value;
                    }
                });
            }
        });
    }
    if (NativeError.hasOwnProperty('stackTraceLimit')) {
        // Extend default stack limit as we will be removing few frames.
        NativeError.stackTraceLimit = Math.max(NativeError.stackTraceLimit, 15);
        // make sure that ZoneAwareError has the same property which forwards to NativeError.
        Object.defineProperty(ZoneAwareError, 'stackTraceLimit', {
            get: function () {
                return NativeError.stackTraceLimit;
            },
            set: function (value) {
                return NativeError.stackTraceLimit = value;
            }
        });
    }
    if (NativeError.hasOwnProperty('captureStackTrace')) {
        Object.defineProperty(ZoneAwareError, 'captureStackTrace', {
            // add named function here because we need to remove this
            // stack frame when prepareStackTrace below
            value: function zoneCaptureStackTrace(targetObject, constructorOpt) {
                NativeError.captureStackTrace(targetObject, constructorOpt);
            }
        });
    }
    Object.defineProperty(ZoneAwareError, 'prepareStackTrace', {
        get: function () {
            return NativeError.prepareStackTrace;
        },
        set: function (value) {
            if (!value || typeof value !== 'function') {
                return NativeError.prepareStackTrace = value;
            }
            return NativeError.prepareStackTrace = function (error, structuredStackTrace) {
                // remove additional stack information from ZoneAwareError.captureStackTrace
                if (structuredStackTrace) {
                    for (var i = 0; i < structuredStackTrace.length; i++) {
                        var st = structuredStackTrace[i];
                        // remove the first function which name is zoneCaptureStackTrace
                        if (st.getFunctionName() === 'zoneCaptureStackTrace') {
                            structuredStackTrace.splice(i, 1);
                            break;
                        }
                    }
                }
                return value.apply(this, [error, structuredStackTrace]);
            };
        }
    });
    // Now we need to populet the `blacklistedStackFrames` as well as find the
    // run/runGuraded/runTask frames. This is done by creating a detect zone and then threading
    // the execution through all of the above methods so that we can look at the stack trace and
    // find the frames of interest.
    var detectZone = Zone.current.fork({
        name: 'detect',
        onInvoke: function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
            // Here only so that it will show up in the stack frame so that it can be black listed.
            return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
        },
        onHandleError: function (parentZD, current, target, error) {
            if (error.originalStack && Error === ZoneAwareError) {
                var frames_2 = error.originalStack.split(/\n/);
                var runFrame = false, runGuardedFrame = false, runTaskFrame = false;
                while (frames_2.length) {
                    var frame = frames_2.shift();
                    // On safari it is possible to have stack frame with no line number.
                    // This check makes sure that we don't filter frames on name only (must have
                    // linenumber)
                    if (/:\d+:\d+/.test(frame)) {
                        // Get rid of the path so that we don't accidintely find function name in path.
                        // In chrome the seperator is `(` and `@` in FF and safari
                        // Chrome: at Zone.run (zone.js:100)
                        // Chrome: at Zone.run (http://localhost:9876/base/build/lib/zone.js:100:24)
                        // FireFox: Zone.prototype.run@http://localhost:9876/base/build/lib/zone.js:101:24
                        // Safari: run@http://localhost:9876/base/build/lib/zone.js:101:24
                        var fnName = frame.split('(')[0].split('@')[0];
                        var frameType = FrameType.transition;
                        if (fnName.indexOf('ZoneAwareError') !== -1) {
                            zoneAwareFrame = frame;
                        }
                        if (fnName.indexOf('runGuarded') !== -1) {
                            runGuardedFrame = true;
                        }
                        else if (fnName.indexOf('runTask') !== -1) {
                            runTaskFrame = true;
                        }
                        else if (fnName.indexOf('run') !== -1) {
                            runFrame = true;
                        }
                        else {
                            frameType = FrameType.blackList;
                        }
                        blackListedStackFrames[frame] = frameType;
                        // Once we find all of the frames we can stop looking.
                        if (runFrame && runGuardedFrame && runTaskFrame) {
                            ZoneAwareError[stackRewrite] = true;
                            break;
                        }
                    }
                }
            }
            return false;
        }
    });
    // carefully constructor a stack frame which contains all of the frames of interest which
    // need to be detected and blacklisted.
    var detectRunFn = function () {
        detectZone.run(function () {
            detectZone.runGuarded(function () {
                throw new Error('blacklistStackFrames');
            });
        });
    };
    // Cause the error to extract the stack frames.
    detectZone.runTask(detectZone.scheduleMacroTask('detect', detectRunFn, null, function () { return null; }, null));
    return global['Zone'] = Zone;
})(typeof window === 'object' && window || typeof self === 'object' && self || global);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis}
 */
var zoneSymbol = function (n) { return ("__zone_symbol__" + n); };
var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = Zone.current.wrap(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function(i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            prototype[name_1] = (function (delegate) {
                return function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
var isNode = (!('nw' in _global$1) && typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
var isMix = typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]' && !isWebWorker &&
    !!(typeof window !== 'undefined' && window['HTMLElement']);
function patchProperty(obj, prop) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop) || { enumerable: true, configurable: true };
    var originalDesc = Object.getOwnPropertyDescriptor(obj, 'original' + prop);
    if (!originalDesc && desc.get) {
        Object.defineProperty(obj, 'original' + prop, { enumerable: false, configurable: true, get: desc.get });
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var _prop = zoneSymbol('_' + prop);
    desc.set = function (fn) {
        if (this[_prop]) {
            this.removeEventListener(eventName, this[_prop]);
        }
        if (typeof fn === 'function') {
            var wrapFn = function (event) {
                var result;
                result = fn.apply(this, arguments);
                if (result != undefined && !result)
                    event.preventDefault();
            };
            this[_prop] = wrapFn;
            this.addEventListener(eventName, wrapFn, false);
        }
        else {
            this[_prop] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        var r = this[_prop] || null;
        // result will be null when use inline event attribute,
        // such as <button onclick="func();">OK</button>
        // because the onclick function is internal raw uncompiled handler
        // the onclick will be evaluated when first time event was triggered or
        // the property is accessed, https://github.com/angular/zone.js/issues/525
        // so we should use original native get to retrieve the handler
        if (r === null) {
            if (originalDesc && originalDesc.get) {
                r = originalDesc.get.apply(this, arguments);
                if (r) {
                    desc.set.apply(this, [r]);
                    if (typeof this['removeAttribute'] === 'function') {
                        this.removeAttribute(prop);
                    }
                }
            }
        }
        return this[_prop] || null;
    };
    Object.defineProperty(obj, prop, desc);
}

function patchOnProperties(obj, properties) {
    var onProperties = [];
    for (var prop in obj) {
        if (prop.substr(0, 2) == 'on') {
            onProperties.push(prop);
        }
    }
    for (var j = 0; j < onProperties.length; j++) {
        patchProperty(obj, onProperties[j]);
    }
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i]);
        }
    }
}

var EVENT_TASKS = zoneSymbol('eventTasks');
// For EventTarget
var ADD_EVENT_LISTENER = 'addEventListener';
var REMOVE_EVENT_LISTENER = 'removeEventListener';
function findExistingRegisteredTask(target, handler, name, capture, remove) {
    var eventTasks = target[EVENT_TASKS];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            var listener = data.handler;
            if ((data.handler === handler || listener.listener === handler) &&
                data.useCapturing === capture && data.eventName === name) {
                if (remove) {
                    eventTasks.splice(i, 1);
                }
                return eventTask;
            }
        }
    }
    return null;
}
function attachRegisteredEvent(target, eventTask, isPrepend) {
    var eventTasks = target[EVENT_TASKS];
    if (!eventTasks) {
        eventTasks = target[EVENT_TASKS] = [];
    }
    if (isPrepend) {
        eventTasks.unshift(eventTask);
    }
    else {
        eventTasks.push(eventTask);
    }
}
var defaultListenerMetaCreator = function (self, args) {
    return {
        useCapturing: args[2],
        eventName: args[0],
        handler: args[1],
        target: self || _global$1,
        name: args[0],
        invokeAddFunc: function (addFnSymbol, delegate) {
            if (delegate && delegate.invoke) {
                return this.target[addFnSymbol](this.eventName, delegate.invoke, this.useCapturing);
            }
            else {
                return this.target[addFnSymbol](this.eventName, delegate, this.useCapturing);
            }
        },
        invokeRemoveFunc: function (removeFnSymbol, delegate) {
            if (delegate && delegate.invoke) {
                return this.target[removeFnSymbol](this.eventName, delegate.invoke, this.useCapturing);
            }
            else {
                return this.target[removeFnSymbol](this.eventName, delegate, this.useCapturing);
            }
        }
    };
};
function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates, isPrepend, metaCreator) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (allowDuplicates === void 0) { allowDuplicates = false; }
    if (isPrepend === void 0) { isPrepend = false; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    var addFnSymbol = zoneSymbol(addFnName);
    var removeFnSymbol = zoneSymbol(removeFnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    function scheduleEventListener(eventTask) {
        var meta = eventTask.data;
        attachRegisteredEvent(meta.target, eventTask, isPrepend);
        return meta.invokeAddFunc(addFnSymbol, eventTask);
    }
    function cancelEventListener(eventTask) {
        var meta = eventTask.data;
        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);
        return meta.invokeRemoveFunc(removeFnSymbol, eventTask);
    }
    return function zoneAwareAddListener(self, args) {
        var data = metaCreator(self, args);
        data.useCapturing = data.useCapturing || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var delegate = null;
        if (typeof data.handler == 'function') {
            delegate = data.handler;
        }
        else if (data.handler && data.handler.handleEvent) {
            delegate = function (event) { return data.handler.handleEvent(event); };
        }
        var validZoneHandler = false;
        try {
            // In cross site contexts (such as WebDriver frameworks like Selenium),
            // accessing the handler object here will cause an exception to be thrown which
            // will fail tests prematurely.
            validZoneHandler = data.handler && data.handler.toString() === '[object FunctionWrapper]';
        }
        catch (error) {
            // Returning nothing here is fine, because objects in a cross-site context are unusable
            return;
        }
        // Ignore special listeners of IE11 & Edge dev tools, see
        // https://github.com/angular/zone.js/issues/150
        if (!delegate || validZoneHandler) {
            return data.invokeAddFunc(addFnSymbol, data.handler);
        }
        if (!allowDuplicates) {
            var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.useCapturing, false);
            if (eventTask) {
                // we already registered, so this will have noop.
                return data.invokeAddFunc(addFnSymbol, eventTask);
            }
        }
        var zone = Zone.current;
        var source = data.target.constructor['name'] + '.' + addFnName + ':' + data.eventName;
        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
    };
}
function makeZoneAwareRemoveListener(fnName, useCapturingParam, metaCreator) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    var symbol = zoneSymbol(fnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    return function zoneAwareRemoveListener(self, args) {
        var data = metaCreator(self, args);
        data.useCapturing = data.useCapturing || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.useCapturing, true);
        if (eventTask) {
            eventTask.zone.cancelTask(eventTask);
        }
        else {
            data.invokeRemoveFunc(symbol, data.handler);
        }
    };
}


var zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);
var zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);
function patchEventTargetMethods(obj, addFnName, removeFnName, metaCreator) {
    if (addFnName === void 0) { addFnName = ADD_EVENT_LISTENER; }
    if (removeFnName === void 0) { removeFnName = REMOVE_EVENT_LISTENER; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    if (obj && obj[addFnName]) {
        patchMethod(obj, addFnName, function () { return makeZoneAwareAddListener(addFnName, removeFnName, true, false, false, metaCreator); });
        patchMethod(obj, removeFnName, function () { return makeZoneAwareRemoveListener(removeFnName, true, metaCreator); });
        return true;
    }
    else {
        return false;
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global$1[className];
    if (!OriginalClass)
        return;
    _global$1[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global$1[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                Object.defineProperty(_global$1[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global$1[className][prop] = OriginalClass[prop];
        }
    }
}

function createNamedFn(name, delegate) {
    try {
        return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
    }
    catch (error) {
        // if we fail, we must be CSP, just return delegate.
        return function () {
            return delegate(this, arguments);
        };
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && Object.getOwnPropertyNames(proto).indexOf(name) === -1) {
        proto = Object.getPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary


function findEventTask(target, evtName) {
    var eventTasks = target[zoneSymbol('eventTasks')];
    var result = [];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            var eventName = data && data.eventName;
            if (eventName === evtName) {
                result.push(eventTask);
            }
        }
    }
    return result;
}
Zone[zoneSymbol('patchEventTargetMethods')] = patchEventTargetMethods;
Zone[zoneSymbol('patchOnProperties')] = patchOnProperties;

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        data.args[0] = function () {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                delete tasksByHandleId[data.handleId];
            }
        };
        data.handleId = setNative.apply(window, data.args);
        tasksByHandleId[data.handleId] = task;
        return task;
    }
    function clearTask(task) {
        delete tasksByHandleId[task.data.handleId];
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var zone = Zone.current;
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var task = typeof args[0] === 'number' ? tasksByHandleId[args[0]] : args[0];
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}

function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}

function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    desc.configurable = true;
    if (!desc.configurable) {
        if (!obj[unconfigurablesKey]) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        obj[unconfigurablesKey][prop] = true;
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = descJson.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
    .split(',');
var EVENT_TARGET = 'EventTarget';
function eventTargetPatch(_global) {
    var apis = [];
    var isWtf = _global['wtf'];
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555.split(',').map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        patchEventTargetMethods(type && type.prototype);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(_global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTargetMethods(WS.prototype);
    }
    _global.WebSocket = function (a, b) {
        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
        var proxySocket;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = Object.create(socket);
            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    return socket[propName].apply(socket, arguments);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
        return proxySocket;
    };
    for (var prop in WS) {
        _global.WebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'
    .split(' ');
function propertyDescriptorPatch(_global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            patchOnProperties(HTMLElement.prototype, eventNames);
        }
        patchOnProperties(XMLHttpRequest.prototype, null);
        if (typeof IDBIndex !== 'undefined') {
            patchOnProperties(IDBIndex.prototype, null);
            patchOnProperties(IDBRequest.prototype, null);
            patchOnProperties(IDBOpenDBRequest.prototype, null);
            patchOnProperties(IDBDatabase.prototype, null);
            patchOnProperties(IDBTransaction.prototype, null);
            patchOnProperties(IDBCursor.prototype, null);
        }
        if (supportsWebSocket) {
            patchOnProperties(WebSocket.prototype, null);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(_global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var xhrDesc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'onreadystatechange');
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
        enumerable: true,
        configurable: true,
        get: function () {
            return true;
        }
    });
    var req = new XMLHttpRequest();
    var result = !!req.onreadystatechange;
    // restore original desc
    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
    return result;
}

var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function(i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = Zone.current.wrap(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
    
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                if (opts.prototype.hasOwnProperty(callback)) {
                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = Zone.current.wrap(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                    }
                }
                else if (opts.prototype[callback]) {
                    opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                }
            });
        }
        return _registerElement.apply(document, [name, opts]);
    };
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var set = 'set';
var clear = 'clear';
var blockingMethods = ['alert', 'prompt', 'confirm'];
var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
patchTimer(_global, set, clear, 'Timeout');
patchTimer(_global, set, clear, 'Interval');
patchTimer(_global, set, clear, 'Immediate');
patchTimer(_global, 'request', 'cancel', 'AnimationFrame');
patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
for (var i = 0; i < blockingMethods.length; i++) {
    var name_1 = blockingMethods[i];
    patchMethod(_global, name_1, function (delegate, symbol, name) {
        return function (s, args) {
            return Zone.current.run(delegate, _global, args, name);
        };
    });
}
eventTargetPatch(_global);
propertyDescriptorPatch(_global);
patchClass('MutationObserver');
patchClass('WebKitMutationObserver');
patchClass('FileReader');
propertyPatch();
registerElementPatch(_global);
// Treat XMLHTTPRequest as a macrotask.
patchXHR(_global);
var XHR_TASK = zoneSymbol('xhrTask');
var XHR_SYNC = zoneSymbol('xhrSync');
var XHR_LISTENER = zoneSymbol('xhrListener');
var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
function patchXHR(window) {
    function findPendingTask(target) {
        var pendingTask = target[XHR_TASK];
        return pendingTask;
    }
    function scheduleTask(task) {
        self[XHR_SCHEDULED] = false;
        var data = task.data;
        // remove existing event listener
        var listener = data.target[XHR_LISTENER];
        if (listener) {
            data.target.removeEventListener('readystatechange', listener);
        }
        var newListener = data.target[XHR_LISTENER] = function () {
            if (data.target.readyState === data.target.DONE) {
                // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                // readyState=4 multiple times, so we need to check task state here
                if (!data.aborted && self[XHR_SCHEDULED] && task.state === 'scheduled') {
                    task.invoke();
                }
            }
        };
        data.target.addEventListener('readystatechange', newListener);
        var storedTask = data.target[XHR_TASK];
        if (!storedTask) {
            data.target[XHR_TASK] = task;
        }
        sendNative.apply(data.target, data.args);
        self[XHR_SCHEDULED] = true;
        return task;
    }
    function placeholderCallback() { }
    function clearTask(task) {
        var data = task.data;
        // Note - ideally, we would call data.target.removeEventListener here, but it's too late
        // to prevent it from firing. So instead, we store info for the event listener.
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
    }
    var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
        self[XHR_SYNC] = args[2] == false;
        return openNative.apply(self, args);
    }; });
    var sendNative = patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
        var zone = Zone.current;
        if (self[XHR_SYNC]) {
            // if the XHR is sync there is no task to schedule, just execute the code.
            return sendNative.apply(self, args);
        }
        else {
            var options = { target: self, isPeriodic: false, delay: null, args: args, aborted: false };
            return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);
        }
    }; });
    var abortNative = patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
        var task = findPendingTask(self);
        if (task && typeof task.type == 'string') {
            // If the XHR has already completed, do nothing.
            // If the XHR has already been aborted, do nothing.
            // Fix #569, call abort multiple times before done will cause
            // macroTask task count be negative number
            if (task.cancelFn == null || (task.data && task.data.aborted)) {
                return;
            }
            task.zone.cancelTask(task);
        }
        // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no task
        // to cancel. Do nothing.
    }; });
}
/// GEO_LOCATION
if (_global['navigator'] && _global['navigator'].geolocation) {
    patchPrototype(_global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
}
// handle unhandled promise rejection
function findPromiseRejectionHandler(evtName) {
    return function (e) {
        var eventTasks = findEventTask(_global, evtName);
        eventTasks.forEach(function (eventTask) {
            // windows has added unhandledrejection event listener
            // trigger the event listener
            var PromiseRejectionEvent = _global['PromiseRejectionEvent'];
            if (PromiseRejectionEvent) {
                var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                eventTask.invoke(evt);
            }
        });
    };
}
if (_global['PromiseRejectionEvent']) {
    Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
        findPromiseRejectionHandler('unhandledrejection');
    Zone[zoneSymbol('rejectionHandledHandler')] = findPromiseRejectionHandler('rejectionhandled');
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39), __webpack_require__(253)))

/***/ }),
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(311);
module.exports = __webpack_require__(35).RegExp.escape;

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6)
  , isArray  = __webpack_require__(170)
  , SPECIES  = __webpack_require__(7)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(303);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(3)
  , toPrimitive = __webpack_require__(30)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(51)
  , gOPS    = __webpack_require__(110)
  , pIE     = __webpack_require__(93);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(51)
  , toIObject = __webpack_require__(20);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(309)
  , invoke    = __webpack_require__(106)
  , aFunction = __webpack_require__(16);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

/***/ }),
/* 310 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(310)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(226)});

__webpack_require__(68)('copyWithin');

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(28)(4);

$export($export.P + $export.F * !__webpack_require__(25)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(162)});

__webpack_require__(68)('fill');

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(28)(2);

$export($export.P + $export.F * !__webpack_require__(25)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(28)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(68)(KEY);

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(28)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(68)(KEY);

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(28)(0)
  , STRICT   = __webpack_require__(25)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(36)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(13)
  , call           = __webpack_require__(235)
  , isArrayIter    = __webpack_require__(169)
  , toLength       = __webpack_require__(11)
  , createProperty = __webpack_require__(163)
  , getIterFn      = __webpack_require__(186);

$export($export.S + $export.F * !__webpack_require__(108)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(102)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(170)});

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(20)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(92) != Object || !__webpack_require__(25)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(20)
  , toInteger     = __webpack_require__(46)
  , toLength      = __webpack_require__(11)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(28)(1);

$export($export.P + $export.F * !__webpack_require__(25)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(163);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(5)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(228);

$export($export.P + $export.F * !__webpack_require__(25)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(228);

$export($export.P + $export.F * !__webpack_require__(25)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(167)
  , cof        = __webpack_require__(23)
  , toIndex    = __webpack_require__(54)
  , toLength   = __webpack_require__(11)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(5)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(28)(3);

$export($export.P + $export.F * !__webpack_require__(25)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(16)
  , toObject  = __webpack_require__(13)
  , fails     = __webpack_require__(5)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(25)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53)('Array');

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(5)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(13)
  , toPrimitive = __webpack_require__(30);

$export($export.P + $export.F * __webpack_require__(5)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(7)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(17)(proto, TO_PRIMITIVE, __webpack_require__(305));

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(18)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(229)});

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(6)
  , getPrototypeOf = __webpack_require__(22)
  , HAS_INSTANCE   = __webpack_require__(7)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(9).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9).f
  , createDesc = __webpack_require__(45)
  , has        = __webpack_require__(14)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(8) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(237)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(174);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(173);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(174)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(5)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(237)});

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(174)});

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(173)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(5)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(173)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(4)
  , has               = __webpack_require__(14)
  , cof               = __webpack_require__(23)
  , inheritIfRequired = __webpack_require__(168)
  , toPrimitive       = __webpack_require__(30)
  , fails             = __webpack_require__(5)
  , gOPN              = __webpack_require__(50).f
  , gOPD              = __webpack_require__(21).f
  , dP                = __webpack_require__(9).f
  , $trim             = __webpack_require__(72).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(49)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(8) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(18)(global, NUMBER, $Number);
}

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(4).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(234)});

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(234)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(244);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(245);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , toInteger    = __webpack_require__(46)
  , aNumberValue = __webpack_require__(225)
  , repeat       = __webpack_require__(181)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(5)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(5)
  , aNumberValue = __webpack_require__(225)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(238)});

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(49)});

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', {defineProperties: __webpack_require__(239)});

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', {defineProperty: __webpack_require__(9).f});

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(6)
  , meta     = __webpack_require__(44).onFreeze;

__webpack_require__(29)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(20)
  , $getOwnPropertyDescriptor = __webpack_require__(21).f;

__webpack_require__(29)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(29)('getOwnPropertyNames', function(){
  return __webpack_require__(240).f;
});

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(13)
  , $getPrototypeOf = __webpack_require__(22);

__webpack_require__(29)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(6);

__webpack_require__(29)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(6);

__webpack_require__(29)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(6);

__webpack_require__(29)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(246)});

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(13)
  , $keys    = __webpack_require__(51);

__webpack_require__(29)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(6)
  , meta     = __webpack_require__(44).onFreeze;

__webpack_require__(29)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(6)
  , meta     = __webpack_require__(44).onFreeze;

__webpack_require__(29)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(176).set});

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(91)
  , test    = {};
test[__webpack_require__(7)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(18)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(244);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(245);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(48)
  , global             = __webpack_require__(4)
  , ctx                = __webpack_require__(36)
  , classof            = __webpack_require__(91)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(6)
  , aFunction          = __webpack_require__(16)
  , anInstance         = __webpack_require__(47)
  , forOf              = __webpack_require__(69)
  , speciesConstructor = __webpack_require__(178)
  , task               = __webpack_require__(183).set
  , microtask          = __webpack_require__(175)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(7)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(52)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(71)($Promise, PROMISE);
__webpack_require__(53)(PROMISE);
Wrapper = __webpack_require__(35)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(108)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(16)
  , anObject  = __webpack_require__(3)
  , rApply    = (__webpack_require__(4).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(5)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(0)
  , create     = __webpack_require__(49)
  , aFunction  = __webpack_require__(16)
  , anObject   = __webpack_require__(3)
  , isObject   = __webpack_require__(6)
  , fails      = __webpack_require__(5)
  , bind       = __webpack_require__(229)
  , rConstruct = (__webpack_require__(4).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(9)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(3)
  , toPrimitive = __webpack_require__(30);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(5)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(21).f
  , anObject = __webpack_require__(3);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(3);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(171)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(21)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(3);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(22)
  , anObject = __webpack_require__(3);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(21)
  , getPrototypeOf = __webpack_require__(22)
  , has            = __webpack_require__(14)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(6)
  , anObject       = __webpack_require__(3);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(3)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(243)});

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(3)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(176);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(9)
  , gOPD           = __webpack_require__(21)
  , getPrototypeOf = __webpack_require__(22)
  , has            = __webpack_require__(14)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(45)
  , anObject       = __webpack_require__(3)
  , isObject       = __webpack_require__(6);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(4)
  , inheritIfRequired = __webpack_require__(168)
  , dP                = __webpack_require__(9).f
  , gOPN              = __webpack_require__(50).f
  , isRegExp          = __webpack_require__(107)
  , $flags            = __webpack_require__(105)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(8) && (!CORRECT_NEW || __webpack_require__(5)(function(){
  re2[__webpack_require__(7)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(18)(global, 'RegExp', $RegExp);
}

__webpack_require__(53)('RegExp');

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(104)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(104)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(104)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(104)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(107)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(250);
var anObject    = __webpack_require__(3)
  , $flags      = __webpack_require__(105)
  , DESCRIPTORS = __webpack_require__(8)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(18)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(5)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(19)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(19)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(19)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(19)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(179)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(11)
  , context   = __webpack_require__(180)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(166)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(19)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(19)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(19)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(54)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(180)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(166)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(19)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(179)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(172)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(19)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(20)
  , toLength  = __webpack_require__(11);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(181)
});

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(19)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(11)
  , context     = __webpack_require__(180)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(166)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(19)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(19)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(19)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(72)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(4)
  , has            = __webpack_require__(14)
  , DESCRIPTORS    = __webpack_require__(8)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(18)
  , META           = __webpack_require__(44).KEY
  , $fails         = __webpack_require__(5)
  , shared         = __webpack_require__(111)
  , setToStringTag = __webpack_require__(71)
  , uid            = __webpack_require__(55)
  , wks            = __webpack_require__(7)
  , wksExt         = __webpack_require__(248)
  , wksDefine      = __webpack_require__(185)
  , keyOf          = __webpack_require__(307)
  , enumKeys       = __webpack_require__(306)
  , isArray        = __webpack_require__(170)
  , anObject       = __webpack_require__(3)
  , toIObject      = __webpack_require__(20)
  , toPrimitive    = __webpack_require__(30)
  , createDesc     = __webpack_require__(45)
  , _create        = __webpack_require__(49)
  , gOPNExt        = __webpack_require__(240)
  , $GOPD          = __webpack_require__(21)
  , $DP            = __webpack_require__(9)
  , $keys          = __webpack_require__(51)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(93).f  = $propertyIsEnumerable;
  __webpack_require__(110).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(48)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(112)
  , buffer       = __webpack_require__(184)
  , anObject     = __webpack_require__(3)
  , toIndex      = __webpack_require__(54)
  , toLength     = __webpack_require__(11)
  , isObject     = __webpack_require__(6)
  , ArrayBuffer  = __webpack_require__(4).ArrayBuffer
  , speciesConstructor = __webpack_require__(178)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(5)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(53)(ARRAY_BUFFER);

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(112).ABV, {
  DataView: __webpack_require__(184).DataView
});

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(232);

// 23.4 WeakSet Objects
__webpack_require__(103)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(102)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(68)('includes');

/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(175)()
  , process   = __webpack_require__(4).process
  , isNode    = __webpack_require__(23)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(23);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(231)('Map')});

/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(13)
  , aFunction       = __webpack_require__(16)
  , $defineProperty = __webpack_require__(9);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(8) && $export($export.P + __webpack_require__(109), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(13)
  , aFunction       = __webpack_require__(16)
  , $defineProperty = __webpack_require__(9);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(8) && $export($export.P + __webpack_require__(109), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(242)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(243)
  , toIObject      = __webpack_require__(20)
  , gOPD           = __webpack_require__(21)
  , createProperty = __webpack_require__(163);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(13)
  , toPrimitive              = __webpack_require__(30)
  , getPrototypeOf           = __webpack_require__(22)
  , getOwnPropertyDescriptor = __webpack_require__(21).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(8) && $export($export.P + __webpack_require__(109), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(13)
  , toPrimitive              = __webpack_require__(30)
  , getPrototypeOf           = __webpack_require__(22)
  , getOwnPropertyDescriptor = __webpack_require__(21).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(8) && $export($export.P + __webpack_require__(109), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(242)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(4)
  , core        = __webpack_require__(35)
  , microtask   = __webpack_require__(175)()
  , OBSERVABLE  = __webpack_require__(7)('observable')
  , aFunction   = __webpack_require__(16)
  , anObject    = __webpack_require__(3)
  , anInstance  = __webpack_require__(47)
  , redefineAll = __webpack_require__(52)
  , hide        = __webpack_require__(17)
  , forOf       = __webpack_require__(69)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(53)('Observable');

/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(37)
  , anObject                  = __webpack_require__(3)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(37)
  , anObject               = __webpack_require__(3)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(251)
  , from                    = __webpack_require__(227)
  , metadata                = __webpack_require__(37)
  , anObject                = __webpack_require__(3)
  , getPrototypeOf          = __webpack_require__(22)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(37)
  , anObject               = __webpack_require__(3)
  , getPrototypeOf         = __webpack_require__(22)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(37)
  , anObject                = __webpack_require__(3)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(37)
  , anObject               = __webpack_require__(3)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(37)
  , anObject               = __webpack_require__(3)
  , getPrototypeOf         = __webpack_require__(22)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(37)
  , anObject               = __webpack_require__(3)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(37)
  , anObject                  = __webpack_require__(3)
  , aFunction                 = __webpack_require__(16)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(231)('Set')});

/***/ }),
/* 470 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(179)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(24)
  , toLength    = __webpack_require__(11)
  , isRegExp    = __webpack_require__(107)
  , getFlags    = __webpack_require__(105)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(171)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(247);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(247);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(72)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(72)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(185)('asyncIterator');

/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(185)('observable');

/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(4)});

/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(187)
  , redefine      = __webpack_require__(18)
  , global        = __webpack_require__(4)
  , hide          = __webpack_require__(17)
  , Iterators     = __webpack_require__(70)
  , wks           = __webpack_require__(7)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(183);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(4)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(106)
  , partial    = __webpack_require__(308)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(431);
__webpack_require__(370);
__webpack_require__(372);
__webpack_require__(371);
__webpack_require__(374);
__webpack_require__(376);
__webpack_require__(381);
__webpack_require__(375);
__webpack_require__(373);
__webpack_require__(383);
__webpack_require__(382);
__webpack_require__(378);
__webpack_require__(379);
__webpack_require__(377);
__webpack_require__(369);
__webpack_require__(380);
__webpack_require__(384);
__webpack_require__(385);
__webpack_require__(337);
__webpack_require__(339);
__webpack_require__(338);
__webpack_require__(387);
__webpack_require__(386);
__webpack_require__(357);
__webpack_require__(367);
__webpack_require__(368);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(364);
__webpack_require__(365);
__webpack_require__(366);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(355);
__webpack_require__(356);
__webpack_require__(418);
__webpack_require__(423);
__webpack_require__(430);
__webpack_require__(421);
__webpack_require__(413);
__webpack_require__(414);
__webpack_require__(419);
__webpack_require__(424);
__webpack_require__(426);
__webpack_require__(409);
__webpack_require__(410);
__webpack_require__(411);
__webpack_require__(412);
__webpack_require__(415);
__webpack_require__(416);
__webpack_require__(417);
__webpack_require__(420);
__webpack_require__(422);
__webpack_require__(425);
__webpack_require__(427);
__webpack_require__(428);
__webpack_require__(429);
__webpack_require__(332);
__webpack_require__(334);
__webpack_require__(333);
__webpack_require__(336);
__webpack_require__(335);
__webpack_require__(321);
__webpack_require__(319);
__webpack_require__(325);
__webpack_require__(322);
__webpack_require__(328);
__webpack_require__(330);
__webpack_require__(318);
__webpack_require__(324);
__webpack_require__(315);
__webpack_require__(329);
__webpack_require__(313);
__webpack_require__(327);
__webpack_require__(326);
__webpack_require__(320);
__webpack_require__(323);
__webpack_require__(312);
__webpack_require__(314);
__webpack_require__(317);
__webpack_require__(316);
__webpack_require__(331);
__webpack_require__(187);
__webpack_require__(403);
__webpack_require__(408);
__webpack_require__(250);
__webpack_require__(404);
__webpack_require__(405);
__webpack_require__(406);
__webpack_require__(407);
__webpack_require__(388);
__webpack_require__(249);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(443);
__webpack_require__(432);
__webpack_require__(433);
__webpack_require__(438);
__webpack_require__(441);
__webpack_require__(442);
__webpack_require__(436);
__webpack_require__(439);
__webpack_require__(437);
__webpack_require__(440);
__webpack_require__(434);
__webpack_require__(435);
__webpack_require__(389);
__webpack_require__(390);
__webpack_require__(391);
__webpack_require__(392);
__webpack_require__(393);
__webpack_require__(396);
__webpack_require__(394);
__webpack_require__(395);
__webpack_require__(397);
__webpack_require__(398);
__webpack_require__(399);
__webpack_require__(400);
__webpack_require__(402);
__webpack_require__(401);
__webpack_require__(444);
__webpack_require__(470);
__webpack_require__(473);
__webpack_require__(472);
__webpack_require__(474);
__webpack_require__(475);
__webpack_require__(471);
__webpack_require__(476);
__webpack_require__(477);
__webpack_require__(455);
__webpack_require__(458);
__webpack_require__(454);
__webpack_require__(452);
__webpack_require__(453);
__webpack_require__(456);
__webpack_require__(457);
__webpack_require__(447);
__webpack_require__(469);
__webpack_require__(478);
__webpack_require__(446);
__webpack_require__(448);
__webpack_require__(450);
__webpack_require__(449);
__webpack_require__(451);
__webpack_require__(460);
__webpack_require__(461);
__webpack_require__(463);
__webpack_require__(462);
__webpack_require__(465);
__webpack_require__(464);
__webpack_require__(466);
__webpack_require__(467);
__webpack_require__(468);
__webpack_require__(445);
__webpack_require__(459);
__webpack_require__(481);
__webpack_require__(480);
__webpack_require__(479);
module.exports = __webpack_require__(35);

/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39), __webpack_require__(253)))

/***/ }),
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(261);
__webpack_require__(262);
module.exports = __webpack_require__(188);


/***/ })
/******/ ]);
//# sourceMappingURL=project-template.js.map