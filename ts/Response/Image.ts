import { DuplicateReports } from "./DuplicateReports";
import { GenericResponse } from "./GenericResponse";
import { Interfaces } from "../Interfaces";
import { URL } from "../URL";

const overrides = new Map<keyof Image, GenericResponse.Instantiable>([["created_at", Date], ["updated_at", Date], ["duplicate_reports", DuplicateReports], ["first_seen_at", Date], ["image", URL]]);

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
	public readonly mime_type: Interfaces.Response.FormatMimeType[keyof Interfaces.Response.FormatMimeType];
	public readonly sha512_hash: number;
	public readonly orig_sha512_hash: number;
	public readonly source_url: string;
	public readonly comments?: Comments;

	constructor(id: string);
	constructor(result: Interfaces.Response.Image);
	constructor(idOrResult: string | Interfaces.Response.Image) {
		if (typeof idOrResult === "string") {
			// query ie https://derpibooru.org/44819.json
		} else {
			super(overrides, idOrResult);
		}
	}
}

/*export interface Image {
	id: string; // id
	created_at: Date; // Date
	updated_at: Date; // Date
	duplicate_reports: Array<DuplicateReport>;
	first_seen_at: Date; // Date
	uploader_id: string;
	score: number;
	comment_count: number;
	width: number;
	height: number;
	file_name: string;
	description: string;
	uploader: string;
	image: URL; // URL (safe if https: appended)
	upvotes: number;
	downvotes: number;
	faves: number;
	tags: string; // maybe tags array?
	tag_ids: Array<string>;
	aspect_ratio: number;
	original_format: keyof FormatMimeTypes;
	mime_type: FormatMimeTypes[keyof FormatMimeTypes];
	sha512_hash: number;
	orig_sha512_hash: number;
	source_url: string; // URL
	comments?: Comments;
	favourited_by_users?: Array<string>;
	representations: Representations;
	is_rendered: boolean;
	is_optimized: boolean;
}*/