import { GenericCommonQuery } from "./GenericCommonQuery";
import { Interfaces } from "../Interfaces";

export class Search extends GenericCommonQuery implements Readonly<Interfaces.Query.Search> {
	public readonly q: string;

	constructor(search: Interfaces.Query.Search) { super(search); }
}