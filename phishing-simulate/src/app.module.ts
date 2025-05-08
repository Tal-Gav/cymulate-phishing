import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TargetModule } from './target/target.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TargetModule,
    MongooseModule.forRoot('mongodb://cym:cym@localhost:27017'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
