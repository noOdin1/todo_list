/* Function to create and return DOM element */
export default createElement;
export {
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
};

function createElement(elemType, class_list, unique_id, text_content) {
  let element = document.createElement(elemType);

  /* Add class to the element */
  if (!(class_list instanceof Array) && class_list != "") {
    class_list = [class_list];
  }
  if (class_list != "") {
    class_list.forEach((elem) => element.classList.add(elem));
  }

  /* Add id to the element */
  if (unique_id !== "" && !(unique_id === undefined || unique_id === null)) {
    element.setAttribute("id", unique_id);
  }

  /* Add textContent/innerHTML/innerText value */
  if (
    text_content !== "" &&
    text_content !== undefined &&
    text_content !== null
  ) {
    element.textContent = text_content;
  }

  return element;
}

const check = () => ({
  isNullUndefined(obj) {
    if (obj == "" || obj === null || obj === undefined) {
      return true;
    }
    return false;
  },
});

const htmlOps = (elem) => ({
  addchild: (htmlElem) => {
    if (check().isNullUndefined(htmlElem)) {
      return;
    }
    elem.appendChild(htmlElem);
  },
  addSrc: (source) => {
    if (check().isNullUndefined(source)) {
      return;
    }
    elem.src = source;
  },
  submissionMethod: (method) => {
    if (check().isNullUndefined(method)) {
      return;
    }
    elem.method = method;
  },
  setRequired: (inputRequired) => {
    elem.required = inputRequired;
  },
  setName: (inputName) => {
    elem.name = inputName;
  },
  setFor: (labelFor) => {
    elem.for = labelFor;
  },
  setType: (inputType) => {
    elem.type = inputType;
  },
  setValue: (optionValue) => {
    elem.value = optionValue;
  },
  setText: (text) => {
    elem.textContent = text;
  },
  setDefaultSelected: (defaultSelected) => {
    elem.defaultSelected = defaultSelected;
  },
});

/* iife to perform html element related to it's class. */
const class_ = (elem) => ({
  addClass: (classes) => {
    if (check().isNullUndefined(classes)) {
      return;
    }
    if (classes instanceof Array) {
      classes.forEach((item) => elem.classList.add(item));
      return;
    }
    elem.className += (elem.className == "" ? "" : " ") + classes;
  },
  removeClass: (classes) => {
    elem.classList.remove(classes);
  },
  toggleClass: (classes) => {
    elem.classList.toggle(classes);
  },
  getClass: () => {
    return elem.className.split(" ");
  },
});

/* Create a composition of the element. */
const elementFactory = (htmlTag, htmlClass, htmlId) => {
  let elem = document.createElement(htmlTag);
  if (!check().isNullUndefined(htmlId)) {
    elem.id = htmlId;
  }
  class_(elem).addClass(htmlClass);
  return Object.assign(elem, class_(elem));
};

const createDiv = (htmlClass, htmlId) => {
  let elem = elementFactory("div", htmlClass, htmlId);
  return Object.assign(elem, htmlOps(elem));
};

const createP = (htmlClass, htmlId, content) => {
  let elem = elementFactory("p", htmlClass, htmlId);
  if (!check().isNullUndefined(content)) {
    htmlOps(elem).setText(content);
  }
  return Object.assign(elem, htmlOps(elem));
};

const createButton = (htmlClass, htmlId, text) => {
  let elem = elementFactory("button", htmlClass, htmlId);
  if (!check().isNullUndefined(text)) {
    htmlOps(elem).setText(text);
  }
  return Object.assign(elem, htmlOps(elem));
};

const createImg = (htmlClass, htmlId, srcRef) => {
  let elem = elementFactory("img", htmlClass, htmlId);
  if (!check().isNullUndefined(srcRef)) {
    htmlOps(elem).addSrc(srcRef);
  }
  return Object.assign(elem, htmlOps(elem));
};

const createForm = (htmlClass, htmlId, subMethod) => {
  let elem = elementFactory("form", htmlClass, htmlId);
  if (!check().isNullUndefined(subMethod)) {
    htmlOps(elem).submissionMethod(subMethod);
  }
  return Object.assign(elem, htmlOps(elem));
};

const createFieldset = (htmlClass, htmlId) => {
  let elem = elementFactory("fieldset", htmlClass, htmlId);
  return Object.assign(elem, htmlOps(elem));
};

const createLegend = (htmlClass, htmlId, legendTxt) => {
  let elem = elementFactory("fieldset", htmlClass, htmlId);
  if (!check().isNullUndefined(legendTxt)) {
    htmlOps(elem).setText(legendTxt);
  }
  return Object.assign(elem, htmlOps(elem));
};

const createLabel = (htmlClass, htmlId, labelTxt, labelFor) => {
  let elem = elementFactory("label", htmlClass, htmlId);
  if (!check().isNullUndefined(labelTxt)) {
    htmlOps(elem).setText(labelTxt);
  }
  if (!check().isNullUndefined(labelTxt)) {
    htmlOps(elem).setFor(labelFor);
  }
  return Object.assign(elem, htmlOps(elem));
};

const createInput = (htmlClass, htmlId, inputType, inputName, inputReq) => {
  let elem = elementFactory("input", htmlClass, htmlId);
  if (!check().isNullUndefined(inputType)) {
    htmlOps(elem).setType(inputType);
  }
  if (!check().isNullUndefined(inputName)) {
    htmlOps(elem).setName(inputName);
  }
  if (!check().isNullUndefined(inputReq)) {
    htmlOps(elem).setRequired(inputReq);
  }
  return Object.assign(elem, htmlOps(elem));
};

const createSelect = (htmlClass, htmlId, selectName) => {
  let elem = elementFactory("select", htmlClass, htmlId);
  if (!check().isNullUndefined(selectValue)) {
    htmlOps(elem).setName(selectName);
  }
  return Object.assign(elem, htmlOps(elem));
};

const createOption = (
  htmlClass,
  htmlId,
  optionText,
  optionValue,
  optionDefaultSelected,
) => {
  let elem = elementFactory("option", htmlClass, htmlId);
  if (!check().isNullUndefined(optionText)) {
    htmlOps(elem).setText(optionText);
  }
  if (!check().isNullUndefined(optionValue)) {
    htmlOps(elem).setValue(optionValue);
  }
  if (!check().isNullUndefined(optionDefaultSelected)) {
    htmlOps(elem).setDefaultSelected(optionDefaultSelected);
  }
  return Object.assign(elem, htmlOps(elem));
};
