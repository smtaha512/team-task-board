import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './infra/infra.module';
import { ColumnModule } from './modules/column/column.module';

@Module({
  imports: [InfraModule, ColumnModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
