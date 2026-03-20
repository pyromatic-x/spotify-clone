import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(() => {
	return {
		base: "/",
		build: {
			sourcemap: true,
			manifest: true,
		},
		dev: {
			sourcemap: true,
		},
		server: {
			port: 3000,
		},

		preview: { port: 9000 },
		plugins: [
			tsconfigPaths(),
			svgr(),
			tanstackRouter({ target: "react", autoCodeSplitting: true }),
			react(),
			tailwindcss(),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
