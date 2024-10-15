export const navPathTitleMap: Map<string, string> = new Map<string, string>();
// @ts-ignore
navPathTitleMap.set('home', '首页');


export function titleDecorator(title: string) {
  return (target: any, propertyName: string) => {
    console.log('name :>> ', propertyName);
    console.log('name :>> ', target[propertyName]);
    console.log('title :>> ', title);
    navPathTitleMap.set(target[propertyName], title);
  }
}


class Router {
  @titleDecorator('titleHome')
  static home: string = 'home111';
}