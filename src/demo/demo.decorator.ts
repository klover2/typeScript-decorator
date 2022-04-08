/**
 * 类类装饰器 柯里化特性
 * @returns
 */
export const ClassDecorator = (): ClassDecorator => {
  return (target: Function) => {
    console.log('我已经跑起来了======================================');
  };
};
