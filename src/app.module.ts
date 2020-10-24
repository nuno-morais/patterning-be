import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import "dotenv/config";
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RecordsModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule { }
