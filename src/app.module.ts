import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './message/message.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    ConversationModule,
    MessagesModule,
  ],
})
export class AppModule {}
