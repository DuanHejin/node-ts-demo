/**
 * 手写new操作符
 * 考察new操作后，发生了什么。
 * 1. 创建一个空对象
 * 2. 将对空对象的__proto__属性，指向构造函数的prototype属性
 * 3. 让构造函数的this，指向空对象。并执行构造函数
 * 4. 根据构造函数的返回值，为引用对象的场合，返回引用对象本身；其他场合，返回空对象
 */

function newFactory(F, ...args) {
  if (typeof F !== "function") {
    throw new Error("constructor must be a function");
  }
//   const pureObj = Object.create(null);
//   Object.setPrototypeOf(pureObj, F.prototype);
   const pureObj = Object.create(F.prototype);
  const res = F.prototype.constructor.apply(pureObj, ...args);
  if (typeof res === "object" || typeof res === "function") {
    return res;
  }
  return pureObj;
}

function User(name) {
  this.name = name;
  this.type1 = "user1";
  return this
}
User.prototype.type2 = "user2";

const u = newFactory(User, ["u"]);
console.log("u :>> ", u);
console.log("u.__proto__ :>> ", u.__proto__);
