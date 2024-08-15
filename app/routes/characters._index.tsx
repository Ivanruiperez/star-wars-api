/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { Popover, Text } from "@mantine/core";

import { CharacterListItem } from "../components/CharacterListItem/CharacterListItem";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { PaginationButtons } from "../components/PaginationButtons/PaginationButtons";
import Spinner from "../components/Spinner/spinner";
import { AiSparklesIcon } from "../components/icons/AiSparklesIcon";
import { Character } from "../types";
import {
	getIdFromCharacterUrl,
	fetchCharacters,
	filterCharactersWithChatGPT,
	updatePage,
	filterCharactersWihtoutChatGPT,
} from "../utils";
import { usePageNumber } from "../hooks/usePage.hook";
import {
	debounceDefaultTime,
	defaultIconSize,
	emptyString,
	experimental,
	numberOne,
	numberTen,
	strings,
} from "../constants";
import { colors } from "../theme/colors";

export default function Characters() {
	const { page, setPage, navigate } = usePageNumber();
	const [charactersList, setCharactersList] = useState<Character[]>([]);
	const [inputValue, setInputValue] = useState<string>(emptyString);
	const [aiInputValue, setAiInputValue] = useState<string>(emptyString);
	const [gptResponse, setGptResponse] = useState<string>(emptyString);
	const [isFilterSearchEnabled, setIsFilterSearchEnabled] =
		useState<boolean>(false);
	const [isFilterAISearchEnabled, setIsFilterAISearchEnabled] =
		useState<boolean>(false);
	const [filterPage, setFilterPage] = useState<number>(numberOne);
	const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

	const handleSearch = useDebouncedCallback(() => {
		setIsFilterSearchEnabled(true);
		setIsFilterAISearchEnabled(false);
	}, debounceDefaultTime);

	const handleAiSearch = useDebouncedCallback(() => {
		setIsFilterAISearchEnabled(true);
		setIsFilterSearchEnabled(false);
		setIsToggleOpen(true);
	}, debounceDefaultTime);

	const { isLoading, error, data } = useQuery({
		queryKey: ["characters", page],
		queryFn: () => fetchCharacters(page),
		placeholderData: keepPreviousData,
	});

	const {
		data: filterData,
		isLoading: filterLoading,
		error: filterError,
	} = useQuery({
		queryKey: ["FilterSearch", inputValue, filterPage],
		queryFn: async () =>
			filterCharactersWihtoutChatGPT(inputValue, filterPage),
		placeholderData: keepPreviousData,
		enabled: isFilterSearchEnabled,
	});

	const {
		data: filterAIData,
		isLoading: filterAILoading,
		error: filterAIError,
	} = useQuery({
		queryKey: ["FilterAISearch", aiInputValue],
		queryFn: async () => filterCharactersWithChatGPT(aiInputValue),
		placeholderData: keepPreviousData,
		enabled: isFilterAISearchEnabled,
	});

	useEffect(() => {
		if (data) {
			setCharactersList(data.results);
		}
	}, [data]);

	useEffect(() => {
		if (filterData) {
			setCharactersList(filterData?.results);
			setIsFilterSearchEnabled(false);
		}
	}, [filterData]);

	useEffect(() => {
		if (filterAIData) {
			setGptResponse(filterAIData?.responseContent);
			setCharactersList(filterAIData?.characters);
			setIsFilterAISearchEnabled(false);
		}
	}, [filterAIData]);

	useEffect(() => {
		if (page >= numberTen || isNaN(page)) {
			navigate("/404");
		} else {
			navigate(`?page=${page}`);
		}
	}, [page, navigate]);

	if (error || filterError || filterAIError)
		return `${strings.anErrorHasOccurred} ${
			error?.message || filterError?.message || filterAIError?.message
		}`;
	if (!data && !filterData && !filterAIData) {
		return null;
	}
	const handlePrevious = () => {
		if (filterData) {
			if (filterPage > numberOne)
				setFilterPage((prev) => prev - numberOne),
					setIsFilterSearchEnabled(true);
		} else {
			updatePage({
				isNext: false,
				page,
				setPage,
			});
		}
	};

	const handleNext = () => {
		if (filterData) {
			if (filterData?.next)
				setFilterPage((prev) => prev + numberOne),
					setIsFilterSearchEnabled(true);
		} else {
			updatePage({
				isNext: true,
				page,
				setPage,
			});
		}
	};

	const cleanInput = (isAiInput: boolean) => {
		if (isAiInput) {
			setAiInputValue(emptyString);
			setGptResponse(emptyString);
			setIsToggleOpen(false);
		} else {
			setInputValue(emptyString);
		}
		setCharactersList(data.results);
		setPage(numberOne);
		setFilterPage(numberOne);
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		handleSearch();
	};

	const handleAiChangeInput = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setAiInputValue(e.target.value);
		handleAiSearch();
	};

	const currentPage = filterData ? filterPage : page;
	return (
		<div className="flex flex-col items-center">
			<h1 className="items-center justify-center flex mt-5">
				<span>{strings.characters}</span>
			</h1>

			<div className="flex flex-col justify-center my-5 relative max-w-96">
				<div className="mb-5" data-testid="search-input">
					<SearchInput
						handleInput={handleChangeInput}
						inputValue={inputValue}
						cleanInput={cleanInput}
					/>
				</div>
				<div>
					<p className="text-center mt-5 mb-2 text-sm text-gray-c20">
						{experimental}
					</p>
					<Popover
						width="target"
						position="right"
						withArrow
						shadow="md"
						opened={isToggleOpen && !!gptResponse}
						styles={{
							arrow: { backgroundColor: colors.gray.c20 },
							dropdown: { backgroundColor: colors.gray.c20 },
						}}
					>
						<Popover.Target>
							<div>
								<SearchInput
									handleInput={handleAiChangeInput}
									inputValue={aiInputValue}
									cleanInput={cleanInput}
									isAIInput={true}
								/>
							</div>
						</Popover.Target>
						<Popover.Dropdown>
							<div className="flex items-center">
								<div className="flex flex-1 mr-2">
									<AiSparklesIcon
										size={defaultIconSize}
										color={colors.primary.c100}
									/>
								</div>
								<span className="flex flex-4">
									<Text
										size="xs"
										style={{ color: colors.gray.c100 }}
									>
										{gptResponse}
									</Text>
								</span>
							</div>
						</Popover.Dropdown>
					</Popover>
				</div>
			</div>
			{isLoading || filterLoading || filterAILoading ? (
				<Spinner />
			) : !charactersList?.length ? (
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
				previous={data.previous}
				next={data.next}
				onPrevious={handlePrevious}
				onNext={handleNext}
				currentPage={currentPage}
				charactersList={charactersList}
			/>
		</div>
	);
}
