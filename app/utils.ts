import { baseUrl, numberOne, numberTen, numberZero } from "./constants";

export const getIdFromCharacterUrl = (url: string) => {
	const split = url.split("people/");
	if (!split.length) {
		return null;
	}
	const id = split[numberOne].split("/")[numberZero];

	return id;
};

export const getNumberPageFromUrl = (
	previusPage: string | null,
	nextPage: string | null
): number => {
	const prev = previusPage
		? parseInt(previusPage.split("page=")[numberOne], numberTen)
		: null;
	const next = nextPage
		? parseInt(nextPage.split("page=")[numberOne], numberTen)
		: null;
	if (!prev) {
		return numberOne;
	}
	if (!next) {
		return prev + numberOne;
	}
	return next - numberOne;
};

export const fetchCharacters = (page = numberOne) =>
	fetch(`${baseUrl}/people?page=${page}`).then((res) => res.json());
