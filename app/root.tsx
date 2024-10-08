import {
	Links,
	Meta,
	MetaFunction,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";

import "./tailwind.css";

const queryClient = new QueryClient();

export const meta: MetaFunction = () => {
	return [{ title: "May the Force be with you" }];
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
				<ColorSchemeScript />
			</head>
			<body className="bg-gray-c100 text-gray-c20">
				<MantineProvider>{children}</MantineProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Outlet />
		</QueryClientProvider>
	);
}
