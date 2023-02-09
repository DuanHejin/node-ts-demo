/*
 * @Author: 端和金 duanhejin@yozosoft.com
 * @Date: 2022-12-07 10:38:50
 * @LastEditors: 端和金 duanhejin@yozosoft.com
 * @LastEditTime: 2022-12-07 15:20:51
 * @FilePath: \node-ts-demo\src\canvas-fingerprint\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function getCanvasFp(uuid) {
  let result = "";
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 20;
  canvas.style.display = "inline";
  const ctx = canvas.getContext("2d");
  ctx.rect(0, 0, 10, 10);
  ctx.rect(2, 2, 6, 6);
  result +=
    "canvas winding:" +
    (ctx.isPointInPath(5, 5, "evenodd") === false ? "yes" : "no");
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.font = "11pt no-real-font-123";
  if (uuid) {
    ctx.fillText(uuid, 2, 15);
  }
  ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
  ctx.font = "18pt Arial";
  ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgb(255,0,255)";
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgb(0,255,255)";
  ctx.beginPath();
  ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgb(255,255,0)";
  ctx.beginPath();
  ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgb(255,0,255)";

  // canvas winding
  ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
  ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
  ctx.fill("evenodd");

  if (canvas.toDataURL) {
    result += ";canvas fp:" + canvas.toDataURL();
  }

  // 计算字符串的hash值
  let char,
    hash = 0;
  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      char = result.charCodeAt(i);
      hash = Math.abs((hash << 5) - hash + char);
    }
  }

  return hash;
}


