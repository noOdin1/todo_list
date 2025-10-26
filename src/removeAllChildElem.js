/* removeAllChildElem.js */

export { removeAllChildElemByClass, removeAllChildElemById };

function removeAllChildElemByClass(elem, index) {
  let child = elem[index].lastElementChild;

  while (child) {
    elem[index].removeChild(child);
    child = elem[index].lastElementChild;
  }
}

function removeAllChildElemById(elem) {
  let child = elem.lastElementChild;

  while (child) {
    elem.removeChild(child);
    child = elem.lastElementChild;
  }
}
