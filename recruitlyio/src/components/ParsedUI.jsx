import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CandidateContext } from '../context/CandidateContext';
import { API_BASE_URL } from '../utils/constants';

const ParsedUI = ({ rawData }) => {
    // Assume rawData is the JSON object from the API
    const [data, setData] = useState(rawData.interview_questions || []);
    const [loading, setLoading] = useState(false);

    const { candidatePosition, experienceLevel } = useContext(CandidateContext)

    const generateAnswers = () => {
        setLoading(true)
        const HOST_URL = `${API_BASE_URL}/generate-answers`

        axios({ url: HOST_URL, method: "POST", data: { questionsArray: [...data], experienceLevel, candidatePosition } })
            .then((data) => {
                const response = JSON.parse(data.data.answers).interview_questions
                console.log("API Response: ", response);
                setLoading(false)
                setData(response)
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    if (loading) {
        return (
            <h1 className="text-3xl my-8">Loading ...</h1>
        )
    }

    return (
        <div className="my-5 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Tailored Interview Questions</h1>
                <button className='px-4 py-4 bg-green-500 rounded cursor-pointer hover:shadow text-white font-bold '
                    aria-disabled={data.length == 0}
                    disabled={data.length == 0}
                    onClick={() => { data.length > 0 && generateAnswers() }}>
                    Generate Answers
                </button>
            </div>

            <p className="text-gray-600 mb-8">
                Based on the candidate's profile and experience.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Interview Questions</h2>
            {data.length > 0 ? (
                data.map((question, index) => (
                    <div key={index} className="mb-6">
                        <h3 className="text-xl font-medium text-gray-800">{`${index + 1}. ${question.question}`}</h3>
                        {question?.code &&
                            <div className=' rounded-md p-6 ml-4 mt-5 font-bold border border-gray-300'>
                                <h3 className="text-sm font-medium text-gray-700">{`${question.code}`}</h3>
                            </div>
                        }
                        {question?.answer &&
                            <div className=' rounded-md p-6 ml-4 mt-5 font-bold border border-gray-300'>
                                <h3 className="text-sm font-medium text-gray-700">{`${question.answer}`}</h3>
                            </div>
                        }
                    </div>
                ))
            ) : (
                <p className="text-gray-600 italic">No questions available.</p>
            )}
        </div>
    );
};

export default ParsedUI;