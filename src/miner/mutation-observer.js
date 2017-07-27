"use strict";
import {dispatch} from './redux/store'
import {domLoaded, Phase, setMessages, setPanelState, setPhase} from "./redux/actions"
import {
    isConnected, isDisconnected, isLoading, isSearching, isSelectingOptions, listenToPanelUpdate,
    parseMessages
} from "./dom";

function getPhase() {
    const loading = isLoading();
    const selectingOptions = isSelectingOptions();
    const searching = isSearching();
    const connected = isConnected();
    const disconnected = isDisconnected();

    let matchesCount = [loading, selectingOptions, searching, connected, disconnected]
        .filter(b => b === true)
        .length;
    if (matchesCount !== 1) {
        console.log('Count mismatch:', {loading, selectingOptions, searching, connected, disconnected})
    }
    if (loading) {
        return Phase.LOADING;
    } else if (selectingOptions) {
        return Phase.SELECTING_OPTIONS;
    } else if (searching) {
        return Phase.SEARCHING;
    } else if (connected) {
        return Phase.CONNECTED;
    } else if (disconnected) {
        return Phase.DISCONNECTED;
    } else {
        throw Error('Unknown state');
    }
}

const observer = new MutationObserver(() => {
    dispatch(setPhase(getPhase()));
    dispatch(setMessages(parseMessages()));
});

export function startObservingDom() {
    document.addEventListener("DOMContentLoaded", () => {
        dispatch(domLoaded());
        observer.observe(document, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true
        })
    });
}

export function observePanel() {
    listenToPanelUpdate(panelState => dispatch(setPanelState(panelState)));
}
