import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './infra/infra.module';
import { ColumnModule } from './modules/column/column.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [InfraModule, ColumnModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
