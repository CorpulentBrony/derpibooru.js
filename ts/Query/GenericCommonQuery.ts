import { GenericQuery } from "./GenericQuery";
import { Interfaces } from "../Interfaces";

export abstract class GenericCommonQuery extends GenericQuery implements Readonly<Interfaces.Query.Common> {
	public readonly comments: boolean;
	public readonly fav: boolean;
	public readonly filter_id: number;
	public readonly key: string;
	public readonly page: number;
	public readonly perpage: number;

	constructor(common: Interfaces.Query.Common) { super(common); }
}