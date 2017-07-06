// export class GenericQuery extends Map<string, any> {
// 	public get<T>(key: string): T {
// 		return <T>super.get(key);
// 	}

// 	public set(key: string, value: any): this;
// 	public set(object: { [property: string]: any; }): this;
// 	public set(keyOrObject: string | { [property: string]: any; }, value?: any): this {
// 		if (typeof keyOrObject === "string")
// 			super.set(keyOrObject, value);
// 		else
// 			for (const [key, value] of Object.entries<any>(keyOrObject))
// 				super.set(key, value);
// 		return this;
// 	}
// }

export abstract class GenericQuery {
	constructor(initialObject: object) {
		const defaultDescriptor: PropertyDescriptor = { configurable: false, enumerable: true, writable: false };
		const descriptorMap: PropertyDescriptorMap = {};

		for (const [property, value] of Object.entries(initialObject))
			Object.assign(descriptorMap, { [property]: Object.assign({ value }, defaultDescriptor) });
		Object.defineProperties(this, descriptorMap);
	}
}