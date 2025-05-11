const express = require("express");
const router = express.Router();
const extractResumeSkills = require("../utils/extractSkills");
const generateQuestions = require("../ai/questionGenerator");
const generateAnswers = require("../ai/answerGenerator");

// Default route
router.get("/", (req, res) => {
  res.send("Welcome to Recruitly.io API");
});

router.post("/generate-questions", async (req, res) => {
  try {
    const {
      candidatePosition,
      candidateResume,
      noOfQuestions,
      experienceLevel,
    } = req.body;

    const skills = await extractResumeSkills(candidateResume);
    const questions = await generateQuestions(
      candidatePosition,
      candidateResume,
      noOfQuestions,
      experienceLevel,
      skills
    );
    res.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).send("Failed to generate questions.");
  }
});

router.post("/generate-answers", async (req, res) => {
  try {
    const { candidatePosition, questionsArray, experienceLevel } = req.body;

    const answers = await generateAnswers(
      candidatePosition,
      questionsArray,
      experienceLevel
    );
    res.json({ answers });
  } catch (error) {
    console.error("Error generating answers:", error);
    res.status(500).send("Failed to generate answers.");
  }
});

module.exports = router;
