import _ from "lodash";

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  // aaa.log('error')
  return element;
}

document.body.appendChild(component());
