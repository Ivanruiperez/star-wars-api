import { characterDetails } from "../../constants";
import { Character } from "../../types";
import { CharacterFilmsList } from "../CharacterFilmsList/CharacterFilmsList";

type CharacterDetailProps = {
	character: Character;
};

export const CharacterDetail = ({ character }: CharacterDetailProps) => {
	return (
		<div className="rounded-lg bg-gray-c60 p-4 my-4 flex flex-col items-center w-1/2">
			<h1 className="mb-5 text-2xl">{character.name}</h1>
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
