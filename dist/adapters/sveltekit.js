"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockNodeHTTPResponse = exports.createMockNodeHTTPRequest = void 0;
const node_mocks_http_1 = require("node-mocks-http");
const events_1 = require("events");
const createMockNodeHTTPRequest = async (event) => {
    const url = new URL(event.url);
    const method = event.request.method.toUpperCase();
    let body = undefined;
    if (event.request.headers.get('content-type') === 'application/json') {
        try {
            body = await event.request.json();
        }
        catch (e) {
            console.error('Failed to parse JSON body', e);
        }
    }
    return {
        method,
        url: url.toString(),
        headers: Object.fromEntries(event.request.headers.entries()),
        body,
    };
};
exports.createMockNodeHTTPRequest = createMockNodeHTTPRequest;
const createMockNodeHTTPResponse = () => {
    return (0, node_mocks_http_1.createResponse)({ eventEmitter: events_1.EventEmitter });
};
exports.createMockNodeHTTPResponse = createMockNodeHTTPResponse;
//# sourceMappingURL=sveltekit.js.map