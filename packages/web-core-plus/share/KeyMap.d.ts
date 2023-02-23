export declare class KeyMap<Key1, Key2, Value> {
    private map;
    get(key1: Key1, key2: Key2): Value;
    set(key1: Key1, key2: Key2, value: Value): void;
    getProperty(key1: Key1): Map<Key2, Value>;
    forEach(cb: (value: Value, key1: Key1, key2: Key2) => void): void;
    delete(key1: Key1): void;
    deleteAll(): void;
}
