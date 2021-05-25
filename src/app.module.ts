import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './message/message.module';
import { UsersModule } from './user/user.module';
@Module({
  imports: [ConversationModule, MessagesModule,  UsersModule],
})
export class AppModule {}

