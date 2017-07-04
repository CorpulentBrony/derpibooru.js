import { Awards } from "./Awards";
import { GenericResponse } from "./GenericResponse";
import { Interfaces } from "../Interfaces";
import { Links } from "./Links";
import { URL } from "../URL";

const overrides = new Map<keyof User, GenericResponse.Instantiable>([["avatar_url", URL], ["created_at", Date], ["links", Links], ["awards", Awards]]);

export class User extends GenericResponse implements Readonly<Interfaces.Response.User> {
	public readonly id: number;
	public readonly name: string;
	public readonly slug: string;
	public readonly role: Interfaces.Response.UserRoleNames;
	public readonly description: string;
	public readonly avatar_url: URL;
	public readonly created_at: Date;
	public readonly comment_count: number;
	public readonly uploads_count: number;
	public readonly post_count: number;
	public readonly topic_count: number;
	public readonly links: Links;
	public readonly awards: Awards;

	constructor(name: string);
	constructor(id: number);
	constructor(user: Interfaces.Response.User);
	constructor(nameOrIdOrUser: string | number | Interfaces.Response.User) {
		if (typeof nameOrIdOrUser === "string" || typeof nameOrIdOrUser === "number") {
			// query ie https://derpibooru.org/profiles/Corpulent+Brony.json
		} else {
			super(overrides, nameOrIdOrUser);
		}
	}
}