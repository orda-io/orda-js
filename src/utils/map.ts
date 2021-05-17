export { ExtMap };

class ExtMap<K, V> extends Map<K, V> {
  getOrElseSet(k: K, v: V): V {
    const existing = this.get(k);
    if (existing) {
      return existing;
    }
    this.set(k, v);
    return v;
  }
}
