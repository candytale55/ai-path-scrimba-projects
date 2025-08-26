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