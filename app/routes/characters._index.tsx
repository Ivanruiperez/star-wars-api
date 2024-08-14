/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";

import { CharacterListItem } from "../components/CharacterListItem/CharacterListItem";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { PaginationButtons } from "../components/PaginationButtons/PaginationButtons";
import Spinner from "../components/Spinner/spinner";
import { Character, LoaderData } from "../types";
import {
	getIdFromCharacterUrl,
	fetchCharacters,
	fetchAllCharacters,
	filterCharactersWithChatGPT,
	paginateCharacters,
	updatePage,
} from "../utils";
import { usePageNumber } from "../hooks/usePage.hook";
import {
	emptyString,
	numberOne,
	numberTen,
	numberZero,
	strings,
} from "../constants";

export const loader: LoaderFunction = async () => {
	const openaiApiKey = process.env.OPENAI_API_KEY;
	if (!openaiApiKey) {
		throw new Error("OPENAI_API_KEY no está definida en el entorno");
	}

	return { openaiApiKey };
};

export default function Characters() {
	const { openaiApiKey } = useLoaderData<LoaderData>();
	const { page, setPage, navigate } = usePageNumber();
	const [charactersList, setCharactersList] = useState<Character[]>([]);
	const [characterFiltered, setCharacterFiltered] =
		useState<string>(emptyString);
	const [inputValue, setInputValue] = useState<string>(emptyString);
	const [allCharacters, setAllCharacters] = useState<Character[]>([]);
	const [filteredCharacterList, setFilteredCharacterList] = useState<
		Character[]
	>([]);
	const [filteredPage, setFilteredPage] = useState<number>(numberOne);
	const [isSearching, setIsSearching] = useState<boolean>(false);

	const { isLoading, error, data } = useQuery({
		queryKey: ["characters", page],
		queryFn: () => fetchCharacters(page),
		placeholderData: keepPreviousData,
	});

	const {
		data: allData,
		isSuccess,
		isLoading: isLoadingFiltered,
	} = useQuery<{ results: Character[] }, Error>({
		queryKey: ["allCharacters"],
		queryFn: () => fetchAllCharacters(),
		enabled: characterFiltered !== emptyString,
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		if (isSuccess && allData) {
			setAllCharacters(allData.results);
		}
	}, [isSuccess, allData]);

	useEffect(() => {
		if (page >= numberTen || isNaN(page)) {
			navigate("/404");
		} else {
			navigate(`?page=${page}`);
		}
	}, [page, navigate]);

	useEffect(() => {
		const fetchFilteredCharacters = async () => {
			setIsSearching(true);
			setCharactersList([]);
			if (characterFiltered) {
				const filtered = await filterCharactersWithChatGPT(
					characterFiltered,
					allCharacters,
					openaiApiKey
				);
				setFilteredCharacterList(filtered);
				setFilteredPage(numberOne);

				if (!filtered.length) {
					setCharactersList([]);
				} else {
					const paginatedCharacters = paginateCharacters(
						filtered,
						numberOne,
						numberTen
					);
					setCharactersList(paginatedCharacters);
				}
			} else if (data) {
				setCharactersList(data.results);
			}
			setIsSearching(false);
		};

		fetchFilteredCharacters();
	}, [characterFiltered, allCharacters, data, setPage]);

	useEffect(() => {
		if (characterFiltered && filteredCharacterList.length > numberZero) {
			const paginatedCharacters = paginateCharacters(
				filteredCharacterList,
				filteredPage,
				numberTen
			);
			setCharactersList(paginatedCharacters);
		}
	}, [filteredPage, filteredCharacterList, characterFiltered]);

	if (error) return `${strings.anErrorHasOccurred} ${error.message}`;
	if (!data) {
		return null;
	}
	const handlePrevious = () => {
		updatePage(
			false,
			page,
			setPage,
			filteredPage,
			setFilteredPage,
			characterFiltered,
			filteredCharacterList,
			numberTen
		);
	};

	const handleNext = () => {
		updatePage(
			true,
			page,
			setPage,
			filteredPage,
			setFilteredPage,
			characterFiltered,
			filteredCharacterList,
			numberTen
		);
	};

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleSearch = () => {
		setCharacterFiltered(inputValue);
	};

	const cleanInput = () => {
		setInputValue(emptyString);
		setCharacterFiltered(emptyString);
	};

	const currentPage = characterFiltered ? filteredPage : page;
	return (
		<div className="flex flex-col items-center">
			<h1 className="items-center justify-center flex mt-5">
				<span>{strings.characters}</span>
			</h1>

			<div className="flex justify-center my-5 relative">
				<div data-testid="search-input">
					<SearchInput
						handleInput={handleChangeInput}
						handleSearch={handleSearch}
						inputValue={inputValue}
						cleanInput={cleanInput}
					/>
				</div>
			</div>
			{isLoading || isLoadingFiltered || isSearching ? (
				<Spinner />
			) : !charactersList.length && !isSearching ? (
				<div
					className="justify-center flex"
					data-testid="no characters found"
				>
					<p>{strings.noCharactersFound}</p>
				</div>
			) : (
				<ul
					className="flex flex-col justify-center items-center min-w-full"
					data-testid="character-list"
				>
					{charactersList.map((character: Character) => {
						const id = getIdFromCharacterUrl(character.url);
						return (
							<li
								key={id}
								onClick={() =>
									navigate(`/characters/${id}?page=${page}`)
								}
								className="cursor-pointer w-1/2"
								data-testid="character-list-item"
							>
								<CharacterListItem character={character} />
							</li>
						);
					})}
				</ul>
			)}
			<PaginationButtons
				previous={
					characterFiltered ? filteredPage > numberOne : data.previous
				}
				next={
					characterFiltered
						? filteredPage <
						  Math.ceil(filteredCharacterList.length / numberTen)
						: data.next
				}
				onPrevious={handlePrevious}
				onNext={handleNext}
				currentPage={currentPage}
			/>
		</div>
	);
}
