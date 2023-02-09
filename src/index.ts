/*
 * @Author: 端和金 duanhejin@yozosoft.com
 * @Date: 2022-11-29 14:18:04
 * @LastEditors: 端和金 duanhejin@yozosoft.com
 * @LastEditTime: 2023-02-08 15:38:07
 * @FilePath: \node-ts-demo\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from "express";
import config from "./config";

const app = express();

function test(params: string): string {
  console.log("params :>> ", params);
  return params;
}

const aaa: string = "aaa";
// test(aaa);

app.get("/", (req, res) => {
  const dbInfo = config.db;
    // res.json(dbInfo);
  res.send('11111');
});

const PORT = 3002;
const HOST = "localhost";
app.listen(PORT, HOST, () => {
  test(aaa);
  console.log(`server is running on ${HOST}:${PORT}`);
});
