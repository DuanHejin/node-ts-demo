class XLog {
    static d(tag: string, message: string) {
        console.log('tag, message :>> ', tag, message);
    }
}

// 类装饰器，给类的实例增加一个属性className,值为类的构造函数的name
export function className(target: Function) {
    target.prototype.className = target.name;
    // target.prototype.xlog = XLog;
}


function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    className: string;
    constructor(...args: any[]) {
      super(...args);
      this.className = constructor.name;
    }
  };
}

abstract class DecoratorClass {
  className: string = ''
}

// @className
@classDecorator
class Person extends DecoratorClass {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      super()
      this.name = name;
      this.age = age;
    }
}

const p1 = new Person('tom', 12)
console.log('p1.name :>> ', p1.name);
console.log('p1.className :>> ', p1.className);
// p1.xlog.d('xxx', 'yy')


