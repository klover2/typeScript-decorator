import { Injectable } from '@nestjs/common';
import {
  Class2Decorator,
  MethodDecorator,
  Params2Decorator,
  ParamsDecorator,
  PropertyDecorator,
  VisitDecorator,
} from './demo1.decorator';

@Injectable()
@Class2Decorator()
export class Demo1Service {
  @PropertyDecorator('klover1') author: string;

  get getAuthor() {
    return this.author;
  }

  @VisitDecorator
  set setAuthor(author: string) {
    this.author = author;
  }

  @MethodDecorator()
  public async test1(name: string, age: number) {}

  public async test2(
    @ParamsDecorator() name: string,
    @Params2Decorator() age: number,
  ) {
    console.log('===============>', name, age);
  }
}
