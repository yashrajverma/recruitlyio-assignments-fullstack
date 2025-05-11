const express = require("express");
const bodyParser = require("body-parser");
const generateQuestions = require("./questionGenerator");
const rateLimiter = require("./middleware/rateLimiter");
const extractResumeSkills = require("./utils/extractSkills");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: ["http://localhost:5173", "*"] }));

// Apply rate limiter middleware
app.use(rateLimiter);

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/generate-questions", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
