/*
 * @Author: 端和金 duanhejin@yozosoft.com
 * @Date: 2022-12-06 11:30:38
 * @LastEditors: 端和金 duanhejin@yozosoft.com
 * @LastEditTime: 2022-12-06 11:31:22
 * @FilePath: \node-ts-demo\src\keyof\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** 校验类型 */
export interface CheckType {
  notExist: undefined;
  between: undefined;
}

/** 校验选项 */
export interface IOptions {
  type: keyof CheckType;
  tbName: string;
  record: any;
  uniqueKeys: string[];
  /** false未删除，true已删除 */
  isDelete?: boolean;
}
