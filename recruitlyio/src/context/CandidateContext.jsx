import React, { createContext, useState } from "react";

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
    const [candidatePosition, setCandidatePosition] = useState(null);
    const [experienceLevel, setExperienceLevel] = useState("");

    return (
        <CandidateContext.Provider
            value={{
                candidatePosition,
                setCandidatePosition,
                experienceLevel,
                setExperienceLevel,
            }}
        >
            {children}
        </CandidateContext.Provider>
    );
};
