import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Auth } from '../auth/auth.entity';
import Base from '../base.entity';

@Entity('Post')
export class Post extends Base {
    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column('text', { array: true, nullable: true })
    tags!: string[];

    @ManyToOne(() => Auth, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    auth!: Auth;

    @Column()
    userId!: string; // Foreign key column
}
