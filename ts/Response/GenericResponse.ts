export class GenericResponse {
	constructor(overrides: Map<string, GenericResponse.Instantiable>, initialObject: object) {
		const defaultDescriptor: PropertyDescriptor = { configurable: false, enumerable: true, writable: false };

		for (const [property, value] of Object.entries(initialObject))
			if (overrides.has(property) && !(value instanceof overrides.get(property)!) && value != null)
				Object.defineProperty(this, property, Object.assign({ value: new (<any>(overrides.get(property)!))(value) }, defaultDescriptor));
			else
				Object.defineProperty(this, property, Object.assign({ value }, defaultDescriptor));
	}
}

export namespace GenericResponse {
	export type Instantiable = Function & { new(...args: Array<any>): any; };
}