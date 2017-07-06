import { GenericCollection } from "./GenericCollection";
import { Interfaces } from "../Interfaces";
import { Comment } from "./Comment";

export class Comments extends GenericCollection<Comment, Interfaces.Response.Comment> {
	constructor(comments: Array<Readonly<Interfaces.Response.Comment>>) {
		super(comments, Comment);
	}
}