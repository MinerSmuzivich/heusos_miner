"use strict";
import {startObservingDom} from './mutation-observer'
import {subscribe, TimeoutError, waitFor} from "./redux/store"
import {addPanel, disconnect, mockConfirmDialog, registerPanelComponent, startConversation} from "./dom";
import {Phase} from "./redux/actions";
import {devideByZero} from "./dialogs/zero";
import {HuisoDisconnectedError, isMessagesPresent, Messenger, sleep} from "./controls";

async function main() {
    startObservingDom();
    subscribe(state => console.debug('State:', state));

    await waitFor(state => state.domLoaded);

    mockConfirmDialog();
    registerPanelComponent();
    addPanel();

    await waitFor(state => state.phase === Phase.CONNECTED);
    if (await isMessagesPresent(0.2)) {
        await sleep(1, true);
        disconnect();
        startConversation();
        await sleep(1, true);
    }

    while (true) {
        try {
            await waitFor(state => state.phase === Phase.CONNECTED);
            console.log('Start mining a new huiso');
            const messenger = new Messenger();

            await devideByZero(messenger);
            await sleep(20, true);

            disconnect();
            startConversation();
        } catch (e) {
            if (e instanceof HuisoDisconnectedError) {
                console.log('Huiso disconnected');
                await sleep(1, true);
                startConversation();
            } else if (e instanceof TimeoutError) {
                console.log('Timeout');
                await sleep(1, true);
                disconnect();
                startConversation();
            } else {
                throw e;
            }
        }
    }
}

const ignored = main();
