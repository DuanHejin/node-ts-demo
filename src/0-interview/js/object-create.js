/**
 * 手写Object.create()方法。
 * 考察Object.create的原理，原型和原型链，原型继承。
 * 
 * Object.create()会产生一个新对象，这个新对象的__proto__指向Object.create()的入参。即新对象的的原型对象为入参。这是一种显示原型继承。
 * 相对的，new方法会产生隐式继承。new出来的对象的__proto__指向后面构造函数的原型对象。
 */

function Car(name) {
  this.name = name;
}
Car.prototype.type = "car";
Car.prototype.toUpperCase = function toUpperCase() {
  return this.name.toUpperCase();
};
const bmw = new Car("bmw");
console.log("bmw :>> ", bmw);
console.log("bmw.toUpperCase() :>> ", bmw.toUpperCase());
console.log("bmw.__proto__ :>> ", bmw.__proto__);
console.log("Car.prototype :>> ", Car.prototype);
console.log("Car.prototype.constructor === Car :>> ", Car.prototype.constructor === Car);

const pureObj = Object.create(null);
pureObj.name = "pureObj";
const bmwA7 = Object.create(pureObj);

// const bmwA7 = Object.create(bmw);
console.log("bmwA7 :>> ", bmwA7);
bmwA7.name = "bmwA7";
console.log("bmwA7.toUpperCase() :>> ", bmwA7.toUpperCase?.());
console.log("type" in bmwA7);
console.log(bmwA7.hasOwnProperty?.("type"));
for (const key in bmwA7) {
  // if (Object.hasOwnProperty.call(bmwA7, key)) {
  const element = bmwA7[key];
  console.log("key :>> ", key);
  // }
}
//
console.log("bmwA7 :>> ", bmwA7);
console.log("bmwA7.__proto__ :>> ", bmwA7.__proto__);
console.log("bmwA7.__proto__ :>> ", bmwA7.__proto__?.__proto__);


/**
 * 实现代码
 * @param {*} obj 
 * @returns 
 */
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
