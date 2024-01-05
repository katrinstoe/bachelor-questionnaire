// @ts-ignore
import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig, loadEnv} from 'vite';
import {expand} from "dotenv-expand"

export default defineConfig(({mode}) => {
    if (mode == 'development') {
        const env = loadEnv(mode, process.cwd(), '')
        expand({parsed: env})
    }
    return {
        plugins: [sveltekit()]

    };
});
