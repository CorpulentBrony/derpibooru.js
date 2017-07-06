import { GenericCollection } from "./GenericCollection";
import { Interfaces } from "../Interfaces";
import { Award } from "./Award";

export class Awards extends GenericCollection<Award, Interfaces.Response.Award> {
	constructor(awards: Array<Readonly<Interfaces.Response.Award>>) {
		super(awards, Award);
	}
}