/**
 * 类装饰器接受一个参数target，值为要装饰的类
 */

@testable
class Person {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

function testable(target: ClassDecorator) {
  console.log('target :>> ', target)
  // 为目标target类增加静态属性isTestable
  target.isTestable = true
  // 为目标target类的实例增加属性test
  target.prototype.test = true
}

console.log('Person.isTestable :>> ', Person.isTestable)
console.log('Person.test :>> ', Person.test)

const p = new Person('p')
// 实例上没有isTestable属性
console.log('p.isTestable :>> ', p.isTestable)
// 实例上有test属性
console.log('p.test :>> ', p.test)
// 实例的test属性是在其原型链上，本身没有test属性
console.log(`Object.hasOwnProperty.call(p, 'test') :>> `, Object.hasOwnProperty.call(p, 'test'))

// 意外的惊喜，关于为什么要加上export {}这句话
// https://www.typescriptlang.org/docs/handbook/2/modules.html
export {}
