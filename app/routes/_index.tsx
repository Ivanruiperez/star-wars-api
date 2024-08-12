import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
	return redirect("/characters");
};

export default function Index() {
	return null;
}
