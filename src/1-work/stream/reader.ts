const UINT8_MAX = 256
const UINT16_MAX = 66536
const UINT32_MAX = 4294967296
const INT8_MAX = 127
const INT16_MAX = 32767
const INT32_MAX = 2147483647

export class Reader {
  data: Uint8Array
  size: number
  pos: number
  cur: number

  constructor(data: Uint8Array, size: number) {
    this.data = data
    this.size = size
    this.pos = 0
    this.cur = 0
  }

  seek2(cur: number): number {
    // if (cur > this.pos) {
    //     return Stream.Error;
    // }
    this.cur = cur
    return 0
  }

  skip2(num: number): number {
    return this.seek2(this.cur + num)
  }

  skipAttrLength(): void {
    this.skip2(4)
  }

  readUInt8(flag?: boolean): number {
    if (flag) this.skipAttrLength() //Tip：新增四位长度，暂时跳过
    if (this.cur >= this.size) {
      return 0
    }
    return this.data[this.cur++]
  }

  readInt8(flag?: boolean): number {
    if (flag) this.skipAttrLength() //Tip：新增四位长度，暂时跳过
    if (this.cur >= this.size) {
      return 0
    }
    const val = this.data[this.cur++]
    return val > INT8_MAX ? val - UINT8_MAX : val
  }

  readUInt16() {
    if (this.cur + 1 >= this.size) {
      return 0
    }
    return this.data[this.cur++] | (this.data[this.cur++] << 8)
  }

  readInt16(flag?: boolean) {
    if (flag) this.skipAttrLength() //Tip：新增四位长度，暂时跳过
    const val = this.readUInt16()
    return val > INT16_MAX ? val - UINT16_MAX : val
  }

  readUInt32(flag?: boolean) {
    if (flag) this.skipAttrLength() //Tip：新增四位长度，暂时跳过
    if (this.cur + 3 >= this.size) {
      return 0
    }

    return (
      this.data[this.cur++] |
      (this.data[this.cur++] << 8) |
      (this.data[this.cur++] << 16) |
      (this.data[this.cur++] << 24)
    )
  }

  readInt32(flag?: boolean) {
    if (flag) this.skipAttrLength() //Tip：新增四位长度，暂时跳过
    const val = this.readUInt32()
    return val > INT32_MAX ? val - UINT32_MAX : val
  }

  /**
   * 读取指定len长度的data(无符号)
   * @param len
   */
  readUintAny(len: number): number {
    if (this.cur + len > this.size) {
      return 0
    }
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
      arr.push(this.data[this.cur++] << (8 * i))
    }
    return arr.reduce((res, curr) => {
      return curr | res
    }, 0)
  }

  /**
   * 读取指定len长度的data(有符号)
   * @param len
   */
  readIntAny(len: number): number {
    const val = this.readUintAny(len)
    const INT_LEN_MAX = 2 ** (len * 8 - 1) - 1
    const UINT_LEN_MAX = 2 ** (len * 8)
    console.log('INT_LEN_MAX :>> ', INT_LEN_MAX)
    console.log('UINT_LEN_MAX :>> ', UINT_LEN_MAX)
    if (val > INT_LEN_MAX) {
      return val - UINT_LEN_MAX
    }
    return val
  }

  /**
   * 先读取length位值，
   * 再根据length值读取对应位数的数据(无符号)
   */
  readUintByLength(): number {
    // 读取length，固定4位
    const len = this.readUInt32()
    return this.readUintAny(len)
  }

  /**
   * 先读取length位值，
   * 再根据length值读取对应位数的数据(有符号)
   */
  readIntByLength(): number {
    // 读取length，固定4位
    const len = this.readUInt32()
    const val = this.readIntAny(len)
    return val
  }

  readBoolByLength(): boolean {
    // 读取length，固定4位
    const len = this.readUInt32()
    const val = this.readUintAny(len)
    return 1 === val
  }
}

/**
 * case1
 */
// const arr = new Uint8Array([3, 4, 0, 0, 0, 1, 3, 0, 0])
// console.log('arr :>> ', arr)
// console.log('arr.length :>> ', arr.length)
// const reader1 = new Reader(arr, arr.length)
// console.log('reader1.readUInt8() :>> ', reader1.readUInt8())
// // console.log('reader1.readUInt16() :>> ', reader1.readUInt16())
// console.log('reader1.readUInt32() :>> ', reader1.readUInt32())
// console.log('reader1.readUInt32() :>> ', reader1.readUInt32())

/**
 * case2
 */
// const num1 = 0b00000001
// const num2 = 0b00000010
// console.log('num1 | num2 :>> ', num1 | num2)
// console.log('num1 | (num2<< 8) :>> ', num1 | (num2 << 8))

/**
 * case3
 */
// const arr2 = new Uint8Array([3, 4, 0, 0, 0, 1, 3, 0, 0])
// const reader2 = new Reader(arr2, arr2.length)
// console.log('reader2.readUInt8() :>> ', reader2.readUInt8())
// console.log('reader2.cur :>> ', reader2.cur);
// const typeLen = reader2.readUInt32()
// console.log('reader2.cur :>> ', reader2.cur);
// console.log('typeLen :>> ', typeLen)
// const data = reader2.readUintByLength(typeLen)
// console.log('data :>> ', data)

/**
 * case4
 */
const arr3 = new Uint8Array([1, 129, 0, 0, 0, 1, 3, 0, 0])
const reader3 = new Reader(arr3, arr3.length)
const reader4 = new Reader(arr3, arr3.length)
// console.log('reader3.readInt8() :>> ', reader3.readInt8())
console.log('reader3.readInt16() :>> ', reader3.readInt16())
// console.log('reader3.readInt32() :>> ', reader3.readInt32())
console.log('reader4.readIntAny(2) :>> ', reader4.readIntAny(2))
// console.log('reader3.readIntByLength() :>> ', reader3.readIntByLength())
