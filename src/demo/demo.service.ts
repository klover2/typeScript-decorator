import { Injectable } from '@nestjs/common';
import { ClassDecorator } from './demo.decorator';

@Injectable()
@ClassDecorator()
export class DemoService {}
