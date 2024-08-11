import { render, screen, waitFor } from "@testing-library/react";
import {
	QueryClient,
	QueryClientProvider,
	UseQueryResult,
} from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import * as reactQuery from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";

import Characters from "../routes/characters._index";
import { strings } from "../constants";
import { CharacterListItem } from "../components/CharacterListItem/CharacterListItem";
import { Character } from "../types";

const queryClient = new QueryClient();

type SWAPIResponse<T> = {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
};

const mockCharacter: Character = {
	name: "Luke Skywalker",
	height: "172",
	mass: "77",
	hair_color: "blond",
	skin_color: "fair",
	eye_color: "blue",
	birth_year: "19BBY",
	gender: "male",
	homeworld: "Tatooine",
	films: ["A New Hope", "The Empire Strikes Back", "Return of the Jedi"],
	species: [],
	vehicles: ["Snowspeeder", "Imperial Speeder Bike"],
	starships: ["X-wing", "Imperial shuttle"],
	created: "2014-12-09T13:50:51.644000Z",
	edited: "2014-12-20T21:17:56.891000Z",
	url: "https://swapi.dev/api/people/1/",
};

jest.mock("@tanstack/react-query", () => ({
	...jest.requireActual("@tanstack/react-query"),
	useQuery: jest.fn(),
}));

beforeAll(() => {
	window.matchMedia = jest.fn().mockImplementation(() => ({
		matches: false,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
	}));
});

describe("Characters component", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("displays loading state", async () => {
		jest.spyOn(reactQuery, "useQuery").mockImplementation(
			() =>
				({
					isLoading: true,
					error: null,
					data: undefined,
				} as UseQueryResult<SWAPIResponse<Character>, Error>)
		);

		render(
			<MantineProvider>
				<QueryClientProvider client={queryClient}>
					<MemoryRouter>
						<Characters />
					</MemoryRouter>
				</QueryClientProvider>
			</MantineProvider>
		);

		await waitFor(() => {
			expect(screen.getByTestId("loader")).toBeInTheDocument();
		});
	});

	test("displays error state", () => {
		jest.spyOn(reactQuery, "useQuery").mockImplementation(
			() =>
				({
					isLoading: false,
					error: { message: "Failed to fetch" },
					data: undefined,
				} as UseQueryResult<SWAPIResponse<Character>, Error>)
		);

		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<Characters />
				</MemoryRouter>
			</QueryClientProvider>
		);

		expect(
			screen.getByText((content, element) => {
				const hasText = (text: string) =>
					text.includes(strings.anErrorHasOccurred);
				const elementHasText = hasText(content);
				const childrenDontHaveText = Array.from(
					element?.children || []
				).every((child) => !hasText(child.textContent || ""));
				return elementHasText && childrenDontHaveText;
			})
		).toBeInTheDocument();
	});

	test("displays data when fetch is successful", async () => {
		jest.spyOn(reactQuery, "useQuery").mockImplementation(
			() =>
				({
					isLoading: false,
					error: null,
					data: {
						results: [
							mockCharacter,
							{ ...mockCharacter, name: "Darth Vader" },
						],
					},
				} as UseQueryResult<SWAPIResponse<Character>, Error>)
		);

		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<CharacterListItem character={mockCharacter} />
				</MemoryRouter>
			</QueryClientProvider>
		);

		await waitFor(() => {
			expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
		});
	});
});
