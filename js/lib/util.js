//Dom utils
function validateTarget(target) {
  if (!target) throw new Error("target cannot be empty");
}

function isSupportQuerySelector() {
  return (
    typeof document.querySelectorAll === "function" &&
    typeof document.querySelector === "function"
  );
}

export function getElemById(id) {
  return document.getElementById(id);
}

export function getElemByClass(classname) {
  let elements = [];
  let element = document.getElementsByClassName(classname);
  elements = element.length === 1 ? element[0] : [].slice.call(element);
  return elements;
}
