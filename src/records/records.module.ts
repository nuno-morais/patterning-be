import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecordsConverter } from './converters/records.converter';
import { Record } from './entities/record.entity';
import { RecordsResolver } from './records.resolver';
import { RecordsService } from './records.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record])
  ],
  providers: [RecordsConverter, RecordsResolver, RecordsService, DateScalar],
})
export class RecordsModule {}
