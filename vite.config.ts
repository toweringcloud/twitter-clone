import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/twitter-clone",
	build: { chunkSizeWarningLimit: 1024 },
	plugins: [react()],
});
