/**
 * 属性装饰器
 */

class Person {
  @readonly
  name: string = ''

  constructor(name: string) {
    this.name = name
  }
}

/**
 * 属性描述器只有两个参数
 * @param target 
 * @param name 
 */
function readonly(target: typeof Person.prototype, name: string) {
  console.log('target, name :>> ', target, name)
  // return descriptor
}

export {}