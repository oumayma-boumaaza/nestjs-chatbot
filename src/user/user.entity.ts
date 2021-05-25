import { Conversation } from "src/conversation/conversation.entity";
import {JoinColumn,OneToOne,BaseEntity, ChildEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn ,TableInheritance} from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    UserId:number;
    @Column()
    mail:string;
    @Column()
    password:string;
    @Column()
    firstName:string;
    @Column()
    lastName:string;

}
@ChildEntity()
export class Admin {
    @OneToMany(()=> Conversation , conversation=>conversation.admins)
    conversations:Conversation[];
} 
@ChildEntity()
export class Employee{
    @OneToOne(() => Conversation)
    @JoinColumn()
    conversation: Conversation;
}