/**
 * 手写instanceof方法
 * 考察instanceof的类型检测原理。判断左侧对象的原型链上，是否出现了右侧构造函数的原型对象。
 * 
 * 注意原型对象的获取，使用Object.getPrototypeOf()方法兼容性更好点。因为__proto__是内部属性，浏览器端有，其他端可能没有该属性；
 * 对象的最顶层原型为null；
 * Object.create(null)创建的对象没有原型对象；
 */
const obj = {};
console.log("obj instanceof Object :>> ", obj instanceof Object);
const arr = [];
console.log("arr instanceof Array :>> ", arr instanceof Array);

function myInstanceof(obj, Func) {
  let isInstance = false;
  //   const leftProto = Object.getPrototypeOf(obj);
  const leftProto = obj.__proto__;
  if (!leftProto) {
    return false;
  }
  if (leftProto !== Func.prototype) {
    leftProto = Object.getPrototypeOf(leftProto);
    // leftProto = leftProto.__proto__;
    isInstance = myInstanceof(leftProto, Func.prototype);
  } else {
    isInstance = true;
  }
  return isInstance;
}

console.log("myInstanceof(obj, Object) :>> ", myInstanceof(obj, Object));
console.log("myInstanceof(arr, Array) :>> ", myInstanceof(arr, Array));
const pureObj = Object.create(null);
console.log("pureObj.__proto__ :>> ", pureObj.__proto__);
console.log("myInstanceof(pureObj, Object) :>> ", myInstanceof(pureObj, Object));
