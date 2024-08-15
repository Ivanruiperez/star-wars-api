import { Loader } from "@mantine/core";
import { colors } from "../../theme/colors";

export default function Spinner() {
	return (
		<div className="flex justify-center h-screen" data-testid="loader">
			<Loader color={colors.primary.c100} />
		</div>
	);
}
