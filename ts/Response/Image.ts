import { Comments } from "./Comments";
import { DuplicateReports } from "./DuplicateReports";
import { GenericResponse } from "./GenericResponse";
import { Interfaces } from "../Interfaces";
import { Nullable } from "../Nullable";
import { Representations } from "./Representations";
import { URL } from "../URL";

const overrides = new Map<keyof Image, GenericResponse.Instantiable>([
	["created_at", Date], ["updated_at", Date], ["duplicate_reports", DuplicateReports], ["first_seen_at", Date], ["image", URL], ["comments", Comments], ["representations", Representations]
]);

export class Image extends GenericResponse implements Readonly<Interfaces.Response.Image> {
	public readonly id: string;
	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly duplicate_reports: DuplicateReports;
	public readonly first_seen_at: Date;
	public readonly uploader_id: string;
	public readonly score: number;
	public readonly comment_count: number;
	public readonly width: number;
	public readonly height: number;
	public readonly file_name: string;
	public readonly description: string;
	public readonly uploader: string;
	public readonly image: URL;
	public readonly upvotes: number;
	public readonly downvotes: number;
	public readonly faves: number;
	public readonly tags: string;
	public readonly tag_ids: Array<string>;
	public readonly aspect_ratio: number;
	public readonly original_format: keyof Interfaces.Response.FormatMimeTypes;
	public readonly mime_type: Interfaces.Response.FormatMimeTypes[keyof Interfaces.Response.FormatMimeTypes];
	public readonly sha512_hash: string;
	public readonly orig_sha512_hash: Nullable<string>;
	public readonly source_url: string;
	public readonly comments?: Comments;
	public readonly favourited_by_users?: Array<string>;
	public readonly representations: Representations;
	public readonly is_rendered: boolean;
	public readonly is_optimized: boolean;

	constructor(id: number | string);
	constructor(result: Interfaces.Response.Image);
	constructor(idOrResult: number | string | Interfaces.Response.Image) {
		if (typeof idOrResult === "string" || typeof idOrResult === "number") {
			// query ie https://derpibooru.org/44819.json
		} else {
			super(overrides, idOrResult);
		}
	}
}