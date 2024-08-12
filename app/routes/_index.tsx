import { MetaFunction, LoaderFunction, redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader: LoaderFunction = async () => {
	return redirect("/characters");
};

export default function Index() {
	return null;
}
