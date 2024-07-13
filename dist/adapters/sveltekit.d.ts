/// <reference types="express" />
import { RequestEvent } from '@sveltejs/kit';
export declare const createMockNodeHTTPRequest: (event: RequestEvent) => Promise<{
    method: string;
    url: string;
    headers: {
        [k: string]: string;
    };
    body: any;
}>;
export declare const createMockNodeHTTPResponse: () => import("node-mocks-http").MockResponse<import("express").Response<any, Record<string, any>>>;
//# sourceMappingURL=sveltekit.d.ts.map