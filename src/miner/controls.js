
import {clickSend, setMessage} from "./dom";
import {toArray} from "./utils";
import {Author, Phase} from "./redux/actions";
import {TimeoutError, waitFor} from "./redux/store";

export class HuisoDisconnectedError extends Error {
}

export class DisabledError extends Error {
}

export async function sleep(seconds, ignoreDisconnected = false) {
    if (ignoreDisconnected) {
        await new Promise(resolve => setTimeout(resolve, seconds * 1000));
        return;
    }

    try {
        const state = await waitFor(state => state.phase !== Phase.CONNECTED || !state.enabled, seconds);
        if (!state.enabled) {
            throw new DisabledError();
        } else {
            throw new HuisoDisconnectedError();
        }
    } catch (e) {
        if (e instanceof TimeoutError) {
            return;
        } else {
            throw e;
        }
    }
}

export async function onlySend(...messages) {
    await sleep(1);
    const message = messages[Math.floor(Math.random() * messages.length)];
    const chars = [...message];
    for (let i = 0; i < chars.length; i++) {
        await sleep(0.15);
        setMessage(chars.slice(0, i + 1).reduce((s, c) => s + c, ''));
    }
    clickSend();
    console.log('Sent:', message);
}

export function check(string, ...includes) {
    return toArray(includes).some((s) => string.includes(s));
}

export async function isMessagesPresent(timeout) {
    try {
        const state = await waitFor(state => state.messages.length > 0 || !state.enabled, timeout);
        if (!state.enabled) {
            throw new DisabledError();
        }
        return true;
    } catch (e) {
        if ((e instanceof TimeoutError)) {
            return false;
        } else {
            throw e;
        }
    }
}

export class Messenger {
    constructor() {
        this.messages = [];
    }

    filterStrangersMessages(messages) {
        return messages.filter(m => m.author === Author.STRANGER).map(m => m.text);
    }

    found(messages) {
        console.debug('Old messages:', this.messages);
        console.debug('New messages:', messages);
        const result = this.filterStrangersMessages(messages).length > this.filterStrangersMessages(this.messages).length;
        console.debug('New message found:', result);
        return result
    }

    async waitForResponse() {
        const state = await waitFor(state => this.found(state.messages) || state.phase !== Phase.CONNECTED || !state.enabled);
        if (!state.enabled) {
            throw new DisabledError();
        } else if (state.phase !== Phase.CONNECTED) {
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