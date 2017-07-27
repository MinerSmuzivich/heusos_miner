"use strict";
export const DOM_LOADED = 'DOM_LOADED';
export const SET_PHASE = 'SET_PHASE';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_PANEL_STATE = 'SET_PANEL_STATE';

export const Phase = {
    INITIAL: 'INITIAL',
    LOADING: 'LOADING',
    SELECTING_OPTIONS: 'SELECTING_OPTIONS',
    SEARCHING: 'SEARCHING',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED'
};

export const Author = {
    STRANGER: 'STRANGER',
    ME: 'ME'
};

export function domLoaded() {
    return {
        type: DOM_LOADED
    }
}

export function setPhase(phase) {
    return {
        type: SET_PHASE,
        phase
    }
}

export function setMessages(messages) {
    return {
        type: SET_MESSAGES,
        messages
    }
}

export function setPanelState(panelState) {
    return {
        type: SET_PANEL_STATE,
        panelState
    }
}