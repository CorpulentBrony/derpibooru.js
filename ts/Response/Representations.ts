import { GenericResponse } from "./GenericResponse";
import { Interfaces } from "../Interfaces";
import { URL } from "../URL";

const overrides = new Map<Interfaces.Response.RepresentationAllNames, GenericResponse.Instantiable>(
	Array.from<Interfaces.Response.RepresentationAllNames, [Interfaces.Response.RepresentationAllNames, GenericResponse.Instantiable]>(Interfaces.Response.representationNames, 
		(representationName: Interfaces.Response.RepresentationAllNames): [Interfaces.Response.RepresentationAllNames, GenericResponse.Instantiable] => { return [representationName, URL]; }));

export class Representations extends GenericResponse implements Readonly<Interfaces.Response.Representations> {
	public readonly thumb_tiny: URL;
	public readonly thumb_small: URL;
	public readonly thumb: URL;
	public readonly small: URL;
	public readonly medium: URL;
	public readonly large: URL;
	public readonly tall: URL;
	public readonly full: URL;
	public readonly webm?: URL;
	public readonly mp4?: URL;

	constructor(representations: Interfaces.Response.Representations) { super(overrides, representations); }
}