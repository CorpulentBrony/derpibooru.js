import { GenericResponse } from "./GenericResponse";

export abstract class GenericCollection<Class extends GenericResponse, Interface> extends Array<Readonly<Interface>> {
	constructor(objects: Array<Readonly<Interface>>, instantiable: GenericResponse.Instantiable) {
		super();
		console.log({ objects, instantiable });
		for (const object of objects)
			this.push((object instanceof instantiable) ? object : new (<any>instantiable)(object));
	}
}