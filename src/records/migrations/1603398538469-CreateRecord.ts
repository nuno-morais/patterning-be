import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecord1603398538469 implements MigrationInterface {
    private recordsTable = new Table({
        name: 'records',
        columns: [
            {
                name: "id",
                type: "varchar",
                isPrimary: true,
                isUnique: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            },
            {
                name: 'type',
                type: 'varchar',
                length: '255'
            },
            {
                name: 'content',
                type: 'jsonb',
                isNullable: false
            },
            {
                name: 'date',
                type: 'timestamptz',
                isNullable: false
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            }],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(this.recordsTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.recordsTable);
    }
}
