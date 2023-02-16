import path from 'node:path';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: path.resolve('./src/lib/components'),
		}
	},
	preprocess: vitePreprocess()
};

export default config;
