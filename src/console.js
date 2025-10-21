/* console.js - todo list project */

export {
  consoleDisplayProjects,
  consoleGetInput,
  consolePromptInput,
  consoleGetDate,
  consoleAssignProject,
  consoleDisplayTasks,
};

import { isFuture } from "date-fns";

const consolePromptInput = (promptStr) => {
  return prompt(promptStr);
};

const consoleGetDate = (promptStr) => {
  let tmpDateStr = "2000-01-01";
  while (!isFuture(tmpDateStr)) {
    tmpDateStr = consolePromptInput(promptStr);
    if (!isFuture(tmpDateStr)) {
      console.log("Error, please enter a date in the future");
    }
  }
  return tmpDateStr;
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

const consoleGetInput = (menuObj, menuTitle) => {
  let menuLen =
    menuObj.constructor.name === "Array"
      ? menuObj.length
      : Object.keys(menuObj).length;
  let menuStr = "";
  if (!(menuTitle === null || menuTitle === undefined || menuTitle === "")) {
    menuStr += menuTitle + "\n";
  }
  // let menuStr += (menuTitle !== undefined) ? menuTitle + "\n" : "";
  menuStr += "Please enter your choice (0-" + `${menuLen - 1})` + "\n";
  menuObj.constructor.name === "Array"
    ? menuObj.filter((elem, index) => {
        menuStr += `${index}. ` + elem + "\n";
      })
    : Object.keys(menuObj).forEach((key, index) => {
        menuStr += `
        ${index}. ${key}`;
      });
  let choice = -1;
  while (choice > menuLen - 1 || choice < 0) {
    choice = prompt(menuStr);
    if (choice < 0 || choice > menuLen - 1) {
      console.log("[consoleGetInput] Invalid choice");
    }
  }
  return choice;
};
