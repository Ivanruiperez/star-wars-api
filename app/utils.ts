import { baseUrl, numberOne, numberZero } from "./constants";
import { ApiResponse, FilteringCharacter, UpdatePageProps } from "./types";

export const getIdFromCharacterUrl = (url: string) => {
	const split = url.split("people/");
	if (!split.length) {
		return null;
	}
	const id = split[numberOne].split("/")[numberZero];

	return id;
};

export const fetchCharacters = (page = numberOne) =>
	fetch(`${baseUrl}/people?page=${page}`).then((res) => res.json());

export const filterCharactersWihtoutChatGPT = (
	inputValue: string,
	filterPage: number
) => {
	return fetch(
		`http://localhost:5173/api/characters?search=${inputValue}&page=${filterPage}`
	).then((res) => res.json());
};

export const filterCharactersWithChatGPT = async (inputValue: string) => {
	const response = await fetch(
		`http://localhost:5173/api/charactersAi?prompt=${inputValue}`
	);
	const data: ApiResponse = await response.json();
	const characters =
		data?.characters
			?.map((char: FilteringCharacter) => char.results)
			.flat() || [];
	const responseContent = data?.responseContent;

	return { characters, responseContent };
};

export const updatePage = ({ isNext, page, setPage }: UpdatePageProps) => {
	if (isNext) {
		setPage((prev) => prev + numberOne);
	} else {
		if (page > numberOne) setPage((prev) => prev - numberOne);
	}
};
