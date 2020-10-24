import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewRecordInput } from './dto/new-Record.input';
import { RecordsArgs } from './dto/records.args';
import { Record } from './entities/record.entity';
import { RecordsService } from './records.service';

const pubSub = new PubSub();

@Resolver(() => Record)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @Query(() => Record)
  async record(@Args('id') id: string): Promise<Record> {
    const record = await this.recordsService.findOneById(id);

    return record;
  }

  @Query(() => [Record])
  records(@Args() recordsArgs: RecordsArgs): Promise<Record[]> {
    return this.recordsService.findAll(recordsArgs);
  }

  @Mutation(() => Record)
  async addRecord(
    @Args('newRecordData') newRecordData: NewRecordInput,
  ): Promise<Record> {
    const Record = await this.recordsService.create(newRecordData);
    pubSub.publish('recordAdded', { recordAdded: Record });
    return Record;
  }

  @Mutation(() => Boolean)
  async removeRecord(@Args('id') id: string) {
    return this.recordsService.remove(id);
  }

  @Subscription(() => Record)
  recordAdded() {
    return pubSub.asyncIterator('recordAdded');
  }
}
