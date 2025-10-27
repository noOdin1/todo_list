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
  consoleGetInputLoop,
  consoleRemoveTask,
  consoleRemoveProject,
} from "./console.js";
import { addFormEventListener } from "./webui.js";
import { isFuture } from "date-fns";

// }

const todoApp = (function () {
  let runConsoleVersion = true;
  let projectList = []; /* Arrays of projects, this will be 
                           the array used to save to 
                           localStorage. */
  let taskList = []; /* Arrays of task */
  let projectData = "project";
  let taskData = "task";

  /* Class to hold task information */
  class Task {
    constructor(id, projId, name, desc, priority, dueDate, status = false) {
      this._taskId = id;
      this._projectId = projId;
      this._taskName = name;
      this._taskDesc = desc;
      this._taskPriority = priority;
      this._taskDueDate = dueDate;
      this._taskComplete = status;
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
    get taskComplete() {
      return this._taskComplete;
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
    set taskDueDate(dueDate) {
      this._taskDueDate = dueDate;
    }
    set taskComplete(status) {
      this._taskComplete = status;
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
    /* Save project info to localStorage */
    localStorage.setItem(projectData, JSON.stringify(projectList));
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
    localStorage.setItem(taskData, JSON.stringify(taskList));
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
  const assignProject = (task) => {
    console.log("[assignProject] Assigning task to a project");
    task.projectId = consoleAssignProject(projectList);
  };
  const changeDesc = (task) => {
    console.log("[changeDesc] Change descriptions/notes for a task");
    task.taskDesc = consolePromptInput("Task description/notes: ");
  };
  const changeTaskPriority = (task) => {
    console.log("[changeTaskPriority] Change task priority");
    task.taskPriority = priorityLvl[consoleGetInput(priorityLvl)];
  };
  const changeTaskDueDate = (task) => {
    console.log("[changeTaskDueDate] Change the due date for a task");
    task.taskDueDate = consoleGetDate("Task due date (YYYY-MM-DD): ");
  };
  const taskCompleteToggle = (task) => {
    console.log("[taskCompleteToggle] Toggle the status of task completed");
    // task.Complete = task.Complete ? true : false;
    task.taskComplete = task.taskComplete ? false : true;
  };
  const updateTask = () => {
    console.log("[updateTask] Updating a task");
    let tmpList = taskList.map((e) => {
      return e.taskName;
    });
    let choice = consoleGetInputLoop(
      tmpList,
      "Exit..",
      "Choose task to update",
    );
    if (choice == null) {
      return;
    }
    let userChoice = -1;
    while (userChoice != Object.keys(taskItemsForUpdate).length - 1) {
      userChoice = consoleGetInput(
        taskItemsForUpdate,
        "Choose task details to update",
      );
      let tempStr = Object.keys(taskItemsForUpdate)[userChoice];
      taskItemsForUpdate[tempStr](taskList[choice]);
    }
    localStorage.setItem(taskData, JSON.stringify(taskList));
  };
  const deleteTask = () => {
    console.log("[deleteTask] Deleting a task");
    let choice = consoleRemoveTask(taskList);
    if (choice == null) {
      return;
    }
    taskList.splice(choice, 1);
    localStorage.setItem(taskData, JSON.stringify(taskList));
  };
  const deleteProject = () => {
    console.log("[deleteProject] Deleting a project");
    let choice = consoleRemoveProject(projectList);
    if (choice == null) {
      return;
    }

    let projectId = projectList[choice].projectId;
    let yesno = ["yes", "no"];
    let removeTask = consoleGetInput(
      yesno,
      'Remove task related to "' + projectList[choice].projectName + '"',
    );
    /* Remove task associated with the projectId. */
    if (removeTask == 0) {
      let tmpList = [];
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].projectId != projectId) {
          tmpList.push(taskList[i]);
        }
      }
      taskList = [];
      taskList = tmpList.map(function (e) {
        return e;
      });
    }
    /* Preserving the tasks, remove only projectId */
    if (removeTask == 1) {
      taskList.filter((task) => {
        if (task.projectId == projectId) {
          task.projectId = null;
        }
      });
    }
    projectList.splice(choice, 1);
    localStorage.setItem(projectData, JSON.stringify(projectList));
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

  const taskItemsForUpdate = {
    "Assign to project": assignProject,
    "Task description/notes": changeDesc,
    "Task priority": changeTaskPriority,
    "Task due date": changeTaskDueDate,
    "Task completion toggle": taskCompleteToggle,
    "Exit..": () => {
      console.log("Exiting task updating..");
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

  /* Sample data */
  // const project1 = new Project(uuidv4(), "Library Project");
  // const project2 = new Project(uuidv4(), "Video Rental Project");
  // const project3 = new Project(uuidv4(), "Local Price Checker");
  // const task1 = new Task(
  //   uuidv4(),
  //   project1.projectId,
  //   "Finish display book function",
  //   "console version first, then web UI",
  //   "Important",
  //   "2025-11-21",
  //   false,
  // );
  // const task2 = new Task(
  //   uuidv4(),
  //   project1.projectId,
  //   "Create book function",
  //   "Check with others periodically",
  //   "Important",
  //   "2025-11-01",
  //   false,
  // );
  // const task3 = new Task(
  //   uuidv4(),
  //   project2.projectId,
  //   "Landing Page",
  //   "Shop photo to be included",
  //   "Normal",
  //   "2025-12-01",
  //   false,
  // );
  // const task4 = new Task(
  //   uuidv4(),
  //   project3.projectId,
  //   "Get source for prices",
  //   "Prices must be the latest",
  //   "Urgent",
  //   "2025-12-11",
  //   false,
  // );
  // const task5 = new Task(
  //   uuidv4(),
  //   project1.projectId,
  //   "Remove book",
  //   "Ensure complete removal",
  //   "Urgent",
  //   "2025-12-21",
  //   false,
  // );

  const readProjectData = () => {
    const storedProjectData = localStorage.getItem(projectData);

    if (storedProjectData) {
      const tmpProjectData = JSON.parse(storedProjectData);
      tmpProjectData.forEach((e) => {
        let newProject = new Project(e._projectId, e._projectName);
        projectList.push(newProject);
      });
    } else {
      console.log("Project data not found in local storage.");
    }
  };

  const readTaskData = () => {
    const storedTaskData = localStorage.getItem(taskData);

    if (storedTaskData) {
      const tmpTaskData = JSON.parse(storedTaskData);
      tmpTaskData.forEach((e) => {
        let newTask = new Task(
          e._taskId,
          e._projectId,
          e._taskName,
          e._taskDesc,
          e._taskPriority,
          e._taskDueDate,
          e._taskComplete,
        );
        taskList.push(newTask);
      });
    } else {
      console.log("Task data not found in local storage.");
    }
  };

  function startAppInConsole() {
    // projectList.push(project1);
    // projectList.push(project2);
    // projectList.push(project3);
    // taskList.push(task1);
    // taskList.push(task2);
    // taskList.push(task3);
    // taskList.push(task4);
    // taskList.push(task5);

    /* Get data from storage */
    readProjectData();
    readTaskData();
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
