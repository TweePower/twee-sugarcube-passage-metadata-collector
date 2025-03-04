// repository: https://github.com/TweePower/twee-sugarcube-passage-metadata-collector

const passageMetadataWidgetName = 'PassageMetadata';
const mode = 'byTag';
const modeParams = { filterTag: 'passage_metadata' };
const debugLevel = 3;

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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/EventHandlerCollection.ts":
/*!***************************************!*\
  !*** ./src/EventHandlerCollection.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventHandlerCollection)\n/* harmony export */ });\nclass EventHandlerCollection {\n    constructor() {\n        this.handlers = [];\n    }\n    add(handler) {\n        this.handlers.push(handler);\n    }\n    clear() {\n        this.handlers = [];\n    }\n    count() {\n        return this.handlers.length;\n    }\n    all() {\n        return this.handlers;\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/EventHandlerCollection.ts?");

/***/ }),

/***/ "./src/PassageMetadata.ts":
/*!********************************!*\
  !*** ./src/PassageMetadata.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadata)\n/* harmony export */ });\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/error/PassageMetadataError.ts\");\n\nclass PassageMetadata {\n    constructor(_passageName, _data) {\n        this._passageName = _passageName;\n        if (typeof _passageName !== 'string') {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`Invalid passage name (expected: string, actual: ${typeof _passageName})`);\n        }\n        if (typeof _data !== 'object' || Array.isArray(_data) || _data === null) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`Invalid passage metadata (expected: object, actual: ${typeof _data})`);\n        }\n        this._data = { ..._data };\n        this._originData = { ..._data };\n        this._rewriteData = null;\n    }\n    get passageName() {\n        return this._passageName;\n    }\n    get data() {\n        return this._data;\n    }\n    setValue(key, value) {\n        this._data[key] = value;\n        if (this._rewriteData === null)\n            this._rewriteData = {};\n        this._rewriteData[key] = value;\n        if (this._rewriteData[key] === this._originData[key]) {\n            delete this._rewriteData[key];\n        }\n        if (Object.keys(this._rewriteData).length <= 0) {\n            this._rewriteData = null;\n        }\n    }\n    get originData() {\n        return this._originData;\n    }\n    get rewriteData() {\n        return this._rewriteData;\n    }\n    reset() {\n        this._rewriteData = null;\n        this._data = { ...this._originData };\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadata.ts?");

/***/ }),

/***/ "./src/PassageMetadataApp.ts":
/*!***********************************!*\
  !*** ./src/PassageMetadataApp.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataApp)\n/* harmony export */ });\n/* harmony import */ var _facade_SugarcubeFacade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./facade/SugarcubeFacade */ \"./src/facade/SugarcubeFacade.ts\");\n/* harmony import */ var _PassageMetadataCollector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassageMetadataCollector */ \"./src/PassageMetadataCollector.ts\");\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/error/PassageMetadataError.ts\");\n/* harmony import */ var _PassageMetadataStateManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PassageMetadataStateManager */ \"./src/PassageMetadataStateManager.ts\");\n/* harmony import */ var _macros_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./macros/index */ \"./src/macros/index.ts\");\n\n\n\n\n\nclass PassageMetadataApp {\n    constructor(passageMetadataWidgetName = 'PassageMetadata', mode = 'byTag', // all\n    modeParams = { filterTag: 'passage_metadata' }) {\n        this.passageMetadataWidgetName = passageMetadataWidgetName;\n        this._isPassageMetadataAppInitialized = false;\n        this._isPassageMetadataCollected = false;\n        this._isPassageStateLoaded = false;\n        this._isPassageMetadataWidgetsInitialized = false;\n        this.sugarcubeFacade = new _facade_SugarcubeFacade__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.passageMetadataCollector = new _PassageMetadataCollector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.sugarcubeFacade, this.passageMetadataWidgetName, mode, modeParams);\n        this.passageMetadataStateManager = new _PassageMetadataStateManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.sugarcubeFacade);\n        // For detail see: https://github.com/tmedwards/sugarcube-2/pull/299\n        this._realCurrentPassage = this.sugarcubeFacade.getCurrentPassage();\n        $(document).on(':passageinit', (ev) => {\n            this._realCurrentPassage = typeof ev.passage.name === 'string' ? ev.passage.name : ev.passage.title;\n        });\n        $(document).on(':passagestart', () => {\n            // it necesarry to do on ':passagestart' event, becasue here Sugarcube varialbes already loaded\n            if (this._isPassageMetadataAppInitialized === false) {\n                this.collect();\n                this.initWidgets();\n            }\n            this.loadState();\n        });\n        this.onBeforeAddMetadata = this.passageMetadataCollector.onBeforeAddMetadata;\n        this.onAfterAddMetadata = this.passageMetadataCollector.onAfterAddMetadata;\n        this.onBeforeStore = this.passageMetadataStateManager.onBeforeStore;\n        this.onBeforeRestore = this.passageMetadataStateManager.onBeforeRestore;\n    }\n    get isPassageMetadataAppInitialized() {\n        return this._isPassageMetadataAppInitialized;\n    }\n    get isPassageMetadataCollected() {\n        return this._isPassageMetadataCollected;\n    }\n    get isPassageStateLoaded() {\n        return this._isPassageStateLoaded;\n    }\n    get isPassageMetadataWidgetsInitialized() {\n        return this._isPassageMetadataWidgetsInitialized;\n    }\n    resetPassageStateLoaded() {\n        this._isPassageStateLoaded = false;\n    }\n    get realCurrentPassage() {\n        return this._realCurrentPassage;\n    }\n    collect(force = false) {\n        if (force !== true && this._isPassageMetadataCollected === true) {\n            return;\n        }\n        this._isPassageMetadataCollected = true;\n        try {\n            this.passageMetadataCollection = this.passageMetadataCollector.collect();\n        }\n        catch (error) {\n            if (error instanceof _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n                error.message += \" (\" + Object.keys(error.scope).map(scopeKey => `${scopeKey}: ${error.scope[scopeKey]}`).join(', ');\n            }\n            throw error;\n        }\n    }\n    loadState(force = false) {\n        if (force !== true && this._isPassageStateLoaded === true) {\n            return;\n        }\n        this._isPassageStateLoaded = true;\n        try {\n            this.passageMetadataStateManager.restore(this.passageMetadataCollection);\n        }\n        catch (error) {\n            if (error instanceof _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n                error.message += \" (\" + Object.keys(error.scope).map(scopeKey => `${scopeKey}: ${error.scope[scopeKey]}`).join(', ');\n            }\n            throw error;\n        }\n    }\n    initWidgets() {\n        if (this._isPassageMetadataWidgetsInitialized === true) {\n            return;\n        }\n        this._isPassageMetadataWidgetsInitialized = true;\n        const passageMetadataApp = this;\n        this.sugarcubeFacade.addMacros(this.passageMetadataWidgetName, {\n            handler: function () {\n                return this.error('Passage metadata was not processed, please check passage tags');\n            }\n        });\n        (0,_macros_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this, this.sugarcubeFacade);\n    }\n    storeState() {\n        this.passageMetadataStateManager.store(this.passageMetadataCollection);\n    }\n    isHasPassageMetadata(passageName = null) {\n        if (this.isPassageMetadataCollected === false)\n            throw new Error('Passage matadata was not collected');\n        if (passageName === null) {\n            passageName = this._realCurrentPassage;\n        }\n        return this.passageMetadataCollection.has(passageName);\n    }\n    getPassageMetadata(passageName = null) {\n        if (this.isPassageMetadataCollected === false)\n            throw new Error('Passage matadata was not collected');\n        if (passageName === null) {\n            passageName = this._realCurrentPassage;\n        }\n        return this.passageMetadataCollection.find(passageName);\n    }\n    getPassageMetadataValue(passageNameOrKey, key = null) {\n        var _a;\n        if (this.isPassageMetadataCollected === false)\n            throw new Error('Passage matadata was not collected');\n        let passageName = this._realCurrentPassage;\n        let valueKey = null;\n        if (key === null) {\n            valueKey = passageNameOrKey;\n        }\n        else {\n            if (typeof passageNameOrKey !== 'string') {\n                throw new TypeError(`${this.constructor.name}.getPassageMetadataValue: Invalid type for argument 'passageNameOrKey'. `\n                    + `Expected string, got ${typeof passageNameOrKey}.`);\n            }\n            passageName = passageNameOrKey;\n            valueKey = key;\n        }\n        return (_a = this.passageMetadataCollection.find(passageName)) === null || _a === void 0 ? void 0 : _a.data[valueKey];\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadataApp.ts?");

/***/ }),

/***/ "./src/PassageMetadataCollection.ts":
/*!******************************************!*\
  !*** ./src/PassageMetadataCollection.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataCollection)\n/* harmony export */ });\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/error/PassageMetadataError.ts\");\n\nclass PassageMetadataCollection {\n    constructor() {\n        this.items = {};\n    }\n    add(passageMetadata) {\n        if (this.has(passageMetadata.passageName)) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`Passage metadata with name '${passageMetadata.passageName}' already exist`);\n        }\n        this.items[passageMetadata.passageName] = passageMetadata;\n    }\n    has(passageName) {\n        if (typeof passageName !== 'string') {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`passageName should be string`);\n        }\n        return this.items[passageName] !== undefined;\n    }\n    get(passageName) {\n        if (!this.has(passageName)) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`PassageMetadata with passageName ${passageName} doesn't exist`);\n        }\n        return this.items[passageName];\n    }\n    find(passageName) {\n        if (this.has(passageName) === false) {\n            return null;\n        }\n        return this.items[passageName];\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadataCollection.ts?");

/***/ }),

/***/ "./src/PassageMetadataCollector.ts":
/*!*****************************************!*\
  !*** ./src/PassageMetadataCollector.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataCollector)\n/* harmony export */ });\n/* harmony import */ var _PassageMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassageMetadata */ \"./src/PassageMetadata.ts\");\n/* harmony import */ var _PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassageMetadataCollection */ \"./src/PassageMetadataCollection.ts\");\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/error/PassageMetadataError.ts\");\n/* harmony import */ var _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventHandlerCollection */ \"./src/EventHandlerCollection.ts\");\n\n\n\n\nclass PassageMetadataCollector {\n    constructor(sugarcubeFacade, passageMetadataWidgetName = 'PassageMetadata', mode = 'byTag', // all\n    modeParams = { filterTag: 'passage_metadata' }) {\n        this.sugarcubeFacade = sugarcubeFacade;\n        this.mode = mode;\n        this.modeParams = modeParams;\n        this.onBeforeAddMetadata = new _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n        this.onAfterAddMetadata = new _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n        if (typeof passageMetadataWidgetName !== 'string') {\n            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'passageMetadataWidgetName'. `\n                + `Expected RegExp, got ${typeof passageMetadataWidgetName}.`);\n        }\n        if (!(/^[a-zA-Z]+$/gs.test(passageMetadataWidgetName))) {\n            throw new RangeError(`${this.constructor.name}.constructor: Invalid value for argument 'passageMetadataWidgetName'. `\n                + `Expected string [a-zA-Z]+, got ${passageMetadataWidgetName}.`);\n        }\n        this.passageMetadataRegex = new RegExp(`<<${passageMetadataWidgetName}>>(.*)<<\\/${passageMetadataWidgetName}>>`, 'gms');\n        if (typeof mode !== 'string') {\n            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'mode'. `\n                + `Expected string, got ${typeof mode}.`);\n        }\n        if (!['byTag', 'all'].includes(mode)) {\n            throw new RangeError(`${this.constructor.name}.constructor: Invalid value for argument 'mode'. `\n                + `Expected 'byTag' or 'all', got ${mode}.`);\n        }\n        if (mode === 'byTag' && typeof modeParams.filterTag !== 'string') {\n            throw new TypeError(`${this.constructor.name}.constructor: Invalid type for argument 'modeParams.filterTag'. `\n                + `Expected string, got ${typeof modeParams.filterTag}.`);\n        }\n    }\n    collect() {\n        let passages = this.sugarcubeFacade.getAllPassages();\n        if (this.mode === 'byTag') {\n            passages = passages.filter(passge => passge.tags.includes(this.modeParams.filterTag));\n        }\n        const passageMetadataCollection = new _PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        passages.forEach((passage) => {\n            this.passageMetadataRegex.lastIndex = 0;\n            const passageMetadataRegexResult = this.passageMetadataRegex.exec(passage.element.textContent);\n            if (this.mode === 'byTag' && passageMetadataRegexResult === null) {\n                throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"](`Passage metadata not found in ${passage.title}`);\n            }\n            try {\n                const passageMetadataEvalResult = this.createPassageMetadataObject(passageMetadataRegexResult[1]);\n                this.onBeforeAddMetadata.all().forEach((handler) => {\n                    handler(passageMetadataEvalResult);\n                });\n                const passageMetadata = new _PassageMetadata__WEBPACK_IMPORTED_MODULE_0__[\"default\"](passage.title, passageMetadataEvalResult);\n                passageMetadataCollection.add(passageMetadata);\n                this.onAfterAddMetadata.all().forEach((handler) => {\n                    handler(passageMetadata);\n                });\n            }\n            catch (error) {\n                throw _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"].fromPreviousError(error, { 'passage': passage.title });\n            }\n            // remove definition from passage\n            passage.element.textContent = passage.element.textContent.replace(passageMetadataRegexResult[0], '');\n        });\n        return passageMetadataCollection;\n    }\n    createPassageMetadataObject(passageMetadata) {\n        let passageMetadataEvalResult;\n        try {\n            eval('passageMetadataEvalResult = ' + passageMetadata);\n            if (typeof passageMetadataEvalResult !== 'object'\n                || Array.isArray(passageMetadataEvalResult)\n                || passageMetadataEvalResult === null) {\n                throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"Passage metadata JSON should contain object\");\n            }\n        }\n        catch (error) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_2__[\"default\"](`Invalid passage metadata JSON: ${error.message}`);\n        }\n        return passageMetadataEvalResult;\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadataCollector.ts?");

/***/ }),

/***/ "./src/PassageMetadataStateManager.ts":
/*!********************************************!*\
  !*** ./src/PassageMetadataStateManager.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataStateManager)\n/* harmony export */ });\n/* harmony import */ var _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventHandlerCollection */ \"./src/EventHandlerCollection.ts\");\n\nclass PassageMetadataStateManager {\n    constructor(sugarcubeFacade, sugarcubeHistoryVariableName = 'passageMetadataState') {\n        this.sugarcubeFacade = sugarcubeFacade;\n        this.sugarcubeHistoryVariableName = sugarcubeHistoryVariableName;\n        this.onBeforeStore = new _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.onBeforeRestore = new _EventHandlerCollection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    }\n    store(passageMetadataCollection) {\n        let state = {};\n        for (const passageName in passageMetadataCollection.items) {\n            const passageMetadata = passageMetadataCollection.items[passageName];\n            state[passageName] = passageMetadata.rewriteData;\n        }\n        this.onBeforeStore.all().forEach((handler) => {\n            handler(state);\n        });\n        this.sugarcubeFacade.saveVariable(this.sugarcubeHistoryVariableName, this.serialize(state));\n    }\n    restore(passageMetadataCollection) {\n        const historyData = this.sugarcubeFacade.getVariable(this.sugarcubeHistoryVariableName);\n        if (typeof historyData !== 'string') {\n            return;\n        }\n        const state = this.deserialize(historyData);\n        // reset before fill from history\n        for (const passageName in passageMetadataCollection.items) {\n            passageMetadataCollection.items[passageName].reset();\n        }\n        this.onBeforeRestore.all().forEach((handler) => {\n            handler(state);\n        });\n        for (const passageName in state) {\n            if (!passageMetadataCollection.has(passageName)) {\n                continue;\n            }\n            const passageRewriteMetadata = state[passageName];\n            for (const key in passageRewriteMetadata) {\n                passageMetadataCollection.get(passageName).setValue(key, passageRewriteMetadata[key]);\n            }\n        }\n    }\n    deserialize(data) {\n        return JSON.parse(data);\n    }\n    serialize(data) {\n        return JSON.stringify(data);\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/PassageMetadataStateManager.ts?");

/***/ }),

/***/ "./src/error/PassageMetadataError.ts":
/*!*******************************************!*\
  !*** ./src/error/PassageMetadataError.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PassageMetadataError)\n/* harmony export */ });\nclass PassageMetadataError extends Error {\n    constructor(message, scope = {}) {\n        super(message);\n        this.scope = {};\n        this.scope = scope;\n        Object.setPrototypeOf(this, PassageMetadataError.prototype);\n    }\n    static fromPreviousError(previousError, scope = {}) {\n        const error = new PassageMetadataError(previousError.message);\n        error.stack = previousError.stack;\n        error.scope = {\n            ...scope,\n            ...(previousError instanceof PassageMetadataError) ? previousError.scope : {}\n        };\n        return error;\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/error/PassageMetadataError.ts?");

/***/ }),

/***/ "./src/facade/SugarcubeFacade.ts":
/*!***************************************!*\
  !*** ./src/facade/SugarcubeFacade.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SugarcubeFacade)\n/* harmony export */ });\nclass SugarcubeFacade {\n    getAllPassages() {\n        return Story.lookup();\n    }\n    runTeweeScript(expression) {\n        return Scripting.evalJavaScript(Scripting.parse(expression));\n    }\n    getCurrentPassage() {\n        return passage();\n    }\n    hasPassage(passageName) {\n        return Story.has(passageName);\n    }\n    getVariable(name) {\n        return State.variables[name];\n    }\n    saveVariable(name, value) {\n        State.variables[name] = value;\n    }\n    addMacros(name, options) {\n        Macro.add(name, options);\n    }\n}\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/facade/SugarcubeFacade.ts?");

/***/ }),

/***/ "./src/macros/index.ts":
/*!*****************************!*\
  !*** ./src/macros/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((passageMetadataApp, sugarcubeFacade) => {\n    sugarcubeFacade.addMacros('setPassageMetadataVariable', {\n        handler: function () {\n            if (this.args.length < 2 || this.args.length > 3) {\n                return this.error(`Invalid number of arguments: expected 2 to 3, but received ${this.args.length}.`);\n            }\n            let passageMetadata = null;\n            let key = null;\n            let value = null;\n            if (this.args.length === 3) {\n                var passageName;\n                if (typeof this.args[0] === 'object') {\n                    passageName = this.args[0].link;\n                }\n                else {\n                    passageName = this.args[0];\n                }\n                if (typeof this.args[1] !== 'string' && typeof this.args[1] !== 'number') {\n                    return this.error(`Invalid type for second argument: expected string or number, but recived ${typeof this.args[1]}`);\n                }\n                passageMetadata = passageMetadataApp.getPassageMetadata(passageName);\n                key = this.args[1];\n                value = this.args[2];\n            }\n            else {\n                if (typeof this.args[0] !== 'string' && typeof this.args[0] !== 'number') {\n                    return this.error(`Invalid type for second argument: expected string or number, but recived ${typeof this.args[0]}`);\n                }\n                passageMetadata = passageMetadataApp.getPassageMetadata();\n                key = this.args[0];\n                value = this.args[1];\n            }\n            passageMetadata.setValue(key, value);\n            passageMetadataApp.storeState();\n        },\n    });\n});\n\n\n//# sourceURL=webpack://PassageMetadataAppExport/./src/macros/index.ts?");

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
        debugLevel,
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
