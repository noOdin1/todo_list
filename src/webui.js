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

function addProjectFormEventListener() {
  let formProject = document.getElementById("createNewProject");
  formProject.addEventListener("submit", (event) => {
  });
}

function addFormEventListener() {
  addProjectFormEventListener();
}
