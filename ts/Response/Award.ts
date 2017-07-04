import { GenericResponse } from "./GenericResponse";
import { Interfaces } from "../Interfaces";
import { URL } from "../URL";

const overrides = new Map<keyof Award, GenericResponse.Instantiable>([["image_url", URL], ["awarded_on", Date]]);

export class Award extends GenericResponse implements Readonly<Interfaces.Response.Award> {
	public readonly image_url: URL;
	public readonly title: string;
	public readonly award_id: number;
	public readonly label: string;
	public readonly awarded_on: Date;

	constructor(award: Interfaces.Response.Award) { super(overrides, award); }
}