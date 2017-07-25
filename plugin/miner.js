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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

console.log('So HUIOSOs');

class HuisoDisconnectedError extends Error {
}

async function sleep(seconds) {
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function checkConnection() {
    const sendButton = document.getElementById('sendMessageBtn');
    if (sendButton && sendButton.classList && sendButton.classList.contains('disabled')) {
        throw new HuisoDisconnectedError();
    }
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

function waitForElementInsertion() {
    return new Promise((resolve) => {
        document.addEventListener('DOMNodeInserted', function (event) {
            document.removeEventListener('DOMNodeInserted', this);
            resolve(event.target);
        });
    });
}

async function waitForNewBlock() {
    checkConnection();
    while (true) {
        await waitForElementInsertion();
        checkConnection();
        if (!!document.querySelector('.window_chat_statuss')) {
            return;
        }
    }
}

async function onlySend(timelag, ...messages) {
    checkConnection();
    const message = messages[Math.floor(Math.random() * messages.length)];
    const inputDiv = document.querySelector('.emojionearea-editor');
    inputDiv.innerHTML = message;
    await sleep(timelag);
    document.getElementById('sendMessageBtn').click();
}

async function waitForResponse() {
    while (true) {
        const element = await waitForElementInsertion();
        if (element.classList && element.classList.contains('window_chat_dialog_block_nekto')) {
            return element.querySelector('.window_chat_dialog_text').textContent;
        }
    }
}

function normalizeResponse(response) {
    return response
        .toLowerCase()
        .trim()
        .replace(/\.+/g, ' ');
}

async function send(timelag, ...messages) {
    await onlySend(timelag, ...messages);
    const response = normalizeResponse(await waitForResponse());
    console.log(response);
    return response;
}

function check(string, ...includes) {
    return Array.prototype.slice.call(includes).some((s) => string.includes(s));
}

function disconnect() {
    const sendButton = document.getElementById('sendMessageBtn');
    if (!sendButton.classList.contains('disabled')) {
        document.getElementById('closeDialogBtn').click();
    }
}

function startNew() {
    document.getElementById('new_talk_but').click();
}

async function main() {
    while (true) {
        try {
            await waitForNewBlock();
            console.log('Start mining new huiso');

            let response;
            response = await send(2, '1:0 сможешь решить?', '1/0 сколько будет?', '1 на 0 сможешь разделить?');

            huisosAnswer = (r) => check(r, 'ноль', 'нуль', 'один', 'бесконечн', '0', '1');
            schoolboyAnswer = (r) => check(r, 'не делит', 'нельзя');
            yesAnswer = (r) => ['да', 'могу', 'конечн', 'конеш'].includes(r);
            drocherAnswer = (r) => check(r, 'хуй', 'дроч', 'стоит', 'конч', 'член', 'шлюх', 'пошал', 'сладен', 'секс');
            otherAnswers = (r) => ['не', 'нет'].includes(r) || check(r, 'гуман', 'лет', 'сколько тебе');

            if (check(response, 'лет', 'сколько тебе')) {
                await send(2.5, 'мне 27');
                response = await send(2.5, 'так можешь?', 'так ты можешь разделить?');
            }

            if (yesAnswer(response)) {
                response = await send(2.5, 'так давай, моги');
                if (response === 'да') {
                    response = await send(2.5, 'ты мозги не еби. дели давай');
                }
            }

            if (!(huisosAnswer(response) || schoolboyAnswer(response) || yesAnswer(response) || otherAnswers(response) || drocherAnswer(response))) {
                response = await send(2.5, 'так можешь?', 'так ты можешь разделить?');
                if (yesAnswer(response)) {
                    response = await send(2.5, 'так давай, моги');
                    if (response === 'да') {
                        response = await send(2.5, 'ты мозги не еби. дели давай');
                    }
                }
            }

            if (drocherAnswer(response)) {
                response = await send(2.5, 'хуй покажешь в скайпе');
                if (check(response, 'да', 'покажу')) {
                    await onlySend(1.5, 'добавляйся');
                    await onlySend(3, 'lera.lera872');
                    await sleep(5);
                } else {
                    await onlySend(1.5, 'ну и пошел нахуй');
                }
                disconnect();
                startNew();
                break;
            } else if (check(response, 'гуман')) {
                disconnect();
                startNew();
                break;
            } else if (response === 'нет') {
                response = await send(2.5, 'пидара ответ');
                if (response.includes('пидар')) {
                    response = await send(2.5, 'ну точно хуисос');
                }
            } else if (response === 'не') {
                response = await send(2, 'ничего не можешь, ничего не умеешь');
            } else if (schoolboyAnswer(response)) {
                response = await send(1, 'мамка запретила?', 'а че так вдруг нельзя? мамка запретила?');
            } else if (huisosAnswer(response)) {
                if (response.length > 20) {
                    await onlySend(2, '"' + response + '""');
                    await onlySend(2, 'че за хуйню ты тут пишешь?');
                    response = await send(1, 'ты че, совсем тупой?', 'тупорылый штоле?');
                } else {
                    await onlySend(2, response + '?');
                    response = await send(1, 'ты че, совсем тупой?', 'тупорылый штоле?', 'а не хуесос ли ты?');
                }
            }

            await onlySend(4, 'в скайпе не зассышь базарить?', 'в скайпе базарить не зассышь?');
            if (Math.random() < 0.5) {
                await onlySend(1.5, 'добавляйся');
            }
            await onlySend(3, 'lera.lera872');
            await sleep(20);

            disconnect();
            startNew();
        } catch (e) {
            if (e instanceof HuisoDisconnectedError) {
                console.log('Huiso disconnected');
                await sleep(1);
                startNew();
            } else {
                throw e;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    mockConfirmDialog();
    registerPanelComponent();
    addPanel();
});
main();


/***/ })
/******/ ]);