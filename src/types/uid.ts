import { nanoid } from 'nanoid';

export type { CUID, DUID };
const defaultUIDLength = 16;

export function createUID(): string {
  return nanoid(defaultUIDLength);
}

export function createNullUID(): string {
  return Buffer.alloc(defaultUIDLength).fill('0').toString();
}

type CUID = string;

type DUID = string;

export function strcmp(a: string, b: string): number {
  if (a === b) {
    return 0;
  }
  if (a > b) {
    return 1;
  }
  return -1;
}
