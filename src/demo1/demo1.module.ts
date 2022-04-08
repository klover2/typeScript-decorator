import { Module } from '@nestjs/common';
import { Demo1Service } from './demo1.service';

@Module({
  providers: [Demo1Service],
})
export class Demo1Module {}
