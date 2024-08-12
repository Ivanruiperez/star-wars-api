import { baseUrl, numberOne, numberTen, numberZero } from "./constants";
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
			return next - 1;
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
