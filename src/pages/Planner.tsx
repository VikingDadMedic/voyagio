// pages/Planner.tsx
import ItineraryPlanner from "../components/Itinerary";
import ItineraryDisplay from "../components/ItineraryDisplay";
//import Loading from "../components/Loading";
import Map from "../components/Map";
import { useItinerary } from "../contexts/ItineraryContext";

const Planner: React.FC = () => {
  const { response } = useItinerary();

  if (response) {
    console.log("Response:", response);
    console.log(typeof response);
  }

  return (
    <div className='bg-blue-500 min-h-screen'>
      {!response && (
        <div className='max-w-5xl mx-auto pt-40 pb-20 px-6'>
          <ItineraryPlanner />
        </div>
      )}
      {/*isLoading && <Loading />*/}
      {response && (
        <>
          <ItineraryDisplay response={response} />
          <div className='w-[40vw] bg-white fixed top-0 right-0'>
            <Map location={response.destination.destinationCity} />
          </div>
        </>
      )}
    </div>
  );
};

export default Planner;
