// Polyfills for Jest test environments
// Node 23+ has native fetch, so we only need minimal polyfills

import { TextDecoder, TextEncoder } from "node:util";
import { Blob, File } from "node:buffer";
import { MessageChannel, MessagePort } from "node:worker_threads";
import { ReadableStream, TransformStream, WritableStream } from "node:stream/web";

// Set up TextEncoder/TextDecoder (needed before jsdom initializes)
if (typeof globalThis.TextEncoder === "undefined") {
  Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder, configurable: true },
    TextEncoder: { value: TextEncoder, configurable: true },
  });
}

// Set up Blob/File
if (typeof globalThis.Blob === "undefined") {
  Object.defineProperties(globalThis, {
    Blob: { value: Blob, configurable: true },
    File: { value: File, configurable: true },
  });
}

// Set up Streams (needed by some libraries)
if (typeof globalThis.ReadableStream === "undefined") {
  Object.defineProperties(globalThis, {
    ReadableStream: { value: ReadableStream, configurable: true },
    TransformStream: { value: TransformStream, configurable: true },
    WritableStream: { value: WritableStream, configurable: true },
  });
}

// Set up MessageChannel/MessagePort (needed by undici/MSW)
if (typeof globalThis.MessageChannel === "undefined") {
  Object.defineProperties(globalThis, {
    MessageChannel: { value: MessageChannel, configurable: true },
    MessagePort: { value: MessagePort, configurable: true },
  });
}

// Set up BroadcastChannel (polyfill for node)
if (typeof globalThis.BroadcastChannel === "undefined") {
  // Simple BroadcastChannel polyfill
  class BroadcastChannelPolyfill {
    name: string;
    onmessage: ((ev: MessageEvent) => void) | null = null;
    onmessageerror: ((ev: MessageEvent) => void) | null = null;

    constructor(name: string) {
      this.name = name;
    }

    postMessage(_message: unknown): void {
      // No-op in single process
    }

    close(): void {
      // No-op
    }

    addEventListener(_type: string, _listener: EventListener): void {
      // No-op
    }

    removeEventListener(_type: string, _listener: EventListener): void {
      // No-op
    }

    dispatchEvent(_event: Event): boolean {
      return true;
    }
  }

  Object.defineProperty(globalThis, "BroadcastChannel", {
    value: BroadcastChannelPolyfill,
    configurable: true,
  });
}

// Now import and set up fetch APIs from undici
// This is needed because MSW requires undici's implementation
const { fetch, Headers, FormData, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true, configurable: true },
  Headers: { value: Headers, configurable: true },
  FormData: { value: FormData, configurable: true },
  Request: { value: Request, configurable: true },
  Response: { value: Response, configurable: true },
});
