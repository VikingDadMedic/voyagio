import React, { useState } from "react";
import { generateItinerary } from "../services/gptService";

const ItineraryPlanner: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [length, setLength] = useState("");
  const [budget, setBudget] = useState("");
  const [program, setProgram] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [errors, setErrors] = useState({
    destination: "",
    length: "",
    budget: "",
    program: "",
  });

  const resetErrors = () => {
    setErrors({
      destination: "",
      length: "",
      budget: "",
      program: "",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset errors
    resetErrors();

    // Validation
    let isValid = true;
    const newErrors = { ...errors };

    if (!destination) {
      newErrors.destination = "Destination is required";
      isValid = false;
    }
    if (!length) {
      newErrors.length = "Length is required";
      isValid = false;
    }
    if (!program) {
      newErrors.program = "Program type is required";
      isValid = false;
    }
    if (!budget) {
      newErrors.budget = "Budget is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const response = await generateItinerary({
        destination,
        length,
        budget,
        program,
      });
      setItinerary(response);
    }
  };

  const handleReset = () => {
    setDestination("");
    setLength("");
    setBudget("");
    setProgram("");
    setItinerary(null);
  };

  const checkValue = (value: string): string | null => {
    if (value === length && length) {
      return length + " days";
    } else if (value === budget && budget) {
      return budget + " $";
    }
    return null;
  };

  const resetAll = () => {
    handleReset();
    resetErrors();
  };

  // Modified onChange handlers
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, destination: "" }));
    }
  };

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProgram(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, program: "" }));
    }
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, length: "" }));
    }
  };

  // Modified onChange handlers
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, budget: "" }));
    }
  };

  // TODO: random country/city generator

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='space-y-4 bg-white p-8 rounded-2xl shadow-2xl grid place-items-center bg-opacity-20 backdrop-blur-xl border-[1px] border-white border-opacity-20 px-8'>
        <h2 className='text-3xl font-bold'>Plan Your Next Trip</h2>
        <div className='flex flex-col w-full'>
          <label htmlFor='destination' className='font-bold'>
            Destination:
          </label>
          <input
            id='destination'
            type='text'
            autoComplete='off'
            value={destination}
            onChange={handleDestinationChange}
            placeholder='Enter a location'
            className='rounded-xl px-4 py-2 h-12 w-full bg-transparent border-[1px] backdrop-blur-lg border-opacity-10 focus-within:outline-none placeholder:text-gray-200 placeholder:font-base border-gray-100 mt-2'
          />
          {errors.destination && (
            <div className='error text-white absolute right-10 bg-red-600 bg-opacity-80 backdrop-blur-2xl px-4 rounded-full overflow-hidden'>
              {errors.destination}
            </div>
          )}
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='program' className='font-bold'>
            Program Type:
          </label>
          <select
            id='program'
            value={program}
            onChange={handleProgramChange}
            className='rounded-xl px-4 py-2 h-12 w-full bg-transparent border-[1px] backdrop-blur-lg border-opacity-10 focus-within:outline-none placeholder:text-gray-200 placeholder:font-base border-gray-100 mt-2'>
            <option value=''>Select a Program</option> {/* Default option */}
            <option value='Adventure'>Adventure</option>
            <option value='Cultural'>Cultural</option>
            <option value='Party'>Party</option>
            <option value='Relax'>Relax</option>
          </select>
          {errors.program && (
            <div className='error text-white absolute right-10 bg-red-600 bg-opacity-80 backdrop-blur-2xl px-4 rounded-full overflow-hidden'>
              {errors.program}
            </div>
          )}
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='length' className='font-bold'>
            Length: {checkValue(length)}
          </label>
          <input
            id='length'
            type='range'
            min='1'
            max='14'
            value={length}
            onChange={handleLengthChange}
            className='rounded-full py-2 h-10 w-full bg-transparent'
          />
          {errors.length && (
            <div className='error text-white absolute right-10 bg-red-600 bg-opacity-80 backdrop-blur-2xl px-4 rounded-full overflow-hidden'>
              {errors.length}
            </div>
          )}
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='budget' className='font-bold'>
            Budget: {checkValue(budget)}
          </label>
          <input
            id='budget'
            type='range'
            value={budget}
            min='100'
            max='2000'
            step='50'
            onChange={handleBudgetChange}
            className='rounded-full py-2 h-10 w-full bg-transparent border-2 border-opacity-20 border-gray-100'
          />
          {errors.budget && (
            <div className='error text-white absolute right-10 bg-red-600 bg-opacity-80 backdrop-blur-2xl px-4 rounded-full overflow-hidden'>
              {errors.budget}
            </div>
          )}
        </div>
        <div className='flex flex-row w-full space-x-4'>
          <button
            className='w-full bg-teal-500 h-12 rounded-xl font-bold text-xl border-[1px] border-opacity-20 border-gray-100 shadow-md'
            type='submit'
            value='Submit'>
            Get Itinerary
          </button>
          <button
            className='w-full bg-gray-500 h-12 rounded-xl font-bold text-xl border-[1px] border-opacity-20 border-gray-100 shadow-md'
            type='button' // type='button' to prevent form submission
            onClick={resetAll}
            value='Reset'>
            Reset Prompt
          </button>
        </div>
      </form>
      {itinerary && <div>{/* Render itinerary table and packing list */}</div>}
    </>
  );
};

export default ItineraryPlanner;
