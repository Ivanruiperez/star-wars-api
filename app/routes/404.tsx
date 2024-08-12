import { Link } from "@remix-run/react";
import { strings } from "../constants";

export default function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-2/3 flex flex-col items-center justify-start bg-gray-c60 rounded-lg">
				<h1 className="text-4xl font-bold mt-5" data-testid="404">
					{strings.notFoundPage}
				</h1>
				<p className="text-lg">{strings.youHaveBrokenC3PO}</p>
				<div>
					<img
						src="/assets/c3po.png"
						alt="C3PO"
						className="w-full h-full object-cover overflow-hidden"
					/>
				</div>
				<div className="bg-primary-c100 rounded-lg w-40 h-12 justify-center items-center flex mb-5">
					<Link to="/" className="text-gray-c100">
						{strings.GoBackToHome}
					</Link>
				</div>
			</div>
		</div>
	);
}
