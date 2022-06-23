import { fs, asserts } from "../deps.ts";

import * as util from "../util/util.ts";
import * as types from "../types.ts";

export { module };
const module: types.FoxModule = {
	id: "prettier",
	name: "Prettier",
	activateOn: {
		ecosystem: "any",
		form: "any",
	},
	// TODO // FIXME
	// @ts-ignore
	match: new Map([
		[
			"package.json",
			(opts: types.foxLintArgs, entry: fs.WalkEntry) => {
				const packageJson = JSON.parse(entry.path);
				if (packageJson?.prettier) {
					lintPrettierConfig(packageJson);
				}

				return [];
			},
		],
		[
			".prettierrc.json",
			(opts: types.foxLintArgs, entry: fs.WalkEntry) => {
				const prettierConfig = JSON.parse(entry.path);
				lintPrettierConfig(prettierConfig);

				return [];
			},
		],
		[
			"@(.prettierrc|.prettierrc.yml|.prettierrc.yaml|.prettierrc.json5|.prettierrc.js|.prettierrc.cjs|prettier.config.js|prettier.config.cjs|.prettierrc.toml)",
			(opts: types.foxLintArgs, entry: fs.WalkEntry) => {
				console.log("not supported: " + entry.path); // TODO

				return [];
			},
		],
	]),
};

function lintPrettierConfig(prettierConfig: unknown) {
	const expected = {
		useTabs: true,
		semi: false,
		singleQuote: true,
		trailingComma: "all",
	};
	asserts.assertEquals(expected, prettierConfig);
}
