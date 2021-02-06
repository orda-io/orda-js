export type { Snapshot };

interface Snapshot {
  fromJSON(json: string): void;
  toJSON(): unknown;
  toJSONString(): string;
}
