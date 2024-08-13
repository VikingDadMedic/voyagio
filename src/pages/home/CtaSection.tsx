import React from "react";
import { useNavigate } from "react-router-dom";

const CtaSection: React.FC = () => {
	const navigate = useNavigate();

	const goPlan = () => {
		navigate("/planner");
	};

	return (
		<div className="px-6 pt-16 bg-white border border-t-gray-300 pb-28">
			<div className="flex flex-col items-center max-w-6xl p-4 mx-auto text-white h-96 justify-evenly rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-500 sm:p-0">
				<h2 className="max-w-2xl text-2xl font-bold leading-snug text-center sm:max-w-3xl sm:text-4xl">Begin your hassle-free effortless travel planning.</h2>
				<button onClick={goPlan} className="rounded-2xl bg-gradient-to-b from-sky-400 to-sky-500 px-8 py-4 text-2xl font-semibold shadow-lg transition-transform duration-150 ease-in-out hover:scale-[1.02] sm:text-3xl">
					Experience it now
				</button>
			</div>
		</div>
	);
};

export default CtaSection;
