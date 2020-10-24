import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordsConverter } from './converters/records.converter';
import { NewRecordInput } from './dto/new-record.input';
import { RecordsArgs } from './dto/records.args';
import { Record } from './entities/record.entity';

/**
 * TODO: Split it in interactors
 */

@Injectable()
export class RecordsService {
  public constructor(
    @InjectRepository(Record)
    private readonly recordsRepository: Repository<Record>,
    private readonly recordsConverter: RecordsConverter,
  ) {}
  list = [];
  async create(data: NewRecordInput): Promise<Record> {
    const record = this.recordsConverter.convertDtoToEntity(data);

    return await this.recordsRepository.save(record);
  }

  async findOneById(id: string): Promise<Record> {
    const record = await this.recordsRepository.findOne({ id });
    if (!record) {
      throw new NotFoundException(id);
    }
    return record;
  }

  async findAll(recipesArgs: RecordsArgs): Promise<Record[]> {
    return await this.recordsRepository.find({ skip: recipesArgs.skip, take: recipesArgs.take });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.recordsRepository.delete({ id });
    return result.affected != null && result.affected == 1;
  }
}
