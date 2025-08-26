import OpenAI from 'openai';

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export default {
	async fetch(request, env, ctx) {

		if (request.method === "OPTIONS") { // preflight.
			return new Response(null, { headers: corsHeaders });
		}

		const client = new OpenAI({	apiKey: env.OPENAI_API_KEY, });

		try {
			const response = await client.responses.create({
				model: "gpt-4",
				input: "Who is considered to be the most daring woman explorer? Give me three options",
			});
			return new Response(response.output_text, {
				headers: { ...corsHeaders, "Content-Type": "text/plain" },
			});
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }),
				{
					headers: { ...corsHeaders, "Content-Type": "application/json" },
					status: 500,
				});
		}
	}
};


/*
	Worker answer: 

	1. Gertrude Bell: she was an English writer, traveler, political officer, and archaeologist who explored the Middle East in the early 20th century. She played a large role in the establishment of the modern state of Iraq.

	2. Nellie Bly: she was an American journalist and adventurer who, in 1889, embarked on a journey to travel around the world in less than 80 days, in emulation of Jules Verne's fictional character. She completed the trip in 72 days, which was a record at the time.

	3. Annie Smith Peck: she was an American mountaineer who made her mark scaling peaks in North and South America. She was one of the first women to climb the Matterhorn and she broke several altitude records, including one at age 58.
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

This tutorial is outdated. Followed current Docs

OpenAI : https://platform.openai.com/docs/guides/text 
npm openai: https://www.npmjs.com/package/openai

Suggested by Scrimba Tutorial:
https://developers.cloudflare.com/workers/configuration/secrets/#secrets-in-development
https://developers.cloudflare.com/ai-gateway/tutorials/deploy-aig-worker/#3-configure-openai-in-your-worker
*/