import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CandidateContext } from "./context/CandidateContext";
import { API_BASE_URL } from "./utils/constants";
const ParsedUI = React.lazy(() => import('./components/ParsedUI'));
const App = () => {
  const { setExperienceLevel, setCandidatePosition } = useContext(CandidateContext);
  const [interViewQuestions, setInterViewQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    candidatePosition: "",
    candidateResume: "",
    noOfQuestions: 0,
    experienceLevel: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'experienceLevel') { setExperienceLevel(value) }
    if (name === 'candidatePosition') { setCandidatePosition(value) }
  };

  const handleOnSubmit = () => {
    setLoading(true)
    const HOST_URL = `${API_BASE_URL}/generate-questions`
    axios({ url: HOST_URL, method: "POST", data: formState })
      .then((data) => {
        console.log("API Response: ", data.data.questions);
        setLoading(false)
        setInterViewQuestions(JSON.parse(data.data.questions))
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  if (loading) {
    return (
      <h1 className="text-3xl my-8">Loading ...</h1>
    )
  }

  return (
    <div className="flex flex-col px-24 py-5 justify-start h-full bg-gray-100">
      <h1 className="text-3xl mb-6 font-bold">Recruitly.io InterView Questions Generator</h1>
      {interViewQuestions ? <ParsedUI rawData={interViewQuestions} /> :
        <div className="bg-white p-6 rounded shadow-md w-full mx-auto" >
          <div className="mb-4 w-full">
            <label htmlFor="candidatePosition" className="block text-gray-700 font-bold mb-2">
              Candidate Position
            </label>
            <input
              type="text"
              id="candidatePosition"
              name="candidatePosition"
              value={formState.candidatePosition}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="candidateResume" className="block text-gray-700 font-bold mb-2">
              Candidate Resume
            </label>
            <textarea
              type="text"
              id="candidateResume"
              name="candidateResume"
              value={formState.candidateResume}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="noOfQuestions" className="block text-gray-700 font-bold mb-2">
              No of Questions
            </label>
            <input
              type="number"
              id="noOfQuestions"
              name="noOfQuestions"
              value={formState.noOfQuestions}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="experienceLevel" className="block text-gray-700 font-bold mb-2">
              Experience Level
            </label>
            <input
              type="number"
              id="experienceLevel"
              name="experienceLevel"
              value={formState.experienceLevel}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 my-6"
            onClick={() => handleOnSubmit()}
          >
            Submit
          </button>
        </div>
      }
    </div>
  );
};

export default App;
