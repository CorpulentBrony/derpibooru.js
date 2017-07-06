import { GenericCache } from "./GenericCache";

/* This cache basically just uses a Map implementation and stores values in memory */
export class InMemory<Key, Value = any> extends GenericCache<Key, Value> {
	private readonly cache: Map<Key, Value>;

	constructor(options: Partial<GenericCache.Options<Key, Value>>) {
		super(options);
		this.cache = new Map<Key, Value>();
	}

	public delete(key: Key): boolean { return super.delete(key) && this.cache.delete(key); }

	public forEach(callbackfn: (value: Value, key: Key, cache: Readonly<this>) => void, thisArg?: object): void {
		for (const metadatum of this.metadata.sort())
			callbackfn.call(thisArg, this.cache.get(metadatum.key), metadatum.key, this);
	}

	public forEachReverse(callbackfn: (value: Value, key: Key, cache: Readonly<this>) => void, thisArg?: object): void {
		for (let i: number = this.metadata.sort().length - 1; i >= 0; i--)
			callbackfn.call(thisArg, this.cache.get(this.metadata[i].key), this.metadata[i].key, this);
	}

	public get(key: Key): Value | undefined {
		super.get(key);
		return this.cache.get(key);
	}

	public has(key: Key): boolean { return this.cache.has(key); }
	public keys(): Array<Key> { return [...this.cache.keys()]; }
	public peek(key: Key): Value | undefined { return this.cache.get(key); }

	public prune(): void {
		for (const expiredMetadatum of this.metadata.filter((value: GenericCache.MetadataType<Key>): boolean => Date.now() - value.lastAccessed > value.maxAgeMs))
			this.delete(expiredMetadatum.key);

		for (let i: number = this.metadata.sort().length - 1; this.size > this.maximumSize && i >= 0; i--)
			this.delete(this.metadata[i].key);
	}

	// public abstract reset(): void;
	// public abstract serialize(): string;
	// public abstract set(key: Key, value: Value, maxAgeMs?: number): this;
	// public abstract values(): Array<Value>;
	// public abstract [Symbol.iterator](): Iterator<[Key, Value]>;
}

const InMemoryImplementsGenericCacheConstructor: GenericCache.Constructor = InMemory;