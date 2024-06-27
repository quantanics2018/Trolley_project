import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/trolley-project'),
    SessionModule
  ],
})
export class AppModule {}


