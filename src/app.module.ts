import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { Demo1Module } from './demo1/demo1.module';

@Module({
  imports: [DemoModule, Demo1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
