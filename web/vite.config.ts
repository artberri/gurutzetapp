import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			devOptions: {
				enabled: false, // change to true to enable PWA in development
			},
			manifest: {
				background_color: "#ffffff",
				description: "Aplicación de fiestas de Gurutzetako Jaiak 2025",
				dir: "ltr",
				display: "standalone",
				handle_links: "preferred",
				icons: [
					{
						purpose: "any",
						sizes: "192x192",
						src: "icon-192.png",
						type: "image/png",
					},
					{
						purpose: "any",
						sizes: "512x512",
						src: "icon-512.png",
						type: "image/png",
					},
					{
						purpose: "maskable",
						sizes: "192x192",
						src: "maskable-icon-192.png",
						type: "image/png",
					},
					{
						purpose: "maskable",
						sizes: "512x512",
						src: "maskable-icon-512.png",
						type: "image/png",
					},
				],
				name: "Gurutzetako Jaiak 2025",
				orientation: "portrait",
				scope: "/",
				short_name: "Gurutzeta",
				start_url: ".",
				theme_color: "#ffffff",
			},
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
			},
		}),
	],
});
