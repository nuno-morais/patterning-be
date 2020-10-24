import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsDateString, IsEnum } from 'class-validator';

export enum RecordTypes {
    FOOD,
    BOOM
}

registerEnumType(RecordTypes, { name: 'RecordTypes' })

@InputType()
export class NewRecordContent {
  @Field()
  key : string

  @Field()
  value: string
}

@InputType()
export class NewRecordInput {
  @Field(() => RecordTypes)
  @IsEnum(RecordTypes)
  type: RecordTypes;

  @Field(() => [NewRecordContent])
  content: NewRecordContent[];

  @Field()
  @IsDateString()
  date: string
}
