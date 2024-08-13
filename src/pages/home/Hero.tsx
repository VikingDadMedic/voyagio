import { Link } from "react-router-dom";
import TypingEffect from "./TypeEffect";

const Hero = () => {
	return (
		<div className="flex items-center justify-center w-full px-6 pt-40 border-gray-300 bg-gradient-to-b from-blue-700 via-blue-500 to-white pb-36">
			<div className="max-w-3xl mx-auto">
				<h1 className="mb-4 text-5xl font-bold leading-tight text-center text-white sm:text-7xl">
					Let AI Be Your <span className="text-yellow-500">Personal Travel Assistant...</span>
				</h1>
				<h2 className="w-full mb-8 font-medium leading-loose tracking-widest text-center text-gray-200 uppercase text-md">Travel hassle-free, and without worries</h2>
				<TypingEffect />
				<Link to="/planner">
					<div className="button mx-auto mt-8 flex h-16 max-w-lg items-center justify-center rounded-2xl border border-sky-500 bg-gradient-to-b from-sky-400 to-sky-500 text-2xl text-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-[1.02]">Try It Now!</div>
				</Link>
			</div>
		</div>
	);
};

export default Hero;
