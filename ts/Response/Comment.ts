import { GenericResponse } from "./GenericResponse";
import { Interfaces } from "../Interfaces";

const overrides = new Map<keyof Comment, GenericResponse.Instantiable>([["posted_at", Date]]);

export class Comment extends GenericResponse implements Readonly<Interfaces.Response.Comment> {
	public readonly id: number;
	public readonly body: string;
	public readonly author: string;
	public readonly image_id: number;
	public readonly posted_at: Date;
	public readonly deleted: boolean;

	constructor(comment: Interfaces.Response.Comment) { super(overrides, comment); }
}