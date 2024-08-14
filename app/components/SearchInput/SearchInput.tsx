import { CloseButton, Input } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import { colors } from "../../theme/colors";
import { defaultIconSize, emptyString, strings } from "../../constants";
import { GptIcon } from "../icons/gptIcon";
import { SearchIcon } from "../icons/SearchIcon";

type SearchInputProps = {
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSearch: () => void;
	inputValue: string;
	cleanInput: () => void;
};

export const SearchInput = ({
	handleInput,
	handleSearch,
	inputValue,
	cleanInput,
}: SearchInputProps) => {
	return (
		<div className="relative">
			<Input
				size="md"
				radius="md"
				placeholder={strings.search}
				onChange={handleInput}
				value={inputValue}
				rightSectionPointerEvents="visibleFill"
				styles={{
					input: {
						backgroundColor: colors.gray.c20,
						color: colors.gray.c100,
					},
				}}
				leftSection={
					<GptIcon color={colors.gray.c20} size={defaultIconSize} />
				}
				rightSection={
					<CloseButton
						aria-label="Clear input"
						onClick={cleanInput}
						style={{
							display: inputValue ? undefined : "none",
						}}
					/>
				}
			/>
			<div
				className={`absolute top-2 -right-8 cursor-pointer ${
					inputValue ? "" : "hidden"
				}`}
				onClick={handleSearch}
				data-testid="search-button"
			>
				<SearchIcon size={defaultIconSize} color={colors.gray.c20} />
			</div>
		</div>
	);
};
