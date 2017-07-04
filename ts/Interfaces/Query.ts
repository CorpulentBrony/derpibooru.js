import { URL } from "../URL";

// for all documented queries: https://derpibooru.org/pages/api
export type OrderNames = "a" | "d";

export interface Common extends Common.Commentable, Common.Favable, Common.Filterable, Common.Keyable, Common.Paginated {}

export interface ConstraintTypes {
	created: Date;
	id: number;
	updated: Date;
}

export interface Images<T extends keyof ConstraintTypes> extends Common {
	constraint: T;
	gt: ConstraintTypes[T];
	gte: ConstraintTypes[T];
	lt: ConstraintTypes[T];
	lte: ConstraintTypes[T];
	order: OrderNames; // default "a"
	// deleted: boolean; // this doesn't seem to actually change output
	random_image: boolean;
}

export interface Lists extends Common { last: string; }
export interface oEmbed { url: URL; }
// Note the list pages default to a 7 day sampling period; this can be altered with a URL parameter such as 6h, 24h, 7d, 4w
export interface Rankings extends Common.Filterable, Common.Keyable { last: string; }
export interface Search extends Common { q: string; }

export const Filters = { DEFAULT: 100073, EVERYTHING: 56027, ["18+_R34"]: 37432, MAXIMUM_SPOILERS: 37430, LEGACY_DEFAULT: 37431, ["18+_DARK"]: 37429 };

export namespace Common {
	export interface Commentable { comments: boolean; }
	export interface Favable { fav: boolean; }
	export interface Filterable { filter_id: number; }
	export interface Keyable { key: string; }

	export interface Paginated {
		page: number;
		perpage: number; // default 15
	}
}