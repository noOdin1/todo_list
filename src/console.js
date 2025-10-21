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

const consoleDisplayTasks = (taskList) => {
  taskList.forEach((task) => {
    console.log(`Task Details: 
      Task id: ${task.taskId}
      Task project id: ${task.projectId}
      Task name: ${task.taskName}
      Task description/notes: ${task.taskDesc}
      Task priority: ${task.taskPriority}
      Task due date: ${task.taskDueDate}
      `);
  });
};

