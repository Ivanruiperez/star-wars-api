/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

import { Film } from "../../types";
import { colors } from "../../theme/colors";

type FilmDetailProps = {
	film: Film;
};

export const FilmDetail = ({ film }: FilmDetailProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<li
				onClick={() => open()}
				className="cursor-pointer bg-primary-c100 m-5 rounded-md p-2 items-center justify-center flex text-gray-c100"
				data-testid="film-list-item"
			>
				{film.title}
			</li>
			<Modal
				opened={opened}
				onClose={close}
				title=""
				centered
				styles={{
					content: {
						backgroundColor: colors.gray.c60,
						color: colors.gray.c20,
						borderRadius: "10px",
					},
					header: {
						backgroundColor: colors.gray.c60,
					},
					close: {
						color: colors.gray.c20,
					},
				}}
			>
				<div
					className="flex flex-col items-center justify-center"
					data-testid="film detail"
				>
					<p className="text-xl mb-5 text-primary-c100">
						{film.title}
					</p>
					<p className="mb-2">{film.release_date}</p>
					<p className="px-2">{film.opening_crawl}</p>
				</div>
			</Modal>
		</>
	);
};
