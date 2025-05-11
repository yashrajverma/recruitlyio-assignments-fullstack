import React from 'react';

const ParsedUI = ({ rawData }) => {
    // Assume rawData is the JSON object from the API
    const data = rawData.interview_questions || [];

    return (
        <div className="my-5 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Tailored Interview Questions</h1>
            <p className="text-gray-600 mb-8">
                Based on the candidate's profile and experience.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Interview Questions</h2>
            {data.length > 0 ? (
                data.map((question, index) => (
                    <div key={index} className="mb-6">
                        <h3 className="text-xl font-medium text-gray-800">{`${index + 1}. ${question.question}`}</h3>
                    </div>
                ))
            ) : (
                <p className="text-gray-600 italic">No questions available.</p>
            )}
        </div>
    );
};

export default ParsedUI;