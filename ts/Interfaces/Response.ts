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
export type RepresentationNames = "thumb_tiny" | "thumb_small" | "thumb" | "small" | "medium" | "large" | "tall" | "full";
export type Representations = { [P in RepresentationNames]: URL; } // URL (safe if https: appended)
export type StateNames = "rejected" | "verified";
export type UserRoleNames = "admin" | "assistant" | "moderator" | "user";

export interface Award {
	image_url: URL; // URL (safe if https: appended)
	title: string;
	award_id: number;
	label: string;
	awarded_on: Date; // Date
}

export interface Channel {
	short_name: string;
	title: string;
	description: string | null;
	is_live: boolean;
	nsfw: boolean;
	viewers: number;
	image: URL; // URL (safe if https: appended)
	last_fetched_at: Date; // Date
	last_live_at: Date | null; // Date
	next_check_at: Date | null; // Date
	artist_tag: string;
}

export interface Comment {
	id: number; // id
	body: string;
	author: string;
	image_id: number;
	posted_at: Date; // Date
	deleted: boolean;
}

export interface DuplicateReport {
	id: number; // id
	state: StateNames;
	reason: string;
	image_id: number;
	duplicate_of_image_id: number;
	user_id: null;
	modifier: User;
	created_at: Date; // Date
}

export interface FormatMimeTypes {
	gif: "image/gif";
	jpeg: "image/jpeg";
	png: "image/png";
}

// https://derpibooru.org/filters/100073.json
export interface Filter {
	id: number; // id
	name: string;
	description: string;
	hidden_tag_ids: Array<number>;
	spoilered_tag_ids: Array<number>;
	hidden_tags: string;
	hidden_complex: string;
	spoilered_complex: string;
	public: boolean;
	system: boolean;
	user_count: number;
	user_id: number | null;
}

// https://derpibooru.org/filters.json
export interface Filters {
	system_filters: Array<Filter>;
	user_filters: Array<Filter>;
	search_filters: Array<Filter>;
}

export interface ForumPost {
	id: number; // id
	topic_id: number;
	body: string;
	author: string;
}

export interface Gallery {
	id: number; // id
	title: string;
	description: string;
	spoiler_warning: string;
	updated_at: Date; // Date
	created_at: Date; // Date
	creator_id: number;
	watcher_count: number;
	image_count: number;
}

// https://derpibooru.org/44819.json
export interface Image {
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
}

// https://derpibooru.org/images.json
export interface Images { images: Array<Image>; }

export interface Link {
	user_id: number;
	created_at: Date; // Date
	state: StateNames;
	tag_ids: Array<number>;
}

// https://derpibooru.org/oembed.json?url=https://derpibooru.org/17842
export interface oEmbedJson {
	version: "1.0";
	type: "photo";
	title: string;
	author_url: string | null; // URL
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
export interface Tag {
	id: number;
	name: string;
	slug: string;
	description: string;
	short_description: string;
	images: number;
	spoiler_image_uri: URL; // URL (safe if https: appended)
	aliased_to: string | null;
	aliased_to_id: number | null;
	namespace: string | null;
	name_in_namespace: string;
	implied_tags: string;
	implied_tag_ids: Array<number>;
}

// https://derpibooru.org/profiles/Corpulent+Brony.json
export interface User {
	id: number; // id
	name: string;
	slug: string;
	role: UserRoleNames;
	description: string;
	avatar_url: URL; // URL (safe if https: appended)
	created_at: Date; // Date
	comment_count: number;
	uploads_count: number;
	post_count: number;
	topic_count: number;
	links: Array<Link>;
	awards: Array<Award>;
}