import { LoaderFunction } from "@remix-run/node";

import { baseUrl } from "../constants";

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);
	const search = params.get("search");
	const page = params.get("page") || "1";

	try {
		const characters = await fetch(
			`${baseUrl}/people?search=${search}&page=${page}`
		).then((res) => res.json());
		return characters;
	} catch (error) {
		console.error("Error fetching characters:", error);
		return [];
	}
};
