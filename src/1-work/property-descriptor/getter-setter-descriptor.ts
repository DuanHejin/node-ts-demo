class Person {
  private _name: string = ''

  public get name(): string {
    return this._name
  }
  @log
  public set name(value: string) {
    this._name = value
  }

  constructor(name: string) {
    this.name = name
  }
}

function log(target: typeof Person.prototype, name: string, descriptor: PropertyDescriptor) {
  const oldSetter = descriptor.set!
  descriptor.set = function (value) {
    console.log(`set ${name}, oldValue is ${this.name}, newValue is ${value}`)
    oldSetter.call(this, value)
  }
  console.log('descriptor.get :>> ', descriptor.get);
  return descriptor
}

const p = new Person('Tom')
p.name = 'Tomea'

export {}
