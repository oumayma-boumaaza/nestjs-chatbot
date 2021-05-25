import { Admin } from "src/user/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn ,OneToMany} from "typeorm";
import {Message} from "../message/message.entity"

@Entity()
export class Conversation extends BaseEntity{
    @PrimaryGeneratedColumn()
    ConversationId:number;
    @OneToMany(() => Message ,message =>message.conversation)
    messages:Message[];  
    @OneToMany(() => Admin ,admin =>admin.conversations)
    admins:Admin[]; 

}