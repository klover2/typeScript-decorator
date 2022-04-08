## TypeScript 装饰器（decorators）

#### 描述

随着 TypeScript 和 ES6 里引入了类，在一些场景下我们需要额外的特性来支持标注或修改类及其成员。 装饰器（Decorators）为我们在类的声明及成员上通过元编程语法添加标注提供了一种方式

若要启用实验性的装饰器特性，你必须在命令行或 tsconfig.json 里启用 experimentalDecorators 编译器选项

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。它可以在不修改代码自身的前提下，给已有代码增加额外的行为

#### 如何定义装饰器

装饰器本身其实就是一个函数，理论上忽略参数的话，任何函数都可以当做装饰器使用。例：
![在这里插入图片描述](https://img-blog.csdnimg.cn/b395d828580548309bb20db21cadb236.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/01e5db190c6045b58ef392621507d510.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/6f0f4a6744684de18576ad682185b018.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)
这个注解也称 `JavaScript中函数柯里化特性`

![在这里插入图片描述](https://img-blog.csdnimg.cn/a84781a59e6d4c7686eebb4a0d300c8f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 装饰器执行时机

修饰器对类的行为的改变，是代码编译时发生的（不是 TypeScript 编译，而是 js 在执行机中编译阶段），而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。
在 Node.js 环境中模块一加载时就会执行

### 五种装饰器

类装饰器、属性装饰器、方法装饰器、访问器装饰器、参数装饰器；

#### 类装饰器

应用于类构造函数，其参数是类的构造函数。
注意 class 并不是像 Java 那种强类型语言中的类，而是 JavaScript 构造函数的语法糖。

```js
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
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/1de912e5b3d8492b974e4bcf3249bfe2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 属性装饰器

属性装饰器表达式会在运行时当作函数被调用，传入下列 2 个参数：

1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2、成员的名字。

```js
/**
 * 属性装饰器
 */
export const PropertyDecorator = (value: string) => {
  return (target: object, key: string | symbol) => {
    console.log('我是属性装饰器，我跑起来了', key);
    target[key] = value;
  };
};
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac99883d853a401badf8d24d44181880.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 方法装饰器

它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
方法装饰会在运行时传入下列 3 个参数：

1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2、成员的名字。
3、成员的属性描述符。

```bash
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
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/37e21ec40bcb4358918b26b704737476.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 访问器装饰器

在 js 中类中（Object）中的属性有 4 个描述起行为的特性：
Configurable:表示能否通过 delete 删除属性从而重新定义属性；
Enumerable：表示能否通过 for-in 循环返回属性
writable：表示能否修改属性的值
Value：包含这个属性的数据值（个人认为其作用就是赋值）
以上四个属性在不显示调用 Object.defineProperty()的时候，前三个默认值都为 true，而 value 为你自己设定的值，如果不设定的话则为 undefined。
而其中最特殊的则是 configurable，根据《javascript 高级程序设计（第三版）》所说：一旦把该属性定义为 false 之后，那么除了 writable 之外，其他所有的属性都无法再修改。

> 注意 TypeScript 不允许同时装饰一个成员的 get 和 set 访问器。取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。这是因为，在装饰器应用于一个属性描述符时，它联合了 get 和 set 访问器，而不是分开声明的。

> 对比结果：方法装饰器的 descriptor 有 value 和 witable 属性，但没有 get 和 set 属性；访问器装饰器有 get 和 set 属性，但没有 value 和 witable 属性。

1. 访问器注解
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/487c127d7afa40d085ca6575dbcafd7a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)
2. 普通方法注解
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/35b8b857e03a4ee1b8e11a0acb3f78c8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 参数装饰器

参数装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2、参数的名字。
3、参数在函数参数列表中的索引。

```js
/**
 * 参数装饰器
 */
export const ParamsDecorator = () => {
  return (target: any, key: string | symbol, index: number) => {
    console.log('我是参数装饰器，我跑起来了', key, index);
  };
};
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/290db925645a445aaec74e8fe76aefa2.png)

## 装饰器加载顺序

![在这里插入图片描述](https://img-blog.csdnimg.cn/38c5cdabf4254bdabe445363d3940e3f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAdy1rbG92ZXI=,size_20,color_FFFFFF,t_70,g_se,x_16)
从上述例子得出如下结论：

1、有多个参数装饰器时：从最后一个参数依次向前执行

2、方法和方法参数中参数装饰器先执行。

3、类装饰器总是最后执行。

4、方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行。

5、方法参数装饰器>方法装饰器>类装饰器，自右向左，自内而外，自上而下。

## 文档

[装饰器](https://es6.ruanyifeng.com/#docs/decorator)
[陈峰装饰器](https://www.cnblogs.com/winfred/p/8216650.html)
