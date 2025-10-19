/* index.js - todo list project */
import "./style.css";

import { v4 as uuidv4 } from "uuid";

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
  let projectList = []; /* Arrays of projects, this will be 
                           the array used to save to 
                           localStorage. */

  /* Class to hold task information */
  class TaskItem {
    constructor(id, name, desc, priority, endDate) {
      this._taskId = id;
      this._taskName = name;
      this._taskDesc = desc;
      this._taskPriority = priority;
      this._taskEndDate = endDate;
    }
    get taskId() {
      return this._taskId;
    }
    get taskName() {
      return this._taskName;
    }
    get taskDesc() {
      return this._taskDesc;
    }
    get taskPriority() {
      return this._priority;
    }
    get taskEndTime() {
      return this._taskEndDate;
    }
    set taskId(id) {
      this._taskId = id;
    }
    set taskName(name) {
      this._taskName = name;
    }
    set taskDesc(desc) {
      this._taskDesc = desc;
    }
    set taskPriority(priority) {
      this._priority = priority;
    }
    set taskEndTime(endDate) {
      this._taskEndDate = endDate;
    }
  }
  class Project {
    constructor(id, name, taskGrp) {
      this._projectId = id;
      this._projectName = name;
      this._taskGroup = taskGrp;
    }
    get projectId() {
      return this._projectId;
    }
    get projectName() {
      return this._projectName;
    }
    get projectTaskGrp() {
      return this._taskGroup;
    }
    set projectId(id) {
      this._projectId = id;
    }
    set projectName(name) {
      this._projectName = name;
    }
    set projectTaskGrp(taskGrp) {
      this._taskGroup.push(taskGrp);
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

  startApp();
})();
