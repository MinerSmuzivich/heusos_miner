"use strict";
import {startObservingDom} from './mutation-observer'
import {subscribe, waitFor, TimeoutError} from "./redux/store"
import {toArray} from "./utils"
import {
    addPanel, clickSend, disconnect, mockConfirmDialog, registerPanelComponent, setMessage,
    startConversation
} from "./dom";
import {Author, Phase} from "./redux/actions";

class HuisoDisconnectedError extends Error {
}

async function sleep(seconds) {
    try {
        console.log(await waitFor(state => state.phase !== Phase.CONNECTED, seconds));
    } catch (e) {
        if (e instanceof TimeoutError) {
            return;
        } else {
            throw e;
        }
    }
    throw new HuisoDisconnectedError();
}

async function onlySend(...messages) {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const chars = [...message];
    for (let i = 0; i < chars.length; i++) {
        await sleep(0.05);
        setMessage(chars.slice(0, i).reduce((s, c) => s + c, ''));
    }
    clickSend();
}


function check(string, ...includes) {
    return toArray(includes).some((s) => string.includes(s));
}

class Messenger {
    constructor() {
        this.messages = [];
    }

    filterStrangersMessages(messages) {
        return messages.filter(m => m.author === Author.STRANGER).map(m => m.text);
    }

    found(messages) {
        return this.filterStrangersMessages(messages).length > this.filterStrangersMessages(this.messages);
    }
    
    async waitForResponse() {
        const state = await waitFor(state => this.found(state.messages));
        const messages = this.filterStrangersMessages(state.messages);
        this.messages = messages;
        return messages[messages.length - 1];
    }

    normalizeResponse(response) {
        return response
            .toLowerCase()
            .trim()
            .replace(/\.+/g, ' ');
    }

    async send(...messages) {
        await onlySend(...messages);
        const response = this.normalizeResponse(await this.waitForResponse());
        console.log(response);
        return response;
    }

}

async function main() {
    startObservingDom();
    subscribe(state => console.log('State:', state));

    await waitFor(state => state.domLoaded);

    mockConfirmDialog();
    registerPanelComponent();
    addPanel();
    

    while (true) {
        try {
            await waitFor(state => state.phase === Phase.CONNECTED);
            console.log('Start mining a new huiso');
            const messenger = new Messenger();

            let response;
            response = await messenger.send('1:0 сможешь решить?', '1/0 сколько будет?', '1 на 0 сможешь разделить?');

            const huisosAnswer = (r) => check(r, 'ноль', 'нуль', 'один', 'бесконечн', '0', '1');
            const schoolboyAnswer = (r) => check(r, 'не делит', 'нельзя');
            const yesAnswer = (r) => ['да', 'могу', 'конечн', 'конеш'].includes(r);
            const drocherAnswer = (r) => check(r, 'хуй', 'дроч', 'стоит', 'конч', 'член', 'шлюх', 'пошал', 'сладен', 'секс');
            const otherAnswers = (r) => ['не', 'нет'].includes(r) || check(r, 'гуман', 'лет', 'сколько тебе');

            if (check(response, 'лет', 'сколько тебе')) {
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
                response = await messenger.send('хуй покажешь в скайпе');
                if (check(response, 'да', 'покажу')) {
                    await onlySend('добавляйся');
                    await onlySend('lera.lera872');
                    await sleep(5);
                } else {
                    await onlySend('ну и пошел нахуй');
                }
                disconnect();
                startConversation();
                break;
            } else if (check(response, 'гуман')) {
                disconnect();
                startConversation();
                break;
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
                    await onlySend(2, '"' + response + '""');
                    await onlySend(2, 'че за хуйню ты тут пишешь?');
                    response = await messenger.send('ты че, совсем тупой?', 'тупорылый штоле?');
                } else {
                    await onlySend(2, response + '?');
                    response = await messenger.send('ты че, совсем тупой?', 'тупорылый штоле?', 'а не хуесос ли ты?');
                }
            }

            await onlySend(4, 'в скайпе не зассышь базарить?', 'в скайпе базарить не зассышь?');
            if (Math.random() < 0.5) {
                await onlySend(1.5, 'добавляйся');
            }
            await onlySend(3, 'lera.lera872');
            await sleep(20);

            disconnect();
            startConversation();
        } catch (e) {
            if (e instanceof HuisoDisconnectedError) {
                console.log('Huiso disconnected');
                await sleep(1);
                startConversation();
            } else if (e instanceof TimeoutError) {
                console.log('Timeout');
                await sleep(1);
                disconnect();
                startConversation();
            } else {
                throw e;
            }
        }
    }
}

const ignored = main();
