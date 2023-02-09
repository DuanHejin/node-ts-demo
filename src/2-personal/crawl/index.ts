import axios from "axios";
import { JSDOM } from "jsdom";

let count = 0;
const retriveInfo = async () => {
  count++;
  const res = (await axios.get(`http://www.matrix67.com/blog/page/${count}`)) as any;
  const dom = new JSDOM(res.data);
  const { document } = dom.window;
  const nodeList = document.querySelectorAll(".entry-title");
  for (const it of nodeList) {
    console.log("it.innerHTML :>> ", it.innerHTML);
  }
  retriveInfo();
};

retriveInfo();
