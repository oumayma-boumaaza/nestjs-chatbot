import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationRepository } from './conversatio.repository';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports:[TypeOrmModule.forFeature([ConversationRepository])],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
