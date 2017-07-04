import { GenericResponse } from "./GenericResponse";

export class GenericCollection<Class extends GenericResponse, Interface> extends Array<Readonly<Interface>> {
	constructor(objects: Array<Readonly<Interface>>, instantiable: GenericResponse.Instantiable) {
		super();

		for (const object of objects)
			this.push((object instanceof instantiable) ? object : new (<any>instantiable(object)));
	}
}