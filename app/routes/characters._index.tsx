/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";

import { CharacterListItem } from "../components/CharacterListItem/CharacterListItem";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { PaginationButtons } from "../components/PaginationButtons/PaginationButtons";
import { Character } from "../types";
import { getIdFromCharacterUrl, fetchCharacters } from "../utils";
import { usePageNumber } from "../hooks/usePage.hook";
import { emptyString, numberOne, strings } from "../constants";
import { colors } from "../theme/colors";

export default function Characters() {
	const { page, setPage, navigate } = usePageNumber();
	const [charactersList, setCharactersList] = useState<Character[]>([]);
	const [characterFiltered, setCharacterFiltered] =
		useState<string>(emptyString);
	const { isLoading, error, data } = useQuery({
		queryKey: ["characters", page],
		queryFn: () => fetchCharacters(page),
		placeholderData: keepPreviousData,
	});
	useEffect(() => {
		navigate(`?page=${page}`);
	}, [page, navigate]);

	useEffect(() => {
		if (data) {
			setCharactersList(data.results);
		}
		if (characterFiltered) {
			const filteredCharacters = data.results.filter(
				(character: Character) =>
					character.name
						.toLowerCase()
						.includes(characterFiltered.toLowerCase())
			);
			if (!filteredCharacters.length) {
				setCharactersList([]);
				setPage(numberOne);
				return;
			}
			setCharactersList(filteredCharacters);
			setPage(numberOne);
		}
	}, [characterFiltered, data, setPage]);

	if (error) return `${strings.anErrorHasOccurred} ${error.message}`;
	if (!data) {
		return null;
	}

	if (!data.results?.length) {
		return <div>{strings.noCharactersFound}</div>;
	}
	const handlePrevious = () => {
		setPage((prev) => prev - numberOne);
	};

	const handleNext = () => {
		setPage((prev) => prev + numberOne);
	};

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCharacterFiltered(event.target.value);
	};
	return (
		<div className="flex flex-col">
			<h1 className="items-center justify-center flex">
				<span>{strings.characters}</span>
			</h1>
			<div className="flex justify-center my-5">
				<div>
					<SearchInput
						handleInput={handleChangeInput}
						characterFiltered={characterFiltered}
						setCharacterFiltered={setCharacterFiltered}
					/>
				</div>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center h-screen">
					<Loader color={colors.primary.c100} />
				</div>
			) : (
				<>
					{!charactersList.length ? (
						<div className="justify-center flex">
							{strings.noCharactersFound}
						</div>
					) : (
						<ul className="flex flex-col justify-center items-center">
							{charactersList.map((character: Character) => {
								const id = getIdFromCharacterUrl(character.url);
								return (
									<li
										key={id}
										onClick={() =>
											navigate(
												`/characters/${id}?page=${page}`
											)
										}
										className="cursor-pointer w-1/2"
									>
										<CharacterListItem
											character={character}
										/>
									</li>
								);
							})}
						</ul>
					)}
				</>
			)}
			<PaginationButtons
				previous={data.previous}
				next={data.next}
				onPrevious={handlePrevious}
				onNext={handleNext}
			/>
		</div>
	);
}
