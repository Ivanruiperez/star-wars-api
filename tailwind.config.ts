import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				gray: {
					c100: "#242424",
					c60: "#3B3B3B",
					c40: "#828282",
					c20: "#C9C9C9",
				},
				primary: {
					c100: "#FFD43B",
					c50: "#3E3521",
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
