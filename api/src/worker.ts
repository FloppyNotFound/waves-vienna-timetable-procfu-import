/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Show } from '../../shared/model/show';
import { getShows } from './get-shows';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	WAVES_VIENNA_TIMETABLE_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const shows = await getShows(env.WAVES_VIENNA_TIMETABLE_BUCKET);

		const response = toShowsResponse(shows ?? []);

		return response;
	},
};

const toShowsResponse = (shows: Show[]): Response => {
	const showsResp = { shows, count: shows.length };
	const jsonResp = JSON.stringify(showsResp, null, 2);

	const response = new Response(jsonResp, {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	});

	return response;
};
