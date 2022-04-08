/**
 * 类装饰器
 * @returns
 */
export const Class2Decorator = (options?: any): ClassDecorator => {
  return (target: object) => {
    console.log('我是类装饰器，我跑起来了');
    Reflect.defineMetadata('SCOPE_OPTIONS_METADATA', options, target);
  };
};

/**
 * 方法装饰器
 */
export const MethodDecorator = (options?: any): MethodDecorator => {
  return (target: any, key?: any, descriptor?: PropertyDescriptor) => {
    console.log('我是方法装饰器，我跑起来了', key);
    Reflect.defineMetadata(`MethodDecorator`, options, target?.constructor);

    const oldFunc = descriptor.value;
    descriptor.value = async (...args: any) => {
      let result: any;
      try {
        console.log('拿到方法的参数==============>', args);
        result = await oldFunc.apply(this, args);
      } catch (e) {
        throw e;
      }
      return result;
    };
    return descriptor;
  };
};

/**
 * 属性装饰器
 */
export const PropertyDecorator = (value: string) => {
  return (target: object, key: string | symbol) => {
    console.log('我是属性装饰器，我跑起来了', key);
    target[key] = value;
  };
};

/**
 * 参数装饰器
 */
export const ParamsDecorator = () => {
  return (target: any, key: string | symbol, index: number) => {
    console.log('我是参数装饰器1，我跑起来了', key, index);
  };
};

/**
 * 参数装饰器2
 */
export const Params2Decorator = () => {
  return (target: any, key: string | symbol, index: number) => {
    console.log('我是参数装饰器2，我跑起来了', key, index);
  };
};

/**
 * 访问器装饰器的参数
 * @param target  类的原型对象
 * @param key 属性的名称（被装饰的属性）
 * @param descriptor 描述符
 */
export const VisitDecorator = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) => {
  console.log('访问器装饰器，我跑起来了', key);
};
