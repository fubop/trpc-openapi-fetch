"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenApiFetchHandler = void 0;
const server_1 = require("@trpc/server");
const core_1 = require("./node-http/core");
const getUrlEncodedBody = async (req) => {
    const params = new URLSearchParams(await req.text());
    const data = {};
    for (const key of params.keys()) {
        data[key] = params.getAll(key);
    }
    return data;
};
// co-body does not parse Request body correctly
const getRequestBody = async (req) => {
    var _a, _b;
    try {
        if ((_a = req.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('application/json')) {
            return {
                isValid: true,
                // use JSON.parse instead of req.json() because req.json() does not throw on invalid JSON
                data: JSON.parse(await req.text()),
            };
        }
        if ((_b = req.headers.get('content-type')) === null || _b === void 0 ? void 0 : _b.includes('application/x-www-form-urlencoded')) {
            return {
                isValid: true,
                data: await getUrlEncodedBody(req),
            };
        }
        return {
            isValid: true,
            data: req.body,
        };
    }
    catch (err) {
        return {
            isValid: false,
            cause: err,
        };
    }
};
const createRequestProxy = async (req, url) => {
    const body = await getRequestBody(req);
    return new Proxy(req, {
        get: (target, prop) => {
            if (prop === 'url') {
                return url ? url : target.url;
            }
            if (prop === 'headers') {
                return new Proxy(target.headers, {
                    get: (target, prop) => {
                        return target.get(prop.toString());
                    },
                });
            }
            if (prop === 'body') {
                if (!body.isValid) {
                    throw new server_1.TRPCError({
                        code: 'PARSE_ERROR',
                        message: 'Failed to parse request body',
                        cause: body.cause,
                    });
                }
                return body.data;
            }
            return target[prop];
        },
    });
};
const createOpenApiFetchHandler = async (opts) => {
    const resHeaders = new Headers();
    const url = new URL(opts.req.url.replace(opts.endpoint, ''));
    const req = await createRequestProxy(opts.req, url.toString());
    const createContext = () => {
        if (opts.createContext) {
            return opts.createContext({ req: opts.req, resHeaders });
        }
        return () => ({});
    };
    const openApiHttpHandler = (0, core_1.createOpenApiNodeHttpHandler)({
        router: opts.router,
        createContext,
        onError: opts.onError,
        responseMeta: opts.responseMeta,
    });
    return new Promise((resolve) => {
        let statusCode;
        return openApiHttpHandler(req, {
            setHeader: (key, value) => {
                if (typeof value === 'string') {
                    resHeaders.set(key, value);
                }
                else {
                    for (const v of value) {
                        resHeaders.append(key, v);
                    }
                }
            },
            get statusCode() {
                return statusCode;
            },
            set statusCode(code) {
                statusCode = code;
            },
            end: (body) => {
                resolve(new Response(body, {
                    headers: resHeaders,
                    status: statusCode,
                }));
            },
        });
    });
};
exports.createOpenApiFetchHandler = createOpenApiFetchHandler;
//# sourceMappingURL=fetch.js.map