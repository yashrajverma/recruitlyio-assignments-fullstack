// Generic function to extract skills from a resume text
function extractResumeSkills(resumeText) {
  // Predefined list of common technical skills for matching
  const commonSkills = [
    "JavaScript",
    "Python",
    "Java",
    "Cpp",
    "C#",
    "Ruby",
    "PHP",
    "TypeScript",
    "React",
    "ReactJS",
    "Angular",
    "Vue",
    "Vue.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "SQLite",
    "Redis",
    "Oracle",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "Git",
    "GitHub",
    "GitLab",
    "Jenkins",
    "CI/CD",
    "REST",
    "GraphQL",
    "SOAP",
    "Agile",
    "Scrum",
    "TDD",
    "BDD",
    "HTML",
    "CSS",
    "Sass",
    "Less",
    "Tailwind",
    "Bootstrap",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Prompt Engineering",
  ];

  // Initialize result array for skills
  const extractedSkills = new Set(); // Use Set to avoid duplicates

  // Normalize the resume text (remove extra spaces, convert to lowercase for matching)
  const normalizedText = resumeText.replace(/\s+/g, " ").trim().toLowerCase();

  // Step 1: Identify skills section using common headers
  const skillsSectionRegex =
    /(?:skills|technical skills|core skills|technologies|proficiencies|expertise):?([\s\S]*?)(?=\n\n|\n[A-Z]|\n*$)/i;
  const skillsSectionMatch = normalizedText.match(skillsSectionRegex);

  if (skillsSectionMatch) {
    // Extract and process the skills section
    const skillsContent = skillsSectionMatch[1].trim();
    // Split by commas, bullets, or newlines, and clean up
    const potentialSkills = skillsContent
      .split(/,|\n|-|\•|\*|\t/)
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 1);

    // Match against common skills and add to result
    potentialSkills.forEach((skill) => {
      const cleanSkill = skill.replace(/\(.*?\)/g, "").trim(); // Remove parentheses content (e.g., ES6+)
      const matchedSkill = commonSkills.find((commonSkill) =>
        cleanSkill.toLowerCase().includes(commonSkill.toLowerCase())
      );
      if (matchedSkill) {
        extractedSkills.add(matchedSkill);
      } else if (cleanSkill.length > 2) {
        // Add unrecognized skills if they seem valid (e.g., longer than 2 chars)
        extractedSkills.add(cleanSkill);
      }
    });
  }

  // Step 2: Scan entire resume for skills not in a dedicated section
  commonSkills.forEach((skill) => {
    const skillRegex = new RegExp(`\\b${skill.toLowerCase()}\\b`, "i");
    if (skillRegex.test(normalizedText)) {
      extractedSkills.add(skill);
    }
  });

  // Step 3: Handle special cases (e.g., skills with versions like "JavaScript (ES6+)")
  const versionedSkillsRegex = /\b([\w\s]+)\s*\(([\w\d+]+)\)/gi;
  const versionedMatches = normalizedText.matchAll(versionedSkillsRegex);
  for (const match of versionedMatches) {
    const skillName = match[1].trim();
    if (
      commonSkills.some((commonSkill) =>
        skillName.toLowerCase().includes(commonSkill.toLowerCase())
      )
    ) {
      extractedSkills.add(skillName);
    }
  }

  // Convert Set to sorted array and return
  return Array.from(extractedSkills).sort();
}

module.exports = extractResumeSkills;
