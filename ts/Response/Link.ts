import { GenericResponse } from "./GenericResponse";
import { Interfaces } from "../Interfaces";

const overrides = new Map<keyof Link, GenericResponse.Instantiable>([["created_at", Date]]);

export class Link extends GenericResponse implements Readonly<Interfaces.Response.Link> {
	public readonly user_id: number;
	public readonly created_at: Date;
	public readonly state: Interfaces.Response.StateNames;
	public readonly tag_ids: Array<number>;

	constructor(link: Interfaces.Response.Link) { super(overrides, link); }
}