import { forwardRef } from "react";
import { CloseButton, Input } from "@mantine/core";

import { GptIcon } from "../icons/gptIcon";
import { colors } from "../../theme/colors";
import { defaultIconSize, strings } from "../../constants";
import { SearchInputProps } from "../../types";

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	({ handleInput, inputValue, cleanInput, isAIInput }, ref) => {
		return (
			<div className="relative">
				<Input
					ref={ref}
					size={isAIInput ? "xl" : "md"}
					radius="md"
					placeholder={isAIInput ? strings.aiSearch : strings.search}
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
						isAIInput && (
							<GptIcon
								color={colors.gray.c20}
								size={defaultIconSize}
							/>
						)
					}
					rightSection={
						<CloseButton
							aria-label="Clear input"
							onClick={() => cleanInput(!!isAIInput)}
							style={{
								display: inputValue ? undefined : "none",
							}}
						/>
					}
				/>
			</div>
		);
	}
);

SearchInput.displayName = "SearchInput";
