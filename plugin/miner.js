/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = domLoaded;
/* harmony export (immutable) */ __webpack_exports__["h"] = setPhase;
/* harmony export (immutable) */ __webpack_exports__["g"] = setMessages;

const DOM_LOADED = 'DOM_LOADED';
/* harmony export (immutable) */ __webpack_exports__["b"] = DOM_LOADED;

const SET_PHASE = 'SET_PHASE';
/* harmony export (immutable) */ __webpack_exports__["e"] = SET_PHASE;

const SET_MESSAGES = 'SET_MESSAGES';
/* harmony export (immutable) */ __webpack_exports__["d"] = SET_MESSAGES;


const Phase = {
    INITIAL: 'INITIAL',
    LOADING: 'LOADING',
    SELECTING_OPTIONS: 'SELECTING_OPTIONS',
    SEARCHING: 'SEARCHING',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED'
};
/* harmony export (immutable) */ __webpack_exports__["c"] = Phase;


const Author = {
    STRANGER: 'STRANGER',
    ME: 'ME'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Author;


function domLoaded() {
    return {
        type: DOM_LOADED
    }
}

function setPhase(phase) {
    return {
        type: SET_PHASE,
        phase
    }
}

function setMessages(messages) {
    return {
        type: SET_MESSAGES,
        messages
    }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = waitFor;
/* harmony export (immutable) */ __webpack_exports__["b"] = dispatch;
/* harmony export (immutable) */ __webpack_exports__["c"] = subscribe;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(30);




const store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["b" /* createStore */])(__WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* default */]);

class TimeoutError extends Error {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TimeoutError;


function waitFor(condition, timeoutSeconds = 30) {
    if (condition(store.getState())) {
        return Promise.resolve(store.getState());
    } else {
        const conditionPromise = new Promise((resolve) => {
            const unsubscribe = store.subscribe(() => {
                if (condition(store.getState())) {
                    unsubscribe();
                    resolve(store.getState());
                }
            });
        });

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(reject, timeoutSeconds * 1000, new TimeoutError())
        });

        return Promise.race([timeoutPromise, conditionPromise]);
    }
}

function dispatch(action) {
    store.dispatch(action)
}

function subscribe(listener) {
    store.subscribe(() => listener(store.getState()));
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = isLoading;
/* harmony export (immutable) */ __webpack_exports__["h"] = isSelectingOptions;
/* harmony export (immutable) */ __webpack_exports__["g"] = isSearching;
/* harmony export (immutable) */ __webpack_exports__["d"] = isConnected;
/* harmony export (immutable) */ __webpack_exports__["e"] = isDisconnected;
/* harmony export (immutable) */ __webpack_exports__["i"] = mockConfirmDialog;
/* harmony export (immutable) */ __webpack_exports__["a"] = addPanel;
/* harmony export (immutable) */ __webpack_exports__["k"] = registerPanelComponent;
/* harmony export (immutable) */ __webpack_exports__["m"] = startConversation;
/* harmony export (immutable) */ __webpack_exports__["c"] = disconnect;
/* harmony export (immutable) */ __webpack_exports__["j"] = parseMessages;
/* harmony export (immutable) */ __webpack_exports__["l"] = setMessage;
/* harmony export (immutable) */ __webpack_exports__["b"] = clickSend;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_actions__ = __webpack_require__(0);




function isContainsClass(selector, clazz) {
    const element = document.querySelector(selector);
    return element.classList.contains(clazz);
}

function notHidden(selector) {
    return !isContainsClass(selector, 'hides');
}

function isLoading() {
    return notHidden('.load_init_step');
}

function isSelectingOptions() {
    return notHidden('.main_step');
}

function isSearching() {
    return notHidden('.search_company_step');
}

function isConnected() {
    return notHidden('.st_chatbox') && !notHidden('.status-end') && !notHidden('.search_company_step');
}

function isDisconnected() {
    return notHidden('.status-end');
}

function mockConfirmDialog() {
    const head = document.getElementsByTagName('head').item(0);
    const js = document.createTextNode('window.confirm = function() { return true; };');
    const script = document.createElement('script');
    script.appendChild(js);
    head.appendChild(script);
}

function addPanel() {
    const panel = document.createElement('miner-panel');
    panel.setAttribute('id', 'miner-panel');
    document.body.appendChild(panel);
}

function registerPanelComponent() {
    const script = document.createElement('link');
    script.setAttribute('href', chrome.extension.getURL("panel/panel.html"));
    script.setAttribute('rel', 'import');
    document.body.appendChild(script);
}

function startConversation() {
    document.getElementById('new_talk_but').click();
}

function disconnect() {
    if (isContainsClass('#sendMessageBtn', 'disabled')) {
        console.error('Disconnect is disabled');
    }
    document.getElementById('closeDialogBtn').click();
}

function parseMessages() {
    const result = [];
    for (const div of Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* toArray */])(document.querySelectorAll('.mess_block'))) {
        const author = div.classList.contains('window_chat_dialog_block_nekto') ? __WEBPACK_IMPORTED_MODULE_1__redux_actions__["a" /* Author */].STRANGER : __WEBPACK_IMPORTED_MODULE_1__redux_actions__["a" /* Author */].ME;
        const text = div.querySelector('.window_chat_dialog_text').textContent;
        result.push({author, text});
    }
    return result;
}

function setMessage(message) {
    const inputDiv = document.querySelector('.emojionearea-editor');
    inputDiv.innerHTML = message;
}

function clickSend() {
    document.getElementById('sendMessageBtn').click();
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* unused harmony reexport bindActionCreators */
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 4 */
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(22);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(16);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = toArray;


function toArray(varargs) {
    return Array.prototype.slice.call(varargs);
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = sleep;
/* harmony export (immutable) */ __webpack_exports__["e"] = onlySend;
/* harmony export (immutable) */ __webpack_exports__["c"] = check;
/* harmony export (immutable) */ __webpack_exports__["d"] = isMessagesPresent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__redux_actions__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__redux_store__ = __webpack_require__(1);






class HuisoDisconnectedError extends Error {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HuisoDisconnectedError;


async function sleep(seconds, ignoreDisconnected = false) {
    if (ignoreDisconnected) {
        await new Promise(resolve => setTimeout(resolve, seconds * 1000));
        return;
    }

    try {
        await Object(__WEBPACK_IMPORTED_MODULE_3__redux_store__["d" /* waitFor */])(state => state.phase !== __WEBPACK_IMPORTED_MODULE_2__redux_actions__["c" /* Phase */].CONNECTED, seconds);
    } catch (e) {
        if (e instanceof __WEBPACK_IMPORTED_MODULE_3__redux_store__["a" /* TimeoutError */]) {
            return;
        } else {
            throw e;
        }
    }
    throw new HuisoDisconnectedError();
}

async function onlySend(...messages) {
    await sleep(1);
    const message = messages[Math.floor(Math.random() * messages.length)];
    const chars = [...message];
    for (let i = 0; i < chars.length; i++) {
        await sleep(0.15);
        Object(__WEBPACK_IMPORTED_MODULE_0__dom__["l" /* setMessage */])(chars.slice(0, i + 1).reduce((s, c) => s + c, ''));
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* clickSend */])();
    console.log('Sent:', message);
}

function check(string, ...includes) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* toArray */])(includes).some((s) => string.includes(s));
}

async function isMessagesPresent(timeout) {
    try {
        await Object(__WEBPACK_IMPORTED_MODULE_3__redux_store__["d" /* waitFor */])(state => state.messages.length > 0, timeout);
        return true;
    } catch (e) {
        if ((e instanceof __WEBPACK_IMPORTED_MODULE_3__redux_store__["a" /* TimeoutError */])) {
            return false;
        } else {
            throw e;
        }
    }
}

class Messenger {
    constructor() {
        this.messages = [];
    }

    filterStrangersMessages(messages) {
        return messages.filter(m => m.author === __WEBPACK_IMPORTED_MODULE_2__redux_actions__["a" /* Author */].STRANGER).map(m => m.text);
    }

    found(messages) {
        console.debug('Old messages:', this.messages);
        console.debug('New messages:', messages);
        const result = this.filterStrangersMessages(messages).length > this.filterStrangersMessages(this.messages).length;
        console.debug('New message found:', result);
        return result
    }

    async waitForResponse() {
        const state = await Object(__WEBPACK_IMPORTED_MODULE_3__redux_store__["d" /* waitFor */])(state => this.found(state.messages) || state.phase !== __WEBPACK_IMPORTED_MODULE_2__redux_actions__["c" /* Phase */].CONNECTED);
        if (state.phase !== __WEBPACK_IMPORTED_MODULE_2__redux_actions__["c" /* Phase */].CONNECTED) {
            throw new HuisoDisconnectedError();
        }
        const messages = this.filterStrangersMessages(state.messages);
        this.messages = state.messages;
        return messages[messages.length - 1];
    }

    static normalizeResponse(response) {
        return response
            .toLowerCase()
            .trim()
            .replace(/\.+/g, ' ');
    }

    async send(...messages) {
        await onlySend(...messages);
        const response = Messenger.normalizeResponse(await this.waitForResponse());
        console.log('Response:', response);
        return response;
    }

}
/* harmony export (immutable) */ __webpack_exports__["b"] = Messenger;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_observer__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_store__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__redux_actions__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialogs_zero__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controls__ = __webpack_require__(12);








async function main() {
    Object(__WEBPACK_IMPORTED_MODULE_0__mutation_observer__["a" /* startObservingDom */])();
    Object(__WEBPACK_IMPORTED_MODULE_1__redux_store__["c" /* subscribe */])(state => console.debug('State:', state));

    await Object(__WEBPACK_IMPORTED_MODULE_1__redux_store__["d" /* waitFor */])(state => state.domLoaded);

    Object(__WEBPACK_IMPORTED_MODULE_2__dom__["i" /* mockConfirmDialog */])();
    Object(__WEBPACK_IMPORTED_MODULE_2__dom__["k" /* registerPanelComponent */])();
    Object(__WEBPACK_IMPORTED_MODULE_2__dom__["a" /* addPanel */])();

    await Object(__WEBPACK_IMPORTED_MODULE_1__redux_store__["d" /* waitFor */])(state => state.phase === __WEBPACK_IMPORTED_MODULE_3__redux_actions__["c" /* Phase */].CONNECTED);
    if (await Object(__WEBPACK_IMPORTED_MODULE_5__controls__["d" /* isMessagesPresent */])(0.2)) {
        await Object(__WEBPACK_IMPORTED_MODULE_5__controls__["f" /* sleep */])(1, true);
        Object(__WEBPACK_IMPORTED_MODULE_2__dom__["c" /* disconnect */])();
        Object(__WEBPACK_IMPORTED_MODULE_2__dom__["m" /* startConversation */])();
        await Object(__WEBPACK_IMPORTED_MODULE_5__controls__["f" /* sleep */])(1, true);
    }

    while (true) {
        try {
            await Object(__WEBPACK_IMPORTED_MODULE_1__redux_store__["d" /* waitFor */])(state => state.phase === __WEBPACK_IMPORTED_MODULE_3__redux_actions__["c" /* Phase */].CONNECTED);
            console.log('Start mining a new huiso');
            const messenger = new __WEBPACK_IMPORTED_MODULE_5__controls__["b" /* Messenger */]();

            await Object(__WEBPACK_IMPORTED_MODULE_4__dialogs_zero__["a" /* devideByZero */])(messenger);
            await Object(__WEBPACK_IMPORTED_MODULE_5__controls__["f" /* sleep */])(20, true);

            Object(__WEBPACK_IMPORTED_MODULE_2__dom__["c" /* disconnect */])();
            Object(__WEBPACK_IMPORTED_MODULE_2__dom__["m" /* startConversation */])();
        } catch (e) {
            if (e instanceof __WEBPACK_IMPORTED_MODULE_5__controls__["a" /* HuisoDisconnectedError */]) {
                console.log('Huiso disconnected');
                await Object(__WEBPACK_IMPORTED_MODULE_5__controls__["f" /* sleep */])(1, true);
                Object(__WEBPACK_IMPORTED_MODULE_2__dom__["m" /* startConversation */])();
            } else if (e instanceof __WEBPACK_IMPORTED_MODULE_1__redux_store__["a" /* TimeoutError */]) {
                console.log('Timeout');
                await Object(__WEBPACK_IMPORTED_MODULE_5__controls__["f" /* sleep */])(1, true);
                Object(__WEBPACK_IMPORTED_MODULE_2__dom__["c" /* disconnect */])();
                Object(__WEBPACK_IMPORTED_MODULE_2__dom__["m" /* startConversation */])();
            } else {
                throw e;
            }
        }
    }
}

const ignored = main();


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = startObservingDom;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__redux_store__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_actions__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom__ = __webpack_require__(2);





function getPhase() {
    const loading = Object(__WEBPACK_IMPORTED_MODULE_2__dom__["f" /* isLoading */])();
    const selectingOptions = Object(__WEBPACK_IMPORTED_MODULE_2__dom__["h" /* isSelectingOptions */])();
    const searching = Object(__WEBPACK_IMPORTED_MODULE_2__dom__["g" /* isSearching */])();
    const connected = Object(__WEBPACK_IMPORTED_MODULE_2__dom__["d" /* isConnected */])();
    const disconnected = Object(__WEBPACK_IMPORTED_MODULE_2__dom__["e" /* isDisconnected */])();

    let matchesCount = [loading, selectingOptions, searching, connected, disconnected]
        .filter(b => b === true)
        .length;
    if (matchesCount !== 1) {
        console.log('Count mismatch:', {loading, selectingOptions, searching, connected, disconnected})
    }
    if (loading) {
        return __WEBPACK_IMPORTED_MODULE_1__redux_actions__["c" /* Phase */].LOADING;
    } else if (selectingOptions) {
        return __WEBPACK_IMPORTED_MODULE_1__redux_actions__["c" /* Phase */].SELECTING_OPTIONS;
    } else if (searching) {
        return __WEBPACK_IMPORTED_MODULE_1__redux_actions__["c" /* Phase */].SEARCHING;
    } else if (connected) {
        return __WEBPACK_IMPORTED_MODULE_1__redux_actions__["c" /* Phase */].CONNECTED;
    } else if (disconnected) {
        return __WEBPACK_IMPORTED_MODULE_1__redux_actions__["c" /* Phase */].DISCONNECTED;
    } else {
        throw Error('Unknown state');
    }
}

const observer = new MutationObserver(() => {
    Object(__WEBPACK_IMPORTED_MODULE_0__redux_store__["b" /* dispatch */])(Object(__WEBPACK_IMPORTED_MODULE_1__redux_actions__["h" /* setPhase */])(getPhase()));
    Object(__WEBPACK_IMPORTED_MODULE_0__redux_store__["b" /* dispatch */])(Object(__WEBPACK_IMPORTED_MODULE_1__redux_actions__["g" /* setMessages */])(Object(__WEBPACK_IMPORTED_MODULE_2__dom__["j" /* parseMessages */])()));
});

function startObservingDom() {
    document.addEventListener("DOMContentLoaded", () => {
        Object(__WEBPACK_IMPORTED_MODULE_0__redux_store__["b" /* dispatch */])(Object(__WEBPACK_IMPORTED_MODULE_1__redux_actions__["f" /* domLoaded */])());
        observer.observe(document, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true
        })
    });
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(19);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(17);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8)))

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(7);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(21);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(26);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(25)(module)))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(9);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(0);




function domLoaded(oldDomLoaded = false, action) {
    return action.type === __WEBPACK_IMPORTED_MODULE_1__actions__["b" /* DOM_LOADED */] ? true : oldDomLoaded;
}

function phase(oldPhase = __WEBPACK_IMPORTED_MODULE_1__actions__["c" /* Phase */].INITIAL, action) {
    return action.type === __WEBPACK_IMPORTED_MODULE_1__actions__["e" /* SET_PHASE */] ? action.phase : oldPhase;
}

function messages(oldMessages = [], action) {
    return action.type === __WEBPACK_IMPORTED_MODULE_1__actions__["d" /* SET_MESSAGES */] ? action.messages : oldMessages;
}

const reducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* combineReducers */])({domLoaded, phase, messages});

/* harmony default export */ __webpack_exports__["a"] = (reducer);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = devideByZero;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controls__ = __webpack_require__(12);


async function devideByZero(messenger) {
    let response;
    response = await messenger.send('1:0 сможешь решить?', '1/0 сколько будет?', '1 на 0 сможешь разделить?');

    const huisosAnswer = (r) => Object(__WEBPACK_IMPORTED_MODULE_0__controls__["c" /* check */])(r, 'ноль', 'нуль', 'один', 'бесконечн', '0', '1');
    const schoolboyAnswer = (r) => Object(__WEBPACK_IMPORTED_MODULE_0__controls__["c" /* check */])(r, 'не делит', 'нельзя');
    const yesAnswer = (r) => ['да', 'могу', 'конечн', 'конеш'].includes(r);
    const drocherAnswer = (r) => Object(__WEBPACK_IMPORTED_MODULE_0__controls__["c" /* check */])(r, 'хуй', 'дроч', 'стоит', 'конч', 'член', 'шлюх', 'пошал', 'сладен', 'секс');
    const otherAnswers = (r) => ['не', 'нет'].includes(r) || Object(__WEBPACK_IMPORTED_MODULE_0__controls__["c" /* check */])(r, 'гуман', 'лет', 'сколько тебе');

    if (Object(__WEBPACK_IMPORTED_MODULE_0__controls__["c" /* check */])(response, 'лет', 'сколько тебе')) {
        await messenger.send('мне 27');
        response = await messenger.send('так можешь?', 'так ты можешь разделить?');
    }

    if (yesAnswer(response)) {
        response = await messenger.send('так давай, моги');
        if (response === 'да') {
            response = await messenger.send('ты мозги не еби. дели давай');
        }
    }

    if (!(huisosAnswer(response) || schoolboyAnswer(response) || yesAnswer(response) || otherAnswers(response) || drocherAnswer(response))) {
        response = await messenger.send('так можешь?', 'так ты можешь разделить?');
        if (yesAnswer(response)) {
            response = await messenger.send('так давай, моги');
            if (response === 'да') {
                response = await messenger.send('ты мозги не еби. дели давай');
            }
        }
    }

    if (drocherAnswer(response)) {
        response = await messenger.send('хуй покажешь в скайпе?');
        if (Object(__WEBPACK_IMPORTED_MODULE_0__controls__["c" /* check */])(response, 'да', 'покажу')) {
            await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])('добавляйся');
            await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])('lera.lera872');
            await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["f" /* sleep */])(5);
        } else {
            await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])('ну и пошел нахуй');
        }
        return;
    } else if (Object(__WEBPACK_IMPORTED_MODULE_0__controls__["c" /* check */])(response, 'гуман')) {
        return;
    } else if (response === 'нет') {
        response = await messenger.send('пидара ответ');
        if (response.includes('пидар')) {
            response = await messenger.send('ну точно хуисос');
        }
    } else if (response === 'не') {
        response = await messenger.send('ничего не можешь, ничего не умеешь');
    } else if (schoolboyAnswer(response)) {
        response = await messenger.send('мамка запретила?', 'а че так вдруг нельзя? мамка запретила?');
    } else if (huisosAnswer(response)) {
        if (response.length > 20) {
            await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])('"' + response + '""');
            await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])('че за хуйню ты тут пишешь?');
            response = await messenger.send('ты че, совсем тупой?', 'тупорылый штоле?');
        } else {
            await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])(response + '?');
            response = await messenger.send('ты че, совсем тупой?', 'тупорылый штоле?', 'а не хуесос ли ты?');
        }
    }

    await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])('в скайпе не зассышь базарить?', 'в скайпе базарить не зассышь?');
    if (Math.random() < 0.5) {
        await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])('добавляйся');
    }
    await Object(__WEBPACK_IMPORTED_MODULE_0__controls__["e" /* onlySend */])('lera.lera872');
}

/***/ })
/******/ ]);