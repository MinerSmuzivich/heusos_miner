"use strict";
import {createStore} from 'redux'
import reducer from './reducer'

const store = createStore(reducer);

export class TimeoutError extends Error {
}

export function waitFor(condition, timeoutSeconds = 30) {
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

export function dispatch(action) {
    store.dispatch(action)
}

export function subscribe(listener) {
    store.subscribe(() => listener(store.getState()));
}