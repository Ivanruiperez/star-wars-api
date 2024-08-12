import { useNavigate, useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";

import { baseUrl, defaultIconSize, strings } from "../constants";
import { CharacterDetail } from "../components/CharacterDetail/CharacterDetail";
import { usePageNumber } from "../hooks/usePage.hook";
import { BackIcon } from "../components/icons/BackIcon";
import Spinner from "../components/Spinner/spinner";
import { useEffect } from "react";

export default function CharactersId() {
	const { id } = useParams();
	const { page } = usePageNumber();
	const navigate = useNavigate();
	const { isLoading, error, data } = useQuery({
		queryKey: ["characterDetail"],
		queryFn: () =>
			fetch(`${baseUrl}/people/${id}`).then((res) => {
				if (!res.ok) {
					throw new Error(strings.noCharactersFound);
				}
				return res.json();
			}),
	});
	useEffect(() => {
		if (!isLoading && (error || !data?.name)) {
			navigate("/404", { replace: true });
		}
	}, [error, isLoading, data, navigate]);
	if (isLoading) return <Spinner />;
	if (!id) {
		return null;
	}
	return (
		data && (
			<div>
				<h1 className="justify-center flex">
					{strings.characterDetail}
				</h1>
				<div className="ml-5">
					<button
						onClick={() => navigate(`/characters?page=${page}`)}
					>
						<BackIcon size={defaultIconSize} />
					</button>
				</div>
				<div className="flex justify-center">
					<CharacterDetail character={data} />
				</div>
			</div>
		)
	);
}
