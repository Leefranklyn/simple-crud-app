import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HolidaysModule } from './holidays/holidays.module';

@Module({
  imports: [UsersModule, HolidaysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
