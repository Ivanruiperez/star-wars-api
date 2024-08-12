import NotFoundPage from "./404";

export function CatchBoundary() {
	return <NotFoundPage />;
}

export function ErrorBoundary() {
	return <NotFoundPage />;
}

export default function CatchAll() {
	return <NotFoundPage />;
}
