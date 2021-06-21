import { Conversation } from 'src/conversation/conversation.entity';
import {
  JoinColumn,
  OneToOne,
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column({ unique: true })
  mail: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  sexe: string;

  @Column()
  matricule: string;

  @Column()
  birthday: Date;

  @Column()
  cin: string;

  @Column()
  occupation: string;

  @Column()
  adress: string;

  @Column()
  tel: string;

  @Column({ type: 'longtext' })
  avatar: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
@ChildEntity()
export class Admin extends User {}
@ChildEntity()
export class Employee extends User {
  @OneToOne(() => Conversation)
  @JoinColumn()
  conversation: Conversation;
}
