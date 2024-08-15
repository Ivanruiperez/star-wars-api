import { Button } from "@mantine/core";

import { NextIcon } from "../icons/NextIcon";
import { BackIcon } from "../icons/BackIcon";
import { defaultIconSize, numberTen, strings } from "../../constants";
import { colors } from "../../theme/colors";
import { PaginationButtonsProps } from "../../types";

export const PaginationButtons = ({
	previous,
	next,
	onPrevious,
	onNext,
	currentPage,
	charactersList,
}: PaginationButtonsProps) => {
	const isNextDisabled = !next || charactersList?.length < numberTen;
	const isPreviousDisabled = !previous && currentPage === 1;
	return (
		<div className="flex justify-center items-center my-5">
			<div className="mx-5">
				<Button
					variant="light"
					color={colors.primary.c100}
					size="sm"
					radius="md"
					onClick={onPrevious}
					disabled={isPreviousDisabled}
					leftSection={<BackIcon size={defaultIconSize} />}
					style={{
						width: "120px",
						backgroundColor: isPreviousDisabled
							? colors.gray.c60
							: undefined,
						color: isPreviousDisabled ? colors.gray.c40 : undefined,
					}}
				>
					{strings.previous}
				</Button>
			</div>
			<span>{currentPage}</span>
			<div className="mx-5">
				<Button
					variant="light"
					color="#FFD43B"
					size="sm"
					radius="md"
					onClick={onNext}
					disabled={isNextDisabled}
					rightSection={<NextIcon size={defaultIconSize} />}
					style={{
						width: "120px",
						backgroundColor: isNextDisabled
							? colors.gray.c60
							: undefined,
						color: isNextDisabled ? colors.gray.c40 : undefined,
					}}
				>
					{strings.next}
				</Button>
			</div>
		</div>
	);
};
