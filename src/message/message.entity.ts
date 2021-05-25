import {Conversation} from "../conversation/conversation.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";

@Entity()
export class Message extends BaseEntity{
    @PrimaryGeneratedColumn()
    messageId:number;
    @Column()
    messageValue:string;
    @Column()
    dateSend:Date;
    @Column()
    dateReceive:Date;   
    @ManyToOne(()=> Conversation ,conversation =>conversation.messages)
    conversation:Conversation; 
}