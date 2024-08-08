import { CloseButton, Input } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import { colors } from "../../theme/colors";
import { emptyString, strings } from "../../constants";

type SearchInputProps = {
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	characterFiltered: string;
	setCharacterFiltered: Dispatch<SetStateAction<string>>;
};

export const SearchInput = ({
	handleInput,
	setCharacterFiltered,
	characterFiltered,
}: SearchInputProps) => {
	return (
		<>
			<Input
				size="md"
				radius="md"
				placeholder={strings.search}
				onChange={handleInput}
				value={characterFiltered}
				rightSectionPointerEvents="visibleFill"
				styles={{
					input: {
						backgroundColor: colors.gray.c20,
						color: colors.gray.c100,
					},
				}}
				rightSection={
					<CloseButton
						aria-label="Clear input"
						onClick={() => setCharacterFiltered(emptyString)}
						style={{
							display: characterFiltered ? undefined : "none",
						}}
					/>
				}
			/>
		</>
	);
};
