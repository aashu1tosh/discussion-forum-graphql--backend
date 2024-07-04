import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import createUUID from '../utils/uuid.utils';

abstract class Base extends BaseEntity {
    @Column({ primary: true, type: 'uuid' })
    id!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @Column({ name: 'updated_at', nullable: true })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt!: Date;

    @BeforeInsert()
    async UUID(): Promise<void> {
        this.id = await createUUID();
    }

    @BeforeUpdate()
    async updateDate(): Promise<void> {
        this.updatedAt = new Date(Date.now());
    }
}

export default Base;
