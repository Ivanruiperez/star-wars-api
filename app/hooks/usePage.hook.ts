import { useLocation, useNavigate } from "@remix-run/react";
import { useState } from "react";

import { baseUrl, numberOne } from "../constants";

export const usePageNumber = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const queryParamPage = queryParams.get("page");
	const initialPage = queryParamPage ? parseInt(queryParamPage) : numberOne;
	const [page, setPage] = useState(initialPage);
	const [pageUrl, setPageUrl] = useState(`${baseUrl}/people?page=${page}`);
	return { page, setPage, navigate, pageUrl, setPageUrl };
};
