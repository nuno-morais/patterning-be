import { Injectable } from "@nestjs/common";
import { NewRecordInput, RecordTypes } from "../dto/new-Record.input";
import { Record, RecordContent } from "../entities/record.entity";

@Injectable()
export class RecordsConverter {
    public convertDtoToEntity(obj: NewRecordInput) {
        return new Record({
            content: obj.content.map(value => (new RecordContent(value))),
            type: RecordTypes[obj.type],
            date: new Date(obj.date),
        });
    }
}
