import { useNavigate } from "@remix-run/react";

import { CharacterFilmsList } from "../CharacterFilmsList/CharacterFilmsList";
import { BackIcon } from "../icons/BackIcon";
import { usePageNumber } from "../../hooks/usePage.hook";
import { characterDetails, defaultIconSize } from "../../constants";
import { CharacterDetailProps } from "../../types";

export const CharacterDetail = ({ character }: CharacterDetailProps) => {
	const { page } = usePageNumber();
	const navigate = useNavigate();
	return (
		<div className="rounded-lg bg-gray-c60 p-4 my-4 flex flex-col items-center w-1/2 relative">
			<div className="absolute left-5 top-5">
				<button onClick={() => navigate(`/characters?page=${page}`)}>
					<BackIcon size={defaultIconSize} />
				</button>
			</div>
			<div className="ml-5">
				<h1 className="mb-5 text-2xl">{character.name}</h1>
			</div>
			<div>
				<p>{`${characterDetails.birthYear}${character.birth_year}`}</p>
				<p>{`${characterDetails.gender}${character.gender}`}</p>
				<p>{`${characterDetails.eyeColor}${character.eye_color}`}</p>
				<p>{`${characterDetails.SkinColor}${character.skin_color}`}</p>
				<p>{`${characterDetails.hairColor}${character.hair_color}`}</p>
				<p>{`${characterDetails.height}${character.height}`}</p>
				<p>{`${characterDetails.mass}${character.mass}`}</p>
			</div>
			<div>
				<CharacterFilmsList films={character.films} />
			</div>
		</div>
	);
};
