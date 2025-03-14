// repository: https://github.com/TweePower/twee-sugarcube-passage-metadata-collector

const passageMetadataWidgetName = 'PassageMetadata';
const mode = 'byTag';
const modeParams = { filterTag: 'passage_metadata' };

(function () {
    'use strict';

    /*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var PassageMetadataAppExport;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/clone/clone.js":
/*!*************************************!*\
  !*** ./node_modules/clone/clone.js ***!
  \*************************************/
/***/ ((module) => {

eval("var clone = (function() {\n'use strict';\n\nfunction _instanceof(obj, type) {\n  return type != null && obj instanceof type;\n}\n\nvar nativeMap;\ntry {\n  nativeMap = Map;\n} catch(_) {\n  // maybe a reference error because no `Map`. Give it a dummy value that no\n  // value will ever be an instanceof.\n  nativeMap = function() {};\n}\n\nvar nativeSet;\ntry {\n  nativeSet = Set;\n} catch(_) {\n  nativeSet = function() {};\n}\n\nvar nativePromise;\ntry {\n  nativePromise = Promise;\n} catch(_) {\n  nativePromise = function() {};\n}\n\n/**\n * Clones (copies) an Object using deep copying.\n *\n * This function supports circular references by default, but if you are certain\n * there are no circular references in your object, you can save some CPU time\n * by calling clone(obj, false).\n *\n * Caution: if `circular` is false and `parent` contains circular references,\n * your program may enter an infinite loop and crash.\n *\n * @param `parent` - the object to be cloned\n * @param `circular` - set to true if the object to be cloned may contain\n *    circular references. (optional - true by default)\n * @param `depth` - set to a number if the object is only to be cloned to\n *    a particular depth. (optional - defaults to Infinity)\n * @param `prototype` - sets the prototype to be used when cloning an object.\n *    (optional - defaults to parent prototype).\n * @param `includeNonEnumerable` - set to true if the non-enumerable properties\n *    should be cloned as well. Non-enumerable properties on the prototype\n *    chain will be ignored. (optional - false by default)\n*/\nfunction clone(parent, circular, depth, prototype, includeNonEnumerable) {\n  if (typeof circular === 'object') {\n    depth = circular.depth;\n    prototype = circular.prototype;\n    includeNonEnumerable = circular.includeNonEnumerable;\n    circular = circular.circular;\n  }\n  // maintain two arrays for circular references, where corresponding parents\n  // and children have the same index\n  var allParents = [];\n  var allChildren = [];\n\n  var useBuffer = typeof Buffer != 'undefined';\n\n  if (typeof circular == 'undefined')\n    circular = true;\n\n  if (typeof depth == 'undefined')\n    depth = Infinity;\n\n  // recurse this function so we don't reset allParents and allChildren\n  function _clone(parent, depth) {\n    // cloning null always returns null\n    if (parent === null)\n      return null;\n\n    if (depth === 0)\n      return parent;\n\n    var child;\n    var proto;\n    if (typeof parent != 'object') {\n      return parent;\n    }\n\n    if (_instanceof(parent, nativeMap)) {\n      child = new nativeMap();\n    } else if (_instanceof(parent, nativeSet)) {\n      child = new nativeSet();\n    } else if (_instanceof(parent, nativePromise)) {\n      child = new nativePromise(function (resolve, reject) {\n        parent.then(function(value) {\n          resolve(_clone(value, depth - 1));\n        }, function(err) {\n          reject(_clone(err, depth - 1));\n        });\n      });\n    } else if (clone.__isArray(parent)) {\n      child = [];\n    } else if (clone.__isRegExp(parent)) {\n      child = new RegExp(parent.source, __getRegExpFlags(parent));\n      if (parent.lastIndex) child.lastIndex = parent.lastIndex;\n    } else if (clone.__isDate(parent)) {\n      child = new Date(parent.getTime());\n    } else if (useBuffer && Buffer.isBuffer(parent)) {\n      if (Buffer.allocUnsafe) {\n        // Node.js >= 4.5.0\n        child = Buffer.allocUnsafe(parent.length);\n      } else {\n        // Older Node.js versions\n        child = new Buffer(parent.length);\n      }\n      parent.copy(child);\n      return child;\n    } else if (_instanceof(parent, Error)) {\n      child = Object.create(parent);\n    } else {\n      if (typeof prototype == 'undefined') {\n        proto = Object.getPrototypeOf(parent);\n        child = Object.create(proto);\n      }\n      else {\n        child = Object.create(prototype);\n        proto = prototype;\n      }\n    }\n\n    if (circular) {\n      var index = allParents.indexOf(parent);\n\n      if (index != -1) {\n        return allChildren[index];\n      }\n      allParents.push(parent);\n      allChildren.push(child);\n    }\n\n    if (_instanceof(parent, nativeMap)) {\n      parent.forEach(function(value, key) {\n        var keyChild = _clone(key, depth - 1);\n        var valueChild = _clone(value, depth - 1);\n        child.set(keyChild, valueChild);\n      });\n    }\n    if (_instanceof(parent, nativeSet)) {\n      parent.forEach(function(value) {\n        var entryChild = _clone(value, depth - 1);\n        child.add(entryChild);\n      });\n    }\n\n    for (var i in parent) {\n      var attrs;\n      if (proto) {\n        attrs = Object.getOwnPropertyDescriptor(proto, i);\n      }\n\n      if (attrs && attrs.set == null) {\n        continue;\n      }\n      child[i] = _clone(parent[i], depth - 1);\n    }\n\n    if (Object.getOwnPropertySymbols) {\n      var symbols = Object.getOwnPropertySymbols(parent);\n      for (var i = 0; i < symbols.length; i++) {\n        // Don't need to worry about cloning a symbol because it is a primitive,\n        // like a number or string.\n        var symbol = symbols[i];\n        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);\n        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {\n          continue;\n        }\n        child[symbol] = _clone(parent[symbol], depth - 1);\n        if (!descriptor.enumerable) {\n          Object.defineProperty(child, symbol, {\n            enumerable: false\n          });\n        }\n      }\n    }\n\n    if (includeNonEnumerable) {\n      var allPropertyNames = Object.getOwnPropertyNames(parent);\n      for (var i = 0; i < allPropertyNames.length; i++) {\n        var propertyName = allPropertyNames[i];\n        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);\n        if (descriptor && descriptor.enumerable) {\n          continue;\n        }\n        child[propertyName] = _clone(parent[propertyName], depth - 1);\n        Object.defineProperty(child, propertyName, {\n          enumerable: false\n        });\n      }\n    }\n\n    return child;\n  }\n\n  return _clone(parent, depth);\n}\n\n/**\n * Simple flat clone using prototype, accepts only objects, usefull for property\n * override on FLAT configuration object (no nested props).\n *\n * USE WITH CAUTION! This may not behave as you wish if you do not know how this\n * works.\n */\nclone.clonePrototype = function clonePrototype(parent) {\n  if (parent === null)\n    return null;\n\n  var c = function () {};\n  c.prototype = parent;\n  return new c();\n};\n\n// private utility functions\n\nfunction __objToStr(o) {\n  return Object.prototype.toString.call(o);\n}\nclone.__objToStr = __objToStr;\n\nfunction __isDate(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object Date]';\n}\nclone.__isDate = __isDate;\n\nfunction __isArray(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object Array]';\n}\nclone.__isArray = __isArray;\n\nfunction __isRegExp(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';\n}\nclone.__isRegExp = __isRegExp;\n\nfunction __getRegExpFlags(re) {\n  var flags = '';\n  if (re.global) flags += 'g';\n  if (re.ignoreCase) flags += 'i';\n  if (re.multiline) flags += 'm';\n  return flags;\n}\nclone.__getRegExpFlags = __getRegExpFlags;\n\nreturn clone;\n})();\n\nif ( true && module.exports) {\n  module.exports = clone;\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./node_modules/clone/clone.js?");

/***/ }),

/***/ "./src/EventHandlerCollection.ts":
/*!***************************************!*\
  !*** ./src/EventHandlerCollection.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventHandlerCollection)\n/* harmony export */ });\nclass EventHandlerCollection {\n    constructor() {\n        this.handlers = [];\n    }\n    add(handler) {\n        this.handlers.push(handler);\n    }\n    clear() {\n        this.handlers = [];\n    }\n    count() {\n        return this.handlers.length;\n    }\n    all() {\n        return this.handlers;\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/EventHandlerCollection.ts?");

/***/ }),

/***/ "./src/PassageMetadata.ts":
/*!********************************!*\
  !*** ./src/PassageMetadata.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadata)\n/* harmony export */ });\n/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clone */ \"./node_modules/clone/clone.js\");\n/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/error/PassageMetadataError.ts\");\n\n\nclass PassageMetadata {\n    constructor(data) {\n        if (typeof data !== 'object' || Array.isArray(data) || data === null) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_1__[\"default\"](`Invalid passage metadata (expected: object, actual: ${typeof data})`);\n        }\n        if (typeof data.passageName !== 'string') {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_1__[\"default\"](`Invalid passage name (expected: string, actual: ${typeof data.passageName})`);\n        }\n        this._data = clone__WEBPACK_IMPORTED_MODULE_0___default()(data);\n        this._originData = clone__WEBPACK_IMPORTED_MODULE_0___default()(data);\n        this._rewriteData = null;\n    }\n    get passageName() {\n        return this._data.passageName;\n    }\n    get data() {\n        return this._data;\n    }\n    setValue(key, value) {\n        this._data[key] = value;\n        if (this._rewriteData === null)\n            this._rewriteData = {};\n        this._rewriteData[key] = value;\n        if (this._rewriteData[key] === this._originData[key]) {\n            delete this._rewriteData[key];\n        }\n        if (Object.keys(this._rewriteData).length <= 0) {\n            this._rewriteData = null;\n        }\n    }\n    get originData() {\n        return this._originData;\n    }\n    get rewriteData() {\n        return this._rewriteData;\n    }\n    reset() {\n        this._rewriteData = null;\n        this._data = clone__WEBPACK_IMPORTED_MODULE_0___default()(this._originData);\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadata.ts?");

/***/ }),

/***/ "./src/PassageMetadataApp.ts":
/*!***********************************!*\
  !*** ./src/PassageMetadataApp.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataApp)\n/* harmony export */ });\n/* harmony import */ var _facade_SugarcubeFacade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./facade/SugarcubeFacade */ \"./src/facade/SugarcubeFacade.ts\");\n/* harmony import */ var _PassageMetadataCollector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassageMetadataCollector */ \"./src/PassageMetadataCollector.ts\");\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/error/PassageMetadataError.ts\");\n/* harmony import */ var _PassageMetadataStateManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PassageMetadataStateManager */ \"./src/PassageMetadataStateManager.ts\");\n/* harmony import */ var _macros_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./macros/index */ \"./src/macros/index.ts\");\n\n\n\n\n\nclass PassageMetadataApp {\n    constructor(_passageMetadataWidgetName = 'PassageMetadata', _mode = 'byTag', // all\n    _modeParams = { filterTag: 'passage_metadata' }) {\n        this._passageMetadataWidgetName = _passageMetadataWidgetName;\n        this._mode = _mode;\n        this._modeParams = _modeParams;\n        this._isPassageMetadataAppInitialized = false;\n        this._isPassageMetadataCollected = false;\n        this._isPassageStateLoaded = false;\n        this._isPassageMetadataWidgetsInitialized = false;\n        this.sugarcubeFacade = new _facade_SugarcubeFacade__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.passageMetadataCollector = new _PassageMetadataCollector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.sugarcubeFacade, _passageMetadataWidgetName, _mode, _modeParams);\n        this.passageMetadataStateManager = new _PassageMetadataStateManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.sugarcubeFacade);\n        // For detail see: https://github.com/tmedwards/sugarcube-2/pull/299\n        this._realCurrentPassage = this.sugarcubeFacade.getCurrentPassage();\n        $(document).on(':passageinit', (ev) => {\n            const passage = ev.passage;\n            this._realCurrentPassage = typeof passage.name === 'string' ? passage.name : passage.title;\n        });\n        $(document).on(':passagestart', () => {\n            // it necesarry to do on ':passagestart' event, becasue here Sugarcube varialbes already loaded\n            if (this._isPassageMetadataAppInitialized === false) {\n                this._isPassageMetadataAppInitialized = true;\n                this.collect();\n                this.initWidgets();\n            }\n            this.loadState();\n        });\n        this.onBeforeAddMetadata = this.passageMetadataCollector.onBeforeAddMetadata;\n        this.onAfterAddMetadata = this.passageMetadataCollector.onAfterAddMetadata;\n        this.onBeforeStore = this.passageMetadataStateManager.onBeforeStore;\n        this.onBeforeRestore = this.passageMetadataStateManager.onBeforeRestore;\n    }\n    get passageMetadataWidgetName() {\n        return this._passageMetadataWidgetName;\n    }\n    get mode() {\n        return this._mode;\n    }\n    get modeParams() {\n        return clone(this._modeParams);\n    }\n    get isInitialized() {\n        return this._isPassageMetadataAppInitialized;\n    }\n    get isCollected() {\n        return this._isPassageMetadataCollected;\n    }\n    get isStateLoaded() {\n        return this._isPassageStateLoaded;\n    }\n    get isWidgetsInitialized() {\n        return this._isPassageMetadataWidgetsInitialized;\n    }\n    resetPassageStateLoaded() {\n        this._isPassageStateLoaded = false;\n    }\n    get realCurrentPassage() {\n        return this._realCurrentPassage;\n    }\n    collect(force = false) {\n        if (force !== true && this._isPassageMetadataCollected === true) {\n            return;\n        }\n        this._isPassageMetadataCollected = true;\n        try {\n            this.passageMetadataCollection = this.passageMetadataCollector.collect();\n        }\n        catch (error) {\n            if (error instanceof _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n                error.message += \" (\" + Object.keys(error.scope).map(scopeKey => `${scopeKey}: ${error.scope[scopeKey]}`).join(', ') + ')';\n            }\n            throw error;\n        }\n    }\n    loadState(force = false) {\n        if (force !== true && this._isPassageStateLoaded === true) {\n            return;\n        }\n        this._isPassageStateLoaded = true;\n        try {\n            this.passageMetadataStateManager.restore(this.passageMetadataCollection);\n        }\n        catch (error) {\n            if (error instanceof _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n                error.message += \" (\" + Object.keys(error.scope).map(scopeKey => `${scopeKey}: ${error.scope[scopeKey]}`).join(', ');\n            }\n            throw error;\n        }\n    }\n    initWidgets() {\n        if (this._isPassageMetadataWidgetsInitialized === true) {\n            return;\n        }\n        this._isPassageMetadataWidgetsInitialized = true;\n        const passageMetadataApp = this;\n        this.sugarcubeFacade.addMacros(this._passageMetadataWidgetName, {\n            handler: function () {\n                return this.error('Passage metadata was not processed, please check passage tags');\n            }\n        });\n        (0,_macros_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this, this.sugarcubeFacade);\n    }\n    storeState() {\n        this.passageMetadataStateManager.store(this.passageMetadataCollection);\n    }\n    has(passageName = null) {\n        if (this.isCollected === false)\n            throw new Error('Passage matadata was not collected');\n        if (passageName === null) {\n            passageName = this._realCurrentPassage;\n        }\n        return this.passageMetadataCollection.has(passageName);\n    }\n    previousHas() {\n        if (this.isCollected === false)\n            throw new Error('Passage matadata was not collected');\n        return this.passageMetadataCollection.has(previous());\n    }\n    find(passageName = null) {\n        if (this.isCollected === false)\n            throw new Error('Passage matadata was not collected');\n        if (passageName === null) {\n            passageName = this._realCurrentPassage;\n        }\n        return this.passageMetadataCollection.find(passageName);\n    }\n    get(passageName = null) {\n        if (this.isCollected === false)\n            throw new Error('Passage matadata was not collected');\n        if (passageName === null) {\n            passageName = this._realCurrentPassage;\n        }\n        return this.passageMetadataCollection.get(passageName);\n    }\n    getValue(passageNameOrKey, key = null) {\n        var _a;\n        if (this.isCollected === false)\n            throw new Error('Passage matadata was not collected');\n        let passageName = this._realCurrentPassage;\n        let valueKey = null;\n        if (key === null) {\n            valueKey = passageNameOrKey;\n        }\n        else {\n            if (typeof passageNameOrKey !== 'string') {\n                throw new TypeError(`${this.constructor.name}.getValue: Invalid type for argument 'passageNameOrKey'. `\n                    + `Expected string, got ${typeof passageNameOrKey}.`);\n            }\n            passageName = passageNameOrKey;\n            valueKey = key;\n        }\n        return (_a = this.passageMetadataCollection.find(passageName)) === null || _a === void 0 ? void 0 : _a.data[valueKey];\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadataApp.ts?");

/***/ }),

/***/ "./src/PassageMetadataCollection.ts":
/*!******************************************!*\
  !*** ./src/PassageMetadataCollection.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataCollection)\n/* harmony export */ });\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/error/PassageMetadataError.ts\");\n\nclass PassageMetadataCollection {\n    constructor() {\n        this.items = {};\n    }\n    add(passageMetadata) {\n        if (this.has(passageMetadata.passageName)) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`Passage metadata with name '${passageMetadata.passageName}' already exist`);\n        }\n        this.items[passageMetadata.passageName] = passageMetadata;\n    }\n    has(passageName) {\n        if (typeof passageName !== 'string') {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`passageName should be string`);\n        }\n        return this.items[passageName] !== undefined;\n    }\n    get(passageName) {\n        if (!this.has(passageName)) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`PassageMetadata with passageName ${passageName} doesn't exist`);\n        }\n        return this.items[passageName];\n    }\n    find(passageName) {\n        if (this.has(passageName) === false) {\n            return null;\n        }\n        return this.items[passageName];\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadataCollection.ts?");

/***/ }),

/***/ "./src/PassageMetadataCollector.ts":
/*!*****************************************!*\
  !*** ./src/PassageMetadataCollector.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataCollector)\n/* harmony export */ });\n/* harmony import */ var _PassageMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassageMetadata */ \"./src/PassageMetadata.ts\");\n/* harmony import */ var _PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassageMetadataCollection */ \"./src/PassageMetadataCollection.ts\");\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/error/PassageMetadataError.ts\");\n/* harmony import */ var _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventHandlerCollection */ \"./src/EventHandlerCollection.ts\");\n\n\n\n\nclass PassageMetadataCollector {\n    constructor(sugarcubeFacade, passageMetadataWidgetName = 'PassageMetadata', mode = 'byTag', // all\n    modeParams = { filterTag: 'passage_metadata' }) {\n        this.sugarcubeFacade = sugarcubeFacade;\n        this.mode = mode;\n        this.modeParams = modeParams;\n        this.onBeforeAddMetadata = new _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n        this.onAfterAddMetadata = new _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n        if (typeof passageMetadataWidgetName !== 'string') {\n            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'passageMetadataWidgetName'. `\n                + `Expected RegExp, got ${typeof passageMetadataWidgetName}.`);\n        }\n        if (!(/^[a-zA-Z]+$/gs.test(passageMetadataWidgetName))) {\n            throw new RangeError(`${this.constructor.name}.constructor: Invalid value for argument 'passageMetadataWidgetName'. `\n                + `Expected string [a-zA-Z]+, got ${passageMetadataWidgetName}.`);\n        }\n        this.passageMetadataRegex = new RegExp(`<<${passageMetadataWidgetName}>>(.*)<<\\/${passageMetadataWidgetName}>>`, 'gms');\n        if (typeof mode !== 'string') {\n            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'mode'. `\n                + `Expected string, got ${typeof mode}.`);\n        }\n        if (!['byTag', 'all'].includes(mode)) {\n            throw new RangeError(`${this.constructor.name}.constructor: Invalid value for argument 'mode'. `\n                + `Expected 'byTag' or 'all', got ${mode}.`);\n        }\n        if (mode === 'byTag' && typeof modeParams.filterTag !== 'string') {\n            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'modeParams.filterTag'. `\n                + `Expected string, got ${typeof modeParams.filterTag}.`);\n        }\n    }\n    collect() {\n        let passages = this.sugarcubeFacade.getAllPassages();\n        if (this.mode === 'byTag') {\n            passages = passages.filter(passge => passge.tags.includes(this.modeParams.filterTag));\n        }\n        const passageMetadataCollection = new _PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        passages.forEach((passage) => {\n            const passageName = typeof passage.name === 'string' ? passage.name : passage.title;\n            this.passageMetadataRegex.lastIndex = 0;\n            const passageMetadataRegexResult = this.passageMetadataRegex.exec(passage.element.textContent);\n            if (this.mode === 'byTag' && passageMetadataRegexResult === null) {\n                throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"](`Passage metadata not found in ${passageName}`);\n            }\n            try {\n                let passageMetadataEvalResult = this.createPassageMetadataObject(passageMetadataRegexResult[1]);\n                passageMetadataEvalResult = {\n                    passageName: passageName,\n                    ...clone(passageMetadataEvalResult),\n                };\n                this.onBeforeAddMetadata.all().forEach((handler) => {\n                    handler(passageMetadataEvalResult);\n                });\n                const passageMetadata = new _PassageMetadata__WEBPACK_IMPORTED_MODULE_0__[\"default\"](passageMetadataEvalResult);\n                passageMetadataCollection.add(passageMetadata);\n                this.onAfterAddMetadata.all().forEach((handler) => {\n                    handler(passageMetadata);\n                });\n            }\n            catch (error) {\n                throw _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"].fromPreviousError(error, { 'passageName': passageName });\n            }\n            // remove definition from passage\n            passage.element.textContent = passage.element.textContent.replace(passageMetadataRegexResult[0], '');\n        });\n        return passageMetadataCollection;\n    }\n    createPassageMetadataObject(passageMetadata) {\n        let passageMetadataEvalResult;\n        try {\n            eval('passageMetadataEvalResult = ' + passageMetadata);\n            if (typeof passageMetadataEvalResult !== 'object'\n                || Array.isArray(passageMetadataEvalResult)\n                || passageMetadataEvalResult === null) {\n                throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"Passage metadata JSON should contain object\");\n            }\n        }\n        catch (error) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"](`Invalid passage metadata JSON: ${error.message}`);\n        }\n        return passageMetadataEvalResult;\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadataCollector.ts?");

/***/ }),

/***/ "./src/PassageMetadataStateManager.ts":
/*!********************************************!*\
  !*** ./src/PassageMetadataStateManager.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataStateManager)\n/* harmony export */ });\n/* harmony import */ var _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventHandlerCollection */ \"./src/EventHandlerCollection.ts\");\n\nclass PassageMetadataStateManager {\n    constructor(sugarcubeFacade, sugarcubeHistoryVariableName = 'passageMetadataState') {\n        this.sugarcubeFacade = sugarcubeFacade;\n        this.sugarcubeHistoryVariableName = sugarcubeHistoryVariableName;\n        this.onBeforeStore = new _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.onBeforeRestore = new _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    }\n    store(passageMetadataCollection) {\n        let state = {};\n        for (const passageName in passageMetadataCollection.items) {\n            const passageMetadata = passageMetadataCollection.items[passageName];\n            if (passageMetadata.rewriteData !== null) {\n                state[passageName] = clone(passageMetadata.rewriteData);\n            }\n        }\n        this.onBeforeStore.all().forEach((handler) => {\n            handler(state);\n        });\n        this.sugarcubeFacade.saveVariable(this.sugarcubeHistoryVariableName, this.serialize(state));\n    }\n    restore(passageMetadataCollection) {\n        const historyData = this.sugarcubeFacade.getVariable(this.sugarcubeHistoryVariableName);\n        if (typeof historyData !== 'string') {\n            return;\n        }\n        const state = this.deserialize(historyData);\n        // reset before fill from history\n        for (const passageName in passageMetadataCollection.items) {\n            passageMetadataCollection.items[passageName].reset();\n        }\n        this.onBeforeRestore.all().forEach((handler) => {\n            handler(state);\n        });\n        for (const passageName in state) {\n            if (!passageMetadataCollection.has(passageName)) {\n                continue;\n            }\n            const passageRewriteMetadata = state[passageName];\n            for (const key in passageRewriteMetadata) {\n                passageMetadataCollection.get(passageName).setValue(key, passageRewriteMetadata[key]);\n            }\n        }\n    }\n    deserialize(data) {\n        return JSON.parse(data);\n    }\n    serialize(data) {\n        return JSON.stringify(data);\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadataStateManager.ts?");

/***/ }),

/***/ "./src/error/PassageMetadataError.ts":
/*!*******************************************!*\
  !*** ./src/error/PassageMetadataError.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataError)\n/* harmony export */ });\nclass PassageMetadataError extends Error {\n    constructor(message, scope = {}) {\n        super(message);\n        this.scope = {};\n        this.scope = scope;\n        Object.setPrototypeOf(this, PassageMetadataError.prototype);\n    }\n    static fromPreviousError(previousError, scope = {}) {\n        const error = new PassageMetadataError(previousError.message);\n        error.stack = previousError.stack;\n        error.scope = {\n            ...scope,\n            ...(previousError instanceof PassageMetadataError) ? previousError.scope : {}\n        };\n        return error;\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/error/PassageMetadataError.ts?");

/***/ }),

/***/ "./src/facade/SugarcubeFacade.ts":
/*!***************************************!*\
  !*** ./src/facade/SugarcubeFacade.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SugarcubeFacade)\n/* harmony export */ });\nclass SugarcubeFacade {\n    getAllPassages() {\n        return Story.lookup();\n    }\n    runTeweeScript(expression) {\n        return Scripting.evalJavaScript(Scripting.parse(expression));\n    }\n    getCurrentPassage() {\n        return passage();\n    }\n    hasPassage(passageName) {\n        return Story.has(passageName);\n    }\n    getVariable(name) {\n        return State.variables[name];\n    }\n    saveVariable(name, value) {\n        State.variables[name] = value;\n    }\n    addMacros(name, options) {\n        Macro.add(name, options);\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/facade/SugarcubeFacade.ts?");

/***/ }),

/***/ "./src/macros/index.ts":
/*!*****************************!*\
  !*** ./src/macros/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((passageMetadataApp, sugarcubeFacade) => {\n    sugarcubeFacade.addMacros('setPassageMetadataVariable', {\n        handler: function () {\n            if (this.args.length < 2 || this.args.length > 3) {\n                return this.error(`Invalid number of arguments: expected 2 to 3, but received ${this.args.length}.`);\n            }\n            let passageMetadata = null;\n            let key = null;\n            let value = null;\n            if (this.args.length === 3) {\n                var passageName;\n                if (typeof this.args[0] === 'object') {\n                    passageName = this.args[0].link;\n                }\n                else {\n                    passageName = this.args[0];\n                }\n                if (typeof this.args[1] !== 'string' && typeof this.args[1] !== 'number') {\n                    return this.error(`Invalid type for second argument: expected string or number, but recived ${typeof this.args[1]}`);\n                }\n                passageMetadata = passageMetadataApp.get(passageName);\n                key = this.args[1];\n                value = this.args[2];\n            }\n            else {\n                if (typeof this.args[0] !== 'string' && typeof this.args[0] !== 'number') {\n                    return this.error(`Invalid type for second argument: expected string or number, but recived ${typeof this.args[0]}`);\n                }\n                passageMetadata = passageMetadataApp.get();\n                key = this.args[0];\n                value = this.args[1];\n            }\n            passageMetadata.setValue(key, value);\n            passageMetadataApp.storeState();\n        },\n    });\n});\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/macros/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/PassageMetadataApp.ts");
/******/ 	PassageMetadataAppExport = __webpack_exports__;
/******/ 	
/******/ })()
;
    const PassageMetadataApp = PassageMetadataAppExport.default;

    ////////////////////////////////////////////
    /// Sugarcube hacks
    ////////////////////////////////////////////
    Engine = new Proxy(Engine, {
        get: function(target, prop) {
            if (prop === 'backward' || prop === 'forward') {
                jQuery.event.trigger({
                    type: ':called_' + prop,
                });
            }

            return target[prop];
        }
    });

    ////////////////////////////////////////////
    /// initialize PassageMetadataApp
    ////////////////////////////////////////////
    window.passageMetadataApp = new PassageMetadataApp(
        passageMetadataWidgetName,
        mode,
        modeParams,
    );

    $(document).on(':called_backward', function() {
        window.passageMetadataApp.resetPassageStateLoaded();
    });

    $(document).on(':called_forward', function() {
        window.passageMetadataApp.resetPassageStateLoaded();
    });

    Save.onLoad.add((save) => {
        if (save.state.history.length > 0) {
            window.passageMetadataApp.resetPassageStateLoaded();
        }
    });
})();
