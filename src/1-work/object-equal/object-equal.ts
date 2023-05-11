class YBridge {
  doc: any
  constructor() {
    this.doc = null
  }

  addSomeProperty(key: string, value: any) {
    if (!this.doc) {
      this.doc = {}
    }
    this.doc[key] = value
  }
}

class YZDoc {
  doc: any
  bridge!: YBridge
  init() {
    const bridge = new YBridge()
    this.bridge = bridge
    this.doc = bridge.doc
  }

  test() {
    console.log('Object.is(this.doc, this.bridge.doc) :>> ', Object.is(this.doc, this.bridge.doc))
  }
}

const yzdoc = new YZDoc()
yzdoc.init()
yzdoc.bridge.addSomeProperty('name', 'aaa')
console.log('yzdoc.bridge.doc :>> ', yzdoc.bridge.doc)
console.log('yzdoc.doc :>> ', yzdoc.doc)
yzdoc.test()
