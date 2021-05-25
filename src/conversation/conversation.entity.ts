import { Employee } from 'src/user/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Message } from '../message/message.entity';

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  ConversationId: number;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
