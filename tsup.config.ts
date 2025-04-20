import { defineConfig, Options } from "tsup"

export default defineConfig((options) => {
	/** Default configurations */
	const defaultConfig: Options = {
		dts: true,
		shims: true,
		skipNodeModulesBundle: true,
		cjsInterop: true,
		format: "cjs",
	}

	/** Browser configurations */
	const browser: Options = {
		entry: ["./src/browser/index.ts"],
		tsconfig: "./src/browser/tsconfig.json",
		platform: "browser",
		outDir: "./dist/browser/",
	}
	Object.assign(browser, defaultConfig)

	/** Node configurations */
	const node: Options = {
		entry: ["./src/node/index.ts"],
		tsconfig: "./src/node/tsconfig.json",
		platform: "node",
		outDir: "./dist/node/",
	}
	Object.assign(node, defaultConfig)

	return [browser, node]
})