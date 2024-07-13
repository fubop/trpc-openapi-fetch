import { RequestEvent } from '@sveltejs/kit';
import { createResponse } from 'node-mocks-http';
import { EventEmitter } from 'events';

export const createMockNodeHTTPRequest = async (event: RequestEvent) => {
  const url = new URL(event.url);
  const method = event.request.method.toUpperCase();
  let body: any = undefined;

  if (event.request.headers.get('content-type') === 'application/json') {
    try {
      body = await event.request.json();
    } catch (e) {
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

export const createMockNodeHTTPResponse = () => {
  return createResponse({ eventEmitter: EventEmitter });
};
