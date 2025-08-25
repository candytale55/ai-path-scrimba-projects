/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 * 
 * 

## Install OpenAI in your Worker project
npm install openai

## Save API key to your Workers environment
npx wrangler secret put OPENAI_API_KEY

## Deploy the latest Worker changes
npx wrangler deploy 
*/

export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!, I see you Girl!');
	},
};
