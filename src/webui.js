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
    taskList.push(tmpTask);
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

function addFormEventListener() {
  addProjectFormEventListener();
  addTaskFormEventListener();
}
