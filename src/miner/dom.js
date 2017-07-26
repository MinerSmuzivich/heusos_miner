"use strict";
import {toArray} from "./utils";
import {Author} from "./redux/actions";

function isContainsClass(selector, clazz) {
    const element = document.querySelector(selector);
    return element.classList.contains(clazz);
}

function notHidden(selector) {
    return !isContainsClass(selector, 'hides');
}

export function isLoading() {
    return notHidden('.load_init_step');
}

export function isSelectingOptions() {
    return notHidden('.main_step');
}

export function isSearching() {
    return notHidden('.search_company_step');
}

export function isConnected() {
    return notHidden('.st_chatbox') && !notHidden('.status-end') && !notHidden('.search_company_step');
}

export function isDisconnected() {
    return notHidden('.status-end');
}

export function mockConfirmDialog() {
    const head = document.getElementsByTagName('head').item(0);
    const js = document.createTextNode('window.confirm = function() { return true; };');
    const script = document.createElement('script');
    script.appendChild(js);
    head.appendChild(script);
}

export function addPanel() {
    const panel = document.createElement('miner-panel');
    panel.setAttribute('id', 'miner-panel');
    document.body.appendChild(panel);
}

export function registerPanelComponent() {
    const script = document.createElement('link');
    script.setAttribute('href', chrome.extension.getURL("panel/panel.html"));
    script.setAttribute('rel', 'import');
    document.body.appendChild(script);
}

export function startConversation() {
    document.getElementById('new_talk_but').click();
}

export function disconnect() {
    if (isContainsClass('#sendMessageBtn', 'disabled')) {
        console.error('Disconnect is disabled');
    }
    document.getElementById('closeDialogBtn').click();
}

export function parseMessages() {
    const result = [];
    for (const div of toArray(document.querySelectorAll('.mess_block'))) {
        const author = div.classList.contains('window_chat_dialog_block_nekto') ? Author.STRANGER : Author.ME;
        const text = div.querySelector('.window_chat_dialog_text').textContent;
        result.push({author, text});
    }
    return result;
}

export function setMessage(message) {
    const inputDiv = document.querySelector('.emojionearea-editor');
    inputDiv.innerHTML = message;
}

export function clickSend() {
    document.getElementById('sendMessageBtn').click();
}