/*
 * @Author: 端和金 duanhejin@yozosoft.com
 * @Date: 2023-02-04 14:50:47
 * @LastEditors: 端和金 duanhejin@yozosoft.com
 * @LastEditTime: 2023-02-04 17:17:53
 * @FilePath: \node-ts-demo\src\crawl\xiachufang\xiachufang.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosRequestConfig } from "axios";
import { JSDOM } from "jsdom";

const retriveInfo = async () => {
  const options: AxiosRequestConfig = {
    url: "https://www.xiachufang.com/explore",
    method: "get",
    params: {},
    data: {},
  };

  const res = await axios(options);

  const dom = new JSDOM(res.data);
  const { document } = dom.window;
  
  const nodeList = document.querySelectorAll(".info.pure-u .name");
  for (const it of nodeList) {
    console.log("it.innerHTML :>> ", it.innerHTML);
  }
};

retriveInfo();
