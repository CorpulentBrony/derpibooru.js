// loosely basing implementations off of https://www.npmjs.com/package/lru-cache
export abstract class GenericCache<Key, Value> implements Iterable<[Key, Value]>, Readonly<GenericCache.Options<Key, Value>> {
	protected _length: number;
	public readonly calculateLength: (value: Value, key: Key) => number;
	public readonly defaultMaxAgeMs: number;
	public readonly disposeOnSet: boolean;
	public readonly maximumSize: number;
	protected readonly metadata: GenericCache.Metadata<Key>;
	public readonly onDispose: ((value: Value, key: Key) => void) | undefined;
	public readonly prototype: GenericCache.Constructor;
	public readonly showStale: boolean;

	constructor({ calculateLength, defaultMaxAgeMs, disposeOnSet, maximumSize, onDispose, showStale }: Partial<GenericCache.Options<Key, Value>> = GenericCache.defaultOptions) {
		const defaultDescriptor: PropertyDescriptor = { configurable: false, enumerable: true, writable: false };
		const descriptorMap: PropertyDescriptorMap = {};

		for (const [property, value] of Object.entries({ calculateLength, defaultMaxAgeMs, disposeOnSet, maximumSize, onDispose, showStale }))
			if (value !== undefined)
				Object.assign(descriptorMap, { [property]: Object.assign({ value }, defaultDescriptor) });
		Object.defineProperties(this, descriptorMap);
		this.metadata = new GenericCache.Metadata<Key>();
	}

	public get length(): number { return this._length; }

	public get size(): number {
		let size: number = 0;

		for (const [key, value] of this)
			size += this.calculateLength(value, key);
		return size;
	}

	public delete(key: Key): boolean { return this.metadata.delete(key); }
	public abstract forEach(callbackfn: (value: Value, key: Key, cache: Readonly<this>) => void, thisArg?: object): void;
	public abstract forEachReverse(callbackfn: (value: Value, key: Key, cache: Readonly<this>) => void, thisArg?: object): void;

	public get(key: Key): Value | undefined {
		this.metadata.set(key, this.defaultMaxAgeMs);
		return undefined;
	};

	public abstract has(key: Key): boolean;
	public abstract keys(): Array<Key>;
	public abstract peek(key: Key): Value | undefined;
	public abstract prune(): void;
	public reset(): void { this.metadata.reset(); }

	public abstract serialize(): string;

	public set(key: Key, value: Value, maxAgeMs: number = this.defaultMaxAgeMs): this {
		this.metadata.set(key, maxAgeMs);
		return this;
	}

	public abstract values(): Array<Value>;
	public abstract [Symbol.iterator](): Iterator<[Key, Value]>;
}

export namespace GenericCache {
	export type MetadataType<Key> = {
		key: Key;
		lastAccessed: number;
		maxAgeMs: number;
	};

	export interface Constructor {
		unserialize<Key, Value>(serialized: string): GenericCache<Key, Value>;
	}

	export interface Options<Key, Value> {
		calculateLength: (value: Value, key: Key) => number;
		defaultMaxAgeMs: number;
		disposeOnSet: boolean;
		maximumSize: number;
		onDispose?: (value: Value, key: Key) => void;
		showStale: boolean;
	}

	export class Metadata<Key> extends Array<MetadataType<Key>> {
		public delete(key: Key): boolean {
			const targetIndex: number = this.getTargetIndex(key);

			if (targetIndex > -1)
				return Boolean(super.splice(targetIndex, 1).length);
			return false;
		}

		private getTargetIndex(key: Key): number { return super.findIndex((metadatum: MetadataType<Key>): boolean => metadatum.key === key); }
		public reset(): void { super.splice(0, this.length); }

		public set(key: Key, maxAgeMs: number): void {
			const targetIndex: number = this.getTargetIndex(key);

			if (targetIndex > -1)
				this[targetIndex].lastAccessed = Date.now();
			else
				super.push({ key, lastAccessed: Date.now(), maxAgeMs });
		}

		public sort(): this { return super.sort((a: MetadataType<Key>, b: MetadataType<Key>): number => a.lastAccessed - b.lastAccessed); }
		// public sortDescending(): this { return super.sort((a: { key: Key; lastAccessed: number; }, b: { key: Key; lastAccessed: number; }): number => b.lastAccessed - a.lastAccessed); }
	}

	export const defaultOptions: Options<any, any> = {
		calculateLength: (): number => 1,
		defaultMaxAgeMs: Number.POSITIVE_INFINITY,
		disposeOnSet: true,
		maximumSize: Number.POSITIVE_INFINITY,
		showStale: false
	};
}