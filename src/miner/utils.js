"use strict";

export function toArray(varargs) {
    return Array.prototype.slice.call(varargs);
}