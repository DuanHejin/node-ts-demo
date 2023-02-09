/*
 * @Author: 端和金 duanhejin@yozosoft.com
 * @Date: 2023-01-09 17:48:12
 * @LastEditors: 端和金 duanhejin@yozosoft.com
 * @LastEditTime: 2023-01-09 17:53:42
 * @FilePath: \node-ts-demo\src\load-order\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('loading start: main.ts');
import { test as testSub1 } from "./sub1";

export const test = () => {
  console.log("main.ts test()");
  testSub1();
};
test()
console.log('loading end: main.ts');
