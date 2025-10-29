/* webui.js - todo list project */

export { addFormEventListener };
import { v4 as uuidv4 } from "uuid";
import { Task, Project } from "./index.js";
import { projectList, taskList } from "./index.js";
import {
  elementFactory,
  createP,
  createDiv,
  createButton,
  createImg,
  createForm,
  createFieldset,
  createLegend,
  createLabel,
  createInput,
  createSelect,
  createOption,
} from "./element_creator.js";
import {
  removeAllChildElemByClass,
  removeAllChildElemById,
} from "./removeAllChildElem.js";
const projectData = "project";
const taskData = "task";

const clo = (str) => {
  console.log(str);
};

const cdi = (elem) => {
  console.dir(elem);
};

const cta = (elem) => {
  console.table(elem);
};

const htmlElemId = (str) => {
  return document.getElementById(str);
};

const htmlElemClass = (str) => {
  return document.getElementsByClassName(str);
};

const htmlElemTag = (str) => {
  return document.getElementsByTagName(str);
};

const editTaskForm = (event, obj) => {
  let tmpTaskId = event.target.id.replace("edit_", "");
  let tmpTask = "";
  populateProjectForTask();
  taskList.forEach((elem) => {
    if (elem.taskId == tmpTaskId) {
      tmpTask = elem;
    }
  });
  let tmpNameInput = htmlElemId("taskName");
  tmpNameInput.value = tmpTask.taskName;
  tmpNameInput.disabled = true;
  let optAssignedProject = htmlElemClass("optionAssigned");
  Array.from(optAssignedProject).forEach((item) => {
    if (tmpTask.projectId == item.value) {
      item.setAttribute("selected", true);
    }
  });

  let optGrp = htmlElemClass("taskPriority option");
  Array.from(optGrp).forEach((elem) => {
    if (elem.value.toLowerCase() == tmpTask.taskPriority.toLowerCase()) {
      elem.checked = true;
    } else {
      elem.checked = false;
    }
  });
  htmlElemId("taskDesc").value = tmpTask.taskDesc;
  htmlElemId("taskDueDate").value = tmpTask.taskDueDate;

  /* Disable all buttons except for */
  let btnGrp = htmlElemTag("button");
  Array.from(btnGrp).forEach((btn) => {
    if (btn.id != "addTaskBtn") {
      btn.disabled = true;
      btn.setAttribute("style", "background-color: darkgray;");
    }
  });

  let tmpInput = htmlElemId("newProjectName");
  tmpInput.disabled = true;
  let tmpSelect = htmlElemId("displayItemsOptions");
  tmpSelect.disabled = true;

  let formLegend = htmlElemId("createNewTaskLegend");
  formLegend.textContent = "Edit Task";
  formLegend.classList.add(tmpTaskId);
  htmlElemId("addTaskBtn").textContent = "Save Edits";
};

const removeCard = (event) => {
  let tmpId = event.target.id.replace("remove_", "");
  let pos = 0;
  if (tmpId.includes("project_")) {
    tmpId = tmpId.replace("project_", "");
    projectList.forEach((item, index) => {
      if (tmpId == item.projectId) {
        pos = index;
      }
    });
    /* Remove task that references this project */
    taskList.filter((task) => {
      if (task.projectId == tmpId) {
        task.projectId = "unassigned";
      }
    });
    projectList.splice(pos, 1);
    localStorage.setItem(projectData, JSON.stringify(taskList));
  }
  if (tmpId.includes("task_")) {
    tmpId = tmpId.replace("task_", "");
    taskList.forEach((item, index) => {
      if (tmpId == item.taskId) {
        pos = index;
      }
    });
    taskList.splice(pos, 1);
    localStorage.setItem(taskData, JSON.stringify(taskList));
  }
  showInfoOnContentArea();
};

const displayAllTasks = (taskProject) => {
  let contentArea = document.getElementById("displayArea");
  removeAllChildElemById(contentArea);
  let taskSection = createDiv(
    ["display", "task", "section", "div", "container"],
    "taskSection",
  );
  let tmpH2 = elementFactory(
    "h2",
    ["displayDiv", "task", "title"],
    "taskSectionTitle",
  );
  tmpH2.textContent = "Tasks";
  let tmpTaskList;
  tmpTaskList = taskList.slice();

  if (taskProject != undefined) {
    tmpTaskList = [];
    if (taskProject.toLowerCase() == "unassigned") {
      tmpH2.textContent = "Tasks: Unassigned";
      taskList.forEach((elem) => {
        if (elem.projectId.toLowerCase() == "unassigned") {
          tmpTaskList.push(elem);
        }
      });
    } else if (taskProject.toLowerCase() == "completed") {
      tmpH2.textContent = "Completed Tasks";
      taskList.forEach((elem) => {
        if (elem.taskComplete) {
          tmpTaskList.push(elem);
        }
      });
    } else if (taskProject.toLowerCase() == "incomplete") {
      tmpH2.textContent = "Incomplete Tasks";
      taskList.forEach((elem) => {
        if (!elem.taskComplete) {
          tmpTaskList.push(elem);
        }
      });
    } else {
      /* Shows task assigned to a project */
      let tmpStr = "";
      projectList.forEach((elem) => {
        if (elem.projectId == taskProject) {
          tmpStr = elem.projectName;
        }
      });
      tmpH2.textContent = "Project name: " + tmpStr;
      taskList.forEach((elem) => {
        if (taskProject == elem.projectId) {
          tmpTaskList.push(elem);
        }
      });
    }
  }
  taskSection.appendChild(tmpH2);
  let taskCardSection = createDiv(
    ["display", "task", "subSection", "div", "container"],
    "taskSubSection",
  );
  taskSection.appendChild(taskCardSection);
  tmpTaskList.forEach((item) => {
    let tmpDiv = createDiv(
      ["display", "task", "item", "div", "card"],
      item.taskId,
    );
    let tmpParaNameLbl = createP([
      "display",
      "label",
      "task",
      "name",
      "card",
      "para",
    ]);
    tmpParaNameLbl.textContent = "Task Name: ";
    let tmpParaNameVal = createP([
      "display",
      "value",
      "task",
      "name",
      "card",
      "para",
    ]);
    tmpParaNameVal.textContent = item.taskName;

    let tmpProjectNameStr = "Unassigned";
    projectList.forEach((projectItem) => {
      if (projectItem.projectId == item.projectId) {
        tmpProjectNameStr = projectItem.projectName;
      }
    });
    let tmpParaProjectNameLbl = createP([
      "display",
      "label",
      "task",
      "projectName",
      "card",
      "para",
    ]);
    tmpParaProjectNameLbl.textContent = "Project Name: ";
    let tmpParaProjectNameVal = createP([
      "display",
      "value",
      "task",
      "projectName",
      "card",
      "para",
    ]);
    tmpParaProjectNameVal.textContent = tmpProjectNameStr;

    let tmpParaDescLbl = createP([
      "display",
      "label",
      "task",
      "desc",
      "card",
      "para",
    ]);
    tmpParaDescLbl.textContent = "Task Desciption/notes: ";
    let tmpParaDescVal = createP([
      "display",
      "value",
      "task",
      "desc",
      "card",
      "para",
    ]);
    tmpParaDescVal.textContent = item.taskDesc;

    let tmpParaPriorityLbl = createP([
      "display",
      "label",
      "task",
      "priority",
      "card",
      "para",
    ]);
    tmpParaPriorityLbl.textContent = "Task Priority:";
    let tmpParaPriorityVal = createP([
      "display",
      "value",
      "task",
      "priority",
      "card",
      "para",
    ]);
    tmpParaPriorityVal.classList.add(item.taskPriority.toLowerCase());
    tmpParaPriorityVal.textContent = item.taskPriority;

    let tmpParaDueDateLbl = createP([
      "display",
      "label",
      "task",
      "duedate",
      "card",
      "para",
    ]);
    tmpParaDueDateLbl.textContent = "Task Due Date:";
    let tmpParaDueDateVal = createP([
      "display",
      "value",
      "task",
      "duedate",
      "card",
      "para",
    ]);
    tmpParaDueDateVal.textContent = item.taskDueDate;

    let tmpParaCompleteLbl = createP([
      "display",
      "label",
      "task",
      "complete",
      "card",
      "para",
    ]);
    tmpParaCompleteLbl.textContent = "Task status: ";
    let tmpStr = item.taskComplete ? "Complete" : "Incomplete";
    let tmpCompletedBtn = createButton(
      ["completed", "task", "display", "info", tmpStr],
      "completed_" + item.taskId,
      tmpStr,
    );
    tmpCompletedBtn.addEventListener("click", (event) => {
      item.taskComplete = item.taskComplete ? false : true;
      showInfoOnContentArea();
    });
    let tmpEditBtn = createButton(
      ["edit", "task", "display", "info"],
      "edit_" + item.taskId,
      "Edit",
    );
    let tmpRemoveBtn = createButton(
      ["remove", "task", "display", "info"],
      "remove_task_" + item.taskId,
      "Remove",
    );
    tmpRemoveBtn.addEventListener("click", removeCard);
    tmpEditBtn.addEventListener("click", () => {
      editTaskForm(event, tmpEditBtn);
    });
    tmpDiv.appendChild(tmpParaNameLbl);
    tmpDiv.appendChild(tmpParaNameVal);
    tmpDiv.appendChild(tmpParaProjectNameLbl);
    tmpDiv.appendChild(tmpParaProjectNameVal);
    tmpDiv.appendChild(tmpParaDescLbl);
    tmpDiv.appendChild(tmpParaDescVal);
    tmpDiv.appendChild(tmpParaPriorityLbl);
    tmpDiv.appendChild(tmpParaPriorityVal);
    tmpDiv.appendChild(tmpParaDueDateLbl);
    tmpDiv.appendChild(tmpParaDueDateVal);
    tmpDiv.appendChild(tmpParaCompleteLbl);
    tmpDiv.appendChild(tmpCompletedBtn);
    tmpDiv.appendChild(tmpEditBtn);
    tmpDiv.appendChild(tmpRemoveBtn);
    taskCardSection.appendChild(tmpDiv);
  });
  contentArea.appendChild(taskSection);
};
const showTasksForProject = (event) => {
  clo(
    "Showing tasks related to this project, event.target.id: " +
      event.target.id,
  );
  let tmpProjectId = event.target.id.replace("showRelatedTasksBtn_", "");
  let tmpProjectName = "";
  projectList.forEach((elem) => {
    if (elem.projectId == tmpProjectId) {
      tmpProjectName = elem.projectName;
    }
  });
  displayAllTasks(tmpProjectId);
};

const displayAllProjects = (displayType) => {
  clo("Displaying all projects");
  let contentArea = document.getElementById("displayArea");
  removeAllChildElemById(contentArea);
  let projectSection = createDiv(
    ["display", "project", "section", "div", "container"],
    "projectSection",
  );
  let tmpH2 = elementFactory(
    "h2",
    ["displayDiv", "project", "title"],
    "projectSectionTitle",
  );
  tmpH2.textContent = "Projects";
  let tmpProjectList = projectList.slice();
  if (displayType != undefined) {
    tmpProjectList = [];
    tmpH2.textContent = "Unassigned Projects";
    /* construct the temporary array */
    let tmpTaskProjectId = [];
    taskList.forEach((elem) => {
      tmpTaskProjectId.push(elem.projectId);
    });
    projectList.forEach((elem) => {
      if (!tmpTaskProjectId.includes(elem.projectId)) {
        tmpProjectList.push(elem);
      }
    });
  }
  projectSection.appendChild(tmpH2);
  let projectCardSection = createDiv(
    ["display", "project", "subSection", "div", "container"],
    "projectSubSection",
  );
  projectSection.appendChild(projectCardSection);
  tmpProjectList.forEach((item) => {
    let tmpDiv = createDiv(
      ["display", "project", "item", "div", "card"],
      item.projectId,
    );
    let tmpPara = createP(["display", "project", "name", "card", "para"]);
    tmpPara.textContent = item.projectName;
    let tmpRemoveBtn = createButton(
      ["remove", "project", "display", "info"],
      "remove_project_" + item.projectId,
      "Remove",
    );
    let tmpShowTasksBtn = createButton(
      ["show", "related", "task", "display", "info"],
      "showRelatedTasksBtn_" + item.projectId,
      "Show Tasks",
    );
    tmpShowTasksBtn.addEventListener("click", showTasksForProject);
    tmpRemoveBtn.addEventListener("click", removeCard);
    tmpDiv.appendChild(tmpPara);
    tmpDiv.appendChild(tmpShowTasksBtn);
    tmpDiv.appendChild(tmpRemoveBtn);
    projectCardSection.appendChild(tmpDiv);
  });
  contentArea.appendChild(projectSection);
};
const displayUnassignedProjects = () => {
  clo("Displaying all unassigned projects");
  let contentArea = document.getElementById("displayArea");
  removeAllChildElemById(contentArea);
  displayAllProjects("unassigned");
};
const displayUnassignedTasks = () => {
  clo("Displaying all unassigned tasks");
  let contentArea = document.getElementById("displayArea");
  removeAllChildElemById(contentArea);
  displayAllTasks("unassigned");
};
const displayCompletedTasks = () => {
  clo("Displaying all completed tasks");
  let contentArea = document.getElementById("displayArea");
  removeAllChildElemById(contentArea);
  displayAllTasks("completed");
};
const displayIncompleteTasks = () => {
  clo("Displaying all incomplete tasks");
  let contentArea = document.getElementById("displayArea");
  removeAllChildElemById(contentArea);
  displayAllTasks("incomplete");
};

function populateProjectForTask() {
  let taskAssignmentDropDown = document.getElementById(
    "projectIdForTaskDropDown",
  );
  removeAllChildElemById(taskAssignmentDropDown);

  let nullOption = createOption(
    ["unassigned", "task", "dropDown", "optionAssigned"],
    "unassignedDropDown",
    "Unassigned",
    "Unassigned",
    true,
  );
  taskAssignmentDropDown.add(nullOption);
  projectList.forEach((elem) => {
    let tmpOption = document.createElement("option");
    tmpOption.classList.add("optionAssigned");
    tmpOption.innerHTML = elem.projectName;
    tmpOption.value = elem.projectId;
    taskAssignmentDropDown.add(tmpOption);
  });
}

function addProjectFormEventListener() {
  let formProject = document.getElementById("createNewProject");
  formProject.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formProject);
    let tmpProject = new Project();
    tmpProject.projectId = uuidv4();
    for (const [name, value] of formData) {
      if (name == "projectName") {
        tmpProject.projectName = value;
      }
    }
    projectList.push(tmpProject);
    localStorage.setItem(projectData, JSON.stringify(projectList));
    formProject.reset();
    showInfoOnContentArea();
    populateProjectForTask();
  });
}

function formTaskSubmission(event, formObj) {
  clo("[formTaskSubmission] event: ");
  cdi(event.target.id);
  let buttonTxt = document.getElementById("taskSubmitBtnDiv").textContent;

  let tmpTask = new Task();
  if (buttonTxt.includes("Create Task")) {
    const formData = new FormData(formObj);
    tmpTask.taskId = uuidv4();
    for (const [name, value] of formData) {
      if (name == "projectIdForTask") {
        tmpTask.projectId = value;
      }
      if (name == "taskName") {
        tmpTask.taskName = value;
      }
      if (name == "taskDesc") {
        tmpTask.taskDesc = value;
      }
      if (name == "taskPriority") {
        tmpTask.taskPriority = value;
      }
      if (name == "taskDueDate") {
        tmpTask.taskDueDate = value;
      }
    }
    tmpTask.taskComplete = false;
    taskList.push(tmpTask);
    localStorage.setItem(taskData, JSON.stringify(taskList));
    formObj.reset();
    showInfoOnContentArea();
  }
  if (buttonTxt.includes("Save Edits")) {
    let formObj = document.getElementById("createNewTask");
    let formLegend = htmlElemId("createNewTaskLegend");
    let tmpTaskId = formLegend.classList;

    clo("[formTaskSubmission] Task id to edit: " + tmpTaskId);
    let pos = -1;
    taskList.forEach((item, index) => {
      if (item.taskId == tmpTaskId) {
        pos = index;
      }
    });
    const formData = new FormData(formObj);
    for (const [name, value] of formData) {
      if (name == "projectIdForTask") {
        taskList[pos].projectId = value;
      }
      if (name == "taskName") {
        taskList[pos].taskName = value;
      }
      if (name == "taskDesc") {
        taskList[pos].taskDesc = value;
      }
      if (name == "taskPriority") {
        taskList[pos].taskPriority = value;
      }
      if (name == "taskDueDate") {
        taskList[pos].taskDueDate = value;
      }
    }
    // cdi(taskList[pos]);
    htmlElemId("createNewTaskLegend").textContent = "New Task";
    htmlElemId("addTaskBtn").textContent = "Create Task";
    htmlElemId("taskName").disabled = false;
    let tmpInput = htmlElemId("newProjectName");
    tmpInput.disabled = false;
    let tmpSelect = htmlElemId("displayItemsOptions");
    tmpSelect.disabled = false;

    populateProjectForTask();

    let btnGrp = htmlElemTag("button");
    Array.from(btnGrp).forEach((btn) => {
      if (btn.id != "addTaskBtn") {
        btn.disabled = false;
        btn.removeAttribute("style");
      }
    });
    localStorage.setItem(taskData, JSON.stringify(taskList));
    formObj.reset();
    formLegend.classList = "";
    showInfoOnContentArea();
  }
}

function addTaskFormEventListener() {
  let formTask = document.getElementById("createNewTask");
  formTask.addEventListener("submit", (event) => {
    event.preventDefault();
    formTaskSubmission(event, formTask);
  });
}

let displaySelections = {
  selectionAllProjects: displayAllProjects,
  selectionAllTasks: displayAllTasks,
  selectionUnassignedProjects: displayUnassignedProjects,
  selectionUnassignedTasks: displayUnassignedTasks,
  selectionCompletedTasks: displayCompletedTasks,
  selectionIncompleteTasks: displayIncompleteTasks,
};

/**
 * Other functions that finishes and initiates a info display
 * in the content area will call this function
 **/
const showInfoOnContentArea = () => {
  let displaySelectionDD = document.getElementsByClassName("display selection");
  let selectedOpt = "";
  Array.from(displaySelectionDD).forEach((elem) => {
    if (elem.selected == true) {
      selectedOpt = elem.id;
    }
  });
  displaySelections[selectedOpt]();
};

const addEvtListDisplayDropDown = () => {
  let optionItems = document.getElementsByClassName("selection");
  let optionsItemsArray = Array.from(optionItems);
  optionsItemsArray.forEach((item) => {
    item.addEventListener("click", (event) => {
      displaySelections[event.target.id]();
    });
  });
};

const readProjectData = () => {
  const storedProjectData = localStorage.getItem("project");

  if (storedProjectData) {
    const tmpProjectData = JSON.parse(storedProjectData);
    tmpProjectData.forEach((e) => {
      // let newProject = new Project(e.projectId, e._projectName);
      // let newProject = new Project(e._projectId, e._projectName);
      let newProject = new Project();
      if (e._projectId != undefined) {
        newProject.projectId = e._projectId;
        newProject.projectName = e._projectName;
      } else {
        newProject.projectId = e.projectId;
        newProject.projectName = e.projectName;
      }
      clo("[readProjectData]");
      cdi(e);
      cdi(newProject);
      projectList.push(newProject);
    });
  } else {
    console.log("Project data not found in local storage.");
  }
};

const readTaskData = () => {
  const storedTaskData = localStorage.getItem("task");

  if (storedTaskData) {
    const tmpTaskData = JSON.parse(storedTaskData);
    // cdi(tmpTaskData);
    tmpTaskData.forEach((e) => {
      let newTask = new Task();
      // let newTask = new Task(
      //   e._taskId,
      //   e._projectId,
      //   e._taskName,
      //   e._taskDesc,
      //   e._taskPriority,
      //   e._taskDueDate,
      //   e._taskComplete,
      // );
      if (e._taskId != undefined) {
        newTask.taskId = e._taskId;
        newTask.projectId = e._projectId;
        newTask.taskName = e._taskName;
        newTask.taskDesc = e._taskDesc;
        newTask.taskPriority = e._taskPriority;
        newTask.taskDueDate = e._taskDueDate;
        newTask.taskComplete = e._taskComplete;
      } else {
        newTask.taskId = e.taskId;
        newTask.projectId = e.projectId;
        newTask.taskName = e.taskName;
        newTask.taskDesc = e.taskDesc;
        newTask.taskPriority = e.taskPriority;
        newTask.taskDueDate = e.taskDueDate;
        newTask.taskComplete = e.taskComplete;
      }
      taskList.push(newTask);
      clo("[readTaskData]");
      cdi(e);
    });
  } else {
    console.log("Task data not found in local storage.");
  }
};

function addFormEventListener() {
  populateProjectForTask();

  addProjectFormEventListener();
  addTaskFormEventListener();

  addEvtListDisplayDropDown();
  showInfoOnContentArea();
}
