/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { CharacterListItem } from "../components/CharacterListItem/CharacterListItem";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { PaginationButtons } from "../components/PaginationButtons/PaginationButtons";
import Spinner from "../components/Spinner/spinner";
import { Character } from "../types";
import {
	getIdFromCharacterUrl,
	fetchCharacters,
	fetchAllCharacters,
	filterCharacters,
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

export default function Characters() {
	const { page, setPage, navigate } = usePageNumber();
	const [charactersList, setCharactersList] = useState<Character[]>([]);
	const [characterFiltered, setCharacterFiltered] =
		useState<string>(emptyString);
	const [allCharacters, setAllCharacters] = useState<Character[]>([]);
	const [filteredCharacterList, setFilteredCharacterList] = useState<
		Character[]
	>([]);
	const [filteredPage, setFilteredPage] = useState<number>(numberOne);

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
		navigate(`?page=${page}`);
	}, [page, navigate]);

	useEffect(() => {
		if (characterFiltered) {
			const filtered = filterCharacters(characterFiltered, allCharacters);
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
		setCharacterFiltered(event.target.value);
	};

	const currentPage = characterFiltered ? filteredPage : page;

	return (
		<div className="flex flex-col" data-testid="characters-container">
			<h1 className="items-center justify-center flex mt-5">
				<span>{strings.characters}</span>
			</h1>
			<div className="flex justify-center my-5">
				<div data-testid="search-input">
					<SearchInput
						handleInput={handleChangeInput}
						characterFiltered={characterFiltered}
						setCharacterFiltered={setCharacterFiltered}
					/>
				</div>
			</div>
			{isLoading || isLoadingFiltered ? (
				<Spinner />
			) : !charactersList.length ? (
				<div
					className="justify-center flex"
					data-testid="no characters found"
				>
					<p>{strings.noCharactersFound}</p>
				</div>
			) : (
				<ul
					className="flex flex-col justify-center items-center"
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
