/**
 * 方法装饰器
 */

class Person {
  name: string

  constructor(name: string) {
    this.name = name
  }

  @yell
  say(other: string = '') {
    console.log(`Hi, I'm ${this.name}, ${other}`)
  }
}

function yell(target: typeof Person.prototype, name: keyof Person, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log(`Hiiiiii, My name issssss ${this.name}`)
    oldValue.call(this, ...args)
  }
  return descriptor
}

const p = new Person('Tom')
p.say('how are you Jerry')

export {}
