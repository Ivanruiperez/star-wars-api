import {
	baseUrl,
	maxTokensDefault,
	numberOne,
	numberTen,
	numberZero,
} from "./constants";
import { Character } from "./types";

export const getIdFromCharacterUrl = (url: string) => {
	const split = url.split("people/");
	if (!split.length) {
		return null;
	}
	const id = split[numberOne].split("/")[numberZero];

	return id;
};

export const getNumberPageFromUrl = (
	previousPage: string | null,
	nextPage: string | null
): number => {
	if (typeof nextPage === "string" && nextPage.includes("page=")) {
		const next = parseInt(nextPage.split("page=")[numberOne], numberTen);
		if (!isNaN(next)) {
			return next - numberOne;
		}
	}

	if (typeof previousPage === "string" && previousPage.includes("page=")) {
		const prev = parseInt(
			previousPage.split("page=")[numberOne],
			numberTen
		);
		if (!isNaN(prev)) {
			return prev + numberOne;
		}
	}

	return numberOne;
};

export const fetchCharacters = (page = numberOne) =>
	fetch(`${baseUrl}/people?page=${page}`).then((res) => res.json());

export const fetchAllCharacters = async (): Promise<{
	results: Character[];
}> => {
	let allCharacters: Character[] = [];
	let nextUrl: string | null = `${baseUrl}/people/?page=1`;

	while (nextUrl) {
		const response: Response = await fetch(nextUrl);
		const data: { results: Character[]; next: string | null } =
			await response.json();
		allCharacters = [...allCharacters, ...data.results];
		nextUrl = data.next;
	}

	return { results: allCharacters };
};

export const filterCharacters = (
	characterFiltered: string,
	allCharacters: Character[]
): Character[] => {
	return allCharacters.filter((character: Character) =>
		character.name.toLowerCase().includes(characterFiltered.toLowerCase())
	);
};

export const filterCharactersWithChatGPT = async (
	characterFiltered: string,
	allCharacters: Character[],
	openaiApiKey: string
): Promise<Character[]> => {
	const prompt = `You are an assistant that filters a list of Star Wars character names. The input list is given below. You need to return a list of names that contain the exact substring: "${characterFiltered}". The substring must appear in the same order as provided, and it must be part of the name as a whole word or as a distinct part of a name. Do not return any additional information or explanations. Important! Do not display a result if it does not contain the exact string indicated. Just provide the matching names in a comma-separated list, strictly following the criteria. Here is the list of names: ${allCharacters
		.map((character) => character.name)
		.join(", ")}`;

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

		if (!response.ok) {
			console.error(`Error: ${response.status} ${response.statusText}`);
			return [];
		}

		const filteredNames = data.choices[numberZero].message.content
			.split(",")
			.map((name: string) => name.trim().toLowerCase())
			.filter((name: string) => name);

		const matchedCharacters = await allCharacters.filter((character) =>
			filteredNames.includes(character.name.toLowerCase())
		);

		return matchedCharacters;
	} catch (error) {
		console.error("Error fetching from OpenAI API:", error);
		return [];
	}
};

export const paginateCharacters = (
	characters: Character[],
	page: number,
	itemsPerPage: number
): Character[] => {
	const startIndex = (page - numberOne) * itemsPerPage;
	return characters.slice(startIndex, startIndex + itemsPerPage);
};

export const updatePage = (
	isNext: boolean,
	page: number,
	setPage: React.Dispatch<React.SetStateAction<number>>,
	filteredPage: number,
	setFilteredPage: React.Dispatch<React.SetStateAction<number>>,
	characterFiltered: string,
	filteredCharacterList: Character[],
	itemsPerPage: number
) => {
	if (characterFiltered) {
		const maxPage = Math.ceil(filteredCharacterList.length / itemsPerPage);
		if (isNext) {
			if (filteredPage < maxPage)
				setFilteredPage((prev) => prev + numberOne);
		} else {
			if (filteredPage > numberOne)
				setFilteredPage((prev) => prev - numberOne);
		}
	} else {
		if (isNext) {
			setPage((prev) => prev + numberOne);
		} else {
			if (page > numberOne) setPage((prev) => prev - numberOne);
		}
	}
};
