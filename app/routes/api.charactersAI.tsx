import { LoaderFunction } from "@remix-run/node";

import { maxTokensDefault, numberOne, numberZero } from "../constants";

export const loader: LoaderFunction = async ({ request }) => {
	const openaiApiKey = process.env.OPENAI_API_KEY;
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);
	const userPrompt = params.get("prompt");
	const prompt = `Based on the information provided about Star Wars characters, give a very brief description. At the end of the description, include a section labeled "Names:" where you list all related character names. Ensure that the list of names is on the same line as "Names:" with no line breaks after it. The information is: ${userPrompt}`;

	try {
		const response = await fetch(
			"https://api.openai.com/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${openaiApiKey}`,
				},
				body: JSON.stringify({
					model: "gpt-3.5-turbo",
					messages: [
						{
							role: "user",
							content: prompt,
						},
					],
					max_tokens: maxTokensDefault,
				}),
			}
		);

		const data = await response.json();
		const responseContent = data.choices[numberZero]?.message?.content;
		if (response.ok && responseContent) {
			const namesSection = responseContent.split("Names:")[numberOne];
			const content = responseContent.split("Names:")[numberZero];
			const names = namesSection ? namesSection.split(", ") : [];
			const charactersPromises = names.map(async (name: string) => {
				const response = await fetch(
					`http://localhost:5173/api/characters?search=${name}`
				);
				const characters = await response.json();
				if (characters?.count > numberZero) {
					return characters;
				}

				return null;
			});

			const allCharactersResponses = await Promise.all(
				charactersPromises
			);

			const allCharacters = allCharactersResponses.filter(Boolean).flat();
			return { characters: allCharacters, responseContent: content };
		}
	} catch (error) {
		console.error("Error fetching from OpenAI API:", error);
		return [];
	}
};
