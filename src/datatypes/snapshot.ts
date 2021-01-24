export type { Snapshot };

interface Snapshot {
  fromJSON(json: string): void;
}