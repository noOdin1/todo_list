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
