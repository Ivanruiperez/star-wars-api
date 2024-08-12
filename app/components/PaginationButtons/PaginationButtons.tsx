import { Button } from "@mantine/core";

import { NextIcon } from "../icons/NextIcon";
import { BackIcon } from "../icons/BackIcon";
import { defaultIconSize, strings } from "../../constants";
import { colors } from "../../theme/colors";

type PaginationButtonsProps = {
	previous: string | null;
	next: string | null;
	onPrevious: () => void;
	onNext: () => void;
	currentPage: number;
};

export const PaginationButtons = ({
	previous,
	next,
	onPrevious,
	onNext,
	currentPage,
}: PaginationButtonsProps) => {
	return (
		<div className="flex justify-center items-center my-5">
			<div className="mx-5">
				<Button
					variant="light"
					color={colors.primary.c100}
					size="sm"
					radius="md"
					onClick={onPrevious}
					disabled={!previous}
					leftSection={<BackIcon size={defaultIconSize} />}
					style={{
						width: "120px",
						backgroundColor: !previous
							? colors.gray.c60
							: undefined,
						color: !previous ? colors.gray.c40 : undefined,
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
					disabled={!next}
					rightSection={<NextIcon size={defaultIconSize} />}
					style={{
						width: "120px",
						backgroundColor: !next ? colors.gray.c60 : undefined,
						color: !next ? colors.gray.c40 : undefined,
					}}
				>
					{strings.next}
				</Button>
			</div>
		</div>
	);
};
