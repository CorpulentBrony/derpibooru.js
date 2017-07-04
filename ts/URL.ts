import { URL as NodeURL } from "url";

export class URL extends NodeURL {
	constructor(input: string, base?: string | URL) {
		super(input.startsWith("//") ? "https:" + input : input, base);
	}
}