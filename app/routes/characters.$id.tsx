import { useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";

import { baseUrl, defaultIconSize, strings } from "../constants";
import { CharacterDetail } from "../components/CharacterDetail/CharacterDetail";
import { usePageNumber } from "../hooks/usePage.hook";
import { BackIcon } from "../components/icons/BackIcon";
import Spinner from "../components/Spinner/spinner";

export default function CharactersId() {
	const { id } = useParams();
	const { page, navigate } = usePageNumber();
	const { isLoading, error, data } = useQuery({
		queryKey: ["characterDetail"],
		queryFn: () =>
			fetch(`${baseUrl}/people/${id}`).then((res) => res.json()),
	});
	if (isLoading) return <Spinner />;
	if (error) return `${strings.anErrorHasOccurred} ${error.message}`;
	if (!data.name) {
		return <div>{strings.noCharactersFound}</div>;
	}
	if (!id) {
		return null;
	}
	return (
		<div>
			<h1 className="justify-center flex">{strings.characterDetail}</h1>
			<div className="ml-5">
				<button onClick={() => navigate(`/characters?page=${page}`)}>
					<BackIcon size={defaultIconSize} />
				</button>
			</div>
			<div className="flex justify-center">
				<CharacterDetail character={data} />
			</div>
		</div>
	);
}
