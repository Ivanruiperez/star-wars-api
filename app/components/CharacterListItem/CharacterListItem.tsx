import { Character } from "../../types";

type CharacterListItemProps = {
	character: Character;
};

export const CharacterListItem = ({ character }: CharacterListItemProps) => {
	return (
		<div className="hover:bg-primary-c50 hover:text-primary-c100 bg-gray-c60 p-4 m-4 flex justify-center rounded-lg">
			<h2>{character.name}</h2>
		</div>
	);
};
