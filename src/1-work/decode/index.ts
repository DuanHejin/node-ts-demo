/*
 * @Author: 端和金 duanhejin@yozosoft.com
 * @Date: 2022-12-02 10:33:16
 * @LastEditors: 端和金 duanhejin@yozosoft.com
 * @LastEditTime: 2022-12-12 18:00:39
 * @FilePath: \node-ts-demo\src\decode\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import * as encoding from 'lib0/encoding';
import * as decoding from 'lib0/decoding';

const num = 1;
console.log('num :>> ', num);
// const str = 'a';
const encoder = encoding.createEncoder();
encoding.writeVarUint(encoder, num);
encoding.writeVarUint(encoder, 1);
const uint8Arr = new Uint8Array(2);
uint8Arr[0] = 8;
uint8Arr[1] = 9;
encoding.writeUint8Array(encoder, uint8Arr)
// encoding.writeVarString(encoder, str);
// console.log('encoder :>> ', encoder);
console.log('encoder.bufs :>> ', encoder.bufs);
console.log('encoder.cbuf :>> ', encoder.cbuf);
console.log('encoder.cpos :>> ', encoder.cpos);

const buf = encoding.toUint8Array(encoder);
console.log('buf :>> ', buf);