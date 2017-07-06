import { GenericCollection } from "./GenericCollection";
import { Interfaces } from "../Interfaces";
import { DuplicateReport } from "./DuplicateReport";

export class DuplicateReports extends GenericCollection<DuplicateReport, Interfaces.Response.DuplicateReport> {
	constructor(duplicateReports: Array<Readonly<Interfaces.Response.DuplicateReport>>) {
		super(duplicateReports, DuplicateReport);
	}
}