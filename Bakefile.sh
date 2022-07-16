# shellcheck shell=bash

task.run() {
	deno run --unstable --allow-read --allow-write --allow-net ./src/main.ts "$@"
}

task.run-build() {
	bake.cfg 'big-print' 'no'

	deno run --unstable --allow-read --allow-write --allow-net ./output/bundle.js "$@"
}

task.watch() {
	find . | entr -c -dd ./bake bundle
}

task.bundle() {
	mkdir -p ./output
	deno bundle --unstable ./src/main.ts ./output/bundle.js
}
