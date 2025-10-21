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

  const newProject = () => {
    // console.log("[newProject] Create new Project");
    let projectId = uuidv4();
    let projectName = prompt(`Project Name: `);

    let project1 = new Project(projectId, projectName);
    console.log(`Project details: 
      Project id: ${project1.projectId}
      Project name: ${project1.projectName}
    `);
    projectList.push(project1);
  };
  const newTask = () => {
    console.log("[newTask] Creating new task");
  };
  const displayTask = () => {
    console.log("[displayTask] Displaying  all task");
  };
  const displayProjects = () => {
    projectList.forEach((proj) => {
      console.log(`Project details: 
        Project id: ${proj.projectId}
        Project name: ${proj.projectName}
      `);
    });
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
    1: newProject,
    2: newTask,
    3: displayTask,
    4: displayProjects,
    5: updateTask,
    6: deleteTask,
    7: () => {
      console.log("Exiting...");
    },
  };

  function getUserInput() {
    let userChoice = prompt(`
      1. Create new project
      2. Create new task
      3. Display all task
      4. Show all projects
      5. Update a task
      6. Delete a task
      7. Exit
      Enter your choice: 
    `);
    return userChoice;
  }

  function startApp() {
    console.log("Start of application");
    let choice = 1;
    while (choice != 7) {
      choice = getUserInput();
      console.log("[] User choice: " + choice);
      choice >= 1 && choice <= 7 ? menuOpt[choice]() : choiceErrorMsg();
    }
  }

  runConsoleVersion
    ? startAppInConsole()
    : console.log("Starting Web Application");
})();
