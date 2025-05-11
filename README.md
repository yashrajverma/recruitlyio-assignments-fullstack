# Recruitlyio Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Steps to Set Up Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd recruitlyio
```

### 2. Install Dependencies

#### Server

```bash
cd server
npm install
```

#### React App

```bash
cd ../recruitlyio
npm install
```

### 3. Configure Environment Variables

- **Server**: Add and Update `server/.env` with your Azure OpenAI API key and endpoint.
- **React App**: Add and Update `recruitlyio/.env` with the backend server URL.

### 4. Start the Server

```bash
cd server
npm start
```

### 5. Start the React App

```bash
cd ../recruitlyio
npm run dev
```

### 6. Access the Application

- Open your browser and navigate to `http://localhost:5173`.

## Technical Approach: Azure OpenAI Integration for Interview Questions

### Strategy

To ensure the system generates high-quality technical interview questions tailored to specific job roles and experience levels, the following strategy was implemented:

1. **Break Down Job Requirements into Core Skill Areas**:

   - Extract relevant skills from the candidate's resume using a predefined list of technical skills.
   - Map the candidate's position and experience level to specific skill domains.

2. **Maintain Consistency in Question Difficulty**:

   - Use Azure OpenAI's GPT model to dynamically adjust the complexity of questions based on the candidate's experience level.
   - Ensure a balance between theoretical and practical questions.

3. **Generate Practical, Application-Focused Questions**:

   - Design prompts that emphasize real-world scenarios and coding challenges.
   - Include clear problem statements for coding tasks to test practical application skills.

4. **Provide Clear Evaluation Criteria**:
   - Structure questions in JSON format with fields for theoretical and coding questions.
   - Include guidelines for assessing answers, ensuring consistency in evaluation.

### Evaluation Criteria

The solution is evaluated based on the following:

- **Question Quality**: Relevance and effectiveness of the generated questions in assessing technical skills.
- **Difficulty Calibration**: Proper scaling of question difficulty based on the candidate's experience level.
- **Evaluation Guidelines**: Clarity and consistency in the criteria for assessing answers.
- **System Architecture**: Modular design for scalability and maintainability.
- **Code Quality**: Clean, well-documented, and maintainable codebase.

### System Architecture

1. **Backend**:

   - Extract skills from resumes using `extractSkills.js`.
   - Generate tailored questions and answers using Azure OpenAI's GPT model via `questionGenerator.js` and `answerGenerator.js`.

2. **Frontend**:

   - Provide an intuitive UI for inputting candidate details and displaying generated questions and answers.
   - Use React and TailwindCSS for a responsive and user-friendly interface.

3. **Integration**:
   - Use RESTful APIs to connect the frontend with the backend services.
   - Ensure seamless communication between the skill extraction, question generation, and answer generation modules.

## Additional Notes

- Ensure the backend server is running before accessing the React app.
- For production deployment, configure environment variables securely.

## Demo

- https://drive.google.com/file/d/12XZLxp__IPh9pr53mYcA40OcW-0PFqsi/view?usp=sharing
