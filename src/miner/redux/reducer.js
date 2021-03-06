"use strict";
import {combineReducers} from "redux";
import {DOM_LOADED, Phase, SET_MESSAGES, SET_PANEL_STATE, SET_PHASE} from "./actions";

function domLoaded(oldDomLoaded = false, action) {
    return action.type === DOM_LOADED ? true : oldDomLoaded;
}

function phase(oldPhase = Phase.INITIAL, action) {
    return action.type === SET_PHASE ? action.phase : oldPhase;
}

function messages(oldMessages = [], action) {
    return action.type === SET_MESSAGES ? action.messages : oldMessages;
}

function enabled(oldEnabled = true, action) {
    return action.type === SET_PANEL_STATE ? action.panelState.enabled : oldEnabled;
}

const reducer = combineReducers({domLoaded, phase, messages, enabled});

export default reducer;