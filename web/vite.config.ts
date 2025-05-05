import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
			},
			devOptions: {
				enabled: false, // change to true to enable PWA in development
			},
			manifest: {
				description: "Aplicación de fiestas de Gurutzetako Jaiak 2025",
				short_name: "Gurutzeta",
				name: "Gurutzetako Jaiak 2025",
				handle_links: "preferred",
				start_url: ".",
				scope: "/",
				display: "standalone",
				theme_color: "#ffffff",
				background_color: "#ffffff",
				dir: "ltr",
				orientation: "portrait",
				icons: [
					{
						src: "icon-192.png",
						type: "image/png",
						sizes: "192x192",
						purpose: "any",
					},
					{
						src: "icon-512.png",
						type: "image/png",
						sizes: "512x512",
						purpose: "any",
					},
					{
						src: "maskable-icon-192.png",
						type: "image/png",
						sizes: "192x192",
						purpose: "maskable",
					},
					{
						src: "maskable-icon-512.png",
						type: "image/png",
						sizes: "512x512",
						purpose: "maskable",
					},
				],
			},
		}),
	],
});
