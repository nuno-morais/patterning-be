import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@ObjectType()
export class RecordContent {
  @Field()
  key : string

  @Field()
  value: string

  constructor(data: Partial<RecordContent> = null) {
    if (data != null) {
      for (const propertyName in data)
        {
            if (data.hasOwnProperty(propertyName))
            {
                this[propertyName] = data[propertyName];
            }
        }
    }
  }
}


@ObjectType()
@Entity({name: 'records'})
export class Record {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  type: string;

  @Field(() => [RecordContent], {nullable: true})
  @Column({ type: 'jsonb' })
  content: RecordContent[];

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field({ name: 'created_at' })
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field({ name: 'updated_at' })
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  constructor(data: Partial<Record> = null) {
    if (data != null) {
      for (const propertyName in data)
        {
            if (data.hasOwnProperty(propertyName))
            {
                this[propertyName] = data[propertyName];
            }
        }
    }
  }
}
