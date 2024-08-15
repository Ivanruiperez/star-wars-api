export type Character = {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string[];
	species: string[];
	vehicles: string[];
	starships: string[];
	created: string;
	edited: string;
	url: string;
};

export type Film = {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: string[];
	planets: string[];
	starships: string[];
	vehicles: string[];
	species: string[];
	created: string;
	edited: string;
	url: string;
};

export type FilmDetailProps = {
	film: Film;
};

export type CharacterListItemProps = {
	character: Character;
};

export type CharacterFilmsProps = {
	films: string[];
};

export type CharacterDetailProps = {
	character: Character;
};

export type PaginationButtonsProps = {
	previous: string | null;
	next: string | null;
	onPrevious: () => void;
	onNext: () => void;
	currentPage: number;
	charactersList: Character[];
};

export type SearchInputProps = {
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputValue: string;
	cleanInput: (isAIInput: boolean) => void;
	isAIInput?: boolean;
};

export type LoaderData = {
	openaiApiKey: string;
};

export type UpdatePageProps = {
	isNext: boolean;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
};

export type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
	size?: number | string;
	color?: string;
};

export type FilteringCharacter = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<Character>;
};

export type ApiResponse = {
	characters: FilteringCharacter[];
	responseContent: string;
};
