import { GenericResponse } from "./GenericResponse";
import { Interfaces } from "../Interfaces";
import { User } from "./User";

const overrides = new Map<keyof DuplicateReport, GenericResponse.Instantiable>([["modifier", User], ["created_at", Date]]);

export class DuplicateReport extends GenericResponse implements Readonly<Interfaces.Response.DuplicateReport> {
	public readonly id: number;
	public readonly state: Interfaces.Response.StateNames;
	public readonly reason: string;
	public readonly image_id: number;
	public readonly duplicate_of_image_id: number;
	public readonly user_id: null;
	public readonly modifier: User;
	public readonly created_at: Date;

	constructor(duplicateReport: Interfaces.Response.DuplicateReport) { super(overrides, duplicateReport); }
}