import OpenAI from 'openai';


export default {
	async fetch(request, env, ctx) {
		const client = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
		});
		try {
			const response = await client.responses.create({
				model: "gpt-4",
				input: "Write a one-sentence bedtime story about a unicorn.",
			});
			return new Response(response.output_text, {
				headers: { "content-type": "text/plain"},
			});
		} catch (error) {
			return new Response(error);
		}
	},
};

/*
RESPONSE: 
	Once upon a magical moonlit night, a dazzling unicorn named Luna embarked on a 
	quest through shimmering forests and glowing rivers, discovering that her true 
	magic was not in her sparkling horn, but in the kindness and love she spread, 
	until finally, under a blanket of twinkling stars, Luna rested, her dreams filled 
	with more incredible adventures.
*/

/*
	NOTE ISSUE with outdated syntax in tutorial and 1101 error from Cloudflare. 
	Check notes.md
*/





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

This tutorial is outdated. Followed current : https://platform.openai.com/docs/guides/text 

*/