import { fs } from "../deps.ts";

import * as util from "../util/util.ts";
import * as types from "../types.ts";

export { module };
const module: types.FoxModule = {
	id: "bake",
	name: "Bake",
	activateOn: {
		ecosystem: "any",
		form: "any",
	},
	triggers: {
		async onInitial(opts: types.foxLintArgs) {
			const file = "./Bakefile.sh";

			try {
				const text = await Deno.readTextFile(file);
				for (const line of text.split("\n")) {
					if (line.includes("task.fmt()")) {
						util.logInfo("Use task.format() instead of task.fmt()");
					}
				}
			} catch (unknownError: unknown) {
				const err = util.assertInstanceOfError(unknownError);

				if (!(err instanceof Deno.errors.NotFound)) {
					throw err;
				}
			}

			return [];
		},
	},
};
