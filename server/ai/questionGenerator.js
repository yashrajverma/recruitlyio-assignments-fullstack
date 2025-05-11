const client = require("../config/ai");

async function generateQuestions(
  candidatePosition,
  candidateResume,
  noOfQuestions,
  experienceLevel,
  skills
) {
  const prompt = `Act as an expert Interview Questions Generator for a technical hiring process. Generate ${noOfQuestions} number of questions in JSON format, including a mix of theoretical questions and practical coding problems if the candidate position is relevant to software domain. Your task is to analyze a candidate's profile, parse their resume content, and generate tailored interview questions and coding problems based on their tech domain ${candidatePosition}, skills ${skills}, and experience level ${experienceLevel}. Theoretical questions should assess the candidate's conceptual knowledge, while coding problems should be practical, relevant to their skills, and include a clear problem statement that can be solved programmatically.
   Provide the result output in JSON format:
    {interview_questions:[{"question":"...", code: ""}]}
    Candidate Resume: ${candidateResume}`;

  const result = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant that helps the interviewer to set interview questions based on the candidate's resume, candidate's working position, and experience level. Provide responses in JSON format.",
      },
      {
        role: "user",
        content:
          "Generate Interview Questions based on the Python Django framework where candidate have 5 years of experience.",
      },
      {
        role: "assistant",
        content:
          "Sure! Here are some interview questions tailored for a candidate with 5 years of experience in Python Django:\n\n### General Django Knowledge\n1. **What are the key features of Django that make it a preferred choice for web development?**\n2. **Can you explain the Django request-response cycle?**\n3. **What are Django middleware and how do they work? Can you give an example of a custom middleware you’ve implemented?**\n4. **How do you manage static files and media files in a Django application?**\n\n### Models and ORM\n5. **How does Django’s ORM work? Can you explain the difference between `select_related` and `prefetch_related`?**\n6. **What are model managers and how have you utilized them in your projects?**\n7. **Can you explain the concept of migrations in Django? How do you handle migration conflicts?**\n8. **How do you implement database indexing in Django models?**\n\n### Views and Templates\n9. **What is the difference between function-based views (FBVs) and class-based views (CBVs)? When would you use one over the other?**\n10. **Can you explain Django's template engine? How do you extend templates?**\n11. **How do you handle form validation in Django? Can you explain the different ways to create forms?**\n12. **Have you implemented any custom template tags or filters? Can you provide an example?**\n\n### RESTful APIs\n13. **Have you worked with Django REST Framework? What are its key features?**\n14. **How do you handle authentication and permissions in a Django REST API?**\n15. **Can you explain how to create and manage versioned APIs in Django?**\n\n### Testing and Debugging\n16. **What testing strategies do you employ in your Django projects? Can you describe the testing framework you prefer?**\n17. **How do you handle debugging in Django? What tools or practices do you find most effective?**\n\n### Security\n18. **What are some common security concerns in Django applications, and how do you mitigate them?**\n19. **How do you implement user authentication and authorization in Django? What packages or methodologies do you use?**\n\n### Performance and Optimization\n20. **What techniques do you use to optimize the performance of a Django application?**\n21. **Can you discuss your experience with caching in Django? Which caching strategies have you implemented?**\n\n### Deployment and DevOps\n22. **What is your experience with deploying Django applications? What platforms and tools have you used?**\n23. **How do you manage environment variables and configuration settings in a Django project?**\n24. **Can you describe your approach to logging in Django applications? What logging frameworks do you prefer?**\n\n### Advanced Topics\n25. **Have you implemented any asynchronous features in Django? Can you discuss your experience with Django Channels or async views?**\n26. **Can you explain how Django signals work and provide an example of a use case?**\n27. **What is your approach to internationalization (i18n) and localization (l10n) in Django applications?**\n\nThese questions cover a wide range of topics that are relevant to a candidate with significant experience in Django, allowing you to assess both their technical knowledge and practical experience.",
      },
      {
        role: "user",
        content:
          "Generate Interview Questions based on the DevOps where candidate have 1 year of experience",
      },
      {
        role: "assistant",
        content:
          "Here are some interview questions tailored for a candidate with 1 year of experience in DevOps:\n\n### General DevOps Knowledge\n1. **Can you explain what DevOps is and how it differs from traditional software development practices?**\n2. **What are the key principles of DevOps that you believe are essential for successful implementation?**\n\n### Tools and Technologies\n3. **Which DevOps tools have you worked with in your experience? Can you briefly describe your experience with each?**\n4. **What is Continuous Integration (CI) and Continuous Deployment (CD)? Can you give examples of tools that facilitate CI/CD?**\n5. **Have you used any configuration management tools (e.g., Ansible, Puppet, Chef)? If so, can you describe a scenario where you used one of these tools?**\n\n### Version Control\n6. **What version control systems are you familiar with? How do you use Git in your workflow?**\n7. **Can you explain the difference between a merge and a rebase in Git? When would you use one over the other?**\n\n### Cloud and Infrastructure\n8. **What cloud platforms have you worked with (e.g., AWS, Azure, Google Cloud)? Can you describe a project where you utilized cloud services?**\n9. **What is Infrastructure as Code (IaC)? Have you used any tools for IaC, such as Terraform or CloudFormation?**\n\n### Monitoring and Logging\n10. **How do you approach monitoring applications and infrastructure? What tools have you used for monitoring?**\n11. **Can you explain the importance of logging in DevOps? How do you manage log data?**\n\n### Automation\n12. **What processes have you automated in your previous roles? Can you provide an example of a task you automated using scripts or tools?**\n13. **How do you prioritize which processes to automate first?**\n\n### Collaboration and Communication\n14. **DevOps emphasizes collaboration between development and operations teams. How have you contributed to fostering collaboration in your team?**\n15. **Can you describe a situation where you encountered a challenge in communication between teams, and how you resolved it?**\n\n### Problem-Solving and Troubleshooting\n16. **How do you approach troubleshooting issues in a DevOps environment? Can you provide an example of a problem you solved?**\n17. **What steps do you take when a deployment fails? How do you ensure a smooth rollback?**\n\n### Security\n18. **What is DevSecOps, and how do you incorporate security practices into your DevOps workflow?**\n19. **Can you discuss any experience you have with implementing security measures in your DevOps processes?**\n\n### Continuous Improvement\n20. **What do you think are the most important metrics to track in a DevOps environment? Why are these metrics significant?**\n21. **How do you stay updated with the latest trends and technologies in the DevOps field?**\n\n### Future Aspirations\n22. **What areas of DevOps are you most interested in exploring further? Why?**\n23. **Can you describe a particular project or experience that you are proud of in your DevOps journey so far?**\n\nThese questions are designed to assess the candidate's foundational knowledge of DevOps, their experience with tools and processes, and their ability to collaborate and troubleshoot in a DevOps setting.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 800,
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null,
    response_format: { type: "json_object" },
  });

  return result.choices[0].message.content;
}

module.exports = generateQuestions;
