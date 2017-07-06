import { Nullable } from "../Nullable";
import { URL } from "../URL";

// https://derpibooru.org/channels.json
export type Channels = Array<Channel>;
// https://derpibooru.org/lists/user_comments/305981.json
export type Comments = Array<Comment>;
// https://derpibooru.org/posts/search.json
export type ForumPosts = Array<ForumPost>;
// https://derpibooru.org/galleries.json
export type Galleries = Array<Gallery>;
export type oEmbed = oEmbedJson | oEmbedXml;
// https://derpibooru.org/oembed.xml?url=https://derpibooru.org/17842
export type oEmbedXml = string;
export type RepresentationAllNames = RepresentationAnimatedNames | RepresentationNames;
export type RepresentationAnimatedNames = "webm" | "mp4";
export type RepresentationNames = "thumb_tiny" | "thumb_small" | "thumb" | "small" | "medium" | "large" | "tall" | "full";
export type Representations = Partial<RepresentationsAnimated> & { [P in RepresentationNames]: URL; };
export type RepresentationsAnimated = { [P in RepresentationAnimatedNames]: URL; };
export type StateNames = "rejected" | "verified";
export type UserRoleNames = "admin" | "assistant" | "moderator" | "user";

export interface Award extends Titled {
	image_url: URL; // URL (safe if https: appended)
	award_id: number;
	label: string;
	awarded_on: Date; // Date
}

export interface Channel extends Nullable<Descriptive>, Titled {
	short_name: string;
	is_live: boolean;
	nsfw: boolean;
	viewers: number;
	image: URL; // URL (safe if https: appended)
	last_fetched_at: Date; // Date
	last_live_at: Nullable<Date>; // Date
	next_check_at: Nullable<Date>; // Date
	artist_tag: string;
}

export interface Comment extends Identifiable, UserPostedTextContent {
	image_id: number;
	posted_at: Date; // Date
	deleted: boolean;
}

export interface Created { created_at: Date; }

export interface Descriptive { description: string; }

export interface DuplicateReport extends Created, Identifiable {
	state: StateNames;
	reason: string;
	image_id: number;
	duplicate_of_image_id: number;
	user_id: null;
	modifier: User;
}

export interface FormatMimeTypes {
	gif: "image/gif";
	jpeg: "image/jpeg";
	png: "image/png";
}

// https://derpibooru.org/filters/100073.json
export interface Filter extends Descriptive, Identifiable, Named {
	hidden_tag_ids: Array<number>;
	spoilered_tag_ids: Array<number>;
	hidden_tags: string;
	hidden_complex: string;
	spoilered_complex: string;
	public: boolean;
	system: boolean;
	user_count: number;
	user_id: Nullable<number>;
}

// https://derpibooru.org/filters.json
export interface Filters {
	system_filters: Array<Filter>;
	user_filters: Array<Filter>;
	search_filters: Array<Filter>;
}

export interface ForumPost extends Identifiable, UserPostedTextContent { topic_id: number; }

export interface Gallery extends Created, Descriptive, Identifiable, Titled {
	spoiler_warning: string;
	updated_at: Date; // Date
	creator_id: number;
	watcher_count: number;
	image_count: number;
}

export interface Identifiable<T = number> { id: T; }

// https://derpibooru.org/44819.json
export interface Image extends Created, Descriptive, Identifiable<string> {
	updated_at: Date; // Date
	duplicate_reports: Array<DuplicateReport>;
	first_seen_at: Date; // Date
	uploader_id: string;
	score: number;
	comment_count: number;
	width: number;
	height: number;
	file_name: string;
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
	sha512_hash: string;
	orig_sha512_hash: Nullable<string>;
	source_url: string; // URL
	comments?: Comments;
	favourited_by_users?: Array<string>;
	representations: Representations;
	is_rendered: boolean;
	is_optimized: boolean;
}

// https://derpibooru.org/images.json
export interface Images { images: Array<Image>; }

export interface Link extends Created {
	user_id: number;
	state: StateNames;
	tag_ids: Array<number>;
}

export interface Named { name: string; }

// https://derpibooru.org/oembed.json?url=https://derpibooru.org/17842
export interface oEmbedJson extends Titled {
	version: "1.0";
	type: "photo";
	author_url: Nullable<string>; // URL
	author_name: string;
	provider_name: "Derpibooru";
	provider_url: URL; // URL (safe)
	cache_age: number;
	derpibooru_score: number;
	derpibooru_comments: number;
	derpibooru_tags: Array<string>;
	thumbnail_url: URL; // URL (safe if https: appended)
}

// https://derpibooru.org/lists.json
export interface Rankings {
	top_scoring: Array<Image>;
	top_commented: Array<Image>;
	all_time_top_scoring: Array<Image>;
}

// https://derpibooru.org/search.json?q=twilight%20sparkle
export interface Search {
	search: Array<Image>;
	total: number;
}

// https://derpibooru.org/tags.json
export interface Tag extends Descriptive, Identifiable, Named {
	slug: string;
	short_description: string;
	images: number;
	spoiler_image_uri: URL; // URL (safe if https: appended)
	aliased_to: Nullable<string>;
	aliased_to_id: Nullable<number>;
	namespace: Nullable<string>;
	name_in_namespace: string;
	implied_tags: string;
	implied_tag_ids: Array<number>;
}

export interface Titled { title: string; }

// https://derpibooru.org/profiles/Corpulent+Brony.json
export interface User extends Created, Descriptive, Identifiable, Named {
	slug: string;
	role: UserRoleNames;
	avatar_url: URL; // URL (safe if https: appended)
	comment_count: number;
	uploads_count: number;
	post_count: number;
	topic_count: number;
	links: Array<Link>;
	awards: Array<Award>;
}

export interface UserPostedTextContent {
	body: string;
	author: string;
}

export const representationNames: Array<RepresentationAllNames> = Array.of<RepresentationAllNames>("thumb_tiny", "thumb_small", "thumb", "small", "medium", "large", "tall", "full", "webm", "mp4");