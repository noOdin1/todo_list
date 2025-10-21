/* index.js - todo list project */
import "./style.css";

import { v4 as uuidv4 } from "uuid";
import {
  consoleDisplayProjects,
  consoleGetInput,
  consolePromptInput,
  consoleGetDate,
  consoleAssignProject,
  consoleDisplayTasks,
} from "./console.js";
import { isFuture } from "date-fns";

// console.log("Compilation works, hello world!");

// const userObj = {
//   username: "Maria",
//   email: "maria@mail.com",
// };
//
// localStorage.setItem("user", JSON.stringify(userObj));

// const storedUserData = localStorage.getItem("user");
//
// if (storedUserData) {
//   const userData = JSON.parse(storedUserData);
//   console.log(userData);
//   // You can use userData here...
// } else {
//   console.log("User data not found in local storage");
// }

const todoApp = (function () {
  let runConsoleVersion = true;
  let projectList = []; /* Arrays of projects, this will be 
                           the array used to save to 
                           localStorage. */
  let taskList = []; /* Arrays of task */

  /* Class to hold task information */
  class Task {
    constructor(id, projId, name, desc, priority, dueDate) {
      this._taskId = id;
      this._projectId = projId;
      this._taskName = name;
      this._taskDesc = desc;
      this._taskPriority = priority;
      this._taskDueDate = dueDate;
    }
    get taskId() {
      return this._taskId;
    }
    get projectId() {
      return this._projectId;
    }
    get taskName() {
      return this._taskName;
    }
    get taskDesc() {
      return this._taskDesc;
    }
    get taskPriority() {
      return this._taskPriority;
    }
    get taskDueDate() {
      return this._taskDueDate;
    }
    set taskId(id) {
      this._taskId = id;
    }
    set projectId(projId) {
      this._projectId = projId;
    }
    set taskName(name) {
      this._taskName = name;
    }
    set taskDesc(desc) {
      this._taskDesc = desc;
    }
    set taskPriority(priority) {
      this._taskPriority = priority;
    }
    set taskDueDate(endDate) {
      this._taskDueDate = dueDate;
    }
  }
  class Project {
    constructor(id, name) {
      this._projectId = id;
      this._projectName = name;
    }
    get projectId() {
      return this._projectId;
    }
    get projectName() {
      return this._projectName;
    }
    set projectId(id) {
      this._projectId = id;
    }
    set projectName(name) {
      this._projectName = name;
    }
  }

  const priorityLvl = ["Urgent", "Important", "Normal"];
  const newProject = () => {
    // console.log("[newProject] Create new Project");
    let projectId = uuidv4();
    let projectName = "";
    if (runConsoleVersion) {
      projectName = consolePromptInput("Project Name: ");
    }
    let newProject = new Project(projectId, projectName);
    projectList.push(newProject);
  };
  const newTask = () => {
    console.log("[newTask] Creating new task");
    let taskId = uuidv4();
    let newTask = "";
    if (runConsoleVersion) {
      let taskName = consolePromptInput("Task name: ");
      let taskDesc = consolePromptInput("Task description/notes: ");
      let taskPriority = priorityLvl[consoleGetInput(priorityLvl)];
      let taskDueDate = consoleGetDate("Task due date (YYYY-MM-DD): ");
      let taskProjectId = consoleAssignProject(projectList);
      newTask = new Task(
        taskId,
        taskProjectId,
        taskName,
        taskDesc,
        taskPriority,
        taskDueDate,
      );
    }
    taskList.push(newTask);
  };
  const displayTask = () => {
    console.log("[displayTask] All task");
    if (runConsoleVersion) {
      consoleDisplayTasks(taskList);
    }
  };
  const displayProjects = () => {
    console.log("[displayProjects] All projects");
    if (runConsoleVersion) {
      consoleDisplayProjects(projectList);
    }
  };
  const updateTask = () => {
    console.log("[updateTask] Updating a task");
  };
  const deleteTask = () => {
    console.log("[deleteTask] Deleting a task");
  };

  const choiceErrorMsg = () => {
    console.log("[Error] Invalid choice");
  };

  const menuOpt = {
    "Create new project": newProject,
    "Create new task": newTask,
    "Display all task": displayTask,
    "Show all projects": displayProjects,
    "Update a task": updateTask,
    "Delete a task": deleteTask,
    "Delete a project": deleteProject,
    "Exit..": () => {
      console.log("Exiting console version...");
    },
  };

  const getUserInput = (menuObj) => {
    let menuLen = Object.keys(menuObj).length;
    let menuStr = "Please enter your choice (0-" + `${menuLen - 1})`;
    Object.keys(menuObj).forEach((key, index) => {
      menuStr += `
        ${index}. ${key}`;
    });
    return prompt(menuStr);
  };

  function startAppInConsole() {
    console.log("Start of application");
    let choice = 0;
    while (choice != Object.keys(menuOpt).length - 1) {
      choice = consoleGetInput(menuOpt);
      Object.keys(menuOpt).forEach((key, index) => {
        if (index == choice) {
          menuOpt[key]();
        }
      });
    }
  }

  runConsoleVersion
    ? startAppInConsole()
    : console.log("Starting Web Application");
})();
