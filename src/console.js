const consolePromptInput = (promptStr) => {
  return prompt(promptStr);
};



const consoleDisplayProjects = (projectList) => {
  projectList.forEach((proj) => {
    console.log(`Project details: 
        Project id: ${proj.projectId}
        Project name: ${proj.projectName}
      `);
  });
};

