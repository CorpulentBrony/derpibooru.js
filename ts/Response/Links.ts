import { GenericCollection } from "./GenericCollection";
import { Interfaces } from "../Interfaces";
import { Link } from "./Link";

export class Links extends GenericCollection<Link, Interfaces.Response.Link> {
	constructor(links: Array<Readonly<Interfaces.Response.Link>>) {
		super(links, Link);
	}
}