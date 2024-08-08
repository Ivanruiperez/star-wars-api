import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";

import { FilmDetail } from "../FilmDetail/FilmDetail";
import { baseUrl, numberOne, numberZero, strings } from "../../constants";
import { colors } from "../../theme/colors";

type CharacterFilmsProps = {
	films: string[];
};

export const CharacterFilmsList = ({ films }: CharacterFilmsProps) => {
	const filmIds = films.map(
		(film) => film.split("films/")[numberOne].split("/")[numberZero]
	);

	const { isLoading, error, data } = useQuery({
		queryKey: ["films", filmIds],
		queryFn: async () => {
			const responses = await Promise.all(
				filmIds.map((id) =>
					fetch(`${baseUrl}/films/${id}`).then((res) => res.json())
				)
			);
			return responses;
		},
	});
	if (error) return `${strings.anErrorHasOccurred} ${error.message}`;

	return (
		<div className="justify-center flex p-4 my-4">
			<div className="flex-col">
				<h2 className="justify-center items-center flex">
					{strings.films}
				</h2>
				{isLoading ? (
					<div className="flex items-center justify-center">
						<Loader color={colors.primary.c100} />
					</div>
				) : (
					<ul>
						{data &&
							data.map((film) => (
								<FilmDetail key={film.title} film={film} />
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
