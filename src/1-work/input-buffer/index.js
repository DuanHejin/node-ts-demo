/*
 * @Author: 端和金 duanhejin@yozosoft.com
 * @Date: 2023-01-12 13:50:47
 * @LastEditors: 端和金 duanhejin@yozosoft.com
 * @LastEditTime: 2023-01-13 09:39:00
 * @FilePath: \node-ts-demo\src\input-buffer\index.ts
 * @Description: 模拟数据缓冲池
 */

let resultDom, inputDom, inputKeyCode;

window.onload = () => {
  resultDom = document.getElementById("result");
  inputDom = document.getElementById("inp");
  inputDom.addEventListener("input", handleInput);
  inputDom.addEventListener("keydown", handleInputKeyDwon);
};

function handleInput(/** @type {InputEvent} */ e) {
  const value = e.target.value;
  resProxy.currentValue = value;
  // 清空input值
  inputDom.value = "";
}
function handleInputKeyDwon(/** @type {KeyboardEvent} */ e) {
  console.log("e.keyCode :>> ", e.keyCode);
  inputKeyCode = e.keyCode;
}

// single bind function
const res = {
  currentValue: "",
  value: "",
  consumableValue: "",
};
const resProxy = new Proxy(res, {
  set(target, propKey, value, receiver) {
    // console.log(`setting ${propKey}, value: ${value}`);
    if (propKey === "currentValue") {
      target.value += value;
      syncToHTML(target.value);
      target.consumableValue += value;
      syncToDB(target);
    }
    return Reflect.set(target, propKey, value, receiver);
  },
  get(target, propKey, receiver) {
    return Reflect.get(target, propKey, receiver);
  },
});

function syncToHTML(value) {
  resultDom.innerText = value;
}

const dbRecords = [];

const syncToDB = _.debounce(
  (target) => {
    dbRecords.push(`插入内容：${target.consumableValue}`);
    target.consumableValue = "";
    console.log("dbRecords :>> ", dbRecords);
  },
  1000,
  { leading: false }
);
