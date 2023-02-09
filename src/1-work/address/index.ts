/*
 * @Author: 端和金 duanhejin@yozosoft.com
 * @Date: 2022-12-06 15:34:09
 * @LastEditors: 端和金 duanhejin@yozosoft.com
 * @LastEditTime: 2022-12-06 15:51:39
 * @FilePath: \node-ts-demo\src\address\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import address from 'address';
import os from 'os';

const getMac = async () => {
    address.mac(function (err, addr) {
        console.log('addr :>> ', addr);
    })
};
getMac();
const platform = os.platform();
console.log('platform :>> ', platform);